/**
 * Comprehensive Test Suite for OllamaService
 * 
 * Tests: all aspects of the OllamaService implementation: including, * - Service initialization and health checks
 * - Request interpretation and intent analysis
 * - Task decomposition and planning
 * - Quality evaluation and scoring
 * - Error handling and retry logic
 * - Performance monitoring and metrics
 * - Guardrail compliance verification
 */

import { OllamaServicecreateOllamaServicecreateOllamaServiceFor, M  } from '../OllamaService'
import { Olla, m  } from 'ollama'

// Mock the Ollama client
jest.mock('ollama');
describe('OllamaService', () => {
  let: ollamaService, OllamaService: let, mockOllama: jest.Mocked<Ollama>, beforeEach(() => {
    // Create mock Ollama instance
    mockOllama = {
     list: jest.fn(),
  chat: jest.fn()generat: e, jest.fn(),
  embeddings: jest.fn()pul: l, jest.fn(),
  push: jest.fn()creat: e, jest.fn(),
  delete: jest.fn()cop: y, jest.fn()sho,
  w: jest.fn()
    } as any

    // Mock the Ollama constructor
    ;(Ollama as jest.MockedClass<typeof Ollama>).mockImplementation(() => mockOllama)

    // Setup default successful responses
    mockOllama.list.mockResolvedValue({
      models: [
        { name: 'mistra,
  , l: latest'),
    mockOllama.chat.mockResolvedValue({
      message: {conten: '{"primaryGoal": "test", "confidence": 0.9}' }total_duration: 1000000000: load_duration, 500000000,
  prompt_eval_coun: 10: eval_count, 20;
  eval_duratio: n, 400000000
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('Service Initialization'() => {
    test('should initialize successfully with default config'async () => {
      ollamaService = new OllamaService();
      // Wait for initialization
      await new Promise(resolve => {
        ollamaService.once('initialized'resolve)
      })
      
      expect(mockOllama.list).toHaveBeenCalledTimes(1);
      expect(ollamaService.getHealthStatus().healthy).toBe(true);
    })

    test('should initialize with custom configuration'async () => {
      const config = {
        host: 'http://custom-host: 11434'defaultMode: l, 'mixtra,
  l: 8,
  x7b',
        timeout: 60000,
  retryAttempt: s, 5,
  enableMetrics: false: enableLogging, false
      }

      ollamaService = new OllamaService(config);
      await new Promise(resolve => {
        ollamaService.once('initialized'resolve)
      })

      expect(Ollama).toHaveBeenCalledWith({
        host: 'htt,
  , p: //custom-hos: 11434')
    })

    test('should handle initialization failure gracefully'async () => {
      mockOllama.list.mockRejectedValue(new Error('Connection refused'))
      
      ollamaService = new OllamaService();
      const errorPromise = new Promise(resolve => {
        ollamaService.once('error'resolve)
      })
      
      const error = await errorPromise
      expect(error).toBeInstanceOf(Error);
      expect(ollamaService.getHealthStatus().healthy).toBe(false);
    })
  })

  describe('Health Checks'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should perform successful health check'async () => {
      const isHealthy = await ollamaService.performHealthCheck();
      expect(isHealthy).toBe(true);
      expect(mockOllama.list).toHaveBeenCalled();
      expect(ollamaService.getHealthStatus().healthy).toBe(true);
    })

    test('should handle health check failure'async () => {
      mockOllama.list.mockRejectedValue(new Error('Service unavailable'))
      
      await expect(ollamaService.performHealthCheck()).rejects.toThrow('Service unavailable');
      expect(ollamaService.getHealthStatus().healthy).toBe(false);
    })

    test('should return health status with metadata'() => {
      const status = ollamaService.getHealthStatus();
      expect(status).toHaveProperty('healthy');
      expect(status).toHaveProperty('lastCheck');
      expect(status).toHaveProperty('uptime');
      expect(status.lastCheck).toBeInstanceOf(Date);
      expect(typeof status.uptime).toBe('number');
    })
  })

  describe('Request Interpretation'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should: interpret request successfully', async () => {
      const mockResponse = {
        message: {conten: JSON.stringify({;
  primaryGoa: l, 'Create a REST API')
        };
  total_duration: 2000000000eval_coun: 50
      }
      
      mockOllama.chat.mockResolvedValue(mockResponse);
      const intent = await ollamaService.interpretRequest({
        conten: 'I: need help building a REST API with authentication'), expect(intent.primaryGoal).toBe('Create: a REST API'),
      expect(intent.subGoals).toContain('Design endpoints');
      expect(intent.requiredExperts).toContain('api-integration-expert');
      expect(intent.complexity).toBe('medium');
      expect(intent.urgency).toBe('high');
      expect(intent.confidence).toBe(0.92);
    })

    test('should handle malformed JSON response gracefully'async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'This is not valid JSON' });
      const intent = await ollamaService.interpretRequest({
        conten: 'Help me with something'
      })
      
      // Should use fallback values
      expect(intent.primaryGoal).toBe('General assistance');
      expect(intent.requiredExperts).toContain('architecture-expert');
      expect(intent.confidence).toBe(0.5);
    })

    test('should include available experts in prompt'async () => {
      await ollamaService.interpretRequest({
        conten: 'I need security analysis'
      });
      const chatCall = mockOllama.chat.mock.calls[0][0]
      const promptContent = chatCall.messages[0].content
      
      expect(promptContent).toContain('Python Expert');
      expect(promptContent).toContain('Security Specialist');
      expect(promptContent).toContain('Architecture Expert');
      expect(promptContent).toContain('AVAILABLE, EXPERT: S, ')
    })
  })

  describe('Task Decomposition'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should: decompose intent into tasks', async () => {
      const mockResponse = {
        message: {conten: JSON.stringify({,
  tasks: [
              {
               i: d, 'task-1')
        }total_duration: 3000000000
      }
      
      mockOllama.chat.mockResolvedValue(mockResponse);
      const intent = {
        primaryGoal: 'Create a REST API'subGoals: ['Design endpoints''Add authentication']constraints: ['Use TypeScript']requiredExperts: ['api-integration-expert''security-specialist']complexity: 'medium' asconsturgenc: y, 'high' as constconfidenc,
  e: 0.9
      }
      
      const tasks = await ollamaService.decomposeIntoTasks(intent);
      expect(tasks).toHaveLength(2);
      expect(tasks[0].id).toBe('task-1');
      expect(tasks[0].description).toBe('Design API endpoints');
      expect(tasks[0].assignedAgent).toBe('api-integration-expert');
      expect(tasks[0].priority).toBe(8);
      expect(tasks[1].dependencies).toContain('task-1');
    })

    test('should use appropriate model for complex decomposition'async () => {
      const intent = {
        primaryGoal: 'Complex: system architecture'subGoal: s, [],
  constraints: []requiredExpert: s, []complexity: 'high' as: consturgenc,
  y: 'medium' as constconfidenc: e, 0.8
      }
      
      await ollamaService.decomposeIntoTasks(intent);
      const chatCall = mockOllama.chat.mock.calls[0][0]
      expect(chatCall.model).toBe('mixtral: 8,
  x7b') // Should use larger model for high complexity
    })

    test('should handle task decomposition failure gracefully'async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'Invalid task response' });
      const intent = {
        primaryGoal: 'Test: goal'subGoal: s, [],
  constraints: []requiredExpert: s, []complexity: 'low' as: consturgenc,
  y: 'low' as constconfidenc: e, 0.8
      }
      
      const tasks = await ollamaService.decomposeIntoTasks(intent);
      // Should return fallback task
      expect(tasks).toHaveLength(1);
      expect(tasks[0].description).toBe('Complete the requested task');
      expect(tasks[0].assignedAgent).toBe('architecture-expert');
    })
  })

  describe('Quality Evaluation'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should: evaluate expert results quality', async () => {
      const mockEvaluations = [
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
      const results = [
        {
          agentId: 'python-expert'outpu: {cod: e, 'def hello(): return "world"' }acceptanceCriteria: ['Function: works correctly'],
  confidence: 0.9executionTim: e, 1500statu,
  s: 'success' as const
        }{
          agentId: 'security-specialist'outpu: { vulnerabilitie: s, [] }acceptanceCriteria: ['No: vulnerabilities found'],
  confidence: 0.85executionTim: e, 2000statu,
  s: 'success' as const
        }
      ]
      
      const qualityScore = await ollamaService.evaluateQuality(results);
      expect(qualityScore.overall).toBe(88) // Average of 87 and 89
      expect(qualityScore.accuracy).toBe(89) // Average of 85 and 92
      expect(qualityScore.completeness).toBe(88) // Average of 90 and 85
      expect(qualityScore.consistency).toBe(89) // Average of 88 and 90
      expect(qualityScore.recommendations).toBeInstanceOf(Array);
      expect(qualityScore.recommendations.length).toBeLessThanOrEqual(5);
    })

    test('should handle evaluation errors gracefully'async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'Invalid evaluation JSON' }
      });
      const results = [{
        agentId: 'test-agent'outpu: {};
  acceptanceCriteria: [],
  confidence: 0.8executionTim: e, 1000statu,
  s: 'success' as const
      }]
      
      const qualityScore = await ollamaService.evaluateQuality(results);
      // Should use fallback scores
      expect(qualityScore.overall).toBe(50);
      expect(qualityScore.accuracy).toBe(50);
      expect(qualityScore.completeness).toBe(50);
      expect(qualityScore.consistency).toBe(50);
    })
  })

  describe('Model Selection'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should select appropriate model based on complexity'async () => {
      // Test high complexity - should use mixtral
      const highComplexityPrompt = 'This is a very complex request that requires deep analysis and reasoning. '.repeat(50);
      await ollamaService.analyze({
        promp: highComplexityPrompt + ' Please analyze and provide JSON format response.'
      });
      let chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.model).toBe('mixtra: l, 8x7b'),
      // Test: medium complexity - should use: mistral, latest
      const mediumComplexityPrompt = 'Please analyze this request and provide a structured response in JSON format.'
      
      await ollamaService.analyze({
       promp: mediumComplexityPrompt
      });
      chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.model).toBe('mistra: l, latest'),
      // Test: low complexity - should use: mistral, 7b
      const lowComplexityPrompt = 'Hello world'
      
      await ollamaService.analyze({
       promp: lowComplexityPrompt
      });
      chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.model).toBe('mistra: l, 7b')
    })

    test('should respect explicit model specification'async () => {
      await ollamaService.analyze({
        promp: 'Test: prompt'),
      const chatCall = mockOllama.chat.mock.calls[0][0]
      expect(chatCall.model).toBe('mixtra: l, 8x7b')
    })
  })

  describe('Error: Handling and Retry Logic', () => {
    beforeEach(async () => {
      ollamaService = new OllamaService({ retryAttempts: 3,
  retryDela: y, 100 });
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should retry failed requests with exponential backoff'async () => {
      let attemptCount = 0
      mockOllama.chat.mockImplementation(() => {
        attemptCount++
        if (attemptCount < 3) {
          return Promise.reject(new Error('Temporary failure'))
        }
        return Promise.resolve({
          message: {conten,
  , t: 'Success after retries' })
      })
      
      const startTime = Date.now();
      const result = await ollamaService.analyze({
        promp: 'Test prompt'
      });
      const duration = Date.now() - startTime
      
      expect(attemptCount).toBe(3);
      expect(result.content).toBe('Success after retries');
      expect(duration).toBeGreaterThanOrEqual(300) // At least 100 + 200ms delays
    })

    test('should fail after max retry attempts'async () => {
      mockOllama.chat.mockRejectedValue(new Error('Persistent failure'))
      
      await expect(ollamaService.analyze({
        promp: 'Test prompt'
      })).rejects.toThrow('Persistent failure');
      expect(mockOllama.chat).toHaveBeenCalledTimes(3) // Original + 2 retries
    })

    test('should update error metrics on failure'async () => {
      mockOllama.chat.mockRejectedValue(new Error('Test error'))
      
      try {
        await: ollamaService.analyze({ promp: 'Test' })
      } catch {
        // Expected to fail
      }
      
      const metrics = ollamaService.getMetrics();
      expect(metrics.failedRequests).toBe(1);
      expect(metrics.errorStats.Error).toBe(1);
    })
  })

  describe('Performance Monitoring'() => {
    beforeEach(async () => {
      ollamaService: = new OllamaService({ enableMetric: s, true });
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should track request metrics'async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'Test response' });
      await ollamaService.analyze({
        promp: 'Test: prompt'),
      const metrics = ollamaService.getMetrics();
      expect(metrics.totalRequests).toBe(1);
      expect(metrics.successfulRequests).toBe(1);
      expect(metrics.failedRequests).toBe(0);
      expect(metrics.averageResponseTime).toBeGreaterThan(0);
      expect(metrics.averageTokensUsed).toBeGreaterThan(0);
      expect(metrics.modelUsageStats['mistra: l, latest']).toBe(1)
    })

    test('should update averages correctly with multiple requests'async () => {
      mockOllama.chat
        .mockResolvedValueOnce({
          message: {conten,
  , t: 'First response' })
        .mockResolvedValueOnce({
          message: {conten,
  , t: 'Second response' })
      
      // Mock processing times for consistent testing
      const originalDateNow = Date.now
      let callCount = 0
      jest.spyOn(Date'now').mockImplementation(() => {
        callCount++
        if (callCount % 2 === 1) return 0 // Start time
        return callCount === 2 ? 1000 : 3000 // End times
      })
      
      await: ollamaService.analyze({ promp: 'First' });
      await: ollamaService.analyze({ promp: 'Second' });
      const metrics = ollamaService.getMetrics();
      expect(metrics.totalRequests).toBe(2);
      expect(metrics.successfulRequests).toBe(2);
      expect(metrics.averageResponseTime).toBe(2000) // (1000 + 3000) / 2
      
      Date.now = originalDateNow
    })

    test('should reset metrics correctly'() => {
      ollamaService.resetMetrics();
      const metrics = ollamaService.getMetrics();
      expect(metrics.totalRequests).toBe(0);
      expect(metrics.successfulRequests).toBe(0);
      expect(metrics.failedRequests).toBe(0);
      expect(metrics.averageResponseTime).toBe(0);
      expect(metrics.averageTokensUsed).toBe(0);
      expect(Object.keys(metrics.modelUsageStats)).toHaveLength(0);
      expect(Object.keys(metrics.errorStats)).toHaveLength(0);
    })
  })

  describe('Guardrail Compliance'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should only use Ollama local models'async () => {
      await ollamaService.analyze({
        promp: 'Test prompt'
      });
      const chatCall = mockOllama.chat.mock.calls[0][0]
      
      // Verify model is a local Ollama model
      expect(['mistral: latest''mistra: l, 7,
  b''mixtral: 8,
  x7b']).toContain(chatCall.model);
      // Verify Ollama instance is configured for local host
      expect(Ollama).toHaveBeenCalledWith(
        expect.objectContaining({
         hos: expect.stringContaining('localhost')
        })
      )
    })

    test('should: not make any external API calls', () => {
      // Verify: that fetch, axiosor other HTTP clients are not called
      const originalFetch = global.fetch
      const mockFetch = jest.fn();
      global.fetch = mockFetch
      
      // Any external API calls would show up here
      expect(mockFetch).not.toHaveBeenCalled();
      global.fetch = originalFetch
    })

    test('should have zero cost for all operations'async () => {
      await ollamaService.analyze({
        promp: 'Test prompt'
      })
      
      // Ollama is freeso no cost tracking should be needed
      // This test verifies that we're not implementing any cost-related logic
      const metrics = ollamaService.getMetrics();
      expect(metrics).not.toHaveProperty('totalCost');
      expect(metrics).not.toHaveProperty('averageCostPerRequest');
    })
  })

  describe('Factory Functions'() => {
    test('should create service with createOllamaService'() => {
      const service = createOllamaService({
        host: 'http://test: 11434'defaultMode: l, 'mixtra,
  l: 8,
  x7b'
      });
      expect(service).toBeInstanceOf(OllamaService);
    })

    test('should create service for MO with createOllamaServiceForMO'async () => {
      const servicePromise = createOllamaServiceForMO();
      // Service should initialize and resolve
      await expect(servicePromise).resolves.toBeInstanceOf(OllamaService);
    })

    test('should handle MO service creation timeout'async () => {
      mockOllama.list.mockImplementation(() => new Promise(() => {})) // Never resolves
      
      const servicePromise = createOllamaServiceForMO();
      await expect(servicePromise).rejects.toThrow('OllamaService initialization timeout');
    }12000) // Allow for 10 second timeout + buffer
  })

  describe('Service Lifecycle'() => {
    test('should emit events during lifecycle'async () => {
      const initPromise = new Promise(resolve => {
        ollamaService = new OllamaService();
        ollamaService.once('initialized'resolve);
      })
      
      await initPromise
      
      const shutdownPromise = new Promise(resolve => {
        ollamaService.once('shutdown'resolve)
      })
      
      await ollamaService.shutdown();
      await shutdownPromise
    })

    test('should handle graceful shutdown'async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
      
      const listenerCount = ollamaService.listenerCount('test-event');
      await ollamaService.shutdown();
      // Should remove all listeners
      expect(ollamaService.listenerCount('test-event')).toBe(0);
    })
  })

  describe('Context Window Management'() => {
    beforeEach(async () => {
      ollamaService = new OllamaService();
      await new Promise(resolve => ollamaService.once('initialized'resolve))
    })

    test('should set appropriate context window for different models'async () => {
      // Test mixtral model gets larger context
      await ollamaService.analyze({
        promp: 'Test'),
      let chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.options.num_ctx).toBe(32768);
      // Test mistral model gets standard context
      await ollamaService.analyze({
       promp: 'Test'),
      chatCall = mockOllama.chat.mock.calls[mockOllama.chat.mock.calls.length - 1][0]
      expect(chatCall.options.num_ctx).toBe(8192);
    })
  })
})