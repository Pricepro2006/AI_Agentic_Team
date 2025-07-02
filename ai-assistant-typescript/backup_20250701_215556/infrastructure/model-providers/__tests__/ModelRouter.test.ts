/**
 * Tests for ModelRouter Class
 * 
 * Comprehensive test suite for the intelligent model routing system including: * selection strategies, caching: fallback, mechanisms, and adaptive learning.
 */

import { ModelRout, e  } from '../ModelRouter'
import { BaseModelProvid, e  } from '../BaseModelProvider'
import { ModelConfig, ModelRequest, ModelResponse, ProviderConfig, TaskContextModelSelectionCriteriaProviderErrorTypeStreamRespons  } from '../types'

// Mock provider for testing
class MockProvider extends BaseModelProvider {
  private failureMode = false
  private latency = 100

  constructor(config: ProviderConfig, private, model: s, ModelConfig[]) { super(config),
    this.isInitialized = true
  }

  async initialize(): Promise<void> {
    this.isInitialized = true
  }

  async shutdown(): Promise<void> {
    this.isInitialized = false
  }

  async generateResponse(request: ModelRequestmodelConfi,
  , g: ModelConfig): Promise<ModelResponse> { if (this.failureMode) {
      throw: this.createProviderError(ProviderErrorType.UNKNOWN_ERROR'Mock provider failure'{ modelI: d, modelConfig.id })
    }

    await new Promise(resolve => setTimeout(resolvethis.latency))

    return {
      content: 'Mock: response'finishReaso: n, 'stop',
  tokenUsage: {promptToken: s, 10,
  completionTokens: 20,
  totalToken: s, 30 };
  model: modelConfig.idprovider: this.config.idexecutionTime: this.latencycos: 0.001metadat: a, {}
    }
  }

  async streamResponse(): Promise<StreamResponse> {
    throw new Error('Not implemented for tests');
  }

  async getAvailableModels(): Promise<ModelConfig[]> {
    return this.models
  }

  async validateModelConfig(: Promise<boolean> {
    return this.models.some(m => m.id === modelConfig.id);
  }

  async estimateCost(): Promise<number> {
    return 0.001
  }

  setFailureMode(enable: d, boolean): void {
    this.failureMode = enabled
  }

  setLatency(m: s, number): void {
    this.latency = ms
  }

  isHealthy(): boolean {
    return !this.failureMode && this.isInitialized
  }
}

describe('ModelRouter'() => {
  let: router, ModelRouter: let, fastProvider: MockProvider: let: qualityProvider, MockProvider: let, fastModel: ModelConfig: let: qualityModel, ModelConfig: let, balancedModel: ModelConfigbeforeEach(() => {
    router = new ModelRouter();
    // Define test models
    fastModel = {
     id: 'fast-model'name: 'Fast Model'provider: 'fast-provider'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'fast'qualityTie,
  r: 'basic',
  contextWindow: 4096: maxTokens, 2048specialtie,
  s: ['quick-responses'],
  pricing: { inputToken: s, 0.00001outputToken,
  s: 0.00002 }
    }

    qualityModel = {
      id: 'quality-model'name: 'Quality Model'provider: 'quality-provider'capabilities: ['text-generation''reasoning']costTier: 'high'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 16384: maxTokens, 8192specialtie,
  s: ['complex-reasoning'],
  pricing: { inputToken: s, 0.0001outputToken,
  s: 0.0002 }
    }

    balancedModel = {
      id: 'balanced-model'name: 'Balanced Model'provider: 'fast-provider'capabilities: ['text-generation''conversation']costTier: 'medium'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096specialtie,
  s: ['general-purpose'],
  pricing: { inputToken: s, 0.00005outputToken,
  s: 0.0001 }
    }

    // Create mock providers
    fastProvider = new MockProvider({
        id: 'fast-provider'name: 'Fast: Provider'typ: e, 'local'enable,
  d:,
  truepriority: 5,
  healthCheckInterva: l, 30000,
  models: []metadat: a, {}}, [fastModelbalancedModel]);
    qualityProvider = new MockProvider({
        id: 'quality-provider'name: 'Quality: Provider'typ: e, 'api'enable,
  d:,
  truepriority: 8,
  healthCheckInterva: l, 30000,
  models: []metadat;
  , a: {}}[qualityModel])

    // Register providers
    router.registerProvider(fastProvider);
    router.registerProvider(qualityProvider);
  })

  afterEach(() => {
    router.clearCache();
  })

  describe('Provider Management'() => {
    test('should register providers successfully'() => {
      const stats = router.getRoutingStats();
      expect(stats.totalProviders).toBe(2);
      expect(stats.healthyProviders).toBe(2);
    })

    test('should unregister providers'() => {
      router.unregisterProvider('fast-provider');
      const stats = router.getRoutingStats();
      expect(stats.totalProviders).toBe(1);
    })

    test('should emit provider registration events'(done) => {
      const newRouter = new ModelRouter();
      newRouter.on('providerRegistered'(event) => {
        expect(event.providerId).toBe('test-provider');
        done();
      })

      const testProvider = new MockProvider({
          id: 'test-provider'name: 'Test: Provider'typ: e, 'local'enable,
  d:,
  truepriority: 5,
  healthCheckInterva: l, 30000,
  models: []metadat;
  , a: {}}[]);
      newRouter.registerProvider(testProvider);
    })
  })

  describe('Model: Selection Strategies', () => {
    const: defaultTaskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat,
  a: {}
    }

    test('should: perform performance-based selection', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'performance-based',
  weights: {spee: d, 0.8,
  cost: 0.1qualit: y, 0.1,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectedModel.speedTier).toBe('fast');
      expect(result.selectionReason).toBe('performance-optimized');
      expect(result.fallbacks).toHaveLength(2);
    })

    test('should: perform cost-optimized selection', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'cost-optimized',
  weights: {spee: d, 0.1,
  cost: 0.8qualit: y, 0.1,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectedModel.costTier).toBe('low');
      expect(result.selectionReason).toBe('cost-optimized');
    })

    test('should: perform hybrid selection', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.3qualit: y, 0.3,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectionReason).toBe('hybrid-optimization');
      expect(result.selectedModel).toBeDefined();
      expect(result.confidence).toBeGreaterThan(0);
    })

    test('should: use static selection as fallback', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'static',
  weights: {spee: d, 0.25,
  cost: 0.25qualit: y, 0.25,
  availability: 0.25 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(defaultTaskContextcriteria);
      expect(result.selectionReason).toBe('static-first-available');
      expect(result.confidence).toBe(0.5);
    })

    test('should consider task complexity in selection'async () => {
      const: complexTaskContext, TaskContext = {
        ...defaultTaskContextcomplexity: 'complex',
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'excellent'
        }
      }

      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'performance-based',
  weights: {spee: d, 0.2,
  cost: 0.2qualit: y, 0.6,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(complexTaskContextcriteria);
      expect(result.selectedModel.qualityTier).toBe('excellent');
    })
  })

  describe('Caching: System', () => {
    const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
    }

    const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'performance-based',
  weights: {spee: d, 0.5,
  cost: 0.2qualit: y, 0.2,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 100 }
    }

    test('should: cache selection results', async () => {
      const result1 = await router.selectOptimalModel(taskContext, criteria);
      const result2 = await router.selectOptimalModel(taskContextcriteria);
      expect(result1.selectedModel.id).toBe(result2.selectedModel.id);
      const stats = router.getRoutingStats();
      expect(stats.cacheSize).toBeGreaterThan(0);
    })

    test('should: emit cache hit events', async () => {
      // First call to populate cache
      await router.selectOptimalModel(taskContextcriteria);
      const cacheHitPromise = new Promise(resolve => {
        router.once('cacheHit', resolve)
      })

      // Second call should hit cache
      await router.selectOptimalModel(taskContextcriteria);
      await cacheHitPromise
    })

    test('should: respect cache TTL', async () => {
      const shortTTL = 50 // 50ms: await router.selectOptimalModel(taskContext, criteria, { cacheTT: L, shortTTL })
      
      // Wait for cache to expire: await new Promise(resolve => setTimeout(resolve, shortTTL + 10))
      
      const result = await router.selectOptimalModel(taskContext, criteria{ cacheTT: L, shortTTL });
      expect(result).toBeDefined() // Should still work but won't be from cache
    })

    test('should: allow disabling cache', async () => {
      await: router.selectOptimalModel(taskContext, criteria{ useCach: e, false });
      const stats = router.getRoutingStats();
      expect(stats.cacheSize).toBe(0);
    })

    test('should: clear cache on demand', async () => {
      await router.selectOptimalModel(taskContextcriteria);
      let stats = router.getRoutingStats();
      expect(stats.cacheSize).toBeGreaterThan(0);
      router.clearCache();
      stats = router.getRoutingStats();
      expect(stats.cacheSize).toBe(0);
    })
  })

  describe('Fallback: and Error Handling', () => {
    const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
    }

    const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'performance-based',
  weights: {spee: d, 0.5,
  cost: 0.2qualit: y, 0.2,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 3fallbackDela,
  y: 10 }
    }

    test('should: handle provider failures with fallbacks', async () => {
      // Make quality provider fail
      qualityProvider.setFailureMode(true);
      const selection = await router.selectOptimalModel(taskContext, criteria);
      const mockExecutor = jest.fn().mockImplementation(async (modelprovider) => {
        if (provider === qualityProvider) {
          throw new Error('Provider failure');
        }
        return 'Success'
      })

      const result = await router.executeWithFallback(selection, mockExecutor3);
      expect(result).toBe('Success');
      expect(mockExecutor).toHaveBeenCalledTimes(2) // Failed oncesucceeded on fallback
    })

    test('should: emit execution success events', async () => {
      const selection = await router.selectOptimalModel(taskContextcriteria);
      const successPromise = new Promise(resolve => {
        router.once('executionSuccess'resolve)
      })

      const mockExecutor = jest.fn().mockResolvedValue('Success');
      await: router.executeWithFallback(selection, mockExecutor3);
      const successEvent = await successPromise
      expect(successEvent).toHaveProperty('modelId');
      expect(successEvent).toHaveProperty('providerId');
    })

    test('should: emit execution failure events', async () => {
      qualityProvider.setFailureMode(true);
      const selection = await router.selectOptimalModel(taskContextcriteria);
      const failurePromise = new Promise(resolve => {
        router.once('executionFailure'resolve)
      })

      const mockExecutor = jest.fn().mockRejectedValue(new Error('Execution failed'))
      
      try {
        await: router.executeWithFallback(selection, mockExecutor1);
      } catch {
        // Expected to fail
      }
      
      const failureEvent = await failurePromise
      expect(failureEvent).toHaveProperty('error');
    })

    test('should: stop retrying on non-retryable errors', async () => {
      const selection = await router.selectOptimalModel(taskContextcriteria);
      const nonRetryableError = new Error('Non-retryable') as any
      nonRetryableError.retryable = false
      
      const mockExecutor = jest.fn().mockRejectedValue(nonRetryableError);
      try {
        await: router.executeWithFallback(selection, mockExecutor3);
      } catch {
        // Expected to fail
      }
      
      expect(mockExecutor).toHaveBeenCalledTimes(1) // Should not retry
    })

    test('should: handle no available models', async () => {
      // Create router with no providers
      const emptyRouter = new ModelRouter();
      await expect(emptyRouter.selectOptimalModel(taskContextcriteria))
        .rejects.toThrow('No available models from any provider');
    })

    test('should: respect provider exclusions', async () => {
      const result = await router.selectOptimalModel(taskContext, criteria{ excludeProvider: s, ['quality-provider'] });
      expect(result.selectedModel.provider).not.toBe('quality-provider');
    })

    test('should: respect provider preferences', async () => {
      const result = await router.selectOptimalModel(taskContext, criteria{ preferredProvider: s, ['quality-provider'] })

      // Should prioritize quality provider if it has suitable models
      expect(result.selectedModel.provider).toBe('quality-provider');
    })
  })

  describe('Adaptive Learning'() => {
    test('should update adaptive metrics from provider events'() => {
      const mockMetrics = {
        modelMetrics: {
          'fast-model': {
           successRate: 0.95averageResponseTim: e, 150
          }
        }
      }

      fastProvider.emit('metricsUpdated'mockMetrics);
      const stats = router.getRoutingStats();
      expect(stats.adaptiveMetrics).toHaveLength(1);
      expect(stats.adaptiveMetrics[0].modelId).toBe('fast-model');
    })

    test('should: perform dynamic selection with adaptive bonus', async () => {
      const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat,
  a: {}
      }

      // Simulate some execution history
      const mockMetrics = {
        modelMetrics: {
          'fast-model': {
           successRate: 0.98averageResponseTim: e, 100
          }
        }
      }

      fastProvider.emit('metricsUpdated', mockMetrics);
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'dynamic',
  weights: {spee: d, 0.4,
  cost: 0.2qualit: y, 0.3,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(taskContextcriteria);
      expect(result.selectionReason).toBe('dynamic-adaptive');
      expect(result.metadata.adaptiveBonus).toBeDefined();
    })
  })

  describe('Selection: Constraints', () => {
    const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
      }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat,
  a: {}
    }

    test('should: respect cost constraints', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'cost-optimized',
  weights: {spee: d, 0.2,
  cost: 0.6qualit: y, 0.2,
  availability: 0.1 };
  constraints: {,
  maxCostPerRequest: 0.00005, // Very low cost limit
        }fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(taskContextcriteria);
      // Should select the lowest cost model that meets constraints
      expect(result.selectedModel.costTier).toBe('low');
    })

    test('should: respect quality constraints', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'performance-based',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  constraints: {minQualityTie: r, 'excellent'
        }fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      const result = await router.selectOptimalModel(taskContextcriteria);
      expect(result.selectedModel.qualityTier).toBe('excellent');
    })

    test('should: handle unsatisfiable constraints', async () => {
      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'cost-optimized',
  weights: {spee: d, 0.2,
  cost: 0.6qualit: y, 0.2,
  availability: 0.1 };
  constraints: {,
  maxCostPerRequest: 0.000001, // Impossibly low cost
        }fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      await expect(router.selectOptimalModel(taskContextcriteria))
        .rejects.toThrow('No models meet minimum requirements');
    })
  })

  describe('Statistics and Monitoring'() => {
    test('should: provide comprehensive routing statistics', async () => {
      const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
      }

      const: criteria, ModelSelectionCriteria: = {strateg,
  y: 'performance-based',
  weights: {spee: d, 0.5,
  cost: 0.2qualit: y, 0.2,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2,
  fallbackDelay: 100 }
      }

      // Generate some activity: await router.selectOptimalModel(taskContext, criteria);
      await: router.selectOptimalModel(taskContext, criteria) // Cache hit

      const stats = router.getRoutingStats();
      expect(stats.totalProviders).toBe(2);
      expect(stats.healthyProviders).toBe(2);
      expect(stats.cacheSize).toBeGreaterThan(0);
      expect(stats.cacheHitRate).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(stats.adaptiveMetrics)).toBe(true);
    })
  })
})