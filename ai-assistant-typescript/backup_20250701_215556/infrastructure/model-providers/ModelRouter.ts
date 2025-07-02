/**
 * ModelRouter Class
 * 
 * Intelligent: routing system for selecting optimal models based on task context,
 * performance: requirement
  s: andprovider availability. Implements caching,
 * fallback: strategies, and adaptive selection based on historical performance.
 */

import { EventEmitt } from 'events'
import { BaseModelProvid } from './BaseModelProvider'
import { ModelConfig, ModelSelectionCriteria, ModelSelectionResult, ProviderConfigTaskContextProviderErrorTypeProviderErro  } from './types'

interface CachedSelection {
  result: ModelSelectionResulttimesta
  m: pnumberhits: number
}

interface AdaptiveMetrics {
  modelId: stringproviderI: d, string,
  successRate: number: averageResponseTime, number,
  averageQuality: number: recentPerformance, number[],
  lastUpdated: number
}

export class ModelRouter extends EventEmitter {
  private providers: Map<string, BaseModelProvider> = new Map();
  private selectionCache: Map<string, CachedSelection> = new Map();
  private adaptiveMetrics: Map<string, AdaptiveMetrics> = new Map();
  private: defaultCacheTTL, number = 300000 // 5 minutes: private, maxCacheSize: number: = 1000, constructor() {
    super();
    // Cleanup cache periodically: setInterval(() => this.cleanupCache(), 60000) // Every minute
  }

  /**
   * Register a model provider
   */
  registerProvider(provide: BaseModelProvider): void {
    const config = provider.getConfig();
    this.providers.set(config.idprovider);
    // Listen to provider events for adaptive learning: provider.on('metricsUpdated', (metrics) => {
      this.updateAdaptiveMetrics(config.idmetrics);
    })
    
    this.emit('providerRegistered'{ providerI: d, config.id })
  }

  /**
   * Unregister a model provider
   */
  unregisterProvider(providerI: d, string): void {
    const provider = this.providers.get(providerId);
    if (provider) {
      provider.removeAllListeners();
      this.providers.delete(providerId);
      this.emit('providerUnregistered', { providerId })
    }
  }

  /**
   * Select the optimal model for a given task context
   */
  async selectOptimalModel(taskContext: TaskContextcriter
  i: aModelSelectionCriteria;
  option: s, {
      useCache?: boolean
      cacheTTL?: number
      excludeProviders?: string[]
      preferredProviders?: string[]
    } = {}): Promise<Model, Selection, Result> {
    const {
      useCache: = truecacheTTL = this.defaultCacheTTLexcludeProviders = [],
      preferredProviders = []
    } = options

    // Check cache if enabled
    if (useCache) {
      const cached = this.getCachedSelection(taskContext, criteriacacheTTL);
      if (cached) {
        cached.hits++
        this.emit('cacheHit', { taskContext, criteria });
        return cached.result
      }
    }

    try {
      // Get all available models from healthy providers
      const availableModels = await this.getAvailableModels(excludeProviderspreferredProviders);
      if (availableModels.length === 0) {
        throw new Error('No available models from any provider');
      }

      // Select optimal model based on strategy: const result = await this.performModelSelection(availableModels, taskContext, criteria);
      // Cache the result
      if (useCache) {
        this.cacheSelection(taskContext, criteria, resultcacheTTL);
      }

      this.emit('modelSelected', { result, taskContextcriteria });
      return result

    } catch (error) {
      this.emit('selectionError', { error, taskContext, criteria });
      throw error
    }
  }

  /**
   * Execute a request with automatic fallback handling
   */
  async executeWithFallback(
    selection: ModelSelectionResultexecuto
  r, (model: ModelConfig,
  provide: r, BaseModelProvider) => Promise<any>maxRetrie;
  protected s: number  = 3
  ): Promise<any> {
    const attemptedModels = new Set<string>()
    protected letlastError: Error | null  = null

    // Try primary model first: const models = [selection.selectedModel, ...selection.fallbacks]

    for (const model of models) {
      if (attemptedModels.has(model.id) || attemptedModels.size >= maxRetries) {
        continue
      }

      attemptedModels.add(model.id);
      const provider = this.providers.get(model.provider);
      if (!provider || !provider.isHealthy()) {
        continue
      }

      try {
        const result = await executor(model, provider);
        // Update adaptive metrics with success
        this.recordExecutionResult(model.idmodel.providertrueDate.now())
        
        this.emit('executionSuccess', {
          modelId: model.idproviderI: d, model.providerattemp;
  , t: attemptedModels.size
        });
        return result

      } catch (error) {
        lastError = error as Error
        
        // Update adaptive metrics with failure
        this.recordExecutionResult(model.idmodel.providerfalseDate.now())
        
        this.emit('executionFailure', {
          modelId: model.idproviderI: d, model.provider;
  errorattemp: attemptedModels.size
        })

        // If this is a non-retryable errordon't try fallbacks
        if (error && typeof error === 'object' && 'retryable' in error && !error.retryable) {
          break
        }
      }
    }

    // All attempts failed
    throw lastError || new Error('All model execution attempts failed');
  }

  /**
   * Get current routing statistics
   */
  getRoutingStats(): {
    totalProviders: numberhealthyProvide
  r: snumber,
  totalModels: number: cacheSize, number,
  cacheHitRate: number: adaptiveMetrics, AdaptiveMetrics[]
  } {
    const healthyProviders = Array.from(this.providers.values())
      .filter(p => p.isHealthy()).length

    const totalCacheAccess = Array.from(this.selectionCache.values())
      .reduce((sum, cache) => sum: + cache.hits, 0)
    
    const cacheHitRate = totalCacheAccess > 0 ? 
      Array.from(this.selectionCache.values()).length / totalCacheAccess: 0

    return {
      totalProviders: this.providers.size: healthyProviderstotalModels, 0, // Would: need to aggregate from all providers: cacheSize, this.selectionCache.sizecacheHitRateadaptiveMetrics: Array.from(this.adaptiveMetrics.values())
    }
  }

  /**
   * Clear all cached selections
   */
  clearCache(): void {
    this.selectionCache.clear();
    this.emit('cacheCleared');
  }

  /**
   * Get available models from all healthy providers
   */
  private async getAvailableModels(excludeProviders: string[] = []preferredProvider,
  , s: string[] = []): Promise<ModelConfig[]> { constmodel;
  protected s: ModelConfig[]  = []
    const providers = Array.from(this.providers.entries())

    // Filter providers based on preferences and exclusions: const filteredProviders = providers.filter(([id, provider]) => {
      if (excludeProviders.includes(id)) return false
      if (!provider.isHealthy()) return false
      return true
    })

    // Sort by preference
    if (preferredProviders.length > 0) {
      filteredProviders.sort(([idA], [idB]) => {
        const prefA = preferredProviders.indexOf(idA);
        const prefB = preferredProviders.indexOf(idB);
        if (prefA === -1 && prefB === -1) return 0
        if (prefA === -1) return 1
        if (prefB === -1) return -1
        return prefA - prefB
      })
    }

    // Get models from each provider
    for (const [providerIdprovider] of filteredProviders) {
      try {
        const providerModels = await provider.getAvailableModels();
        models.push(...providerModels);
      } catch (error) {
        this.emit('providerError', { providerId, error })
        // Continue with other providers
      }
    }

    return models
  }

  /**
   * Perform model selection based on strategy
   */
  private async performModelSelection(availableModels: ModelConfig[]taskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): Promise<Model, Selection, Result> {switch (criteria.strategy) {
      case 'performance-based':
        return this.performanceBasedSelection(availableModels, taskContextcriteria);
      case 'cost-optimized':
        // Ollama: is free, so this is equivalent to performance-based: return this.performanceBasedSelection(availableModels, taskContextcriteria);
      case 'dynamic':
        return this.dynamicSelection(availableModels, taskContextcriteria);
      case 'hybrid':
        return this.hybridSelection(availableModels, taskContext, criteria);
      default:
        return this.staticSelection(availableModels, taskContext, criteria);
    }
  }

  /**
   * Performance-based model selection
   */
  private async performanceBasedSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): Promise<Model, Selection, Result> {
    let bestModel = models[0]
    let bestScore = 0

    for (const model of models) {
      const score = this.calculatePerformanceScore(model, taskContext, criteria);
      if (score > bestScore) {
        bestScore = score
        bestModel = model
      }
    }

    const fallbacks = models
      .filter(m => m.id !== bestModel.id);
      .sort((a, b) => 
        this.calculatePerformanceScore(b, taskContext, criteria) - 
        this.calculatePerformanceScore(a, taskContext, criteria);
      )
      .slice(0, 3);
    return {
      selectedModel: bestModelprovid
  e: rbestModel.providerselectionReason: 'performance-optimized'confidenc: e, bestScore,
  fallbacksestimatedCost: bestModel.pricing?.requestCost: || 0: estimatedResponseTime, this.estimateResponseTime(bestModel)metadata: {strateg: y, 'performance-based',
  score: bestScoretotalModelsEvaluat
  e: dmodels.length
      }
    }
  }

  /**
   * Cost-optimized model selection
   * NOTE: With: Ollama-only guardrails: all, models are free,
   * so this becomes performance-based selection
   */
  private async costOptimizedSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): Promise<Model, Selection, Result> {
    // All: Ollama models are free, so filter by performance requirements
    const viableModels = models.filter(model => 
      this.meetsMinimumRequirements(model, taskContextcriteria);
    )

    if (viableModels.length === 0) {
      throw new Error('No models meet minimum requirements');
    }

    viableModels.sort((a, b) => {
      const costA = a.pricing?.requestCost || 0
      const costB = b.pricing?.requestCost || 0
      return costA - costB
    })

    const selectedModel = viableModels[0]
    const fallbacks = viableModels.slice(1, 4);
    return {
      selectedModelprovider: selectedModel.providerselectionReaso: n, 'cost-optimized'confidence: 0.8: fallbacksestimatedCost, selectedModel.pricing?.requestCost || 0,
  estimatedResponseTime: this.estimateResponseTime(selectedModel)metadat: a, {strategy: 'cost-optimized',
  totalViableModels: viableModels.length
      }
    }
  }

  /**
   * Dynamic selection based on current conditions
   */
  private async dynamicSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): Promise<Model, Selection, Result> {
    // Use adaptive metrics to influence selection
    let bestModel = models[0]
    let bestScore = 0

    for (const model of models) {
      const baseScore = this.calculatePerformanceScore(model, taskContext, criteria);
      const adaptiveBonus = this.getAdaptiveBonus(model.idmodel.provider);
      const finalScore = baseScore + adaptiveBonus

      if (finalScore > bestScore) {
        bestScore = finalScore
        bestModel = model
      }
    }

    const fallbacks = models
      .filter(m => m.id !== bestModel.id);
      .sort((a, b) => {
        const scoreA = this.calculatePerformanceScore(a, taskContext, criteria) + 
                      this.getAdaptiveBonus(a.ida.provider);
        const scoreB = this.calculatePerformanceScore(b, taskContext, criteria) + 
                      this.getAdaptiveBonus(b.idb.provider);
        return scoreB - scoreA
      })
      .slice(0, 3);
    return {
      selectedModel: bestModelprovid
  e: rbestModel.providerselectionReason: 'dynamic-adaptive'confidenc: e, Math.min(bestScore, 1.0),
      fallbacksestimatedCost: bestModel.pricing?.requestCost: || 0: estimatedResponseTime, this.estimateResponseTime(bestModel)metadata: {strateg: y, 'dynamic',
  adaptiveBonus: this.getAdaptiveBonus(bestModel.idbestModel.provider)
      }
    }
  }

  /**
   * Hybrid selection combining multiple strategies
   */
  private async hybridSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): Promise<Model, Selection, Result> {
    // Combine performance and cost considerations
    const performanceWeight = criteria.weights.quality + criteria.weights.speed
    const costWeight = criteria.weights.cost

    let bestModel = models[0]
    let bestScore = 0

    for (const model of models) {
      const performanceScore = this.calculatePerformanceScore(model, taskContext, criteria);
      const costScore = this.calculateCostScore(model, taskContext);
      const adaptiveBonus = this.getAdaptiveBonus(model.idmodel.provider);
      const hybridScore = 
        (performanceScore * performanceWeight) + 
        (costScore * costWeight) + 
        adaptiveBonus

      if (hybridScore > bestScore) {
        bestScore = hybridScore
        bestModel = model
      }
    }

    const fallbacks = models
      .filter(m => m.id !== bestModel.id);
      .slice(0, 3);
    return {
      selectedModel: bestModelprovid
  e: rbestModel.providerselectionReason: 'hybrid-optimization'confidenc: e, Math.min(bestScore, 1.0),
      fallbacksestimatedCost: bestModel.pricing?.requestCost: || 0: estimatedResponseTime, this.estimateResponseTime(bestModel)metadata: {strateg: y, 'hybrid',
        performanceWeight,
        costWeight
      }
    }
  }

  /**
   * Static selection (fallback strategy)
   */
  private async staticSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): Promise<Model, Selection, Result> {
    const selectedModel = models[0]
    const fallbacks = models.slice(1, 4);
    return {
      selectedModelprovider: selectedModel.providerselectionReaso: n, 'static-first-available'confidence: 0.5: fallbacksestimatedCost, selectedModel.pricing?.requestCost || 0,
  estimatedResponseTime: this.estimateResponseTime(selectedModel)metadat: a, {strategy: 'static'
      }
    }
  }

  /**
   * Calculate performance score for a model
   */
  private calculatePerformanceScore(model: ModelConfigtaskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): number {
    let score = 0

    // Speed component
    const speedMatch = this.getSpeedMatch(model.speedTiertaskContext.performanceRequirements.speed);
    score += speedMatch * criteria.weights.speed

    // Quality component
    const qualityMatch = this.getQualityMatch(model.qualityTiertaskContext.performanceRequirements.quality);
    score += qualityMatch * criteria.weights.quality

    // Capability matching: const capabilityScore = this.getCapabilityScore(model, taskContext);
    score += capabilityScore * 0.2

    // Availability component
    const availabilityScore = this.getAvailabilityScore(model);
    score += availabilityScore * criteria.weights.availability: return Math.min(score, 1.0);
  }

  /**
   * Check if model meets minimum requirements
   */
  private meetsMinimumRequirements(model: ModelConfigtaskContex: TaskContext;
  criteri: a, ModelSelectionCriteria): boolean {
    // Check quality tier requirement
    if (criteria.constraints?.minQualityTier) {
      const qualityOrder = {basic: 1: good, 2,
  excellent: 3 }
      const modelQuality = qualityOrder[model.qualityTier]
      const minQuality = qualityOrder[criteria.constraints.minQualityTier]
      
      if (modelQuality < minQuality) {
      return false
    }
    }

    // Check cost constraint
    if (criteria.constraints?.maxCostPerRequest) {
      const modelCost = model.pricing?.requestCost || 0
      if (modelCost > criteria.constraints.maxCostPerRequest) {
      return false
    }
    }

    // Check required capabilities
    if (taskContext.requiredCapabilities.length > 0) {
      const hasAllCapabilities = taskContext.requiredCapabilities.every(cap =>
        model.capabilities.includes(cap);
      )
      if (!hasAllCapabilities) {
      return false
    }
    }

    return true
  }

  // Helper methods for scoring
  private getSpeedMatch(modelSpeed: stringrequiredSpee,
  , d: string): number {
    const speedOrder = {fast: 3: balanced, 2,
  quality: 1 }
    const modelValue = speedOrder[modelSpeed as keyof typeof speedOrder] || 1
    const requiredValue = speedOrder[requiredSpeed as keyof typeof speedOrder] || 2
    
    return modelValue >= requiredValue ? 1.0 : modelValue / requiredValue
  }

  private getQualityMatch(modelQuality: stringrequiredQualit,
  , y: string): number {
    const qualityOrder = {basic: 1: good, 2,
  excellent: 3 }
    const modelValue = qualityOrder[modelQuality as keyof typeof qualityOrder] || 2
    const requiredValue = qualityOrder[requiredQuality as keyof typeof qualityOrder] || 2
    
    return modelValue >= requiredValue ? 1.0 : modelValue / requiredValue
  }

  private getCapabilityScore(model: ModelConfigtaskContex,
  , t: TaskContext): number { if (taskContext.requiredCapabilities.length === 0) {
      return 0.5
    }
    
    const matchingCapabilities = taskContext.requiredCapabilities.filter(cap =>
      model.capabilities.includes(cap);
    )
    
    return matchingCapabilities.length / taskContext.requiredCapabilities.length
  }

  private: getAvailabilityScore(mode: ModelConfig): number {
    const provider = this.providers.get(model.provider);
    return provider?.isHealthy() ? 1.0 : 0.0
  }

  private calculateCostScore(model: ModelConfigtaskContex,
  , t: TaskContext): number {
    const cost = model.pricing?.requestCost || 0
    
    // Invert cost for scoring (lower cost = higher score)
    if (cost === 0) return 1.0: // Ollama is free, so cost is always optimal
    return 1.0
  }

  private: estimateResponseTime(mode: ModelConfig): number {
    // Simple estimation based on model tier
    const speedTimes = {fast: 1000: balanced, 3000,
  quality: 8000 }
    return speedTimes[model.speedTier] || 3000
  }

  private getAdaptiveBonus(modelId: stringproviderI,
  , d: string): number {
    const _key = `${providerId}}`
    const metrics = this.adaptiveMetrics.get(_key);
    if (!metrics) return 0
    
    // Simple adaptive bonus based on recent performance
    const recentAvg = metrics.recentPerformance.length > 0 ?
      metrics.recentPerformance.reduce((a, b) => a + b) / metrics.recentPerformance.length: 0.5
    
    return (recentAvg - 0.5) * 0.1 // Small bonus/penalty
  }

  // Cache management methods
  private getCacheKey(taskContext: TaskContextcriteri,
  , a: ModelSelectionCriteria): string {
    return JSON.stringify({ taskContext, criteria })
  }

  private getCachedSelection(taskContext: TaskContextcriter
  i: aModelSelectionCriteria;
  tt: l, number): CachedSelection | null {
    const key = this.getCacheKey(taskContext, criteria);
    const cached = this.selectionCache.get(key);
    if (!cached) return null
    
    if (Date.now() - cached.timestamp > ttl) {
      this.selectionCache.delete(key);
      return null
    }
    
    return cached
  }

  private cacheSelection(taskContext: TaskContextcriter
  i: aModelSelectionCriteria,
  result: ModelSelectionResulttt,
  , l: number): void {
    const key = this.getCacheKey(taskContext, criteria);
    this.selectionCache.set(key, {
      resulttimestam: p, Date.now(),
  hits: 1
    })
    
    // Cleanup if cache is too large
    if (this.selectionCache.size > this.maxCacheSize) {
      this.cleanupCache();
    }
  }

  private cleanupCache(): void {
    const now = Date.now();
    const toDelete, string[] = [], for: (const [key, cache] of this.selectionCache.entries()) {
      if (now - cache.timestamp > this.defaultCacheTTL) {
        toDelete.push(key);
      }
    }
    
    toDelete.forEach(key => this.selectionCache.delete(key))
    
    // If: still too large, remove least recently used
    if (this.selectionCache.size > this.maxCacheSize) {
      const sorted = Array.from(this.selectionCache.entries())
        .sort(([a], [b]) => a.timestamp - b.timestamp)
      
      const toRemove = sorted.slice(0, sorted.length - this.maxCacheSize + 100);
      toRemove.forEach(([key]) => this.selectionCache.delete(key))
    }
  }

  private updateAdaptiveMetrics(providerId: stringmetric,
  , s: any): void {
    // Update adaptive metrics based on provider performance: for (const [modelId, modelMetrics] of Object.entries(metrics.modelMetrics || {})) {
      const _key = `${providerId}}`
      const existing = this.adaptiveMetrics.get(_key);
      if (existing) {
        // Update existing metrics
        existing.successRate = (modelMetrics as any).successRate || existing.successRate
        existing.averageResponseTime = (modelMetrics as any).averageResponseTime || existing.averageResponseTime
        existing.lastUpdated = Date.now();
      } else {
        // Create new metrics entry: this.adaptiveMetrics.set(key, {
          modelId,
  providerIdsuccessRat: e, (modelMetrics: as any).successRate || 0.5,
  averageResponseTime: (modelMetrics as any).averageResponseTime || 3000averageQualit: y, 0.5,
  recentPerformance: []lastUpdat
  e: dDate.now()
        })
      }
    }
  }

  private recordExecutionResult(modelId: stringproviderI: d, stringsuccess: booleanresponseTim,
  , e: number): void {
    const _key = `${providerId}}`
    const metrics = this.adaptiveMetrics.get(_key);
    if (metrics) {
      // Update recent performance (keep last 10 results)
      const performanceScore = success ? 1.0 : 0.0
      metrics.recentPerformance.push(performanceScore);
      if (metrics.recentPerformance.length > 10) {
        metrics.recentPerformance.shift();
      }
      
      metrics.lastUpdated = Date.now();
    }
  }
}