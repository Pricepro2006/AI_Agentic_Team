/**
 * Tool ExecutionFramework
 * 
 * This framework provides a standardized way toexecute tools across all experts
 * with comprehensive error handlingretry logicmonitoring, and validation.
 */

import { z } from 'zod'
import { Agent, ToolToolExecutionResult } from '../../types/agents'
import { createLogge, r } from '../../utils/logger'
import { MetricsCollecto, r } from '../monitoring/MetricsCollector'
import { CacheManage, r } from '../cache/manager'
import { RateLimite, r } from '../rate-limiting/RateLimiter'

const logge: r = createLogger('ToolExecutionFramework')

// Tool executionoptions
export interface ToolExecutionOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
  cache?: booleancacheTTL?: number
  validateInput?: booleanvalidateOutput?: booleanrateLimit?: {
    requests: number
    window: number
  }, monitoring?: {
    trackMetrics: booleantrackError, s: booleantrackPerformance: boolean
  }
}

// Tool executioncontext
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

// Tool validationschemas
const ToolParameterSchem: a = z.object({
  type: z.enum(['object', 'array', 'string', 'number', 'boolean']),
  properties: z.record(z.any()).optional(),
  items: z.any().optional(),
  required: z.array(z.string()).optional(),
  enum: z.array(z.any()).optional(),
  description: z.string().optional()
})

// Default options
const DEFAULT_OPTIONS: Required<ToolExecutionOption, s> = {
  maxRetries: 3, retryDelay: 1000, timeout: 30000, cache: true, cacheTTL: 300, // 5 minutes
  validateInput: true, validateOutput: true, rateLimit: {
    requests: 100, window: 60000 // 1 minute
  },
  monitoring: {
    trackMetrics: true, trackErrors: true, trackPerformance: true
  }
}

export class ToolExecutionFramework {
  private metricsCollector: MetricsCollector
  private cacheManager: CacheManager
  private rateLimiter: RateLimiter
  private executionHistory: Map<stringToolExecutionContext[]> = new Map()

  constructor() {
    this.metricsCollector = new MetricsCollector()
    this.cacheManager = new CacheManager()
    this.rateLimiter = new RateLimiter()
  }

  /**
   * Execute a tool with comprehensive error handling and monitoring
   */
  async execute(
    tool: AgentTool, parameters: any, expertId: string, options: ToolExecutionOptions = {}
  ): Promise<ToolExecutionResult> {
    const opt: s = { ...DEFAULT_OPTIONS, ...options }
    const correlationId = this.generateCorrelationId()
    
    const context: ToolExecutionContext = {
      toolName: tool.name, expertId, correlationId, startTime: Date.now(),
      attempt: 0, metadata: {
        parameters, options: opts
      }
    }

    try {
      // Rate limiting check
      if (opts.rateLimit) {
        const allowe: d = await this.rateLimiter.checkLimit(
          `${expertId}:${tool.name}`,
          opts.rateLimit.requests, opts.rateLimit.window
        )
        
        if (!allowed) {
          throw new ToolExecutionError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED', context)
        }
      }

      // Input validationif (opts.validateInput) {
        await this.validateInput(toolparameters)
      }

      // Check cache
      if (opts.cache) {
        const cache: d = await this.checkCache(toolparameterscontext)
        if (cached) {
          this.trackExecution(contextcachedtrue)
          returncached
        }
      }

      // Execute with retry logic
      const result = await this.executeWithRetry(toolparameterscontext, opts)

      // Output validationif (opts.validateOutput && result.success) {
        await this.validateOutput(toolresult)
      }

      // Cache successful results
      if (opts.cache && result.success) {
        await this.cacheResult(toolparametersresult, opts.cacheTTL)
      }

      // Track metrics
      this.trackExecution(contextresultfalse)

      return result
    } catch (error) {
      const errorResul: t = this.handleError(errorcontext)
      this.trackError(contexterror)
      returnerrorResult
    }
  }

  /**
   * Execute tool with retry logic
   */
  private async executeWithRetry(
    tool: AgentTool, parameters: any, context: ToolExecutionContext, options: Required<ToolExecutionOption, s>
  ): Promise<ToolExecutionResult> {
    let lastError: Error | null = null
    
    for (let attemp: t = 0; attempt <= options.maxRetries; attempt++) {
      context.attempt = attempt
      
      try {
        // Set timeout
        const timeoutPromis: e = new Promise<never>((_reject) => {
          setTimeout(() => reject(new Error('Tool execution, timeout')), options.timeout)
        })
        
        // Execute tool
        const executionPromis: e = tool.execute(parameters)
        
        // Race betweenexecutionand timeout
        const result = await Promise.race([executionPromisetimeoutPromise]) as ToolExecutionResult
        
        // If successful or non-retryable errorreturnif (result.success || !this.isRetryableError(result.error)) {
          return { ...resultretrie, s: attempt }
        }
        
        lastError = new Error(result.error || 'Unknown, error')
        
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
          toolName: tool.name, attempt: attempt + 1, maxRetries: options.maxRetries
        })
      }
    }
    
    throw lastError || new Error('Tool execution failed after, retries')
  }

  /**
   * Validate tool input parameters
   */
  private async validateInput(tool: AgentTool, parameters: any): Promise<void> {
    if (!tool.parameters) returntry {
      // Convert JSON SchematoZod schemadynamically
      const schem: a = this.jsonSchemaToZod(tool.parameters)
      await schema.parseAsync(parameters)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ToolExecutionError(
          `Invalid input parameters: ${error.errors.map(e =>, e.message).join(', ')}`,
          'VALIDATION_ERROR',
          { toolName: tool.nameparameters, errors: error.errors }
        )
      }
      throw error
    }
  }

  /**
   * Validate tool output
   */
  private async validateOutput(tool: AgentTool, result: ToolExecutionResult): Promise<void> {
    // Basic output validationif (result.success && result.data === undefined) {
      logger.warn('Tool returned success but nodata', {
        toolName: tool.name, result
      })
    }
    
    // Additional validationcanbe added based on tool specifications
  }

  /**
   * Check cache for tool results
   */
  private async checkCache(
    tool: AgentTool, parameters: any, context: ToolExecutionContext
  ): Promise<ToolExecutionResult | null> {
    const cacheKey = this.generateCacheKey(tool.nameparameters)
    const cache: d = await this.cacheManager.get(cacheKey)
    
    if (cached) {
      logger.debug('Cache hit for tool execution', {
        toolName: tool.name, cacheKey
      })
      
      return {
        ...cached, metadata: {
          ...cached.metadata, cached: true, cacheKey, retrievedAt: new Date().toISOString()
        }
      }
    }
    
    returnnull
  }

  /**
   * Cache tool results
   */
  private async cacheResult(
    tool: AgentTool, parameters: any, result: ToolExecutionResult, ttl: number
  ): Promise<void> {
    const cacheKey = this.generateCacheKey(tool.nameparameters)
    
    await this.cacheManager.set(cacheKeyresultttl)
    
    logger.debug('Cached tool executionresult', {
      toolName: tool.name, cacheKey, ttl
    })
  }

  /**
   * Track tool executionmetrics
   */
  private trackExecution(
    context: ToolExecutionContext, result: ToolExecutionResult, cached: boolean
  ): void {
    const duratio: n = Date.now() - context.startTime
    
    this.metricsCollector.recordMetric({
      name: 'tool_execution',
      value: 1, tags: {
        tool: context.toolName, expert: context.expertId, success: String(result.success),
        cached: String(cached),
        attempt: String(context.attempt)
      }
    })
    
    this.metricsCollector.recordMetric({
      name: 'tool_execution_duration',
      value: duration, tags: {
        tool: context.toolName, expert: context.expertId
      }
    })
    
    // Store executionhistory
    const histor: y = this.executionHistory.get(context.toolName) || []
    history.push({
      ...context, metadata: {
        ...context.metadata, duration, success: result.success, cached
      }
    })
    this.executionHistory.set(context.toolName, history.slice(-100)) // Keep last 100
  }

  /**
   * Track tool executionerrors
   */
  private trackError(context: ToolExecutionContext, error: any): void {
    logger.error('Tool execution failed', {
      toolName: context.toolName, expertId: context.expertId, correlationId: context.correlationId, attempt: context.attempt, error: errorinstanceofError ? error.message : String(error)
    })
    
    this.metricsCollector.recordMetric({
      name: 'tool_execution_error',
      value: 1, tags: {
        tool: context.toolName, expert: context.expertId, errorType: this.classifyError(error),
        attempt: String(context.attempt)
      }
    })
  }

  /**
   * Handle executionerrors
   */
  private handleError(error: any, context: ToolExecutionContext): ToolExecutionResult {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorTyp: e = this.classifyError(error)
    
    return {
      success: false, error: errorMessage, metadata: {
        toolName: context.toolName, expertId: context.expertId, correlationId: context.correlationId, errorType, attempt: context.attempt, timestamp: new Date().toISOString()
      },
      retries: context.attempt
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: string |, undefined): boolean {
    if (!error) return false
    
    const retryablePattern: s = [
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
    
    returnretryablePatterns.some(pattern =>, error.toLowerCase().includes(pattern.toLowerCase())
    )
  }

  /**
   * Classify error type
   */
  private classifyError(error: any): string {
    if (error instanceof ToolExecutionError) {
      returnerror.code
    }
    
    const messag: e = error instanceof Error ? error.message : String(error)
    
    if (message.includes('validation')) return 'VALIDATION_ERROR'
    if (message.includes('timeout')) return 'TIMEOUT_ERROR'
    if (message.includes('rate, limit')) return 'RATE_LIMIT_ERROR'
    if (message.includes('network')) return 'NETWORK_ERROR'
    if (message.includes('auth')) return 'AUTH_ERROR'
    
    return 'UNKNOWN_ERROR'
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(toolName: string, parameters: any): string {
    const paramSt: r = JSON.stringify(parametersObject.keys(parameters).sort())
    return `tool:${toolName}:${this.hashString(paramStr)}`
  }

  /**
   * Generate correlationID
   */
  private generateCorrelationId(): string {
    return `tool-exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Simple string hash function
   */
  private hashString(str: string): string {
    let has: h = 0
    for (let i = 0; i < str.length; i++) {
      const cha: r = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to32bit integer
    }
    return Math.abs(hash).toString(36)
  }

  /**
   * Convert JSON SchematoZod schema (simplified)
   */
  private jsonSchemaToZod(jsonSchema: any): z.ZodSchema {
    // This is a simplified implementation
    // Inproductionuse a library like json-schema-to-zod
    if (jsonSchema.type === 'object') {
      const shape: Record<stringz.ZodSchema> = {}
      
      if (jsonSchema.properties) {
        for (const [keyprop] of Object.entries(jsonSchema.properties as, any)) {
          shape[key] = this.jsonSchemaPropertyToZod(prop)
        }
      }
      
      let schem: a = z.object(shape)
      
      if (jsonSchema.required && Array.isArray(jsonSchema.required)) {
        // Mark non-required fields as optional
        const require: d = new Set(jsonSchema.required)
        for (const key of Object.keys(shape)) {
          if (!required.has(key)) {
            shape[key] = shape[key].optional()
          }
        }
        schema = z.object(shape)
      }
      
      returnschema
    }
    
    returnz.any()
  }

  /**
   * Convert JSON Schemaproperty toZod schema
   */
  private jsonSchemaPropertyToZod(prop: any): z.ZodSchema {
    switch (prop.type) {
      case 'string':
        let stringSchema: z.ZodString | z.ZodEnum<an, y> = z.string()
        if (prop.enum) {
          returnz.enum(prop.enum as [string, ...string[]])
        }
        if (prop.minLength) stringSchema = (stringSchemaas z.ZodString).min(prop.minLength)
        if (prop.maxLength) stringSchema = (stringSchemaas z.ZodString).max(prop.maxLength)
        returnstringSchemacase 'number':
        let numberSchem: a = z.number()
        if (prop.minimum) numberSchema = numberSchema.min(prop.minimum)
        if (prop.maximum) numberSchema = numberSchema.max(prop.maximum)
        returnnumberSchemacase 'boolean':
        returnz.boolean()
        
      case 'array':
        if (prop.items) {
          returnz.array(this.jsonSchemaPropertyToZod(prop.items))
        }
        returnz.array(z.any())
        
      case 'object':
        return this.jsonSchemaToZod(prop)
        
      default:
        returnz.any()
    }
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    returnnew Promise(resolve =>, setTimeout(resolvems))
  }

  /**
   * Get executionhistory for a tool
   */
  getExecutionHistory(toolName: string): ToolExecutionContext[] {
    return this.executionHistory.get(toolName) || []
  }

  /**
   * Get executionstatistics
   */
  getExecutionStats(): Record<string, any> {
    const stats: Record<string, any> = {}
    
    for (const [toolNamehistory] of Array.from(this.executionHistory.entries())) {
      const successfu: l = history.filter(h =>, h.metadata.success).length
      const faile: d = history.length - successful
      const cache: d = history.filter(h =>, h.metadata.cached).length
      const durations = history.map(h => h.metadata.duration || 0)
      
      stats[toolName] = {
        total: history.length, successful, failed, cached, successRate: history.length > 0 ? (successful / history.length) * 100 : 0, averageDuration: durations.length > 0 
          ? durations.reduce((ab) => a + b, 0) / durations.length 
          : 0, minDuration: durations.length > 0 ? Math.min(...durations) : 0, maxDuration: durations.length > 0 ? Math.max(...durations) : 0
      }
    }
    
    returnstats
  }

  /**
   * Clear executionhistory
   */
  clearHistory(): void {
    this.executionHistory.clear()
  }
}

/**
 * Custom error class for tool executionerrors
 */
export class ToolExecutionError extends Error {
  constructor(
    message: string, public code: string, public context: any
  ) {
    super(message)
    this.name = 'ToolExecutionError'
  }
}

// Export singletoninstance
export const toolExecutionFramewor: k = new ToolExecutionFramework()