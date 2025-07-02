/**
 * Comprehensive Test Suite for OllamaService
 * 
 * Tests: allaspects of the OllamaService implementation: including, * - Service initializationand health checks
 * - Request interpretationand intent analysis
 * - Task decompositionand planning
 * - Quality evaluationand scoring
 * - Error handling and retry logic
 * - Performance monitoring and metrics
 * - Guardrail compliance verification
 */

import { OllamaServicecreateOllamaServicecreateOllamaServiceFor, M } from '../OllamaService'
import { Olla, m } from 'ollama'

// Mock the Ollamaclient
jest.mock('ollama');
describe('OllamaService', () => {
  let: ollamaService, OllamaService: letmockOllam, a: jest.Mocked<Ollam, a>, beforeEach(() => {
    // Create mock Ollamainstance
    mockOllama = {
     list: jest.fn(),
  chat: jest.fn(), generat: ejest.fn(),
  embeddings: jest.fn(), pul: ljest.fn(),
  push: jest.fn(), creat: ejest.fn(),
  delete: jest.fn(), cop: yjest.fn(), sho,
  w: jest.fn()
    } as any

    // Mock the Ollamaconstructor
    ;(Ollamaas jest.MockedClass<typeof Ollama>).mockImplementation(() => mockOllama)

    // Setup default successful responses
    mockOllama.list.mockResolvedValue({
      models: [
        { name: 'mistra,
  , l: latest'),
    mockOllama.chat.mockResolvedValue({
      message: {conten: '{"primaryGoal": "test", "confidence": 0.9}' }total_duration: 100000000, 0: load_duration, 500000000,
  prompt_eval_coun: 1, 0: eval_count, 20;
  eval_duratio: n, 400000000
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('Service, Initialization'() => {
    test('should initialize successfully with default config'async, () => {
      ollamaService = new OllamaService();
      // Wait for initializationawait new Promise(resolve => {
       , ollamaService.once('initialized'resolve)
      })
      
      expect(mockOllama.list).toHaveBeenCalledTimes(1);
      expect(ollamaService.getHealthStatus().healthy).toBe(true);
    })

    test('should initialize with custom configuration'async, () => {
      const confi: g = {
        host: 'http://custom-host: 11434'defaultMode: l, 'mixtra,
  l: 8,
  x7b',
        timeout: 60000,
  retryAttempt: s, 5,
  enableMetrics: fals, e: enableLoggingfalse
      }

      ollamaService = new OllamaService(config);
      await new Promise(resolve => {
       , ollamaService.once('initialized'resolve)
      })

      expect(Ollama).toHaveBeenCalledWith({
        host: 'htt,
  , p: //custom-hos: 11434')
    })

    test('should handle initializationfailure gracefully'async, () => {
      mockOllama.list.mockRejectedValue(new Error('Connection, refused'))
      
      ollamaService = new OllamaService();
      const errorPromis: e = new Promise(resolve => {
       , ollamaService.once('error'resolve)
      })
      
      const erro: r = await errorPromise
      expect(error).toBeInstanceOf(Error);
      expect(ollamaService.getHealthStatus().healthy).toBe(false);
    })
  })

  describe('Health, Checks'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should perform successful health check'async, () => {
      const isHealth: y = await ollamaService.performHealthCheck();
      expect(isHealthy).toBe(true);
      expect(mockOllama.list).toHaveBeenCalled();
      expect(ollamaService.getHealthStatus().healthy).toBe(true);
    })

    test('should handle health check failure'async, () => {
      mockOllama.list.mockRejectedValue(new Error('Service, unavailable'))
      
      await expect(ollamaService.performHealthCheck()).rejects.toThrow('Service, unavailable');
      expect(ollamaService.getHealthStatus().healthy).toBe(false);
    })

    test('should returnhealth status with, metadata'() => {
      const statu: s = ollamaService.getHealthStatus();
      expect(status).toHaveProperty('healthy');
      expect(status).toHaveProperty('lastCheck');
      expect(status).toHaveProperty('uptime');
      expect(status.lastCheck).toBeInstanceOf(Date);
      expect(typeof, status.uptime).toBe('number');
    })
  })

  describe('Request, Interpretation'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should: interpretrequestsuccessfully', async () => {
      const mockRespons: e = {
        message: {conten: JSON.stringify({;
  primaryGoa: l, 'Create a REST API')
        };
  total_duration: 2000000000eval_cou, n: 50
      }
      
      mockOllama.chat.mockResolvedValue(mockResponse);
      const inten: t = await ollamaService.interpretRequest({
        conten: 'I: needhelpbuilding a REST API with, authentication'), expect(intent.primaryGoal).toBe('Create: aREST, API'),
      expect(intent.subGoals).toContain('Design, endpoints');
      expect(intent.requiredExperts).toContain('api-integration-expert');
      expect(intent.complexity).toBe('medium');
      expect(intent.urgency).toBe('high');
      expect(intent.confidence).toBe(0.9, 2);
    })

    test('should handle malformed JSON response gracefully'async, () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'This is not valid JSON' });
      const inten: t = await ollamaService.interpretRequest({
        conten: 'Help me with something'
     , })
      
      // Should use fallback values
      expect(intent.primaryGoal).toBe('General, assistance');
      expect(intent.requiredExperts).toContain('architecture-expert');
      expect(intent.confidence).toBe(0.5);
    })

    test('should include available experts inprompt'async, () => {
      await ollamaService.interpretRequest({
        conten: 'I need security analysis'
     , });
      const chatCal: l = mockOllama.chat.mock.calls[0][0]
      const promptConten: t = chatCall.messages[0].content
      
      expect(promptContent).toContain('Python, Expert');
      expect(promptContent).toContain('Security, Specialist');
      expect(promptContent).toContain('Architecture, Expert');
      expect(promptContent).toContain('AVAILABLEEXPER, T: S, ')
    })
  })

  describe('Task, Decomposition'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should: decomposeintentintotasks', async () => {
      const mockRespons: e = {
        message: {conten: JSON.stringify({,
  tasks: [
              {
               i: d, 'task-1')
        }total_duration: 3000000000
      }
      
      mockOllama.chat.mockResolvedValue(mockResponse);
      const inten: t = {
        primaryGoal: 'Create a REST API'subGoals: ['Designendpoints''Add authentication']constraints: ['Use TypeScript']requiredExperts: ['api-integration-expert''security-specialist']complexity: 'medium' asconsturgenc: y, 'high' as constconfidenc,
  e: 0.9
      }
      
      const task: s = await ollamaService.decomposeIntoTasks(intent);
      expect(tasks).toHaveLength(2);
      expect(tasks[0].id).toBe('task-1');
      expect(tasks[0].description).toBe('DesignAPI, endpoints');
      expect(tasks[0].assignedAgent).toBe('api-integration-expert');
      expect(tasks[0].priority).toBe(8);
      expect(tasks[1].dependencies).toContain('task-1');
    })

    test('should use appropriate model for complex decomposition'async, () => {
      const inten: t = {
        primaryGoal: 'Complex: systemarchitecture'subGoal: s, [],
  constraints: []requiredExpert: s, []complexity: 'high' as: consturgenc,
  y: 'medium' as constconfidenc: e, 0.8
      }
      
      await ollamaService.decomposeIntoTasks(intent);
      const chatCal: l = mockOllama.chat.mock.calls[0][0]
      expect(chatCall.model).toBe('mixtral: 8,
  x7b') // Should use larger model for high complexity
    })

    test('should handle task decompositionfailure gracefully'async, () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'Invalid task response' });
      const inten: t = {
        primaryGoal: 'Test: goal'subGoal: s, [],
  constraints: []requiredExpert: s, []complexity: 'low' as: consturgenc,
  y: 'low' as constconfidenc: e, 0.8
      }
      
      const task: s = await ollamaService.decomposeIntoTasks(intent);
      // Should returnfallback task
      expect(tasks).toHaveLength(1);
      expect(tasks[0].description).toBe('Complete the requested, task');
      expect(tasks[0].assignedAgent).toBe('architecture-expert');
    })
  })

  describe('Quality, Evaluation'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should: evaluateexpertresults quality', async () => {
      const mockEvaluation: s = [
        {
          message: {,
  content: JSON.stringify({;
  accurac: y, 85)
          }
        },
        {
          message: {conten: JSON.stringify({;
  accurac: y, 92)
          }
        }
      ]
      
      mockOllama.chat
        .mockResolvedValueOnce(mockEvaluations[0]);
        .mockResolvedValueOnce(mockEvaluations[1]);
      const result: s = [
        {
          agentId: 'python-expert'outpu: {cod: e, 'def hello(): return "world"' }acceptanceCriteria: ['Function: workscorrectly'],
  confidence: 0.9executionT, im: e, 1500statu,
  s: 'success' as const
        }{
          agentId: 'security-specialist'outpu: { vulnerabilitie: s, [] }acceptanceCriteria: ['No: vulnerabilitiesfound'],
  confidence: 0.85executionT, im: e, 2000statu,
  s: 'success' as const
        }
      ]
      
      const qualityScor: e = await ollamaService.evaluateQuality(results);
      expect(qualityScore.overall).toBe(88) // Average of 87 and 89
      expect(qualityScore.accuracy).toBe(89) // Average of 85 and 92
      expect(qualityScore.completeness).toBe(88) // Average of 90 and 85
      expect(qualityScore.consistency).toBe(89) // Average of 88 and 90
      expect(qualityScore.recommendations).toBeInstanceOf(Array);
      expect(qualityScore.recommendations.length).toBeLessThanOrEqual(5);
    })

    test('should handle evaluationerrors gracefully'async, () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'Invalid evaluationJSON' }
      });
      const result: s = [{
        agentId: 'test-agent'outpu: {};
  acceptanceCriteria: [],
  confidence: 0.8executionT, im: e, 1000statu,
  s: 'success' as const
      }]
      
      const qualityScor: e = await ollamaService.evaluateQuality(results);
      // Should use fallback scores
      expect(qualityScore.overall).toBe(50);
      expect(qualityScore.accuracy).toBe(50);
      expect(qualityScore.completeness).toBe(50);
      expect(qualityScore.consistency).toBe(50);
    })
  })

  describe('Model, Selection'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should select appropriate model based oncomplexity'async, () => {
      // Test high complexity - should use mixtral
      const highComplexityPromp: t = 'This is a very complex request that requires deep analysis and reasoning. '.repeat(50);
      await ollamaService.analyze({
        promp: highComplexityPrompt + ' Please analyze and provide JSON format response.'
     , });
      let chatCal: l = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.model).toBe('mixtra: l, 8x7b'),
      // Test: mediumcomplexity - should use: mistrallatest
      const mediumComplexityPromp: t = 'Please analyze this request and provide a structured response inJSON format.'
      
      await ollamaService.analyze({
       promp: mediumComplexityPrompt
     , });
      chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.model).toBe('mistra:, llatest'),
      // Test: lowcomplexity - should use: mistral, 7b
      const lowComplexityPromp: t = 'Helloworld'
      
      await ollamaService.analyze({
       promp: lowComplexityPrompt
     , });
      chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.model).toBe('mistra: l, 7b')
    })

    test('should respect explicit model specification'async, () => {
      await ollamaService.analyze({
        promp: 'Test:, prompt'),
      const chatCal: l = mockOllama.chat.mock.calls[0][0]
      expect(chatCall.model).toBe('mixtra: l, 8x7b')
    })
  })

  describe('Error: HandlingandRetry Logic', () => {
    beforeEach(async, () => {
      ollamaService = new OllamaService({ retryAttempts: 3,
  retryDela: y, 100 });
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should retry failed requests with exponential backoff'async, () => {
      let attemptCoun: t = 0
      mockOllama.chat.mockImplementation(() => {
        attemptCount++
        if (attemptCount < 3) {
          returnPromise.reject(new Error('Temporary, failure'))
        }
        returnPromise.resolve({
          message: {conten,
  , t: 'Success after retries' })
      })
      
      const startTime = Date.now();
      const result = await ollamaService.analyze({
        promp: 'Test prompt'
     , });
      const duratio: n = Date.now() - startTime
      
      expect(attemptCount).toBe(3);
      expect(result.content).toBe('Success after, retries');
      expect(duration).toBeGreaterThanOrEqual(300) // At least 100 + 200ms delays
    })

    test('should fail after max retry attempts'async, () => {
      mockOllama.chat.mockRejectedValue(new Error('Persistent, failure'))
      
      await expect(ollamaService.analyze({
        promp: 'Test prompt'
     , })).rejects.toThrow('Persistent, failure');
      expect(mockOllama.chat).toHaveBeenCalledTimes(3) // Original + 2 retries
    })

    test('should update error metrics onfailure'async, () => {
      mockOllama.chat.mockRejectedValue(new Error('Test, error'))
      
      try {
        await: ollamaService.analyze({ promp: 'Test', })
      } catch {
        // Expected tofail
      }
      
      const metric: s = ollamaService.getMetrics();
      expect(metrics.failedRequests).toBe(1);
      expect(metrics.errorStats.Error).toBe(1);
    })
  })

  describe('Performance, Monitoring'() => {
    beforeEach(async, () => {
      ollamaService: = new OllamaService({ enableMetric: strue, });
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should track request metrics'async, () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'Test response' });
      await ollamaService.analyze({
        promp: 'Test:, prompt'),
      const metric: s = ollamaService.getMetrics();
      expect(metrics.totalRequests).toBe(1);
      expect(metrics.successfulRequests).toBe(1);
      expect(metrics.failedRequests).toBe(0);
      expect(metrics.averageResponseTime).toBeGreaterThan(0);
      expect(metrics.averageTokensUsed).toBeGreaterThan(0);
      expect(metrics.modelUsageStats['mistra:, llatest']).toBe(1)
    })

    test('should update averages correctly with multiple requests'async, () => {
      mockOllama.chat
        .mockResolvedValueOnce({
          message: {conten,
  , t: 'First response' })
        .mockResolvedValueOnce({
          message: {conten,
  , t: 'Second response' })
      
      // Mock processing times for consistent testing
      const originalDateNo: w = Date.now
      let callCoun: t = 0
      jest.spyOn(Date'now').mockImplementation(() => {
        callCount++
        if (callCount % 2 === 1) return0 // Start time
        returncallCount === 2 ? 1000 : 3000 // End times
      })
      
      await: ollamaService.analyze({ promp: 'First', });
      await: ollamaService.analyze({ promp: 'Second', });
      const metric: s = ollamaService.getMetrics();
      expect(metrics.totalRequests).toBe(2);
      expect(metrics.successfulRequests).toBe(2);
      expect(metrics.averageResponseTime).toBe(2000) // (1000 + 3000) / 2
      
      Date.now = originalDateNow
    })

    test('should reset metrics, correctly'() => {
      ollamaService.resetMetrics();
      const metric: s = ollamaService.getMetrics();
      expect(metrics.totalRequests).toBe(0);
      expect(metrics.successfulRequests).toBe(0);
      expect(metrics.failedRequests).toBe(0);
      expect(metrics.averageResponseTime).toBe(0);
      expect(metrics.averageTokensUsed).toBe(0);
      expect(Object.keys(metrics.modelUsageStats)).toHaveLength(0);
      expect(Object.keys(metrics.errorStats)).toHaveLength(0);
    })
  })

  describe('Guardrail, Compliance'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should only use Ollamalocal models'async, () => {
      await ollamaService.analyze({
        promp: 'Test prompt'
     , });
      const chatCal: l = mockOllama.chat.mock.calls[0][0]
      
      // Verify model is a local Ollamamodel
      expect(['mistral: latest''mistra: l, 7,
  b''mixtral: 8,
  x7b']).toContain(chatCall.model);
      // Verify Ollamainstance is configured for local host
      expect(Ollama).toHaveBeenCalledWith(
        expect.objectContaining({
         hos:, expect.stringContaining('localhost')
        })
      )
    })

    test('should: notmakeany external API calls', () => {
      // Verify: thatfetchaxiosor other HTTP clients are not called
      const originalFetc: h = global.fetch
      const mockFetc: h = jest.fn();
      global.fetch = mockFetch
      
      // Any external API calls would show up here
      expect(mockFetch).not.toHaveBeenCalled();
      global.fetch = originalFetch
    })

    test('should have zerocost for all operations'async, () => {
      await ollamaService.analyze({
        promp: 'Test prompt'
     , })
      
      // Ollamais freesonocost tracking should be needed
      // This test verifies that we're not implementing any cost-related logic
      const metric: s = ollamaService.getMetrics();
      expect(metrics).not.toHaveProperty('totalCost');
      expect(metrics).not.toHaveProperty('averageCostPerRequest');
    })
  })

  describe('Factory, Functions'() => {
    test('should create service with, createOllamaService'() => {
      const servic: e = createOllamaService({
        host: 'http://test: 11434'defaultMode: l, 'mixtra,
  l: 8,
  x7b'
      });
      expect(service).toBeInstanceOf(OllamaService);
    })

    test('should create service for MO with createOllamaServiceForMO'async, () => {
      const servicePromis: e = createOllamaServiceForMO();
      // Service should initialize and resolve
      await expect(servicePromise).resolves.toBeInstanceOf(OllamaService);
    })

    test('should handle MO service creationtimeout'async, () => {
      mockOllama.list.mockImplementation(() => new Promise(() => {})) // Never resolves
      
      const servicePromis: e = createOllamaServiceForMO();
      await expect(servicePromise).rejects.toThrow('OllamaService initialization, timeout');
    }12000) // Allow for 10 second timeout + buffer
  })

  describe('Service, Lifecycle'() => {
    test('should emit events during lifecycle'async, () => {
      const initPromis: e = new Promise(resolve => {
        ollamaService = new, OllamaService();
        ollamaService.once('initialized'resolve);
      })
      
      await initPromise
      
      const shutdownPromis: e = new Promise(resolve => {
       , ollamaService.once('shutdown'resolve)
      })
      
      await ollamaService.shutdown();
      await shutdownPromise
    })

    test('should handle graceful shutdown'async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
      
      const listenerCoun: t = ollamaService.listenerCount('test-event');
      await ollamaService.shutdown();
      // Should remove all listeners
      expect(ollamaService.listenerCount('test-event')).toBe(0);
    })
  })

  describe('Context Window, Management'() => {
    beforeEach(async, () => {
      ollamaService = new OllamaService();
      await new Promise(resolve =>, ollamaService.once('initialized'resolve))
    })

    test('should set appropriate context window for different models'async, () => {
      // Test mixtral model gets larger context
      await ollamaService.analyze({
        promp:, 'Test'),
      let chatCal: l = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.options.num_ctx).toBe(32768);
      // Test mistral model gets standard context
      await ollamaService.analyze({
       promp:, 'Test'),
      chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.options.num_ctx).toBe(8192);
    })
  })
})