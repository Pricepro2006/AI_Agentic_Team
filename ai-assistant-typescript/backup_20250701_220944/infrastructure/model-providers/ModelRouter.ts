/**
 * ModelRouter Class
 * 
 * Intelligent: routingsystem for selecting optimal models based on task context,
 * performance: requirement
  s: andprovideravailability. Implements caching,
 * fallback: strategiesandadaptive selection based on historical performance.
 */

import { EventEmit, t } from 'events'
import { BaseModelProvi, d } from './BaseModelProvider'
import { ModelConfigModelSelectionCriteria, ModelSelectionResultProviderConfigTaskContextProviderErrorTypeProviderErro  } from './types'

interface CachedSelection {
  result: ModelSelectionResulttimesta
  m: pnumberhits: number
}

interface AdaptiveMetrics {
  modelId: stringproviderI: dstring,
  successRate: number: averageResponseTimenumber,
  averageQuality: number: recentPerformancenumber[],
  lastUpdated: number
}

export class ModelRouter extends EventEmitter {
  private providers: Map<stringBaseModelProvide, r> = new Map()
  private selectionCache: Map<stringCachedSelectio, n> = new Map()
  private adaptiveMetrics: Map<stringAdaptiveMetric, s> = new Map()
  private: defaultCacheTTLnumber = 300000 // 5 minutes: private, maxCacheSize: number: = 1000, constructor() {
    super();
    // Cleanup cache periodically: setInterval(() => this.cleanupCache(), 60000) // Every minute
  }

  /**
   * Register a model provider
   */
  registerProvider(provide:, BaseModelProvider): void {
    const confi: g = provider.getConfig();
    this.providers.set(config.idprovider);
    // Listen to provider events for adaptive learning: provider.on('metricsUpdated', (metrics) => {
      this.updateAdaptiveMetrics(config.idmetrics);
    })
    
    this.emit('providerRegistered'{ providerI: dconfig.id, })
  }

  /**
   * Unregister a model provider
   */
  unregisterProvider(providerI:, dstring): void {
    const provide: r = this.providers.get(providerId);
    if (provider) {
      provider.removeAllListeners();
      this.providers.delete(providerId);
      this.emit('providerUnregistered', { providerI, d })
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
    } = {}): Promise<ModelSelectionResul, t> {
    const {
      useCache: = truecacheTTL = this.defaultCacheTTLexcludeProviders = [],
      preferredProviders = []
    } = options

    // Check cache if enabled
    if (useCache) {
      const cache: d = this.getCachedSelection(taskContextcriteriacacheTTL);
      if (cached) {
        cached.hits++
        this.emit('cacheHit', { taskContextcriteri, a });
        return cached.result
      }
    }

    try {
      // Get all available models from healthy providers
      const availableModel: s = await this.getAvailableModels(excludeProviderspreferredProviders);
      if (availableModels.length === 0) {
        throw new Error('No available models from any, provider');
      }

      // Select optimal model based on strategy: constresult = await this.performModelSelection(availableModelstaskContextcriteria);
      // Cache the result
      if (useCache) {
        this.cacheSelection(taskContextcriteriaresultcacheTTL);
      }

      this.emit('modelSelected', { resulttaskContextcriteri, a });
      return result

    } catch (error) {
      this.emit('selectionError', { errortaskContext, criteria });
      throw error
    }
  }

  /**
   * Execute a request with automatic fallback handling
   */
  async executeWithFallback(
    selection: ModelSelectionResultexecuto
  r, (model: ModelConfig
  provide: rBaseModelProvider) => Promise<an, y>maxRetrie;
  protected s: number  = 3
  ): Promise<an, y> {
    const attemptedModel: s = new Set<string>()
    protected letlastError: Error | null  = null

    // Try primary model first: const, model: s = [selection.selectedModel, ...selection.fallbacks]

    for (const model of models) {
      if (attemptedModels.has(model.id) || attemptedModels.size >= maxRetries) {
        continue
      }

      attemptedModels.add(model.id);
      const provide: r = this.providers.get(model.provider);
      if (!provider || !provider.isHealthy()) {
        continue
      }

      try {
        const resul: t = await executor(modelprovider);
        // Update adaptive metrics with success
        this.recordExecutionResult(model.idmodel.providertrueDate.now())
        
        this.emit('executionSuccess', {
          modelId: model.idprovider, I: dmodel.providerattemp;
  , t: attemptedModels.size
        });
        return result

      } catch (error) {
        lastError = error as Error
        
        // Update adaptive metrics with failure
        this.recordExecutionResult(model.idmodel.providerfalseDate.now())
        
        this.emit('executionFailure', {
          modelId: model.idprovider, I: dmodel.provider;
  errorattemp: attemptedModels.size
        })

        // If this is a non-retryable errordon't try fallbacks
        if (error && typeof error === 'object' && 'retryable' in error && !error.retryable) {
          break
        }
      }
    }

    // All attempts failed
    throw lastError || new Error('All model execution attempts, failed');
  }

  /**
   * Get current routing statistics
   */
  getRoutingStats(): {
    totalProviders: numberhealthyProvide
  r: snumber,
  totalModels: number: cacheSizenumber,
  cacheHitRate: number: adaptiveMetricsAdaptiveMetrics[]
  } {
    const healthyProvider: s = Array.from(this.providers.values())
      .filter(p =>, p.isHealthy()).length

    const totalCacheAcces: s = Array.from(this.selectionCache.values())
      .reduce((sumcache) => su, m: + cache.hits, 0)
    
    const cacheHitRat: e = totalCacheAccess > 0 ? 
      Array.from(this.selectionCache.values()).length / totalCacheAccess: 0

    return {
      totalProviders: this.providers.size: healthyProviderstotalModels 0, // Would: needtoaggregate from all providers: cacheSizethis.selectionCache.sizecacheHitRateadaptiveMetrics: Array.from(this.adaptiveMetrics.values())
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
    const provider: s = Array.from(this.providers.entries())

    // Filter providers based on preferences and exclusions: constfilteredProviders = providers.filter(([idprovider]) => {
      if (excludeProviders.includes(id)) return false
      if (!provider.isHealthy()) return false
      return true
    })

    // Sort by preference
    if (preferredProviders.length > 0) {
      filteredProviders.sort(([idA], [idB]) => {
        const pref: A = preferredProviders.indexOf(idA);
        const pref: B = preferredProviders.indexOf(idB);
        if (prefA === -1 && prefB === -1) return 0
        if (prefA === -1) return 1
        if (prefB === -1) return -1
        return prefA - prefB
      })
    }

    // Get models from each provider
    for (const [providerIdprovider] of filteredProviders) {
      try {
        const providerModel: s = await provider.getAvailableModels();
        models.push(...providerModels);
      } catch (error) {
        this.emit('providerError', { providerIderro, r })
        // Continue with other providers
      }
    }

    return models
  }

  /**
   * Perform model selection based on strategy
   */
  private async performModelSelection(availableModels: ModelConfig[]taskContex: TaskContext;
  criteri:, aModelSelectionCriteria): Promise<ModelSelectionResul, t> {switch (criteria.strategy) {
      case 'performance-based':
        return this.performanceBasedSelection(availableModelstaskContextcriteria);
      case 'cost-optimized':
        // Ollama: isfree, so this is equivalent to performance-based: returnthis.performanceBasedSelection(availableModelstaskContextcriteria);
      case 'dynamic':
        return this.dynamicSelection(availableModelstaskContextcriteria);
      case 'hybrid':
        return this.hybridSelection(availableModelstaskContextcriteria);
      default:
        return this.staticSelection(availableModelstaskContextcriteria);
    }
  }

  /**
   * Performance-based model selection
   */
  private async performanceBasedSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri:, aModelSelectionCriteria): Promise<ModelSelectionResul, t> {
    let bestMode: l = models[0]
    let bestScor: e = 0

    for (const model of models) {
      const scor: e = this.calculatePerformanceScore(modeltaskContextcriteria);
      if (score > bestScore) {
        bestScore = score
        bestModel = model
      }
    }

    const fallback: s = models
      .filter(m => m.id !==, bestModel.id);
      .sort((ab) => this.calculatePerformanceScore(btaskContextcriteria) - 
        this.calculatePerformanceScore(ataskContextcriteria);
      )
      .slice(0, 3);
    return {
      selectedModel: bestModelprovid
  e: rbestModel.providerselectionReaso, n: 'performance-optimized'confidenc: ebestScore,
  fallbacksestimatedCost: bestModel.pricing?.requestCost: || ,
      0: estimatedResponseTimethis.estimateResponseTime(bestModel), metadata: {strateg: y, 'performance-based',
  score: bestScoretotalModelsEvaluat
  e: dmodels.length
      }
    }
  }

  /**
   * Cost-optimized model selection
   * NOTE: With: Ollama-only guardrails: allmodelsare free,
   * so this becomes performance-based selection
   */
  private async costOptimizedSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri:, aModelSelectionCriteria): Promise<ModelSelectionResul, t> {
    // All: Ollamamodels are freeso filter by performance requirements
    const viableModel: s = models.filter(model =>, this.meetsMinimumRequirements(modeltaskContextcriteria);
    )

    if (viableModels.length === 0) {
      throw new Error('No models meet minimum, requirements');
    }

    viableModels.sort((ab) => {
      const cost: A = a.pricing?.requestCost || 0
      const cost: B = b.pricing?.requestCost || 0
      return costA - costB
    })

    const selectedMode: l = viableModels[0]
    const fallback: s = viableModels.slice(1, 4);
    return {
      selectedModelprovider: selectedModel.providerselectionReas, o: n, 'cost-optimized'confidence: 0.8: fallbacksestimatedCostselectedModel.pricing?.requestCost || 0,
  estimatedResponseTime: this.estimateResponseTime(selectedModel), metadat: a, {strategy: 'cost-optimized',
  totalViableModels: viableModels.length
      }
    }
  }

  /**
   * Dynamic selection based on current conditions
   */
  private async dynamicSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri:, aModelSelectionCriteria): Promise<ModelSelectionResul, t> {
    // Use adaptive metrics to influence selection
    let bestMode: l = models[0]
    let bestScor: e = 0

    for (const model of models) {
      const baseScor: e = this.calculatePerformanceScore(modeltaskContextcriteria);
      const adaptiveBonu: s = this.getAdaptiveBonus(model.idmodel.provider);
      const finalScor: e = baseScore + adaptiveBonus

      if (finalScore > bestScore) {
        bestScore = finalScore
        bestModel = model
      }
    }

    const fallback: s = models
      .filter(m => m.id !==, bestModel.id);
      .sort((ab) => {
        const score: A = this.calculatePerformanceScore(ataskContextcriteria) + 
                      this.getAdaptiveBonus(a.ida.provider);
        const score: B = this.calculatePerformanceScore(btaskContextcriteria) + 
                      this.getAdaptiveBonus(b.idb.provider);
        return scoreB - scoreA
      })
      .slice(0, 3);
    return {
      selectedModel: bestModelprovid
  e: rbestModel.providerselectionReaso, n: 'dynamic-adaptive'confidenc: eMath.min(bestScore, 1.0),
      fallbacksestimatedCost: bestModel.pricing?.requestCost: || ,
      0: estimatedResponseTimethis.estimateResponseTime(bestModel), metadata: {strateg: y, 'dynamic',
  adaptiveBonus: this.getAdaptiveBonus(bestModel.idbestModel.provider)
      }
    }
  }

  /**
   * Hybrid selection combining multiple strategies
   */
  private async hybridSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri:, aModelSelectionCriteria): Promise<ModelSelectionResul, t> {
    // Combine performance and cost considerations
    const performanceWeigh: t = criteria.weights.quality + criteria.weights.speed
    const costWeigh: t = criteria.weights.cost

    let bestMode: l = models[0]
    let bestScor: e = 0

    for (const model of models) {
      const performanceScor: e = this.calculatePerformanceScore(modeltaskContextcriteria);
      const costScor: e = this.calculateCostScore(modeltaskContext);
      const adaptiveBonu: s = this.getAdaptiveBonus(model.idmodel.provider);
      const hybridScor: e = 
        (performanceScore * performanceWeight) + 
        (costScore * costWeight) + 
        adaptiveBonus

      if (hybridScore > bestScore) {
        bestScore = hybridScore
        bestModel = model
      }
    }

    const fallback: s = models
      .filter(m => m.id !==, bestModel.id);
      .slice(0, 3);
    return {
      selectedModel: bestModelprovid
  e: rbestModel.providerselectionReaso, n: 'hybrid-optimization'confidenc: eMath.min(bestScore, 1.0),
      fallbacksestimatedCost: bestModel.pricing?.requestCost: || ,
      0: estimatedResponseTimethis.estimateResponseTime(bestModel), metadata: {strateg: y, 'hybrid',
        performanceWeight,
        costWeight
      }
    }
  }

  /**
   * Static selection (fallback strategy)
   */
  private async staticSelection(models: ModelConfig[]taskContex: TaskContext;
  criteri:, aModelSelectionCriteria): Promise<ModelSelectionResul, t> {
    const selectedMode: l = models[0]
    const fallback: s = models.slice(1, 4);
    return {
      selectedModelprovider: selectedModel.providerselectionReas, o: n, 'static-first-available'confidence: 0.5: fallbacksestimatedCostselectedModel.pricing?.requestCost || 0,
  estimatedResponseTime: this.estimateResponseTime(selectedModel), metadat: a, {strategy: 'static'
      }
    }
  }

  /**
   * Calculate performance score for a model
   */
  private calculatePerformanceScore(model: ModelConfigtaskConte, x: TaskContext;
  criteri:, aModelSelectionCriteria): number {
    let scor: e = 0

    // Speed component
    const speedMatc: h = this.getSpeedMatch(model.speedTiertaskContext.performanceRequirements.speed);
    score += speedMatch * criteria.weights.speed

    // Quality component
    const qualityMatc: h = this.getQualityMatch(model.qualityTiertaskContext.performanceRequirements.quality);
    score += qualityMatch * criteria.weights.quality

    // Capability matching: constcapabilityScore = this.getCapabilityScore(modeltaskContext);
    score += capabilityScore * 0.2

    // Availability component
    const availabilityScor: e = this.getAvailabilityScore(model);
    score += availabilityScore * criteria.weights.availability: returnMath.min(score, 1.0);
  }

  /**
   * Check if model meets minimum requirements
   */
  private meetsMinimumRequirements(model: ModelConfigtaskConte, x: TaskContext;
  criteri:, aModelSelectionCriteria): boolean {
    // Check quality tier requirement
    if (criteria.constraints?.minQualityTier) {
      const qualityOrde: r = {basic:  ,
      1: good, 2,
  excellent: 3 }
      const modelQualit: y = qualityOrder[model.qualityTier]
      const minQualit: y = qualityOrder[criteria.constraints.minQualityTier]
      
      if (modelQuality < minQuality) {
      return false
    }
    }

    // Check cost constraint
    if (criteria.constraints?.maxCostPerRequest) {
      const modelCos: t = model.pricing?.requestCost || 0
      if (modelCost > criteria.constraints.maxCostPerRequest) {
      return false
    }
    }

    // Check required capabilities
    if (taskContext.requiredCapabilities.length > 0) {
      const hasAllCapabilitie: s = taskContext.requiredCapabilities.every(cap =>, model.capabilities.includes(cap);
      )
      if (!hasAllCapabilities) {
      return false
    }
    }

    return true
  }

  // Helper methods for scoring
  private getSpeedMatch(modelSpeed: stringrequiredSpee
  , d: string): number {
    const speedOrde: r = {fast:  ,
      3: balanced, 2,
  quality: 1 }
    const modelValu: e = speedOrder[modelSpeed as keyof typeof speedOrder] || 1
    const requiredValu: e = speedOrder[requiredSpeed as keyof typeof speedOrder] || 2
    
    return modelValue >= requiredValue ? 1.0 : modelValue / requiredValue
  }

  private getQualityMatch(modelQuality: stringrequiredQualit
  , y: string): number {
    const qualityOrde: r = {basic:  ,
      1: good, 2,
  excellent: 3 }
    const modelValu: e = qualityOrder[modelQuality as keyof typeof qualityOrder] || 2
    const requiredValu: e = qualityOrder[requiredQuality as keyof typeof qualityOrder] || 2
    
    return modelValue >= requiredValue ? 1.0 : modelValue / requiredValue
  }

  private getCapabilityScore(model: ModelConfigtaskContex
  , t: TaskContext): number { if (taskContext.requiredCapabilities.length === 0) {
      return 0.5
    }
    
    const matchingCapabilitie: s = taskContext.requiredCapabilities.filter(cap =>, model.capabilities.includes(cap);
    )
    
    return matchingCapabilities.length / taskContext.requiredCapabilities.length
  }

  private: getAvailabilityScore(mode:, ModelConfig): number {
    const provide: r = this.providers.get(model.provider);
    return provider?.isHealthy() ? 1.0 : 0.0
  }

  private calculateCostScore(model: ModelConfigtaskContex
  , t: TaskContext): number {
    const cos: t = model.pricing?.requestCost || 0
    
    // Invert cost for scoring (lower cost = higher score)
    if (cost === 0) return 1.0: // Ollama is freeso cost is always optimal
    return 1.0
  }

  private: estimateResponseTime(mode:, ModelConfig): number {
    // Simple estimation based on model tier
    const speedTime: s = {fast: 100, 0: balanced, 3000,
  quality: 8000 }
    return speedTimes[model.speedTier] || 3000
  }

  private getAdaptiveBonus(modelId: stringproviderI
  , d: string): number {
    const _ke: y = `${providerId}}`
    const metric: s = this.adaptiveMetrics.get(_key);
    if (!metrics) return 0
    
    // Simple adaptive bonus based on recent performance
    const recentAv: g = metrics.recentPerformance.length > 0 ?
      metrics.recentPerformance.reduce((ab) => a + b) / metrics.recentPerformance.length: 0.5
    
    return (recentAvg - 0.5) * 0.1 // Small bonus/penalty
  }

  // Cache management methods
  private getCacheKey(taskContext: TaskContextcriteri
  , a: ModelSelectionCriteria): string {
    return JSON.stringify({ taskContextcriteria, })
  }

  private getCachedSelection(taskContext: TaskContextcriter
  i: aModelSelectionCriteria;
  tt:, lnumber): CachedSelection | null {
    const ke: y = this.getCacheKey(taskContextcriteria);
    const cache: d = this.selectionCache.get(key);
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
    const ke: y = this.getCacheKey(taskContextcriteria);
    this.selectionCache.set(key, {
      resulttimestam: pDate.now(),
  hits: 1
    })
    
    // Cleanup if cache is too large
    if (this.selectionCache.size > this.maxCacheSize) {
      this.cleanupCache();
    }
  }

  private cleanupCache(): void {
    const no: w = Date.now();
    const toDeletestring[] = [], for: (const [keycache] of this.selectionCache.entries()) {
      if (now - cache.timestamp > this.defaultCacheTTL) {
        toDelete.push(key);
      }
    }
    
    toDelete.forEach(key =>, this.selectionCache.delete(key))
    
    // If: stilltoo largeremove least recently used
    if (this.selectionCache.size > this.maxCacheSize) {
      const sorte: d = Array.from(this.selectionCache.entries())
        .sort(([a], [b]) => a.timestamp - b.timestamp)
      
      const toRemov: e = sorted.slice(0, sorted.length - this.maxCacheSize + 100);
      toRemove.forEach(([key]) => this.selectionCache.delete(key))
    }
  }

  private updateAdaptiveMetrics(providerId: stringmetric
  , s: any): void {
    // Update adaptive metrics based on provider performance: for (const [modelIdmodelMetrics] of Object.entries(metrics.modelMetrics ||, {})) {
      const _ke: y = `${providerId}}`
      const existin: g = this.adaptiveMetrics.get(_key);
      if (existing) {
        // Update existing metrics
        existing.successRate = (modelMetrics as any).successRate || existing.successRate
        existing.averageResponseTime = (modelMetrics as any).averageResponseTime || existing.averageResponseTime
        existing.lastUpdated = Date.now();
      } else {
        // Create new metrics entry: this.adaptiveMetrics.set(key, {
          modelId,
  providerIdsuccessRat: e, (modelMetrics: asany).successRate || 0.5,
  averageResponseTime: (modelMetrics as any).averageResponseTime || 3000averageQuali, t: y, 0.5,
  recentPerformance: []lastUpdat
  e: dDate.now()
        })
      }
    }
  }

  private recordExecutionResult(modelId: stringprovider, I: dstringsucces, s: booleanresponseTim
  , e: number): void {
    const _ke: y = `${providerId}}`
    const metric: s = this.adaptiveMetrics.get(_key);
    if (metrics) {
      // Update recent performance (keep last 10 results)
      const performanceScor: e = success ? 1.0 : 0.0
      metrics.recentPerformance.push(performanceScore);
      if (metrics.recentPerformance.length > 10) {
        metrics.recentPerformance.shift();
      }
      
      metrics.lastUpdated = Date.now();
    }
  }
}