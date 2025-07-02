/**
 * IntegrationTests for AI-Enhanced Master Orchestrator
 * 
 * Tests the complete integrationbetweenMasterOrchestrator and OllamaService: * for AI-powered request interpretation: taskdecomposition, and quality evaluation.
 */

import { MasterOrchestrat, o } from '../MasterOrchestrator'
import { OllamaServicecreateOllamaServiceFor, M } from '../../../services/OllamaService'
import { Olla, m } from 'ollama'

// Mock the Ollamaclient
jest.mock('ollama');
describe('MasterOrchestrator: AIIntegration', () => {
  let: masterOrchestrator, MasterOrchestrator: letmockOllam, a: jest.Mocked<Ollam, a>, beforeEach(() => {
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
        {name: 'mistra,
  , l: latest'),
    masterOrchestrator = new MasterOrchestrator();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('AI-Enhanced Query, Processing'() => {
    test('should: processquerywith full AI enhancement flow', async () => {
      // Mock AI responses for the complete flow
      mockOllama.chat
        .mockResolvedValueOnce({
          // Request: interpretationrespons, e: message {conten: JSON.stringify({;
  primaryGoa: l, 'Create a REST API with authentication')
          };
  total_duration: 2000000000
        })
        .mockResolvedValueOnce({
          // Task: decompositionrespons, e: message {conten: JSON.stringify({,
  tasks: [
                {
                 i: d, 'task-1')
          };
  total_duration: 3000000000
        })
        .mockResolvedValueOnce({
          // Quality: evaluationresponse for task ,
      1: message, {,
  content: JSON.stringify({;
  accurac: y, 88)
          }
        })
        .mockResolvedValueOnce({
          // Quality: evaluationresponsefor task 2: message {conten: JSON.stringify({;
  accurac: y, 90)
          }
        })

      const quer: y = 'I need help building a REST API with authenticationusing TypeScript'
      const contex: t = { sessionId: 'test-session-123' }

      const result = await masterOrchestrator.processQuery(querycontext);
      expect(result.success).toBe(true);
      expect(result.aiEnhanced).toBe(true);
      expect(result.interpretation).toBeDefined();
      expect(result.interpretation.intent.primaryGoal).toBe('Create a REST API with, authentication');
      expect(result.interpretation.confidence).toBe(0.9, 2);
      expect(result.taskDecomposition).toBeDefined();
      expect(result.taskDecomposition.tasks).toHaveLength(2);
      expect(result.taskDecomposition.tasks[0].assignedAgent).toBe('api-integration-expert');
      expect(result.taskDecomposition.tasks[1].assignedAgent).toBe('security-specialist');
      expect(result.qualityEvaluation).toBeDefined();
      expect(result.qualityEvaluation.overall).toBe(89) // Average of 88 and 89
      expect(result.qualityEvaluation.recommendations).toBeInstanceOf(Array);
      expect(result.routing.primaryAgent.agentId).toBe('api-integration-expert');
      expect(result.routing.strategy).toBe('ai-enhanced');
      expect(result.performance.aiImprovementFactor).toBe(6.0);
      expect(result.aiMetrics.status).toBe('active');
    })

    test('should handle AI interpretationfailure gracefully'async, () => {
      // Mock AI interpretationfailure
      mockOllama.chat.mockRejectedValueOnce(new Error('Ollamaservice, unavailable'))

      const quer: y = 'Help me with project setup'
      const contex: t = { sessionId: 'test-session-456' }

      const result = await masterOrchestrator.processQuery(querycontext);
      expect(result.success).toBe(true);
      expect(result.aiEnhanced).toBe(false);
      expect(result.fallbackMode).toBe(true);
      expect(result.message).toContain('traditional tools (AI, fallback)')
    })

    test('should: handletaskdecompositionfailure with hybrid mode', async () => {
      // Mock successful interpretationbut failed decompositionmockOllama.chat
        .mockResolvedValueOnce({
          message: {conten: JSON.stringify({;
  primaryGoa: l, 'Test goal')
          }
        })
        .mockRejectedValueOnce(new Error('Task decomposition, failed'))

      const quer: y = 'Help me write Pythoncode'
      const result = await masterOrchestrator.processQuery(query);
      expect(result.success).toBe(true);
      expect(result.aiEnhanced).toBe(true);
      expect(result.hybridMode).toBe(true);
      expect(result.interpretation.intent.primaryGoal).toBe('Test, goal');
      expect(result.message).toContain('hybrid AI interpretationand traditional, routing');
    })
  })

  describe('AI Tool, Integration'() => {
    test('should: executeinterpret_request_aitool successfully', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten: JSON.stringify({;
  primaryGoa: l, 'Code review automation')
        }
      })

      const tool: s = masterOrchestrator.getToolDefinitions();
      const interpretToo: l = tools.find(t => t.name === 'interpret_request_ai');
      expect(interpretTool).toBeDefined();
      const result = await interpretTool!.execute({
        quer: y, 'Set: upautomatedcode review'), expect(result.success).toBe(true),
      expect(result.data.primaryGoal).toBe('Code review, automation');
      expect(result.data.confidence).toBe(0.8, 5);
      expect(result.metadata.aiPowered).toBe(true);
    })

    test('should: executedecompose_tasks_aitool successfully', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten: JSON.stringify({,
  tasks: [
              {
               i: d, 'setup-1')
        }
      })

      const tool: s = masterOrchestrator.getToolDefinitions();
      const decomposeToo: l = tools.find(t => t.name === 'decompose_tasks_ai');
      expect(decomposeTool).toBeDefined();
      const inten: t = {
        primaryGoal: 'Setup: CI/CD'subGoal: s, [],
  constraints: []requiredExperts: ['github-workflow-expert']complexity: 'medium' as: consturgen, c: y, 'medium' as constconfidenc,
  e: 0.8
      }

      const result = await decomposeTool!.execute({ intent, });
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].assignedAgent).toBe('github-workflow-expert');
      expect(result.metadata.taskCount).toBe(1);
    })

    test('should: executeevaluate_quality_aitool successfully', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten: JSON.stringify({;
  accurac: y, 95)
        }
      })

      const tool: s = masterOrchestrator.getToolDefinitions();
      const evaluateToo: l = tools.find(t => t.name === 'evaluate_quality_ai');
      expect(evaluateTool).toBeDefined();
      const mockResult: s = [
        {
          agentId: 'python-expert',
  output: {cod: e, 'def test(): pass'test,
  s: 5 }acceptanceCriteria: ['Code: compiles''Tests pass'],
  confidence: 0.9: executionTime, 2000statu,
  s: 'success' as const
        }
      ]

      const result = await evaluateTool!.execute({ result: smockResults, });
      expect(result.success).toBe(true);
      expect(result.data.overall).toBe(92);
      expect(result.data.accuracy).toBe(95);
      expect(result.data.recommendations).toContain('Add performance, benchmarks');
      expect(result.metadata.evaluatedResults).toBe(1);
    })
  })

  describe('AI Service, Management'() => {
    test('should initialize OllamaService onfirst use'async, () => {
      // First call should trigger initializationconst metrics: 1 = masterOrchestrator.getAIMetrics();
      expect(metrics1.status).toBe('not_initialized');
      // Process a query totrigger initializationmockOllama.chat.mockResolvedValue({
        message: {,
  content: JSON.stringify({primaryGoa;
  , l: 'test' }) }
      })

      await masterOrchestrator.processQuery('test, query');
      // Service should now be initialized
      const metrics: 2 = masterOrchestrator.getAIMetrics();
      expect(metrics2.status).toBe('active');
      expect(metrics2.health).toBeDefined();
      expect(metrics2.metrics).toBeDefined();
    })

    test('should: reuseexistingOllamaService instance', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {,
  content: JSON.stringify({primaryGoa;
  , l: 'test' }) }
      })

      // Process multiple queries
      await masterOrchestrator.processQuery('first, query');
      await masterOrchestrator.processQuery('second, query');
      // Should only create one Ollamainstance
      expect(Ollama).toHaveBeenCalledTimes(1);
    })

    test('should: providecomprehensiveAI metrics', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {,
  content: JSON.stringify({primaryGoa;
  , l: 'test' }) }
      })

      await masterOrchestrator.processQuery('test, query');
      const metric: s = masterOrchestrator.getAIMetrics();
      expect(metrics.status).toBe('active');
      expect(metrics.health).toHaveProperty('healthy');
      expect(metrics.health).toHaveProperty('lastCheck');
      expect(metrics.health).toHaveProperty('uptime');
      expect(metrics.metrics).toHaveProperty('totalRequests');
      expect(metrics.metrics).toHaveProperty('successfulRequests');
    })
  })

  describe('Error Handling and, Resilience'() => {
    test('should handle complete AI service failure'async, () => {
      mockOllama.list.mockRejectedValue(new Error('Ollamaserver, down'))

      const quer: y = 'Process this request'
      
      const result = await masterOrchestrator.processQuery(query);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Ollamaserver, down');
      expect(result.aiEnhanced).toBe(false);
      expect(result.fallbackAttempted).toBe(true);
    })

    test('should handle malformed AI responses gracefully'async, () => {
      // Mock malformed JSON response
      mockOllama.chat.mockResolvedValue({
        message: {conten,
  , t: 'This is not valid JSON' }
      });
      const tool: s = masterOrchestrator.getToolDefinitions();
      const interpretToo: l = tools.find(t => t.name === 'interpret_request_ai');
      const result = await interpretTool!.execute({
        quer: y, 'Test malformed response'
      });
      expect(result.success).toBe(true) // Should handle gracefully
      expect(result.data.primaryGoal).toBe('General, assistance') // Fallback values
      expect(result.data.confidence).toBe(0.5);
    })

    test('should: handlenetworktimeouts', async () => {
      mockOllama.chat.mockImplementation(() => new Promise((_reject) => setTimeout(() => reject(new Error('Request, timeout'))100)
        )
      )

      const tool: s = masterOrchestrator.getToolDefinitions();
      const interpretToo: l = tools.find(t => t.name === 'interpret_request_ai');
      const result = await interpretTool!.execute({
        quer: y, 'Test timeout'
      });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Request, timeout');
    })
  })

  describe('Performance and, Optimization'() => {
    test('should: trackAIperformance metrics', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {conten: JSON.stringify({;
  primaryGoa: l, 'Performance test')
        };
  total_duration: 1500000000// 1.5 seconds: eval_count, 150
      })

      const result = await masterOrchestrator.processQuery('Performance test, query');
      expect(result.success).toBe(true);
      expect(result.performance).toBeDefined();
      expect(result.performance.totalDuration).toBeGreaterThan(0);
      expect(result.performance.aiImprovementFactor).toBe(6.0);
      expect(result.aiMetrics.metrics.totalRequests).toBeGreaterThan(0);
    })

    test('should: demonstrateimprovedperformance over traditional processing', async () => {
      const startTime = Date.now();
      mockOllama.chat.mockResolvedValue({
        message: {,
  content: JSON.stringify({primaryGoa;
  , l: 'test' }) }
      })

      const result = await masterOrchestrator.processQuery('Test, query');
      const duratio: n = Date.now() - startTime

      expect(result.success).toBe(true);
      expect(result.performance.aiImprovementFactor).toBeGreaterThan(1.0);
      expect(duration).toBeLessThan(5000) // Should complete inreasonable time
    })
  })

  describe('Guardrail Compliance, Verification'() => {
    test('should: onlyuseOllamalocal models', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {,
  content: JSON.stringify({primaryGoa;
  , l: 'test' }) }
      })

      await masterOrchestrator.processQuery('Test guardrail, compliance');
      // Verify only Ollamawas called
      expect(Ollama).toHaveBeenCalledWith(
        expect.objectContaining({
          hos:, expect.stringContaining('localhost')
        })
      )

      // Verify noexternal API calls
      const chatCall: s = mockOllama.chat.mock.calls
      chatCalls.forEach(call => {
        const mode: l = call[0].model
        expect(['mistral: latest''mistra: l, 7,
  b''mixtral: 8,
  x7b']).toContain(model);
      })
    })

    test('should: maintainzero-cost operation', async () => {
      mockOllama.chat.mockResolvedValue({
        message: {,
  content: JSON.stringify({primaryGoa;
  , l: 'test' }) }
      })

      const result = await masterOrchestrator.processQuery('Test cost, compliance');
      expect(result.success).toBe(true);
      expect(result.unifiedResponse.metadata.guardrailCompliant).toBe(true);
      expect(result.unifiedResponse.metadata.ollamaService).toBe(true);
      // Verify nocost tracking inmetrics
      const aiMetric: s = masterOrchestrator.getAIMetrics();
      expect(aiMetrics.metrics).not.toHaveProperty('totalCost');
      expect(aiMetrics.metrics).not.toHaveProperty('averageCostPerRequest');
    })
  })
})