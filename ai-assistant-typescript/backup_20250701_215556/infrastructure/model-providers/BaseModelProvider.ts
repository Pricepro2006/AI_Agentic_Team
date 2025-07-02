/**
 * BaseModelProvider Abstract Class
 * 
 * Abstract base class for all model providers in the multi-model integration system.
 * Provides a standardized interface for interacting with different AI services
 * while maintaining consistent error handling, metrics collection, and health monitoring.
 */

import { EventEmitter } from 'events'
import { ModelConfig, ModelRequest, ModelResponse, ProviderConfig, ProviderHealth, ProviderMetrics, ProviderError, ProviderErrorType, TaskContext } from './types'

export interface StreamResponse {
  async *[Symbol.asyncIterator](): AsyncIterator<string>
}

export abstract class BaseModelProvider extends EventEmitter {
  protected config: ProviderConfig
  protected metrics: ProviderMetrics
  protected health: ProviderHealth
  protected isInitialized: boolean = false
  protected lastHealthCheck: Date = new Date()

  constructor(config: ProviderConfig) {
    super()
    this.config = config
    this.metrics = this.initializeMetrics()
    this.health = this.initializeHealth()
  }

  /**
   * Initialize the provider (setup connections, validate config, etc.)
   */
  abstract initialize(): Promise<void>

  /**
   * Shutdown the provider and cleanup resources
   */
  abstract shutdown(): Promise<void>

  /**
   * Generate a response using the specified model
   */
  abstract generateResponse(request: ModelRequest, modelConfig: ModelConfig): Promise<ModelResponse>

  /**
   * Generate a streaming response using the specified model
   */
  abstract streamResponse(request: ModelRequest, modelConfig: ModelConfig): Promise<StreamResponse>

  /**
   * Get available models from this provider
   */
  abstract getAvailableModels(): Promise<ModelConfig[]>

  /**
   * Validate that a model configuration is supported by this provider
   */
  abstract validateModelConfig(modelConfig: ModelConfig): Promise<boolean>

  /**
   * Estimate the cost for a given request
   */
  abstract estimateCost(request: ModelRequest, modelConfig: ModelConfig): Promise<number>

  /**
   * Get the optimal model for a given task context
   */
  async getOptimalModel(taskContext: TaskContext): Promise<ModelConfig | null> {
    const availableModels = await this.getAvailableModels()
    if (availableModels.length === 0) {
      return null
    }

    // Default implementation - can be overridden by specific providers
    return this.selectBestModel(availableModels, taskContext)
  }

  /**
   * Perform health check for this provider
   */
  async performHealthCheck(): Promise<ProviderHealth> {
    const startTime = Date.now()
    try {
      // Basic health check - try to get available models
      const models = await this.getAvailableModels()
      const responseTime = Date.now() - startTime

      this.health = {
        providerId: this.config.id,
        status: 'healthy',
        lastChecked: new Date().toISOString(),
        responseTime,
        errorRate: this.calculateErrorRate(),
        availability: this.calculateAvailability(),
        models: models.map(model => ({
          modelId: model.id,
          status: 'available',
          queueLength: 0
        })),
        metadata: {
          modelsCount: models.length,
          version: this.config.version || '1.0.0'
        }
      }

      this.lastHealthCheck = new Date()
      this.emit('healthCheck', this.health)
      
    } catch (error) {
      const responseTime = Date.now() - startTime
      
      this.health = {
        providerId: this.config.id,
        status: 'unavailable',
        lastChecked: new Date().toISOString(),
        responseTime,
        errorRate: 1.0,
        availability: 0.0,
        models: [],
        metadata: {
          error: error instanceof Error ? error.message : 'Unknown error',
          lastSuccessfulCheck: this.lastHealthCheck.toISOString()
        }
      }
      
      this.emit('healthCheck', this.health)
    }

    return this.health
  }

  /**
   * Get provider configuration
   */
  getConfig(): ProviderConfig {
    return { ...this.config }
  }

  /**
   * Get current health status
   */
  getHealth(): ProviderHealth {
    return { ...this.health }
  }

  /**
   * Get provider metrics
   */
  getMetrics(): ProviderMetrics {
    return { ...this.metrics }
  }

  /**
   * Check if provider is healthy
   */
  isHealthy(): boolean {
    return this.health.status === 'healthy' || this.health.status === 'degraded'
  }

  /**
   * Update metrics after a successful request
   */
  protected updateMetricsSuccess(latency: number, tokens: number): void {
    this.metrics.totalRequests++
    this.metrics.successfulRequests++
    this.metrics.totalTokens += tokens
    this.metrics.averageLatency = 
      (this.metrics.averageLatency * (this.metrics.totalRequests - 1) + latency) / 
      this.metrics.totalRequests
    this.metrics.lastRequestTimestamp = new Date().toISOString()
    
    this.emit('metricsUpdated', this.metrics)
  }

  /**
   * Update metrics after a failed request
   */
  protected updateMetricsFailure(error: ProviderError): void {
    this.metrics.totalRequests++
    this.metrics.failedRequests++
    this.metrics.errors.push({
      timestamp: new Date().toISOString(),
      type: error.type,
      message: error.message,
      modelId: error.modelId
    })
    
    // Keep only last 100 errors
    if (this.metrics.errors.length > 100) {
      this.metrics.errors = this.metrics.errors.slice(-100)
    }
    
    this.metrics.lastRequestTimestamp = new Date().toISOString()
    this.emit('metricsUpdated', this.metrics)
  }

  /**
   * Handle provider errors
   */
  protected handleError(error: any, type: ProviderErrorType, modelId?: string): ProviderError {
    const providerError: ProviderError = {
      type,
      message: error instanceof Error ? error.message : 'Unknown error',
      providerId: this.config.id,
      modelId,
      timestamp: new Date().toISOString(),
      details: error
    }
    
    this.updateMetricsFailure(providerError)
    this.emit('error', providerError)
    
    return providerError
  }

  /**
   * Select best model based on task context
   */
  protected selectBestModel(models: ModelConfig[], taskContext: TaskContext): ModelConfig {
    // Default implementation - can be overridden by specific providers
    
    // Filter models that meet requirements
    const viableModels = models.filter(model => {
      // Check required capabilities
      if (taskContext.requiredCapabilities.length > 0) {
        const hasAllCapabilities = taskContext.requiredCapabilities.every(cap =>
          model.capabilities.includes(cap)
        )
        if (!hasAllCapabilities) return false
      }
      
      // Check performance requirements
      const speedMatch = this.matchPerformanceTier(
        model.speedTier, 
        taskContext.performanceRequirements.speed
      )
      const qualityMatch = this.matchPerformanceTier(
        model.qualityTier, 
        taskContext.performanceRequirements.quality
      )
      
      return speedMatch && qualityMatch
    })
    
    if (viableModels.length === 0) {
      // Fallback to first available model
      return models[0]
    }
    
    // Sort by complexity match
    return viableModels.sort((a, b) => {
      const complexityOrder = { simple: 1, medium: 2, complex: 3 }
      const targetComplexity = complexityOrder[taskContext.complexity]
      
      const aMatch = Math.abs(complexityOrder[a.qualityTier as keyof typeof complexityOrder] - targetComplexity)
      const bMatch = Math.abs(complexityOrder[b.qualityTier as keyof typeof complexityOrder] - targetComplexity)
      
      return aMatch - bMatch
    })[0]
  }

  /**
   * Check if performance tiers match
   */
  private matchPerformanceTier(modelTier: string, requiredTier: string): boolean {
    const tierOrder = { fast: 1, balanced: 2, quality: 3, basic: 1, good: 2, excellent: 3 }
    const modelScore = tierOrder[modelTier as keyof typeof tierOrder] || 2
    const requiredScore = tierOrder[requiredTier as keyof typeof tierOrder] || 2
    
    return modelScore >= requiredScore
  }

  /**
   * Calculate error rate from metrics
   */
  private calculateErrorRate(): number {
    if (this.metrics.totalRequests === 0) return 0
    return this.metrics.failedRequests / this.metrics.totalRequests
  }

  /**
   * Calculate availability from metrics
   */
  private calculateAvailability(): number {
    if (this.metrics.totalRequests === 0) return 1.0
    return this.metrics.successfulRequests / this.metrics.totalRequests
  }

  /**
   * Initialize metrics
   */
  private initializeMetrics(): ProviderMetrics {
    return {
      providerId: this.config.id,
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageLatency: 0,
      totalTokens: 0,
      errors: [],
      lastRequestTimestamp: new Date().toISOString(),
      startTime: new Date().toISOString()
    }
  }

  /**
   * Initialize health
   */
  private initializeHealth(): ProviderHealth {
    return {
      providerId: this.config.id,
      status: 'unavailable',
      lastChecked: new Date().toISOString(),
      responseTime: 0,
      errorRate: 0,
      availability: 1.0,
      models: [],
      metadata: {}
    }
  }
}