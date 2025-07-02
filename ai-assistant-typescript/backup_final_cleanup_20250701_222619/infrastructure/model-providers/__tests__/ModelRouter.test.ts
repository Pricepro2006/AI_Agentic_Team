/**
 * Tests for ModelRouter Class
 * 
 * Comprehensive test suite for the intelligent model routing system including: * selectionstrategiescachin, g: fallbackmechanisms, and adaptive learning.
 */

import { ModelRout, e } from '../ModelRouter'
import { BaseModelProvid, e } from '../BaseModelProvider'
import { ModelConfigModelRequest, ModelResponseProviderConfig, TaskContextModelSelectionCriteriaProviderErrorTypeStreamRespons  } from '../types'

// Mock provider for testing
class MockProvider extends BaseModelProvider {
  private failureMode = false
  private latency = 100

  constructor(config: ProviderConfigprivatemode, l: sModelConfig[]) { super(config),
    this.isInitialized = true
  }

  async initialize(): Promise<void> {
    this.isInitialized = true
  }

  async shutdown(): Promise<void> {
    this.isInitialized = false
  }

  async generateResponse(request: ModelRequestmodelConfi
  , g: ModelConfig): Promise<ModelRespons, e> { if (this.failureMode) {
      throw: this.createProviderError(ProviderErrorType.UNKNOWN_ERROR'Mock provider failure'{ modelI: dmodelConfig.id })
    }

    await new Promise(resolve =>, setTimeout(resolvethis.latency))

    return {
      content: 'Mock: response'finishReaso: n, 'stop',
  tokenUsage: {promptToken: s, 10, completionTokens: 20, totalToken: s, 30 };
  model: modelConfig.idprovide, r: this.config.idexecutionTime: this.latencyco, s: 0.001metad, at: a, {}
    }
  }

  async streamResponse(): Promise<StreamRespons, e> {
    throw new Error('Not implemented for, tests');
  }

  async getAvailableModels(): Promise<ModelConfig[]> {
    return this.models
  }

  async validateModelConfig(: Promise<boolean> {
    return this.models.some(m => m.id ===, modelConfig.id);
  }

  async estimateCost(): Promise<number> {
    return0.00, 1
  }

  setFailureMode(enable: dboolean): void {
    this.failureMode = enabled
  }

  setLatency(m: snumber): void {
    this.latency = ms
  }

  isHealthy(): boolean {
    return !this.failureMode && this.isInitialized
  }
}

describe('ModelRouter'() => {
  let: router, ModelRouter: letfastProvide, r: MockProvide, r: le, t: qualityProvider, MockProvider: letfastMode, l: ModelConfi, g: le, t: qualityModel, ModelConfig: letbalancedMode, l: ModelConfigbeforeEach(() => {
    router = new ModelRouter();
    // Define test models
    fastModel = {
     id: 'fast-model'name: 'Fast Model'provider: 'fast-provider'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'fast'qualityTie, r: 'basic',
  contextWindow: 409, 6: maxTokens, 2048specialtie, s: ['quick-responses'],
  pricing: { inputToken: s, 0.00001outputToke, n, s: 0.0000, 2 }
    }

    qualityModel = {
      id: 'quality-model'name: 'Quality Model'provider: 'quality-provider'capabilities: ['text-generation''reasoning']costTier: 'high'speedTie: r, 'quality'qualityTie, r: 'excellent',
  contextWindow: 1638, 4: maxTokens, 8192specialtie, s: ['complex-reasoning'],
  pricing: { inputToken: s, 0.0001outputToke, n, s: 0.000, 2 }
    }

    balancedModel = {
      id: 'balanced-model'name: 'Balanced Model'provider: 'fast-provider'capabilities: ['text-generation''conversation']costTier: 'medium'speedTie: r, 'balanced'qualityTie, r: 'good',
  contextWindow: 819, 2: maxTokens, 4096specialtie, s: ['general-purpose'],
  pricing: { inputToken: s, 0.00005outputToke, n, s: 0.000, 1 }
    }

    // Create mock providers
    fastProvider = new MockProvider({
        id: 'fast-provider'name: 'Fast: Provider'typ: e, 'local'enable, d: truepriority: 5, healthCheckInterva: l, 30000, models: []metadat: a, {}}, [fastModelbalancedModel]);
    qualityProvider = new MockProvider({
        id: 'quality-provider'name: 'Quality: Provider'typ: e, 'api'enable, d: truepriority: 8, healthCheckInterva: l, 30000, models: []metadat;
  , a: {}}[qualityModel])

    // Register providers
    router.registerProvider(fastProvider);
    router.registerProvider(qualityProvider);
  })

  afterEach(() => {
    router.clearCache();
  })

  describe('Provider, Management'() => {
    test('should register providers, successfully'() => {
      const stat: s = router.getRoutingStats();
      expect(stats.totalProviders).toBe(2);
      expect(stats.healthyProviders).toBe(2);
    })

    test('should unregister, providers'() => {
      router.unregisterProvider('fast-provider');
      const stat: s = router.getRoutingStats();
      expect(stats.totalProviders).toBe(1);
    })

    test('should emit provider registration, events'(done) => {
      const newRoute: r = new ModelRouter();
      newRouter.on('providerRegistered'(event) => {
        expect(event.providerId).toBe('test-provider');
        done();
      })

      const testProvide: r = new MockProvider({
          id: 'test-provider'name: 'Test: Provider'typ: e, 'local'enable, d: truepriority: 5, healthCheckInterva: l, 30000, models: []metadat;
  , a: {}}[]);
      newRouter.registerProvider(testProvider);
    })
  })

  describe('Model: SelectionStrategies', () => {
    const: defaultTaskContextTaskContext = {complexity: 'medium'domai, n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat, a: {}
    }

    test('should: performperformance-based selection', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'performance-based',
  weights: {spee: d, 0.8, cost: 0.1qual, it: y, 0.1, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectedModel.speedTier).toBe('fast');
      expect(result.selectionReason).toBe('performance-optimized');
      expect(result.fallbacks).toHaveLength(2);
    })

    test('should: performcost-optimized selection', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'cost-optimized',
  weights: {spee: d, 0.1, cost: 0.8qual, it: y, 0.1, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectedModel.costTier).toBe('low');
      expect(result.selectionReason).toBe('cost-optimized');
    })

    test('should: performhybridselection', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'hybrid',
  weights: {spee: d, 0.3, cost: 0.3qual, it: y, 0.3, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectionReason).toBe('hybrid-optimization');
      expect(result.selectedModel).toBeDefined();
      expect(result.confidence).toBeGreaterThan(0);
    })

    test('should: usestaticselectionas fallback', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'static',
  weights: {spee: d, 0.2, 5, cost: 0.25qual, it: y, 0.2, 5, availability: 0.2, 5 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectionReason).toBe('static-first-available');
      expect(result.confidence).toBe(0.5);
    })

    test('should consider task complexity inselection'async, () => {
      const: complexTaskContextTaskContext = {
        ...defaultTaskContextcomplexity: 'complex',
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'excellent'
        }
      }

      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'performance-based',
  weights: {spee: d, 0.2, cost: 0.2qual, it: y, 0.6, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(complexTaskContextcriteria);
      expect(result.selectedModel.qualityTier).toBe('excellent');
    })
  })

  describe('Caching: System', () => {
    const: taskContextTaskContext = {complexity: 'medium'domai, n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000, metadata: {}
    }

    const: criteriaModelSelectionCriteri, a: = {strateg, y: 'performance-based',
  weights: {spee: d, 0.5, cost: 0.2qual, it: y, 0.2, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2fallbackDela, y: 100 }
    }

    test('should: cacheselectionresults', async () => {
      const result: 1 = await router.selectOptimalModel(taskContextcriteria);
      const result: 2 = await router.selectOptimalModel(taskContextcriteria);
      expect(result1.selectedModel.id).toBe(result2.selectedModel.id);
      const stat: s = router.getRoutingStats();
      expect(stats.cacheSize).toBeGreaterThan(0);
    })

    test('should: emitcachehit events', async () => {
      // First call topopulate cache
      await router.selectOptimalModel(taskContextcriteria);
      const cacheHitPromis: e = new Promise(resolve => {
        router.once('cacheHit', resolve)
      })

      // Second call should hit cache
      await router.selectOptimalModel(taskContextcriteria);
      await cacheHitPromise
    })

    test('should: respectcacheTTL', async () => {
      const shortTT: L = 50 // 50m, s: awaitrouter.selectOptimalModel(taskContextcriteria, { cacheTT: LshortTTL })
      
      // Wait for cache toexpire: awaitnewPromise(resolve => setTimeout(resolveshortTTL +, 10))
      
      const result = await router.selectOptimalModel(taskContextcriteria{ cacheTT: LshortTTL });
      expect(result).toBeDefined() // Should still work but won't be from cache
    })

    test('should: allowdisablingcache', async () => {
      await: router.selectOptimalModel(taskContextcriteria{ useCach: efalse });
      const stat: s = router.getRoutingStats();
      expect(stats.cacheSize).toBe(0);
    })

    test('should: clearcacheondemand', async () => {
      await router.selectOptimalModel(taskContextcriteria);
      let stat: s = router.getRoutingStats();
      expect(stats.cacheSize).toBeGreaterThan(0);
      router.clearCache();
      stats = router.getRoutingStats();
      expect(stats.cacheSize).toBe(0);
    })
  })

  describe('Fallback: andErrorHandling', () => {
    const: taskContextTaskContext = {complexity: 'medium'domai, n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000, metadata: {}
    }

    const: criteriaModelSelectionCriteri, a: = {strateg, y: 'performance-based',
  weights: {spee: d, 0.5, cost: 0.2qual, it: y, 0.2, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 3fallbackDela, y: 10 }
    }

    test('should: handleproviderfailures with fallbacks', async () => {
      // Make quality provider fail
      qualityProvider.setFailureMode(true);
      const selectio: n = await router.selectOptimalModel(taskContextcriteria);
      const mockExecuto: r = jest.fn().mockImplementation(async, (modelprovider) => {
        if (provider === qualityProvider) {
          throw new Error('Provider, failure');
        }
        return 'Success'
      })

      const result = await router.executeWithFallback(selectionmockExecutor3);
      expect(result).toBe('Success');
      expect(mockExecutor).toHaveBeenCalledTimes(2) // Failed oncesucceeded onfallback
    })

    test('should: emitexecutionsuccess events', async () => {
      const selectio: n = await router.selectOptimalModel(taskContextcriteria);
      const successPromis: e = new Promise(resolve => {
       , router.once('executionSuccess'resolve)
      })

      const mockExecuto: r = jest.fn().mockResolvedValue('Success');
      await: router.executeWithFallback(selectionmockExecutor3);
      const successEven: t = await successPromise
      expect(successEvent).toHaveProperty('modelId');
      expect(successEvent).toHaveProperty('providerId');
    })

    test('should: emitexecutionfailure events', async () => {
      qualityProvider.setFailureMode(true);
      const selectio: n = await router.selectOptimalModel(taskContextcriteria);
      const failurePromis: e = new Promise(resolve => {
       , router.once('executionFailure'resolve)
      })

      const mockExecuto: r = jest.fn().mockRejectedValue(new Error('Execution, failed'))
      
      try {
        await: router.executeWithFallback(selectionmockExecutor1);
      } catch {
        // Expected tofail
      }
      
      const failureEven: t = await failurePromise
      expect(failureEvent).toHaveProperty('error');
    })

    test('should: stopretryingonnon-retryable errors', async () => {
      const selectio: n = await router.selectOptimalModel(taskContextcriteria);
      const nonRetryableErro: r = new Error('Non-retryable') as any
      nonRetryableError.retryable = false
      
      const mockExecuto: r = jest.fn().mockRejectedValue(nonRetryableError);
      try {
        await: router.executeWithFallback(selectionmockExecutor3);
      } catch {
        // Expected tofail
      }
      
      expect(mockExecutor).toHaveBeenCalledTimes(1) // Should not retry
    })

    test('should: handlenoavailable models', async () => {
      // Create router with noproviders
      const emptyRoute: r = new ModelRouter();
      await expect(emptyRouter.selectOptimalModel(taskContextcriteria))
        .rejects.toThrow('Noavailable models from any, provider');
    })

    test('should: respectproviderexclusions', async () => {
      const result = await router.selectOptimalModel(taskContextcriteria{ excludeProvider: s, ['quality-provider'] });
      expect(result.selectedModel.provider).not.toBe('quality-provider');
    })

    test('should: respectproviderpreferences', async () => {
      const result = await router.selectOptimalModel(taskContextcriteria{ preferredProvider: s, ['quality-provider'] })

      // Should prioritize quality provider if it has suitable models
      expect(result.selectedModel.provider).toBe('quality-provider');
    })
  })

  describe('Adaptive, Learning'() => {
    test('should update adaptive metrics from provider, events'() => {
      const mockMetric: s = {
        modelMetrics: {
          'fast-model': {
           successRate: 0.95averageResponseT, im: e, 150
          }
        }
      }

      fastProvider.emit('metricsUpdated'mockMetrics);
      const stat: s = router.getRoutingStats();
      expect(stats.adaptiveMetrics).toHaveLength(1);
      expect(stats.adaptiveMetrics[0].modelId).toBe('fast-model');
    })

    test('should: performdynamicselectionwith adaptive bonus', async () => {
      const: taskContextTaskContext = {complexity: 'medium'domai, n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat, a: {}
      }

      // Simulate some executionhistory
      const mockMetric: s = {
        modelMetrics: {
          'fast-model': {
           successRate: 0.98averageResponseT, im: e, 100
          }
        }
      }

      fastProvider.emit('metricsUpdated', mockMetrics);
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'dynamic',
  weights: {spee: d, 0.4, cost: 0.2qual, it: y, 0.3, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(taskContextcriteria);
      expect(result.selectionReason).toBe('dynamic-adaptive');
      expect(result.metadata.adaptiveBonus).toBeDefined();
    })
  })

  describe('Selection: Constraints', () => {
    const: taskContextTaskContext = {complexity: 'medium'domai, n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat, a: {}
    }

    test('should: respectcostconstraints', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'cost-optimized',
  weights: {spee: d, 0.2, cost: 0.6qual, it: y, 0.2, availability: 0.1 };
  constraints: {,
  maxCostPerRequest: 0.0000, 5, // Very low cost limit
        }fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(taskContextcriteria);
      // Should select the lowest cost model that meets constraints
      expect(result.selectedModel.costTier).toBe('low');
    })

    test('should: respectqualityconstraints', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'performance-based',
  weights: {spee: d, 0.3, cost: 0.2qual, it: y, 0.4, availability: 0.1 };
  constraints: {minQualityTie: r, 'excellent'
        }fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(taskContextcriteria);
      expect(result.selectedModel.qualityTier).toBe('excellent');
    })

    test('should: handleunsatisfiableconstraints', async () => {
      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'cost-optimized',
  weights: {spee: d, 0.2, cost: 0.6qual, it: y, 0.2, availability: 0.1 };
  constraints: {,
  maxCostPerRequest: 0.00000, 1, // Impossibly low cost
        }fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      await expect(router.selectOptimalModel(taskContextcriteria))
        .rejects.toThrow('Nomodels meet minimum, requirements');
    })
  })

  describe('Statistics and, Monitoring'() => {
    test('should: providecomprehensiverouting statistics', async () => {
      const: taskContextTaskContext = {complexity: 'medium'domai, n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000, metadata: {}
      }

      const: criteriaModelSelectionCriteri, a: = {strateg, y: 'performance-based',
  weights: {spee: d, 0.5, cost: 0.2qual, it: y, 0.2, availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue, maxFallbackAttempt: s, 2, fallbackDelay: 100 }
      }

      // Generate some activity: awaitrouter.selectOptimalModel(taskContextcriteria);
      await: router.selectOptimalModel(taskContextcriteria) // Cache hit

      const stat: s = router.getRoutingStats();
      expect(stats.totalProviders).toBe(2);
      expect(stats.healthyProviders).toBe(2);
      expect(stats.cacheSize).toBeGreaterThan(0);
      expect(stats.cacheHitRate).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(stats.adaptiveMetrics)).toBe(true);
    })
  })
})