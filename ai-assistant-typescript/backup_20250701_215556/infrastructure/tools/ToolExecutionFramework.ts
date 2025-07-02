/**
 * Tool Execution Framework
 * 
 * This framework provides a standardized way to execute tools across all experts
 * with comprehensive error handling, retry logic, monitoring, and validation.
 */

import { z } from 'zod'
import { AgentTool, ToolExecutionResult } from '../../types/agents'
import { createLogger } from '../../utils/logger'
import { MetricsCollector } from '../monitoring/MetricsCollector'
import { CacheManager } from '../cache/manager'
import { RateLimiter } from '../rate-limiting/RateLimiter'

const logger = createLogger('ToolExecutionFramework')

// Tool execution options
export interface ToolExecutionOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
  cache?: boolean
  cacheTTL?: number
  validateInput?: boolean
  validateOutput?: boolean
  rateLimit?: {
    requests: number
    window: number
  }
  monitoring?: {
    trackMetrics: boolean
    trackErrors: boolean
    trackPerformance: boolean
  }
}

// Tool execution context
export interface ToolExecutionContext {
  toolName: string
  expertId: string
  userId?: string
  sessionId?: string
  correlationId: string
  startTime: number
  attempt: number
  metadata: Record<string, any>
}

// Tool validation schemas
const ToolParameterSchema = z.object({
  type: z.enum(['object', 'array', 'string', 'number', 'boolean']),
  properties: z.record(z.any()).optional(),
  items: z.any().optional(),
  required: z.array(z.string()).optional(),
  enum: z.array(z.any()).optional(),
  description: z.string().optional()
})

// Default options
const DEFAULT_OPTIONS: Required<ToolExecutionOptions> = {
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 30000,
  cache: true,
  cacheTTL: 300, // 5 minutes
  validateInput: true,
  validateOutput: true,
  rateLimit: {
    requests: 100,
    window: 60000 // 1 minute
  },
  monitoring: {
    trackMetrics: true,
    trackErrors: true,
    trackPerformance: true
  }
}

export class ToolExecutionFramework {
  private metricsCollector: MetricsCollector
  private cacheManager: CacheManager
  private rateLimiter: RateLimiter
  private executionHistory: Map<string, ToolExecutionContext[]> = new Map()

  constructor() {
    this.metricsCollector = new MetricsCollector()
    this.cacheManager = new CacheManager()
    this.rateLimiter = new RateLimiter()
  }

  /**
   * Execute a tool with comprehensive error handling and monitoring
   */
  async execute(
    tool: AgentTool,
    parameters: any,
    expertId: string,
    options: ToolExecutionOptions = {}
  ): Promise<ToolExecutionResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options }
    const correlationId = this.generateCorrelationId()
    
    const context: ToolExecutionContext = {
      toolName: tool.name,
      expertId,
      correlationId,
      startTime: Date.now(),
      attempt: 0,
      metadata: {
        parameters,
        options: opts
      }
    }

    try {
      // Rate limiting check
      if (opts.rateLimit) {
        const allowed = await this.rateLimiter.checkLimit(
          `${expertId}:${tool.name}`,
          opts.rateLimit.requests,
          opts.rateLimit.window
        )
        
        if (!allowed) {
          throw new ToolExecutionError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED', context)
        }
      }

      // Input validation
      if (opts.validateInput) {
        await this.validateInput(tool, parameters)
      }

      // Check cache
      if (opts.cache) {
        const cached = await this.checkCache(tool, parameters, context)
        if (cached) {
          this.trackExecution(context, cached, true)
          return cached
        }
      }

      // Execute with retry logic
      const result = await this.executeWithRetry(tool, parameters, context, opts)

      // Output validation
      if (opts.validateOutput && result.success) {
        await this.validateOutput(tool, result)
      }

      // Cache successful results
      if (opts.cache && result.success) {
        await this.cacheResult(tool, parameters, result, opts.cacheTTL)
      }

      // Track metrics
      this.trackExecution(context, result, false)

      return result
    } catch (error) {
      const errorResult = this.handleError(error, context)
      this.trackError(context, error)
      return errorResult
    }
  }

  /**
   * Execute tool with retry logic
   */
  private async executeWithRetry(
    tool: AgentTool,
    parameters: any,
    context: ToolExecutionContext,
    options: Required<ToolExecutionOptions>
  ): Promise<ToolExecutionResult> {
    let lastError: Error | null = null
    
    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
      context.attempt = attempt
      
      try {
        // Set timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Tool execution timeout')), options.timeout)
        })
        
        // Execute tool
        const executionPromise = tool.execute(parameters)
        
        // Race between execution and timeout
        const result = await Promise.race([executionPromise, timeoutPromise]) as ToolExecutionResult
        
        // If successful or non-retryable error, return
        if (result.success || !this.isRetryableError(result.error)) {
          return { ...result, retries: attempt }
        }
        
        lastError = new Error(result.error || 'Unknown error')
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (!this.isRetryableError(lastError.message)) {
          throw error
        }
      }
      
      // Wait before retry
      if (attempt < options.maxRetries) {
        await this.delay(options.retryDelay * Math.pow(2, attempt)) // Exponential backoff
        logger.info(`Retrying tool execution`, {
          toolName: tool.name,
          attempt: attempt + 1,
          maxRetries: options.maxRetries
        })
      }
    }
    
    throw lastError || new Error('Tool execution failed after retries')
  }

  /**
   * Validate tool input parameters
   */
  private async validateInput(tool: AgentTool, parameters: any): Promise<void> {
    if (!tool.parameters) return
    
    try {
      // Convert JSON Schema to Zod schema dynamically
      const schema = this.jsonSchemaToZod(tool.parameters)
      await schema.parseAsync(parameters)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ToolExecutionError(
          `Invalid input parameters: ${error.errors.map(e => e.message).join(', ')}`,
          'VALIDATION_ERROR',
          { toolName: tool.name, parameters, errors: error.errors }
        )
      }
      throw error
    }
  }

  /**
   * Validate tool output
   */
  private async validateOutput(tool: AgentTool, result: ToolExecutionResult): Promise<void> {
    // Basic output validation
    if (result.success && result.data === undefined) {
      logger.warn('Tool returned success but no data', {
        toolName: tool.name,
        result
      })
    }
    
    // Additional validation can be added based on tool specifications
  }

  /**
   * Check cache for tool results
   */
  private async checkCache(
    tool: AgentTool,
    parameters: any,
    context: ToolExecutionContext
  ): Promise<ToolExecutionResult | null> {
    const cacheKey = this.generateCacheKey(tool.name, parameters)
    const cached = await this.cacheManager.get(cacheKey)
    
    if (cached) {
      logger.debug('Cache hit for tool execution', {
        toolName: tool.name,
        cacheKey
      })
      
      return {
        ...cached,
        metadata: {
          ...cached.metadata,
          cached: true,
          cacheKey,
          retrievedAt: new Date().toISOString()
        }
      }
    }
    
    return null
  }

  /**
   * Cache tool results
   */
  private async cacheResult(
    tool: AgentTool,
    parameters: any,
    result: ToolExecutionResult,
    ttl: number
  ): Promise<void> {
    const cacheKey = this.generateCacheKey(tool.name, parameters)
    
    await this.cacheManager.set(cacheKey, result, ttl)
    
    logger.debug('Cached tool execution result', {
      toolName: tool.name,
      cacheKey,
      ttl
    })
  }

  /**
   * Track tool execution metrics
   */
  private trackExecution(
    context: ToolExecutionContext,
    result: ToolExecutionResult,
    cached: boolean
  ): void {
    const duration = Date.now() - context.startTime
    
    this.metricsCollector.recordMetric({
      name: 'tool_execution',
      value: 1,
      tags: {
        tool: context.toolName,
        expert: context.expertId,
        success: String(result.success),
        cached: String(cached),
        attempt: String(context.attempt)
      }
    })
    
    this.metricsCollector.recordMetric({
      name: 'tool_execution_duration',
      value: duration,
      tags: {
        tool: context.toolName,
        expert: context.expertId
      }
    })
    
    // Store execution history
    const history = this.executionHistory.get(context.toolName) || []
    history.push({
      ...context,
      metadata: {
        ...context.metadata,
        duration,
        success: result.success,
        cached
      }
    })
    this.executionHistory.set(context.toolName, history.slice(-100)) // Keep last 100
  }

  /**
   * Track tool execution errors
   */
  private trackError(context: ToolExecutionContext, error: any): void {
    logger.error('Tool execution failed', {
      toolName: context.toolName,
      expertId: context.expertId,
      correlationId: context.correlationId,
      attempt: context.attempt,
      error: error instanceof Error ? error.message : String(error)
    })
    
    this.metricsCollector.recordMetric({
      name: 'tool_execution_error',
      value: 1,
      tags: {
        tool: context.toolName,
        expert: context.expertId,
        errorType: this.classifyError(error),
        attempt: String(context.attempt)
      }
    })
  }

  /**
   * Handle execution errors
   */
  private handleError(error: any, context: ToolExecutionContext): ToolExecutionResult {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorType = this.classifyError(error)
    
    return {
      success: false,
      error: errorMessage,
      metadata: {
        toolName: context.toolName,
        expertId: context.expertId,
        correlationId: context.correlationId,
        errorType,
        attempt: context.attempt,
        timestamp: new Date().toISOString()
      },
      retries: context.attempt
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: string | undefined): boolean {
    if (!error) return false
    
    const retryablePatterns = [
      'timeout',
      'network',
      'rate limit',
      'temporary',
      'unavailable',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ENOTFOUND',
      '503',
      '504',
      '429'
    ]
    
    return retryablePatterns.some(pattern => 
      error.toLowerCase().includes(pattern.toLowerCase())
    )
  }

  /**
   * Classify error type
   */
  private classifyError(error: any): string {
    if (error instanceof ToolExecutionError) {
      return error.code
    }
    
    const message = error instanceof Error ? error.message : String(error)
    
    if (message.includes('validation')) return 'VALIDATION_ERROR'
    if (message.includes('timeout')) return 'TIMEOUT_ERROR'
    if (message.includes('rate limit')) return 'RATE_LIMIT_ERROR'
    if (message.includes('network')) return 'NETWORK_ERROR'
    if (message.includes('auth')) return 'AUTH_ERROR'
    
    return 'UNKNOWN_ERROR'
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(toolName: string, parameters: any): string {
    const paramStr = JSON.stringify(parameters, Object.keys(parameters).sort())
    return `tool:${toolName}:${this.hashString(paramStr)}`
  }

  /**
   * Generate correlation ID
   */
  private generateCorrelationId(): string {
    return `tool-exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Simple string hash function
   */
  private hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36)
  }

  /**
   * Convert JSON Schema to Zod schema (simplified)
   */
  private jsonSchemaToZod(jsonSchema: any): z.ZodSchema {
    // This is a simplified implementation
    // In production, use a library like json-schema-to-zod
    if (jsonSchema.type === 'object') {
      const shape: Record<string, z.ZodSchema> = {}
      
      if (jsonSchema.properties) {
        for (const [key, prop] of Object.entries(jsonSchema.properties as any)) {
          shape[key] = this.jsonSchemaPropertyToZod(prop)
        }
      }
      
      let schema = z.object(shape)
      
      if (jsonSchema.required && Array.isArray(jsonSchema.required)) {
        // Mark non-required fields as optional
        const required = new Set(jsonSchema.required)
        for (const key of Object.keys(shape)) {
          if (!required.has(key)) {
            shape[key] = shape[key].optional()
          }
        }
        schema = z.object(shape)
      }
      
      return schema
    }
    
    return z.any()
  }

  /**
   * Convert JSON Schema property to Zod schema
   */
  private jsonSchemaPropertyToZod(prop: any): z.ZodSchema {
    switch (prop.type) {
      case 'string':
        let stringSchema: z.ZodString | z.ZodEnum<any> = z.string()
        if (prop.enum) {
          return z.enum(prop.enum as [string, ...string[]])
        }
        if (prop.minLength) stringSchema = (stringSchema as z.ZodString).min(prop.minLength)
        if (prop.maxLength) stringSchema = (stringSchema as z.ZodString).max(prop.maxLength)
        return stringSchema
        
      case 'number':
        let numberSchema = z.number()
        if (prop.minimum) numberSchema = numberSchema.min(prop.minimum)
        if (prop.maximum) numberSchema = numberSchema.max(prop.maximum)
        return numberSchema
        
      case 'boolean':
        return z.boolean()
        
      case 'array':
        if (prop.items) {
          return z.array(this.jsonSchemaPropertyToZod(prop.items))
        }
        return z.array(z.any())
        
      case 'object':
        return this.jsonSchemaToZod(prop)
        
      default:
        return z.any()
    }
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get execution history for a tool
   */
  getExecutionHistory(toolName: string): ToolExecutionContext[] {
    return this.executionHistory.get(toolName) || []
  }

  /**
   * Get execution statistics
   */
  getExecutionStats(): Record<string, any> {
    const stats: Record<string, any> = {}
    
    for (const [toolName, history] of Array.from(this.executionHistory.entries())) {
      const successful = history.filter(h => h.metadata.success).length
      const failed = history.length - successful
      const cached = history.filter(h => h.metadata.cached).length
      const durations = history.map(h => h.metadata.duration || 0)
      
      stats[toolName] = {
        total: history.length,
        successful,
        failed,
        cached,
        successRate: history.length > 0 ? (successful / history.length) * 100 : 0,
        averageDuration: durations.length > 0 
          ? durations.reduce((a, b) => a + b, 0) / durations.length 
          : 0,
        minDuration: durations.length > 0 ? Math.min(...durations) : 0,
        maxDuration: durations.length > 0 ? Math.max(...durations) : 0
      }
    }
    
    return stats
  }

  /**
   * Clear execution history
   */
  clearHistory(): void {
    this.executionHistory.clear()
  }
}

/**
 * Custom error class for tool execution errors
 */
export class ToolExecutionError extends Error {
  constructor(
    message: string,
    public code: string,
    public context: any
  ) {
    super(message)
    this.name = 'ToolExecutionError'
  }
}

// Export singleton instance
export const toolExecutionFramework = new ToolExecutionFramework()