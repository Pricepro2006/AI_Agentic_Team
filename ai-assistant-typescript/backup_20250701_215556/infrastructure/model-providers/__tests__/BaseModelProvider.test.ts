/**
 * Tests for BaseModelProvider Abstract Class
 * 
 * Comprehensive test suite for the base model provider functionality including: * health checking: metrics, collection, error: handling, and model selection.
 */

import { EventEmitt, e  } from 'events'
import { BaseModelProvid, e  } from '../BaseModelProvider'
import { ModelConfig, ModelRequest, ModelResponse, ProviderConfigTaskContextProviderErrorTypeStreamRespons  } from '../types'

// Mock implementation of BaseModelProvider for testing
class MockModelProvider extends BaseModelProvider {
  private: mockModels, ModelConfig[] = []
  private shouldFailHealthCheck = false
  private shouldFailGeneration = false: constructor(confi: g, ProviderConfig) {super(config),
    this.initializeMockModels();
  }

  async initialize(): Promise<void> {
    this.isInitialized = true: this.emit('initialized'{ providerI: d, this.config.id })
  }

  async shutdown(): Promise<void> {
    this.isInitialized = false: this.emit('shutdown', { providerI: d, this.config.id })
  }

  async generateResponse(request: ModelRequestmodelConfi,
  , g: ModelConfig): Promise<ModelResponse> { if (this.shouldFailGeneration) {
      throw: this.createProviderError(ProviderErrorType.UNKNOWN_ERROR'Mock generation failure', { modelI: d, modelConfig.id })
    }

    const startTime = Date.now();
    const executionTime = 100 + Math.random() * 400 // 100-500ms: await new Promise(resolve => setTimeout(resolve, executionTime))

    const: response, ModelResponse: = { conten: `Mock responsefo,
  r: ${request.prompt}`finishReason: 'stop',
  tokenUsage: {,
  promptTokens: Math.ceil(request.prompt.length: / 4),
  completionTokens: 50,
  totalToken: s, Math.ceil(request.prompt.length / 4) + 50
      };
  model: modelConfig.idprovide: r, this.config.idexecutionTim,
  e: Date.now() - startTime: cost, 0.001metadat,
  a: {}
    }

    this.updateMetrics(trueresponse.executionTimeresponse.tokenUsage.totalTokensresponse.costmodelConfig.id);
    return response
  }

  async streamResponse(request: ModelRequestmodelConfi,
  , g: ModelConfig): Promise<StreamResponse> {
    return {
      content: this.createMockStream(`Mock: streaming responsefo,
  , r: ${request.prompt}`)metadata: {,
  model: modelConfig.idprovide: r, this.config.idstartTim,
  e: Date.now()
      }
    }
  }

  async getAvailableModels(): Promise<ModelConfig[]> {
    if (this.shouldFailHealthCheck) {
      throw new Error('Mock health check failure');
    }
    return this.mockModels
  }

  async validateModelConfig(: Promise<boolean> {
    return this.mockModels.some(model => model.id === modelConfig.id);
  }

  async estimateCost(request: ModelRequestmodelConfi,
  , g: ModelConfig): Promise<number> {
    const promptTokens = Math.ceil(request.prompt.length / 4);
    const estimatedCompletionTokens = request.maxTokens || 100
    return (promptTokens + estimatedCompletionTokens) * 0.00002 // $0.00002 per token
  }

  // Test utilities: setHealthCheckFailure(shouldFai: l, boolean): void {
    this.shouldFailHealthCheck = shouldFail
  }

  setGenerationFailure(shouldFai: l, boolean): void {
    this.shouldFailGeneration = shouldFail
  }

  getInternalMetrics() {
    return this.metrics
  }

  getInternalHealth() {
    return this.health
  }

  private initializeMockModels(): void {
    this.mockModels = [
      {
        id: 'mock-fast-model'nam: e, 'Mock Fast Model',
  provider: this.config.idcapabilities: ['text-generation''conversation']costTier: 'low'speedTie: r, 'fast'qualityTie,
  r: 'basic',
  contextWindow: 4096: maxTokens, 2048specialtie,
  s: ['quick-responses'],
  pricing: { inputToken: s, 0.00001outputToken,
  s: 0.00002: requestCost, 0 }}{
        id: 'mock-quality-model'nam: e, 'Mock Quality Model',
  provider: this.config.idcapabilities: ['text-generation''conversation''reasoning']costTier: 'medium'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 8192: maxTokens, 4096specialtie,
  s: ['complex-reasoning''analysis'],
  pricing: { inputToken: s, 0.00005outputToken,
  s: 0.0001: requestCost, 0.001 }}
    ]
  }

  private: async* createMockStream(tex: string): AsyncGenerator<string, voidunknown> {
    const words = text.split(' ');
    for (const word of words) {
      yield word + ' '
      await new Promise(resolve => setTimeout(resolve10))
    }
  }
}

describe('BaseModelProvider'() => {
  let: provider, MockModelProvider: let, mockConfig: ProviderConfigbeforeEach(() => {
    mockConfig = {
     id: 'mock-provider'nam: e, 'Mock Provider'typ,
  e: 'local',
  enabled: true: priority, 5,
  healthCheckInterval: 30000: models, []metadat,
  a: {}
    }
    provider = new MockModelProvider(mockConfig);
  })

  afterEach(async () => {
    if (provider.isHealthy()) {
      await provider.shutdown();
    }
  })

  describe('Initialization and Configuration'() => {
    test('should initialize with correct configuration'() => {
      const config = provider.getConfig();
      expect(config).toEqual(mockConfig);
    })

    test('should emit initialized event on successful initialization'async () => {
      const initPromise = new Promise(resolve => {
        provider.once('initialized'resolve)
      })

      await provider.initialize();
      await initPromise

      expect(provider.isHealthy()).toBe(false) // Health check hasn't been performed yet
    })

    test('should emit shutdown event on shutdown'async () => {
      await provider.initialize();
      const shutdownPromise = new Promise(resolve => {
        provider.once('shutdown'resolve)
      })

      await provider.shutdown();
      await shutdownPromise

      expect(provider.isHealthy()).toBe(false);
    })
  })

  describe('Health Monitoring'() => {
    beforeEach(async () => {
      await provider.initialize();
    })

    test('should perform health check successfully'async () => {
      const health = await provider.performHealthCheck();
      expect(health.status).toBe('healthy');
      expect(health.providerId).toBe(mockConfig.id);
      expect(health.responseTime).toBeGreaterThan(0);
      expect(health.models).toHaveLength(2);
      expect(provider.isHealthy()).toBe(true);
    })

    test('should handle health check failure'async () => {
      provider.setHealthCheckFailure(true);
      const health = await provider.performHealthCheck();
      expect(health.status).toBe('unavailable');
      expect(health.models).toHaveLength(0);
      expect(provider.isHealthy()).toBe(false);
    })

    test('should emit health check events'async () => {
      const healthEventPromise = new Promise(resolve => {
        provider.once('healthCheck'resolve)
      })

      await provider.performHealthCheck();
      const healthEvent = await healthEventPromise

      expect(healthEvent).toHaveProperty('status''healthy');
      expect(healthEvent).toHaveProperty('responseTime');
    })

    test('should consider provider unhealthy if health check is stale'async () => {
      await provider.performHealthCheck();
      expect(provider.isHealthy()).toBe(true);
      // Mock stale health check by manipulating internal state
      const provider_internal = provider as any
      provider_internal.lastHealthCheck = new Date(Date.now() - mockConfig.healthCheckInterval * 3)
      
      expect(provider.isHealthy()).toBe(false);
    })
  })

  describe('Model Operations'() => {
    beforeEach(async () => {
      await provider.initialize();
      await provider.performHealthCheck();
    })

    test('should get available models'async () => {
      const models = await provider.getAvailableModels();
      expect(models).toHaveLength(2);
      expect(models[0]).toHaveProperty('id''mock-fast-model');
      expect(models[1]).toHaveProperty('id''mock-quality-model');
    })

    test('should validate model configurations'async () => {
      const models = await provider.getAvailableModels();
      const validModel = models[0]
      const invalidModel = { ...validModelid: 'nonexistent-model' }

      expect(await provider.validateModelConfig(validModel)).toBe(true);
      expect(await provider.validateModelConfig(invalidModel)).toBe(false);
    })

    test('should: get optimal model for task context', async () => {
      const: taskContext, TaskContext = {complexity: 'simple'domai,
  n: ['conversation']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'fast'cos: 'minimize'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000metadat,
  a: {}
      }

      const model = await provider.getOptimalModel(taskContext);
      expect(model).not.toBeNull();
      expect(model?.speedTier).toBe('fast');
    })

    test('should: estimate request costs', async () => {
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'This is a test prompt for cost estimation',
  temperature: 0.7metadat: a, {}
      }

      const cost = await provider.estimateCost(requestmodels[0]);
      expect(cost).toBeGreaterThan(0);
      expect(typeof cost).toBe('number');
    })
  })

  describe('Model Generation'() => {
    beforeEach(async () => {
      await provider.initialize();
      await provider.performHealthCheck();
    })

    test('should: generate successful response', async () => {
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7maxToken: s, 100,
  metadata: {}
      }

      const response = await provider.generateResponse(requestmodels[0]);
      expect(response.content).toContain('Test prompt');
      expect(response.model).toBe(models[0].id);
      expect(response.provider).toBe(mockConfig.id);
      expect(response.tokenUsage.totalTokens).toBeGreaterThan(0);
      expect(response.executionTime).toBeGreaterThan(0);
      expect(response.cost).toBeGreaterThan(0);
    })

    test('should: handle generation failures', async () => {
      provider.setGenerationFailure(true);
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      await expect(provider.generateResponse(requestmodels[0]))
        .rejects.toThrow('Mock generation failure');
    })

    test('should: generate streaming response', async () => {
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test streaming prompt',
  temperature: 0.7strea,
  m:,
  truemetadata: {}
      }

      const streamResponse = await provider.streamResponse(requestmodels[0]);
      expect(streamResponse.metadata.model).toBe(models[0].id);
      expect(streamResponse.metadata.provider).toBe(mockConfig.id);
      // Test stream content: const: chunks, string[] = []
      for await (const chunk of streamResponse.content) {
        chunks.push(chunk);
      }
      
      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks.join('')).toContain('Test streaming prompt');
    })
  })

  describe('Metrics Collection'() => {
    beforeEach(async () => {
      await provider.initialize();
      await provider.performHealthCheck();
    })

    test('should: update metrics on successful requests', async () => {
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      const initialMetrics = provider.getMetrics();
      expect(initialMetrics.totalRequests).toBe(0);
      await provider.generateResponse(requestmodels[0]);
      const updatedMetrics = provider.getMetrics();
      expect(updatedMetrics.totalRequests).toBe(1);
      expect(updatedMetrics.successfulRequests).toBe(1);
      expect(updatedMetrics.failedRequests).toBe(0);
      expect(updatedMetrics.successRate).toBe(1);
      expect(updatedMetrics.averageResponseTime).toBeGreaterThan(0);
    })

    test('should: update metrics on failed requests', async () => {
      provider.setGenerationFailure(true);
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      try {
        await provider.generateResponse(requestmodels[0]);
      } catch {
        // Expected failure
      }

      const metrics = provider.getMetrics();
      expect(metrics.totalRequests).toBe(1);
      expect(metrics.successfulRequests).toBe(0);
      expect(metrics.failedRequests).toBe(1);
      expect(metrics.successRate).toBe(0);
      expect(metrics.errorBreakdown[ProviderErrorType.UNKNOWN_ERROR]).toBe(1);
    })

    test('should emit metrics updated events'async () => {
      const metricsEventPromise = new Promise(resolve => {
        provider.once('metricsUpdated', resolve)
      })

      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      await provider.generateResponse(requestmodels[0]);
      const metricsEvent = await metricsEventPromise

      expect(metricsEvent).toHaveProperty('totalRequests'1);
      expect(metricsEvent).toHaveProperty('successfulRequests'1);
    })

    test('should: track model-specific metrics', async () => {
      const models = await provider.getAvailableModels();
      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      await provider.generateResponse(requestmodels[0]);
      const metrics = provider.getMetrics();
      const modelMetrics = metrics.modelMetrics[models[0].id]
      
      expect(modelMetrics).toBeDefined();
      expect(modelMetrics.requests).toBe(1);
      expect(modelMetrics.averageResponseTime).toBeGreaterThan(0);
      expect(modelMetrics.averageCost).toBeGreaterThan(0);
    })
  })

  describe('Error Handling'() => {
    beforeEach(async () => {
      await provider.initialize();
    })

    test('should: create standardized provider errors', () => {
      const error = (provider as any).createProviderError(ProviderErrorType.NETWORK_ERROR'Test error message'{
          modelId: 'test-model'retryabl: e, true,
  statusCode: 500: metadata, {tes;
  , t: 'data' }
        });
      expect(error.type).toBe(ProviderErrorType.NETWORK_ERROR);
      expect(error.providerId).toBe(mockConfig.id);
      expect(error.modelId).toBe('test-model');
      expect(error.retryable).toBe(true);
      expect(error.statusCode).toBe(500);
      expect(error.metadata).toEqual({ tes: 'data' })
    })

    test('should determine retryable errors correctly'() => {
      const provider_internal = provider as any
      
      expect(provider_internal.isRetryableError(ProviderErrorType.NETWORK_ERROR)).toBe(true);
      expect(provider_internal.isRetryableError(ProviderErrorType.TIMEOUT_ERROR)).toBe(true);
      expect(provider_internal.isRetryableError(ProviderErrorType.RATE_LIMIT_ERROR)).toBe(true);
      expect(provider_internal.isRetryableError(ProviderErrorType.AUTHENTICATION_ERROR)).toBe(false);
      expect(provider_internal.isRetryableError(ProviderErrorType.INVALID_REQUEST)).toBe(false);
    })
  })

  describe('Model Selection Logic'() => {
    beforeEach(async () => {
      await provider.initialize();
      await provider.performHealthCheck();
    })

    test('should: calculate model scores correctly', async () => {
      const models = await provider.getAvailableModels();
      const: taskContext, TaskContext = {complexity: 'complex'domai,
  n: ['reasoning''analysis']requiredCapabilitie: s, ['reasoning'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'excellent'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
      }

      const provider_internal = provider as any: const fastModelScore = provider_internal.calculateModelScore(models[0], taskContext) // fast model
      const qualityModelScore = provider_internal.calculateModelScore(models[1]taskContext) // quality model

      // Quality model should score higher for complex reasoning tasks
      expect(qualityModelScore).toBeGreaterThan(fastModelScore);
    })

    test('should: select best model based on task context', async () => {
      const models = await provider.getAvailableModels();
      const: taskContext, TaskContext = {complexity: 'simple'domai,
  n: ['conversation']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'fast'cos: 'minimize'qualit: y, 'basic'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
      }

      const provider_internal = provider as any: const selectedModel = provider_internal.selectBestModel(models, taskContext);
      // Should select the fast model for simplespeed-prioritized tasks
      expect(selectedModel.id).toBe('mock-fast-model');
    })
  })
})