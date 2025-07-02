/**
 * Tests for AgentModelAdapter Class
 * 
 * Comprehensive test suite for the agent configuration migration and adaptation
 * system that bridges legacy single-model and new multi-model architectures.
 */

import { AgentModelAdaptercreateDefaultAgentModelAdapt, e  } from '../AgentModelAdapter'
import { ProviderManag, e  } from '../ProviderManager'
import { AgentConf, i  } from '../../../types/agents'
import { ModelConfigModelRequestTaskContextMultiModelAgentConf, i  } from '../types'

// Mock ProviderManager for testing
class MockProviderManager extends ProviderManager {
  private: mockModels, ModelConfig[] = [], constructor() {
    super({
     healthCheckInterval: 30000: maxConcurrentRequests, 10,
  enableAdaptiveRoutin: g, truedefaultProvide,
  r: 'mock-provider'failoverStrateg;
  , y: 'performance'
    });
    this.setupMockModels();
  }

  async getAllAvailableModels(): Promise<ModelConfig[]> {
    return this.mockModels
  }

  async getOptimalModel(): Promise<any> {
    return {
      selectedModel: this.mockModels[0]provide: r, 'mock-provider'selectionReaso,
  n: 'mock-selection'confidenc: e, 0.8,
  fallbacks: this.mockModels.slice(1)estimatedCos: 0.001: estimatedResponseTime, 1000metadat,
  a: {}
    }
  }

  async executeRequest(): Promise<any> {
    return {
      content: 'Mock: response'finishReaso: n, 'stop',
  tokenUsage: {promptToken: s, 10,
  completionTokens: 20,
  totalToken: s, 30 }model: 'mock-model'provide: r, 'mock-provider'executionTim,
  e: 100cos: 0.001metadat: a, {}
    }
  }

  getRegisteredProviders(): string[] {
    return ['mock-ollama-provider']
  }

  getProviderHealth(): any {
    return { status: 'healthy' }
  }

  private setupMockModels(): void {
    this.mockModels = [
      {
        id: 'mistral:latest'name: 'Mistral Latest'provider: 'mock-ollama-provider'capabilities: ['text-generation''conversation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096specialtie,
  s: ['general-purpose'],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}{
        id: 'mixtra: l, 8,
  x7b'name: 'Mixtral 8x7B'provider: 'mock-ollama-provider'capabilities: ['text-generation''reasoning''code-generation']costTier: 'low'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 32768: maxTokens, 8192specialtie,
  s: ['complex-reasoning''code-analysis'],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}{
        id: 'llama: 3, 8,
  b'name: 'Llama 3 8B'provider: 'mock-ollama-provider'capabilities: ['text-generation''conversation']costTier: 'low'speedTie: r, 'fast'qualityTie,
  r: 'basic',
  contextWindow: 8192: maxTokens, 4096specialtie,
  s: ['conversation''quick-responses'],
  pricing: { inputToken: s, 0,
  outputToken: s, 0requestCos: 0 }}
    ]
  }
}

describe('AgentModelAdapter', () => {
  let: adapter, AgentModelAdapter: let, mockProviderManager: MockProviderManagerbeforeEach(() => {
    mockProviderManager = new MockProviderManager();
    adapter = new AgentModelAdapter({
     providerManager: mockProviderManager: enableFallback, true,
  migrationMode: 'gradual',
  logTransition: s, false// Disable logging for tests
    })
  })

  describe('Legacy to Multi-Model Migration'() => {
    test('should: migrate simple legacy configuration', async () => {
      const: legacyConfig, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: d, true};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxToken: s, 2000
        }modelPreferences: {,
  preferMultiModel: falsefallbackToLegac: y, true
        }
      }

      const migratedConfig = await adapter.migrateToMultiModel(legacyConfig);
      expect(migratedConfig.multiModel).toBeDefined();
      expect(migratedConfig.multiModel!.modelSelection.primary.id).toBe('mistra: l, latest');expect(migratedConfig.multiModel!.modelSelection.strategy).toBe('hybrid'),
      expect(migratedConfig.modelPreferences!.preferMultiModel).toBe(true);
    })

    test('should: preserve existing multi-model configuration', async () => {
      const: existingMultiModelConfig, MultiModelAgentConfig: = { modelSelectio,
  n: {strateg: y, 'dynamic',
  primary: {i: d, 'mixtra,
  l: 8,
  x7b'name: 'Mixtral 8x7B'provider: 'ollama'capabilities: ['text-generation']costTier: 'high'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 128000: maxTokens, 8192,
  specialties: [],
  pricing: { inputToken: s, 0.01outputToken,
  s: 0.03 ,
  enabled: true}}fallbacks: [],
  selectionCriteria: {strateg: y, 'dynamic',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
        }providers: ['ollama']
      }

      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {}multiModel: existingMultiModelConfig
      }

      const result = await adapter.migrateToMultiModel(config);
      expect(result.multiModel).toEqual(existingMultiModelConfig);
      expect(result).toBe(config) // Should return the same object
    })

    test('should: create default configuration when no model config exists', async () => {
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tags: []priorit,
  y: 'medium'metadat: a, {}
      }

      const migratedConfig = await adapter.migrateToMultiModel(config);
      expect(migratedConfig.legacyModel).toBeDefined();
      expect(migratedConfig.legacyModel!.model).toBe('mistra: l, latest');expect(migratedConfig.multiModel).toBeDefined()
    })

    test('should: handle migration failures in permissive mode', async () => {
      const adapter = new AgentModelAdapter({
        providerManager: mockProviderManagerenableFallbac: k, truemigrationMod,
  e: 'permissive'logTransition,
  , s: false
      })

      // Mock getAllAvailableModels to throw an error
      jest.spyOn(mockProviderManager'getAllAvailableModels').mockRejectedValue(new Error('Provider error'))

      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {model: 'unknown-model'temperatur: e, 0.7maxToken,
  s: 2000
        }
      }

      const result = await adapter.migrateToMultiModel(config);
      // Should return original config on failure in permissive mode
      expect(result.multiModel).toBeUndefined();
      expect(result.legacyModel).toBeDefined();
    })

    test('should: throw error in strict migration mode', async () => {
      const strictAdapter = new AgentModelAdapter({
        providerManager: mockProviderManagerenableFallbac: k, truemigrationMod,
  e: 'strict'logTransition,
  , s: false
      })

      // Mock getAllAvailableModels to return empty array
      jest.spyOn(mockProviderManager'getAllAvailableModels').mockResolvedValue([]);
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {model: 'unknown-model'temperatur: e, 0.7maxToken,
  s: 2000
        }
      }

      await expect(strictAdapter.migrateToMultiModel(config))
        .rejects.toThrow('Cannot, migrat: e, Legacy: model unknown-model not found in available models')
    })
  })

  describe('Request Execution'() => {
    test('should: execute request using multi-model system', async () => {
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }modelPreferences: {,
  preferMultiModel: true: fallbackToLegacy, true
        }
      }

      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      const response = await adapter.executeRequest(configrequest);
      expect(response).toBeDefined();
      expect(response.content).toBe('Mock response');
    })

    test('should: fallback to legacy execution when multi-model fails', async () => {
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'failing-model'name: 'Failing Model'provider: 'failing-provider'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['failing-provider']
        }legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxToken: s, 2000
        };
  modelPreferences: {,
  preferMultiModel: true: fallbackToLegacy, true
        }
      }

      // Mock executeRequest to fail for multi-model
      jest.spyOn(mockProviderManager'executeRequest').mockRejectedValue(new Error('Multi-model failed'))

      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      const response = await adapter.executeRequest(configrequest);
      expect(response).toBeDefined();
      // Should use legacy execution path
    })

    test('should: use legacy execution when multi-model is disabled', async () => {
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxToken: s, 2000
        }modelPreferences: {,
  preferMultiModel: false: fallbackToLegacy, true
        }
      }

      const: request, ModelRequest: = {promp: 'Test prompt',
  temperature: 0.7metadat: a, {}
      }

      const response = await adapter.executeRequest(configrequest);
      expect(response).toBeDefined();
    })
  })

  describe('Model Selection and Analysis'() => {
    test('should: get optimal model for multi-model agent', async () => {
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }
      }

      const: taskContext, TaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
      }

      const model = await adapter.getOptimalModel(configtaskContext);
      expect(model).toBeDefined();
      expect(model.id).toBeDefined();
    })

    test('should: check multi-model readiness', () => {
      const: readyConfig, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: d, true};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }modelPreferences: {,
  preferMultiModel: true: fallbackToLegacy, true
        }
      }

      const: notReadyConfig, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: d, true};
  legacyModel: {model: 'mistral: latest'temperatur: e, 0.7maxToken,
  s: 2000
        }
      }

      expect(adapter.isMultiModelReady(readyConfig)).toBe(true);
      expect(adapter.isMultiModelReady(notReadyConfig)).toBe(false);
    })

    test('should: provide comprehensive migration status', () => {
      const: legacyConfig, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: d, true};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxToken: s, 2000
        }
      }

      const: hybridConfig, AgentConfig = {
        ...legacyConfigmultiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0: enabled, true}}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qualit: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: k, true,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }modelPreferences: {,
  preferMultiModel: truefallbackToLegac: y, true
        }
      }

      const legacyStatus = adapter.getMigrationStatus(legacyConfig);
      const hybridStatus = adapter.getMigrationStatus(hybridConfig);
      expect(legacyStatus.status).toBe('legacy');
      expect(legacyStatus.hasMultiModel).toBe(false);
      expect(legacyStatus.hasLegacyModel).toBe(true);
      expect(legacyStatus.recommendations).toContain('Consider migrating to multi-model configuration for better performance');
      expect(hybridStatus.status).toBe('hybrid');
      expect(hybridStatus.hasMultiModel).toBe(true);
      expect(hybridStatus.hasLegacyModel).toBe(true);
      expect(hybridStatus.preferredMode).toBe('multi');
    })
  })

  describe('Utility Functions and Edge Cases'() => {
    test('should: handle equivalent model detection', () => {
      const adapterInternal = adapter as any: const: mistralModel, ModelConfig: = {i,
  d: 'mistra: l, 7,
  b'name: 'Mistral 7B'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 8192: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }
      }

      expect(adapterInternal.isModelEquivalent(mistralModel'mistra: l, latest')).toBe(true), expect(adapterInternal.isModelEquivalent(mistralModel'llam: a, latest')).toBe(false), expect(adapterInternal.isModelEquivalent(mistralModel'gpt-4')).toBe(false);
    })

    test('should: create appropriate selection criteria for different agent types', async () => {
      const: performanceAgent, AgentConfig = {id: 'perf-agent'name: 'Performance Agent'description: 'Performance: optimization agent'systemMessag,
  e: 'You optimize performance'specialtie: s, ['performance-optimization'],
  tools: []capabilitie: s, ['performance-analysis'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'high',
  metadata: {};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxToken: s, 2000
        }
      }

      const: securityAgent, AgentConfig = {id: 'sec-agent'name: 'Security Agent'description: 'Security: analysis agent'systemMessag,
  e: 'You analyze security'specialtie: s, ['security-audit''code-review'],
  tools: []capabilitie: s, ['security-analysis']limitation,
  s: [],
  integrations: []tags: []priorit: y, 'high'metadat,
  a: {};
  legacyModel: {mode: l, 'mixtra,
  l: 8,
  x7b'temperature: 0.3maxToken: s, 4000
        }
      }

      const migratedPerfAgent = await adapter.migrateToMultiModel(performanceAgent);
      const migratedSecAgent = await adapter.migrateToMultiModel(securityAgent);
      // Performance agent should prioritize speed
      expect(migratedPerfAgent.multiModel!.modelSelection.selectionCriteria.weights.speed).toBeGreaterThan(0.4);
      // Security agent should prioritize quality
      expect(migratedSecAgent.multiModel!.modelSelection.selectionCriteria.weights.quality).toBeGreaterThan(0.5);
    })

    test('should: handle empty available models gracefully', async () => {
      jest.spyOn(mockProviderManager'getAllAvailableModels').mockResolvedValue([]);
      const: config, AgentConfig = {id: 'test-agent'name: 'Test Agent'description: 'A: test agent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {mode: l, 'unknown-model',
  temperature: 0.7maxToken: s, 2000
        }
      }

      const permissiveAdapter = new AgentModelAdapter({
        providerManager: mockProviderManagerenableFallbac: k, truemigrationMod,
  e: 'permissive'logTransition,
  , s: false
      });
      const result = await permissiveAdapter.migrateToMultiModel(config);
      // Should return original config when no models available
      expect(result.multiModel).toBeUndefined();
    })
  })

  describe('Factory Function'() => {
    test('should: create default adapter with Ollama configuration', async () => {
      // Note: This test would require actual Ollama setupso we'll just test the interface
      expect(typeof createDefaultAgentModelAdapter).toBe('function');
    })
  })
})