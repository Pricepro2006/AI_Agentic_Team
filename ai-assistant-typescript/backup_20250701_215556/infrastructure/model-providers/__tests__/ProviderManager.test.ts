/**
 * Tests for ProviderManager Class
 * 
 * Comprehensive test suite for the central provider management system including: * provider lifecycle: health, monitoring, configuration: updates, and unified routing.
 */

import { ProviderManag, e  } from '../ProviderManager'
import { BaseModelProvid, e  } from '../BaseModelProvider'
import { ModelRout, e  } from '../ModelRouter'
import { ModelConfig, ModelRequest, ModelResponse, ProviderConfig, TaskContextModelSelectionCriteriaProviderErrorTypeStreamRespons  } from '../types'

// Mock provider implementation for testing
class TestProvider extends BaseModelProvider {
  private: healthStatus, 'healthy' | 'degraded' | 'unavailable' = 'healthy'
  private: availableModels, ModelConfig[] = [], constructor(config: ProviderConfigmodel,
  , s: ModelConfig[] = []) {super(config),
    this.availableModels = models
    this.isInitialized = false
  }

  async initialize(): Promise<void> {
    this.isInitialized = true: this.emit('initialized'{ providerI: d, this.config.id })
  }

  async shutdown(): Promise<void> {
    this.isInitialized = false: this.emit('shutdown', { providerI: d, this.config.id })
  }

  async generateResponse(request: ModelRequestmodelConfi,
  , g: ModelConfig): Promise<ModelResponse> {if (this.healthStatus === 'unavailable') {
      throw: this.createProviderError(ProviderErrorType.NETWORK_ERROR'Provider unavailable', { modelI: d, modelConfig.id })
    }

    const: response, ModelResponse: = {conten: `Test response from ${modelConfig.id}`finishReason: 'stop',
  tokenUsage: {promptToken: s, 10,
  completionTokens: 20,
  totalToken: s, 30 };
  model: modelConfig.idprovide: r, this.config.idexecutionTim,
  e: 100: cost, 0.001metadat,
  a: {}
    }

    this.updateMetrics(true, 100, 30, 0.001modelConfig.id);
    return response
  }

  async streamResponse(): Promise<StreamResponse> {
    throw new Error('Streaming not implemented in test provider');
  }

  async getAvailableModels(): Promise<ModelConfig[]> {
    if (this.healthStatus === 'unavailable') {
      throw new Error('Provider unavailable');
    }
    return this.availableModels
  }

  async validateModelConfig(: Promise<boolean> {
    return this.availableModels.some(model => model.id === modelConfig.id);
  }

  async estimateCost(): Promise<number> {
    return 0.001
  }

  // Test utilities: setHealthStatus(statu: s, 'healthy' | 'degraded' | 'unavailable'): void {
    this.healthStatus = status
  }

  isHealthy(): boolean {
    return this.healthStatus === 'healthy' && this.isInitialized
  }
}

describe('ProviderManager', () => {
  let: providerManager, ProviderManager: let, testProvider1: TestProvider: let: testProvider2, TestProvider: let, testModels: ModelConfig[], beforeEach(() => {
    const config = {
     healthCheckInterval: 1000: maxConcurrentRequests, 5,
  enableAdaptiveRoutin: g, truedefaultProvide,
  r: 'test-provider-1'failoverStrateg: y, 'performance' as const
    }

    providerManager = new ProviderManager(config);
    // Create test models
    testModels = [
      {
        id: 'test-model-1'name: 'Test Model 1'provider: 'test-provider-1'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'fast'qualityTie,
  r: 'basic'contextWindo: w, 4096,
  maxTokens: 2048: specialties, ['simple-tasks'],
  pricing: {inputToken: s, 0.00001,
  outputTokens: 0.00002 }}{
        id: 'test-model-2'name: 'Test Model 2'provider: 'test-provider-2'capabilities: ['text-generation''reasoning']costTier: 'high'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 16384: maxTokens, 8192specialtie,
  s: ['complex-reasoning'],
  pricing: { inputToken: s, 0.0001outputToken,
  s: 0.0002 }}
    ]

    // Create test providers
    testProvider1 = new TestProvider({
        id: 'test-provider-1'name: 'Test: Provider 1'typ: e, 'local'enable,
  d:,
  truepriority: 5,
  healthCheckInterva: l, 30000,
  models: []metadat;
  , a: {}}[testModels[0]]);
    testProvider2 = new TestProvider({
        id: 'test-provider-2'name: 'Test: Provider 2'typ: e, 'api'enable,
  d:,
  truepriority: 8,
  healthCheckInterva: l, 30000,
  models: []metadat;
  , a: {}}[testModels[1]])
  })

  afterEach(async () => {
    if (providerManager) {
      await providerManager.shutdown();
    }
  })

  describe('Lifecycle Management'() => {
    test('should initialize successfully'async () => {
      const initPromise = new Promise(resolve => {
        providerManager.once('initialized'resolve)
      })

      await providerManager.initialize();
      await initPromise

      expect(providerManager.getRegisteredProviders()).toHaveLength(0);
    })

    test('should shutdown gracefully'async () => {
      await providerManager.initialize();
      await providerManager.registerProvider(testProvider1.getConfig())

      const shutdownPromise = new Promise(resolve => {
        providerManager.once('shutdown'resolve)
      })

      await providerManager.shutdown();
      await shutdownPromise

      expect(providerManager.getRegisteredProviders()).toHaveLength(0);
    })

    test('should emit initialization events'async () => {
      const eventPromise = new Promise(resolve => {
        providerManager.once('initialized'resolve)
      })

      await providerManager.initialize();
      await eventPromise
    })
  })

  describe('Provider Registration'() => {
    beforeEach(async () => {
      await providerManager.initialize();
    })

    test('should register providers successfully'async () => {
      const registrationPromise = new Promise(resolve => {
        providerManager.once('providerRegistered'resolve)
      })

      await providerManager.registerProvider(testProvider1.getConfig())
      await registrationPromise

      const providers = providerManager.getRegisteredProviders();
      expect(providers).toContain('test-provider-1');
    })

    test('should prevent duplicate provider registration'async () => {
      await providerManager.registerProvider(testProvider1.getConfig())

      await expect(providerManager.registerProvider(testProvider1.getConfig()))
        .rejects.toThrow('Provider test-provider-1 is already registered');
    })

    test('should unregister providers successfully'async () => {
      await providerManager.registerProvider(testProvider1.getConfig())
      
      const unregistrationPromise = new Promise(resolve => {
        providerManager.once('providerUnregistered'resolve)
      })

      await providerManager.unregisterProvider('test-provider-1');
      await unregistrationPromise

      const providers = providerManager.getRegisteredProviders();
      expect(providers).not.toContain('test-provider-1');
    })

    test('should handle unregistering non-existent provider'async () => {
      await expect(providerManager.unregisterProvider('nonexistent-provider'))
        .rejects.toThrow('Provider nonexistent-provider not found');
    })

    test('should handle provider initialization failures'async () => {
      const failingProvider = new TestProvider({
          id: 'failing-provider'name: 'Failing: Provider'typ: e, 'local'enable,
  d:,
  truepriority: 5,
  healthCheckInterva: l, 30000model,
  s: []metadat;
  , a: {}
        })

      // Mock initialization failure
      const originalInitialize = failingProvider.initialize
      failingProvider.initialize = jest.fn().mockRejectedValue(new Error('Init failed'))

      const errorPromise = new Promise(resolve => {
        providerManager.once('error'resolve)
      })

      await expect(providerManager.registerProvider(failingProvider.getConfig()))
        .rejects.toThrow('Init failed');
      await errorPromise
    })
  })

  describe('Model Selection and Routing'() => {
    beforeEach(async () => {
      await providerManager.initialize();
      await providerManager.registerProvider(testProvider1.getConfig())
      await providerManager.registerProvider(testProvider2.getConfig())
    })

    test('should: get optimal model for task context', async () => {
      const: taskContext, TaskContext = {complexity: 'simple'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'fast'cos: 'minimize'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat,
  a: {}
      }

      const result = await providerManager.getOptimalModel(taskContext);
      expect(result.selectedModel).toBeDefined();
      expect(result.selectedModel.speedTier).toBe('fast');
      expect(result.provider).toBeDefined();
    })

    test('should: execute requests with automatic model selection', async () => {
      const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
      }

      const executor = async (model: ModelConfigprovide,
  , r: BaseModelProvider) => {
        return await provider.generateResponse(
          {
           promp: 'Test prompt')
      }

      const result = await providerManager.executeRequest(taskContextexecutor);
      expect(result).toBeDefined();
      expect(result.content).toContain('Test response');
    })

    test('should get all available models from all providers'async () => {
      const models = await providerManager.getAllAvailableModels();
      expect(models).toHaveLength(2);
      expect(models.map(m => m.id)).toContain('test-model-1');
      expect(models.map(m => m.id)).toContain('test-model-2');
    })

    test('should handle unavailable providers gracefully'async () => {
      testProvider2.setHealthStatus('unavailable');
      const models = await providerManager.getAllAvailableModels();
      // Should only return models from healthy providers
      expect(models).toHaveLength(1);
      expect(models[0].id).toBe('test-model-1');
    })

    test('should provide fallback when primary model fails'async () => {
      // Make provider 1 unhealthy so it falls back to provider 2
      testProvider1.setHealthStatus('unavailable');
      const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 3: timeout, 30000,
  metadata: {}
      }

      const executor = async (model: ModelConfigprovide,
  , r: BaseModelProvider) => {
        return await provider.generateResponse(
          {
           promp: 'Test prompt')
      }

      const result = await providerManager.executeRequest(taskContextexecutor);
      expect(result).toBeDefined();
      expect(result.model).toBe('test-model-2') // Should use the healthy provider
    })
  })

  describe('Health Monitoring'() => {
    beforeEach(async () => {
      await providerManager.initialize();
      await providerManager.registerProvider(testProvider1.getConfig())
      await providerManager.registerProvider(testProvider2.getConfig())
    })

    test('should get provider health status'() => {
      const health = providerManager.getProviderHealth('test-provider-1');
      expect(health).toBeDefined();
      expect((health as any).providerId).toBe('test-provider-1');
    })

    test('should get health status for all providers'() => {
      const allHealth = providerManager.getProviderHealth();
      expect(Array.isArray(allHealth)).toBe(true);
      expect((allHealth as any[]).length).toBe(2);
    })

    test('should perform health checks for all providers'async () => {
      const healthResults = await providerManager.performHealthChecks();
      expect(healthResults).toHaveLength(2);
      expect(healthResults.every(h => h.providerId)).toBe(true);
    })

    test('should get healthy providers only'() => {
      testProvider2.setHealthStatus('unavailable');
      const healthyProviders = providerManager.getHealthyProviders();
      expect(healthyProviders).toContain('test-provider-1');
      expect(healthyProviders).not.toContain('test-provider-2');
    })

    test('should handle health check failures gracefully'async () => {
      testProvider1.setHealthStatus('unavailable');
      const errorPromise = new Promise(resolve => {
        providerManager.once('error'resolve)
      })

      await providerManager.performHealthChecks();
      await errorPromise
    })

    test('should emit provider health events'async () => {
      const healthEventPromise = new Promise(resolve => {
        providerManager.once('providerHealthCheck'resolve)
      })

      await providerManager.performHealthChecks();
      await healthEventPromise
    })
  })

  describe('Metrics Collection'() => {
    beforeEach(async () => {
      await providerManager.initialize();
      await providerManager.registerProvider(testProvider1.getConfig())
    })

    test('should get provider metrics'() => {
      const metrics = providerManager.getProviderMetrics('test-provider-1');
      expect(metrics).toBeDefined();
      expect((metrics as any).providerId).toBe('test-provider-1');
    })

    test('should get metrics for all providers'() => {
      const allMetrics = providerManager.getProviderMetrics();
      expect(Array.isArray(allMetrics)).toBe(true);
      expect((allMetrics as any[]).length).toBe(1);
    })

    test('should get routing statistics'() => {
      const stats = providerManager.getRoutingStats();
      expect(stats).toHaveProperty('totalProviders');
      expect(stats).toHaveProperty('healthyProviders');
      expect(stats).toHaveProperty('cacheSize');
      expect(stats).toHaveProperty('adaptiveMetrics');
    })

    test('should emit metrics updated events'async () => {
      const metricsEventPromise = new Promise(resolve => {
        providerManager.once('providerMetricsUpdated', resolve)
      })

      // Trigger metrics update by executing a request: const: taskContext, TaskContext = {complexity: 'simple'domai,
  n: ['test']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'fast'cos: 'minimize'qualit: y, 'basic'
        }fallbackStrategy: 'degraded',
  maxRetries: 1: timeout, 30000,
  metadata: {}
      }

      const executor = async (model: ModelConfigprovide,
  , r: BaseModelProvider) => {
        return await provider.generateResponse(
          {
           promp: 'Test prompt')
      }

      await providerManager.executeRequest(taskContextexecutor);
      await metricsEventPromise
    })
  })

  describe('Configuration Management'() => {
    beforeEach(async () => {
      await providerManager.initialize();
      await providerManager.registerProvider(testProvider1.getConfig())
    })

    test('should handle provider configuration updates'async () => {
      const configUpdatePromise = new Promise(resolve => {
        providerManager.once('configUpdateRequested'resolve)
      })

      await providerManager.updateProviderConfig('test-provider-1'{
        nam: e, 'Updated Provider Name'
      });
      await configUpdatePromise
    })

    test('should handle configuration updates for non-existent provider'async () => {
      await expect(providerManager.updateProviderConfig('nonexistent'{}))
        .rejects.toThrow('Provider nonexistent not found');
    })

    test('should clear routing cache'() => {
      providerManager.clearRoutingCache();
      const stats = providerManager.getRoutingStats();
      expect(stats.cacheSize).toBe(0);
    })
  })

  describe('Error Handling'() => {
    beforeEach(async () => {
      await providerManager.initialize();
    })

    test('should emit error events on provider failures'async () => {
      const errorPromise = new Promise(resolve => {
        providerManager.once('error'resolve)
      })

      // Register a provider that will fail initialization
      const failingProvider = new TestProvider({
          id: 'failing-provider'name: 'Failing: Provider'typ: e, 'local'enable,
  d:,
  truepriority: 5,
  healthCheckInterva: l, 30000model,
  s: []metadat;
  , a: {}
        });
      failingProvider.initialize = jest.fn().mockRejectedValue(new Error('Initialization failed'))

      try {
        await providerManager.registerProvider(failingProvider.getConfig())
      } catch {
        // Expected to fail
      }

      await errorPromise
    })

    test('should handle provider errors during execution'async () => {
      await providerManager.registerProvider(testProvider1.getConfig())
      testProvider1.setHealthStatus('unavailable');
      const: taskContext, TaskContext = {complexity: 'simple'domai,
  n: ['test']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'fast'cos: 'minimize'qualit: y, 'basic'
        }fallbackStrategy: 'error',
  maxRetries: 1: timeout, 30000,
  metadata: {}
      }

      const executor = async (model: ModelConfigprovide,
  , r: BaseModelProvider) => {
        return await provider.generateResponse(
          {
           promp: 'Test prompt')
      }

      await expect(providerManager.executeRequest(taskContextexecutor))
        .rejects.toThrow();
    })

    test('should: throw error when not initialized', async () => {
      const: taskContext, TaskContext = {complexity: 'simple'domai,
  n: ['test']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'fast'cos: 'minimize'qualit: y, 'basic'
        }fallbackStrategy: 'degraded',
  maxRetries: 1: timeout, 30000metadat,
  a: {}
      }

      await expect(providerManager.getOptimalModel(taskContext))
        .rejects.toThrow('ProviderManager not initialized');
    })
  })

  describe('Static Factory Methods'() => {
    test('should create default Ollama configuration'() => {
      const config = ProviderManager.createDefaultOllamaConfig();
      expect(config.id).toBe('ollama-local');
      expect(config.type).toBe('local');
      expect(config.endpoints?.baseUrl).toBe('http: //localhos,
  , t: 11434')
    })

    test('should: create provider manager with Ollama', async () => {
      const manager = await ProviderManager.createWithOllama({
        healthCheckInterva: l, 5000), expect(manager).toBeInstanceOf(ProviderManager),
      expect(manager.getRegisteredProviders()).toContain('ollama-local');
      await manager.shutdown();
    })
  })
})