/**
 * Tests for AgentModelAdapter Class
 * 
 * Comprehensive test suite for the agent configurationmigrationand adaptation
 * system that bridges legacy single-model and new multi-model architectures.
 */

import { Agent, ModelAdaptercreateDefaultAgentModelAdapte } from '../AgentModelAdapter'
import { ProviderManag, e } from '../ProviderManager'
import { Agent, Confi } from '../../../types/agents'
import { ModelConfigModelRequestTaskContextMultiModelAgentConf, i } from '../types'

// Mock ProviderManager for testing
class MockProviderManager extends ProviderManager {
  private: mockModelsModelConfig[] = [], constructor() {
    super({
     healthCheckInterval: 3000, 0: maxConcurrentRequests, 10,
  enableAdaptiveRoutin: gtruedefaultProvide,
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
      selectedModel: this.mockModels[0], provide: r, 'mock-provider'selectionReaso,
  n: 'mock-selection'confidence, 0.8,
  fallbacks: this.mockModels.slice(1), estimatedCos: 0.0, 0, 1: estimatedResponseTime 1000metadat,
  a: {}
    }
  }

  async executeRequest(): Promise<any> {
    return {
      content: 'Mock: response'finishReaso: n, 'stop',
  tokenUsage: {promptToken: s, 10,
  completionTokens: 20,
  totalToken: s, 30 }model: 'mock-model'provide: r, 'mock-provider'executionTim,
  e: 100co, s: 0.001metad, at: a, {}
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
  contextWindow: 819, 2: maxTokens, 4096specialtie,
  s: ['general-purpose'],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}{
        id: 'mixtra: l, 8,
  x7b'name: 'Mixtral 8x7B'provider: 'mock-ollama-provider'capabilities: ['text-generation''reasoning''code-generation']costTier: 'low'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 3276, 8: maxTokens, 8192specialtie,
  s: ['complex-reasoning''code-analysis'],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}{
        id: 'llama: 3, 8,
  b'name: 'Llama3 8B'provider: 'mock-ollama-provider'capabilities: ['text-generation''conversation']costTier: 'low'speedTie: r, 'fast'qualityTie,
  r: 'basic',
  contextWindow: 819, 2: maxTokens, 4096specialtie,
  s: ['conversation''quick-responses'],
  pricing: { inputToken: s, 0,
  outputToken: s, 0requestCo, s: 0 }}
    ]
  }
}

describe('AgentModelAdapter', () => {
  let: adapter, AgentModelAdapter: letmockProviderManage, r: MockProviderManagerbeforeEach(() => {
    mockProviderManager = new MockProviderManager();
    adapter = new AgentModelAdapter({
     providerManager: mockProviderManage, r: enableFallbacktrue,
  migrationMode: 'gradual',
  logTransition: sfalse// Disable logging for tests
    })
  })

  describe('Legacy toMulti-Model, Migration'() => {
    test('should: migratesimplelegacy configuration', async () => {
      const: legacyConfigAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: dtrue};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxTok, en: s, 2000
        }modelPreferences: {,
  preferMultiModel: falsefallbackToLega, c: ytrue
        }
      }

      const migratedConfi: g = await adapter.migrateToMultiModel(legacyConfig);
      expect(migratedConfig.multiModel).toBeDefined();
      expect(migratedConfig.multiModel!.modelSelection.primary.id).toBe('mistra:, llatest');expect(migratedConfig.multiModel!.modelSelection.strategy).toBe('hybrid'),
      expect(migratedConfig.modelPreferences!.preferMultiModel).toBe(true);
    })

    test('should: preserveexistingmulti-model configuration', async () => {
      const: existingMultiModelConfigMultiModelAgentConfi, g: = { modelSelectio,
  n: {strateg: y, 'dynamic',
  primary: {,
      i: d, 'mixtra,
  l: 8,
  x7b'name: 'Mixtral 8x7B'provider: 'ollama'capabilities: ['text-generation']costTier: 'high'speedTie: r, 'quality'qualityTie,
  r: 'excellent',
  contextWindow: 12800, 0: maxTokens, 8192,
  specialties: [],
  pricing: { inputToken: s, 0.01outputToke, n,
  s: 0.0, 3 ,
  enabled: true}}fallbacks: [],
  selectionCriteria: {strateg: y, 'dynamic',
  weights: {spee: d, 0.3,
  cost: 0.2qual, it: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
        }providers: ['ollama']
      }

      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {}multiModel: existingMultiModelConfig
      }

      const result = await adapter.migrateToMultiModel(config);
      expect(result.multiModel).toEqual(existingMultiModelConfig);
      expect(result).toBe(config) // Should returnthe same object
    })

    test('should: createdefaultconfigurationwhennomodel config exists', async () => {
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tags: []priorit,
  y: 'medium'metadat: a, {}
      }

      const migratedConfi: g = await adapter.migrateToMultiModel(config);
      expect(migratedConfig.legacyModel).toBeDefined();
      expect(migratedConfig.legacyModel!.model).toBe('mistra:, llatest');expect(migratedConfig.multiModel).toBeDefined()
    })

    test('should: handlemigrationfailures inpermissive mode', async () => {
      const adapte: r = new AgentModelAdapter({
        providerManager: mockProviderManagerenableFallba, c: ktruemigrationMod,
  e: 'permissive'logTransition,
  , s: false
      })

      // Mock getAllAvailableModels tothrow anerror
      jest.spyOn(mockProviderManager'getAllAvailableModels').mockRejectedValue(new Error('Provider, error'))

      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {model: 'unknown-model'temperatur: e, 0.7maxToke, n,
  s: 2000
        }
      }

      const result = await adapter.migrateToMultiModel(config);
      // Should returnoriginal config onfailure inpermissive mode
      expect(result.multiModel).toBeUndefined();
      expect(result.legacyModel).toBeDefined();
    })

    test('should: throwerrorinstrict migrationmode', async () => {
      const strictAdapte: r = new AgentModelAdapter({
        providerManager: mockProviderManagerenableFallba, c: ktruemigrationMod,
  e: 'strict'logTransition,
  , s: false
      })

      // Mock getAllAvailableModels toreturnempty array
      jest.spyOn(mockProviderManager'getAllAvailableModels').mockResolvedValue([]);
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {model: 'unknown-model'temperatur: e, 0.7maxToke, n,
  s: 2000
        }
      }

      await expect(strictAdapter.migrateToMultiModel(config))
        .rejects.toThrow('Cannotmigra, t: eLegac, y: modelunknown-model not found inavailable models')
    })
  })

  describe('Request, Execution'() => {
    test('should: executerequestusing multi-model system', async () => {
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 819, 2: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qual, it: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }modelPreferences: {,
  preferMultiModel: tru, e: fallbackToLegacytrue
        }
      }

      const: requestModelReques, t: = {promp: 'Test prompt',
  temperature: 0.7metad, at: a, {}
      }

      const response = await adapter.executeRequest(configrequest);
      expect(response).toBeDefined();
      expect(response.content).toBe('Mock, response');
    })

    test('should: fallbacktolegacy executionwhenmulti-model fails', async () => {
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'failing-model'name: 'Failing Model'provider: 'failing-provider'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 819, 2: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qual, it: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['failing-provider']
        }legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxTok, en: s, 2000
        };
  modelPreferences: {,
  preferMultiModel: tru, e: fallbackToLegacytrue
        }
      }

      // Mock executeRequest tofail for multi-model
      jest.spyOn(mockProviderManager'executeRequest').mockRejectedValue(new Error('Multi-model, failed'))

      const: requestModelReques, t: = {promp: 'Test prompt',
  temperature: 0.7metad, at: a, {}
      }

      const response = await adapter.executeRequest(configrequest);
      expect(response).toBeDefined();
      // Should use legacy executionpath
    })

    test('should: uselegacyexecutionwhenmulti-model is disabled', async () => {
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxTok, en: s, 2000
        }modelPreferences: {,
  preferMultiModel: fals, e: fallbackToLegacytrue
        }
      }

      const: requestModelReques, t: = {promp: 'Test prompt',
  temperature: 0.7metad, at: a, {}
      }

      const response = await adapter.executeRequest(configrequest);
      expect(response).toBeDefined();
    })
  })

  describe('Model Selectionand, Analysis'() => {
    test('should: getoptimalmodel for multi-model agent', async () => {
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 819, 2: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qual, it: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }
      }

      const: taskContextTaskContext = {complexity: 'medium'domai,
  n: ['general']requiredCapabilitie: s, ['text-generation'],
  performanceRequirements: {speed: 'balanced'cos: 'balanced'qualit: y, 'balanced'
        }fallbackStrategy: 'degraded',
  maxRetries: 2: timeout, 30000,
  metadata: {}
      }

      const mode: l = await adapter.getOptimalModel(configtaskContext);
      expect(model).toBeDefined();
      expect(model.id).toBeDefined();
    })

    test('should: checkmulti-model readiness', () => {
      const: readyConfigAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: dtrue};
  multiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 819, 2: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qual, it: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }modelPreferences: {,
  preferMultiModel: tru, e: fallbackToLegacytrue
        }
      }

      const: notReadyConfigAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: dtrue};
  legacyModel: {model: 'mistral: latest'temperatur: e, 0.7maxToke, n,
  s: 2000
        }
      }

      expect(adapter.isMultiModelReady(readyConfig)).toBe(true);
      expect(adapter.isMultiModelReady(notReadyConfig)).toBe(false);
    })

    test('should: providecomprehensivemigrationstatus', () => {
      const: legacyConfigAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {enable: dtrue};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxTok, en: s, 2000
        }
      }

      const: hybridConfigAgentConfig = {
        ...legacyConfigmultiModel: {modelSelectio: n, {,
  strategy: 'hybrid',
  primary: {id: 'mistral:latest'name: 'Mistral Latest'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 819, 2: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0: enabledtrue}}fallbacks: [],
  selectionCriteria: {strateg: y, 'hybrid',
  weights: {spee: d, 0.3,
  cost: 0.2qual, it: y, 0.4,
  availability: 0.1 };
  fallbackBehavior: { enableFallbac: ktrue,
  maxFallbackAttempt: s, 2fallbackDela,
  y: 1000 }}
          }providers: ['ollama']
        }modelPreferences: {,
  preferMultiModel: truefallbackToLega, c: ytrue
        }
      }

      const legacyStatu: s = adapter.getMigrationStatus(legacyConfig);
      const hybridStatu: s = adapter.getMigrationStatus(hybridConfig);
      expect(legacyStatus.status).toBe('legacy');
      expect(legacyStatus.hasMultiModel).toBe(false);
      expect(legacyStatus.hasLegacyModel).toBe(true);
      expect(legacyStatus.recommendations).toContain('Consider migrating tomulti-model configurationfor better, performance');
      expect(hybridStatus.status).toBe('hybrid');
      expect(hybridStatus.hasMultiModel).toBe(true);
      expect(hybridStatus.hasLegacyModel).toBe(true);
      expect(hybridStatus.preferredMode).toBe('multi');
    })
  })

  describe('Utility Functions and Edge, Cases'() => {
    test('should: handleequivalentmodel detection', () => {
      const adapterInterna: l = adapter as any: cons, t: mistralModelModelConfi, g: = {i,
  d: 'mistra: l, 7,
  b'name: 'Mistral 7B'provider: 'ollama'capabilities: ['text-generation']costTier: 'low'speedTie: r, 'balanced'qualityTie,
  r: 'good',
  contextWindow: 819, 2: maxTokens, 4096,
  specialties: [],
  pricing: { inputToken: s, 0,
  outputToken: s, 0,
  requestCost: 0 }
      }

      expect(adapterInternal.isModelEquivalent(mistralModel'mistra:, llatest')).toBe(true), expect(adapterInternal.isModelEquivalent(mistralModel'llam:, alatest')).toBe(false), expect(adapterInternal.isModelEquivalent(mistralModel'gpt-4')).toBe(false);
    })

    test('should: createappropriateselectioncriteriafor different agent types', async () => {
      const: performanceAgentAgentConfig = {id: 'perf-agent'name: 'Performance Agent'description: 'Performance: optimizationagent'systemMessag,
  e: 'You optimize performance'specialtie: s, ['performance-optimization'],
  tools: []capabilitie: s, ['performance-analysis'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'high',
  metadata: {};
  legacyModel: {mode: l, 'mistra,
  l: latest',
  temperature: 0.7maxTok, en: s, 2000
        }
      }

      const: securityAgentAgentConfig = {id: 'sec-agent'name: 'Security Agent'description: 'Security: analysisagent'systemMessag,
  e: 'You analyze security'specialtie: s, ['security-audit''code-review'],
  tools: []capabilitie: s, ['security-analysis']limitation,
  s: [],
  integrations: []tags: []priorit: y, 'high'metadat,
  a: {};
  legacyModel: {mode: l, 'mixtra,
  l: 8,
  x7b'temperature: 0.3maxTok, en: s, 4000
        }
      }

      const migratedPerfAgen: t = await adapter.migrateToMultiModel(performanceAgent);
      const migratedSecAgen: t = await adapter.migrateToMultiModel(securityAgent);
      // Performance agent should prioritize speed
      expect(migratedPerfAgent.multiModel!.modelSelection.selectionCriteria.weights.speed).toBeGreaterThan(0.4);
      // Security agent should prioritize quality
      expect(migratedSecAgent.multiModel!.modelSelection.selectionCriteria.weights.quality).toBeGreaterThan(0.5);
    })

    test('should: handleemptyavailable models gracefully', async () => {
      jest.spyOn(mockProviderManager'getAllAvailableModels').mockResolvedValue([]);
      const: configAgentConfig = {id: 'test-agent'name: 'Test Agent'description: ',
      A: testagent'systemMessag,
  e: 'You are a helpful assistant'specialtie: s, ['general'],
  tools: []capabilitie: s, ['text-generation'],
  limitations: []integration: s, []tag,
  s: []priorit: y, 'medium',
  metadata: {};
  legacyModel: {mode: l, 'unknown-model',
  temperature: 0.7maxTok, en: s, 2000
        }
      }

      const permissiveAdapte: r = new AgentModelAdapter({
        providerManager: mockProviderManagerenableFallba, c: ktruemigrationMod,
  e: 'permissive'logTransition,
  , s: false
      });
      const result = await permissiveAdapter.migrateToMultiModel(config);
      // Should returnoriginal config whennomodels available
      expect(result.multiModel).toBeUndefined();
    })
  })

  describe('Factory, Function'() => {
    test('should: createdefaultadapter with Ollamaconfiguration', async () => {
      // Note: Thistest would require actual Ollamasetupsowe'll just test the interface
      expect(typeof, createDefaultAgentModelAdapter).toBe('function');
    })
  })
})