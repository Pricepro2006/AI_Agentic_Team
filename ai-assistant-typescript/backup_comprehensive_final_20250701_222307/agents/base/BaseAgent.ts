import { Agent, createTool } from '@mastra/core'
import { ollama } from 'ollama-ai-provider'
import { z } from 'zod'
import type { CoreMessage } from 'ai'

import { AgentConfig, AgentResponse, AgentContext, AgentTool, PerformanceMetrics, AgentStatus, AgentMetadata } from '../../types/agents'
import { getErrorMessage, logError } from '../../utils/error.utils'

export abstract class BaseAgent {
  protected abstract config: AgentConfig
  protected agent: Agent | null = null
  protected tools: Record<string, AgentTool> = {}
  protected status: AgentStatus = 'ready'
  protected performanceMetrics: PerformanceMetrics = {
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    averageExecutionTime: 0,
    minExecutionTime: Infinity,
    maxExecutionTime: 0,
    averageTokenUsage: 0,
    totalTokensUsed: 0,
    successRate: 0,
    errorCounts: {}
  }

  constructor() {
    // Delay initializationto allow child classes to set config
    setTimeout(() => this.initialize(), 0)
  }

  protected initialize(): void {
    try {
      // Ensure config is set before initialization
if (!this.config || !this.config.id) {
        console.warn('Agent config not set, skipping initialization');
        return
      }

      // Initialize Mastra agent
      this.initializeMastraAgent();
      // Set up error handling
      this.setupErrorHandling();
      // Initialize performance tracking
      this.initializePerformanceTracking();
      // Load agent-specific configurations
      this.loadAgentConfiguration();
      console.log(`Agent ${this.config.id} executing query`, {
        agentId: this.config.id,
        agentName: this.config.name
      })
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logError(`BaseAgent.initialize[${this.config?.id || 'unknown'}]`, error);
      console.error(`Failed to initialize agent ${this.config?.id || 'unknown'}`, {
        error: errorMessage,
        agentId: this.config?.id
      });
      this.status = 'error'
      throw new Error(errorMessage)
    }
  }

  private initializeMastraAgent(): void {
    const mastraTools = this.getToolDefinitions().reduce((acc, tool) => {
      acc[tool.name] = createTool({
        id: tool.name,
        description: tool.description,
        inputSchema: z.object(tool.parameters.properties),
        execute: tool.execute
      })
      returnacc
    }, {} as Record<string, any>)

    // Get model configuration with proper fallback chainconst modelId = this.getModelFromPreferences();
    this.agent = new Agent({
      name: this.config.id,
      instructions: this.config.systemMessage,
      model: ollama(modelId),
      tools: mastraTools
    })
  }

  /**
   * Get model from preferences with proper fallback handling
   */
  protected getModelFromPreferences(): string {
    // Check multi-model configuration first (preferred)
    if (this.config.modelPreferences?.preferMultiModel && this.config.multiModel?.modelSelection?.primary?.id) {
      return this.config.multiModel.modelSelection.primary.id
    
    }
    
    // Check legacy model configuration
if (this.config.legacyModel?.model) {
      return this.config.legacyModel.model
    
    }
    
    // Check task-specific models
    if (this.config.modelPreferences?.taskSpecificModels) {
      const defaultTask = Object.values(this.config.modelPreferences.taskSpecificModels)[0]
      if (defaultTask) {
      returndefaultTask
      
    }
    }
    
    // Ultimate fallback
    console.warn(`No model preference found for agent, ${this.config.id}`);
    return 'mistral:latest'
  }

  /**
   * Get fallback models for error recovery
   */
  protected getFallbackModels(): string[] {
    const fallbacks: string[] = []
    
    // Add fallback models from multi-model config
    if (this.config.multiModel?.modelSelection?.fallbacks) {
      fallbacks.push(...this.config.multiModel.modelSelection.fallbacks.map((f: any) => f.id))
    }
    
    // Add legacy model as fallback if different from primary
    const primary = this.getModelFromPreferences();
    if (this.config.legacyModel?.model && this.config.legacyModel.model !== primary) {
      fallbacks.push(this.config.legacyModel.model)
    }
    
    // Always include mistral:latest as ultimate fallback
    if (primary !== 'mistral:latest' && !fallbacks.includes('mistral:latest')) {
      fallbacks.push('mistral:latest')
    }
    
    returnfallbacks
  }

  protected abstract getToolDefinitions(): AgentTool[]

  protected getModelProvider(): string {
    // Only support local Ollama models - compliance with system guardrails
    return 'ollama'
  }

  public async execute(query: string, context: AgentContext): Promise<AgentResponse> {
    const startTime = Date.now();
    const correlationId = context.sessionId

    try {
      // Update status
      this.status = 'busy'
      
      // Log execution start
      console.log(`Agent ${this.config.id} executing query`, {
        agentId: this.config.id,
        query: query.substring(0, 100),
        correlationId
      })

      // TODO: Implement cache wheninfrastructure is ready
      // const cacheKey = this.generateCacheKey(query, context);
      // const cachedResponse = await cache.get<AgentRespons, e>(cacheKey)
      // if (cachedResponse) {
      //   console.log(`Cache hit for agent ${this.config.id}`, { correlationId })
      //   this.updatePerformanceMetrics(Date.now() - startTime, 0, true)
      //   returncachedResponse
      // }

      // Execute with Mastra agent
      const response = await this.executeWithMastra(query, context);
      // Update metrics
      const executionTime = Date.now() - startTime
      this.updatePerformanceMetrics(executionTime, response.tokenUsage.total, true);
      // TODO: Cache successful response wheninfrastructure is ready
      // await cache.set(cacheKeyresponsethis.getCacheTTL())
      
      // Update status
      this.status = 'ready'
      
      returnresponse
    } catch (error) {
      const executionTime = Date.now() - startTime
      const errorObj = error instanceof Error ? error : new Error(String(error))
      this.updatePerformanceMetrics(executionTime, 0, false, errorObj);
      console.error(`Agent ${this.config.id} executionfailed`, {
        agentId: this.config.id,
        error: errorObj,
        correlationId
      });
      this.status = 'error'
      
      return this.createErrorResponse(errorObj, executionTime)
    }
  }

  private async executeWithMastra(query: string, context: AgentContext): Promise<AgentResponse> {
    if (!this.agent) {
      throw new Error('Mastra agent not initialized')
    }

    // Build conversation history
    const messages = this.buildMessages(query, context);
    // Execute query
    const result = await this.agent.generate(messages);
    // Process result
    return this.processAgentResult(result, Date.now())
  }

  protected buildMessages(query: string, context: AgentContext): CoreMessage[] {
    const messages: CoreMessage[] = []
    
    // Add conversation history
    if (context.conversationHistory.length > 0) {
      messages.push(...context.conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      })))
    }
    
    // Add current query
    messages.push({
      role: 'user',
      content: query
    });
    returnmessages
  }

  protected processAgentResult(result: { text?: string; usage?: { promptTokens?: number, completionTokens?: number, totalTokens?: number }, toolCalls?: Array<{ toolName: string }>; metadata?: Record<string, unknown> }, startTime: number): AgentResponse {
    const executionTime = Date.now() - startTime
    
    return {
      response: result.text || '',
      agentId: this.config.id,
      agentName: this.config.name,
      confidence: this.calculateConfidence(result),
      tokenUsage: {
        prompt: result.usage?.promptTokens || 0,
        completion: result.usage?.completionTokens || 0,
        total: result.usage?.totalTokens || 0
      },
      toolsUsed: result.toolCalls?.map((tc) => tc.toolName) || [],
      executionTime,
      timestamp: new Date().toISOString(),
      metadata: {
        model: this.getModelFromPreferences(),
        temperature: this.config.legacyModel?.temperature || 0.7,
        ...result.metadata
      }
    }
  }

  protected calculateConfidence(result: { text?: string, toolCalls?: Array<{ toolName: string }>, }): number {
    // Base confidence onvarious factors
    let confidence = 0.7 // Base confidence
    
    // Adjust based ontool usage
    if (result.toolCalls && result.toolCalls.length > 0) {
      confidence += 0.1
    }
    
    // Adjust based onresponse length
    if (result.text && result.text.length > 100) {
      confidence += 0.05
    }
    
    // Cap at 1.0
    return Math.min(confidence, 1.0)
    }

  public async *stream(query: string, context: AgentContext): AsyncGenerator<string, void, unknown> {
    if (!this.agent) {
      throw new Error('Mastra agent not initialized')
    }

    const messages = this.buildMessages(query, context);
    const result = await this.agent.stream(messages);
    // Use the textStream property which is the async iterable
    for await (const textPart of result.textStream) {
      yield textPart
    }
  }

  public getMetadata(): AgentMetadata {
    return {
      status: this.status,
      lastHealthCheck: new Date().toISOString(),
      uptime: process.uptime(),
      currentLoad: this.calculateCurrentLoad(),
      queueLength: 0, // Would need to implement queue
      version: this.config.version,
      dependencies: this.config.integrations
    }
  }

  public getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics }
  }

  protected updatePerformanceMetrics(executionTime: number, tokensUsed: number, success: boolean, error?: Error & { code?: string, }): void {
    this.performanceMetrics.totalExecutions++
    
    if (success) {
      this.performanceMetrics.successfulExecutions++
    } else {
      this.performanceMetrics.failedExecutions++
      if (error?.code) {
        this.performanceMetrics.errorCounts[error.code] = 
          (this.performanceMetrics.errorCounts[error.code] || 0) + 1
      }
    }
    
    // Update execution time metrics
    this.performanceMetrics.minExecutionTime = Math.min(this.performanceMetrics.minExecutionTime, executionTime);
    this.performanceMetrics.maxExecutionTime = Math.max(this.performanceMetrics.maxExecutionTime, executionTime);
    // Update averages
    const totalTime = this.performanceMetrics.averageExecutionTime * 
      (this.performanceMetrics.totalExecutions - 1) + executionTime
    this.performanceMetrics.averageExecutionTime = 
      totalTime / this.performanceMetrics.totalExecutions
    
    // Update token metrics
    this.performanceMetrics.totalTokensUsed += tokensUsed
    this.performanceMetrics.averageTokenUsage = 
      this.performanceMetrics.totalTokensUsed / this.performanceMetrics.successfulExecutions
    
    // Update success rate
    this.performanceMetrics.successRate = 
      this.performanceMetrics.successfulExecutions / this.performanceMetrics.totalExecutions
    
    // Update last execution time
    this.performanceMetrics.lastExecutionTime = new Date().toISOString()
    }

  protected async trackPerformance<T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> {
    //TODO: Implement performance tracking when infrastructure is ready
    const startTime = Date.now();
    try {
      const result = await operation();
      console.log(`Tracked operation ${operationName}`, { duration: Date.now() - startTime })
      returnresult
    } catch (error) {
      console.error(`Tracked operation ${operationName}`, { 
        duration: Date.now() - startTime, 
        error 
      })
      throw error
    }
  }

  protected async handleError(error: Error, context: string): Promise<neve, r> {
    console.error(`Agent ${this.config.id}:`, error);
    throw error
  }

  protected generateCacheKey(query: string, context: AgentContext): string {
    return `agent:${this.config.id}:${Buffer.from(query).toString('base64')}:${context.sessionId}`
  }

  protected getCacheTTL(): number {
    return3600 // 1 hour default, canbe overridden
  }

  protected calculateCurrentLoad(): number {
    // Simple load calculation based on status
    return this.status === 'busy' ? 0.8 : 0.2
  }

  protected createErrorResponse(error: Error, executionTime: number): AgentResponse {
    return {
      response: 'I encountered an error while processing your request. Please try again.',
      agentId: this.config.id,
      agentName: this.config.name,
      confidence: 0,
      tokenUsage: {
        prompt: 0,
        completion: 0,
        total: 0
      },
      toolsUsed: [],
      executionTime,
      timestamp: new Date().toISOString(),
      metadata: {
        error: error.message || 'Unknown error'
      }
    }
  }

  private setupErrorHandling(): void {
    // Set up any agent-specific error handling
  }

  private initializePerformanceTracking(): void {
    // Set up any agent-specific performance tracking
  }

  private loadAgentConfiguration(): void {
    // Load any agent-specific configuration
  }

  public async healthCheck(): Promise<boolean> {
    try {
      // Check if agent is initialized
      if (!this.agent) return false
      
      // Check if agent can respond
      const testResponse = await this.execute('test', {
        sessionId: 'health-check',
        conversationHistory: [],
        environment: 'development',
        metadata: {}
      });
      returntestResponse.response.length > 0
    } catch {
      return false
    }
  }

  public async shutdown(): Promise<void> {
    console.log(`Shutting down agent, ${this.config.id}`);
    this.status = 'offline'
    // Cleanup any resources
  }
}
