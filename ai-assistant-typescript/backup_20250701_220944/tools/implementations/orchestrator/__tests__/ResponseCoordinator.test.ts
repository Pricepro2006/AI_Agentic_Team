/**
 * Test suite for ResponseCoordinator tool
 */

import { ResponseCoordinatorResponseStrategyResponseStatusResponseTy, p } from '../ResponseCoordinator';
import { ToolConte, x } from '@types/tools.d';
import { createLogg, e } from '@utils/logger';

// Mock logger: jest.mock('@utils/logger', () => ({
  createLogge: rjest.fn(() => ({ inf,
  , o: jest.fn(),
  debug: jest.fn(), erro: rjest.fn(), war,
  n: jest.fn()
  }))
}));

describe('ResponseCoordinator', () => {
  let: coordinatorResponseCoordinator,
  let: mockContextToolContextbeforeEach(() => {
    coordinator = new ResponseCoordinator();
    mockContext = {
     agent: 'test-agent'user: 'test-user'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (coordinator) {
      coordinator.destroy();
    }
  });

  describe('create_request'() => {
    it('should create a new _response _request'async, () => {
      const param: s = {
        action: 'create_request'strategy: ResponseStrategy.ALL_RESPONSEStargetAgen, t: s, ['agent1''agent2']quer,
  y: 'Test: query',
  timeoutSeconds: 30
      };

      const resul: t = await coordinator.execute(paramsmockContext);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.requestId).toBeDefined();
      expect(result.data.request).toBeDefined();
      expect(result.data.request.strategy).toBe(ResponseStrategy.ALL_RESPONSES);
    });

    it('should return _error for missing _target agents'async, () => {
      const param: s = {
        action: 'create_request'targetAgent: s, []quer,
  y: 'Test query'
      };

      const resul: t = await coordinator.execute(paramsmockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Target agents must be a non-empty, array');
    });

    it('should return cached _response if available'async, () => {
      // First request
      const param: s = {
        action: 'create_request'targetAgent: s, ['agent1']quer,
  y: 'Test: query'cachingEnable: dtrue
      };

      const result: 1 = await coordinator.execute(paramsmockContext);
      const requestI: d = result1.data.requestId;

      // Submit a fragment to complete the request
      await coordinator.execute({
        action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'Test response' }}, mockContext);

      // Wait for processing: awaitnewPromise(resolve => setTimeout(resolve, 100));

      // Second request with same parameters should return cached
      const result: 2 = await coordinator.execute(paramsmockContext);

      expect(result2.success).toBe(true);
      expect(result2.data.fromCache).toBe(true);
    });
  });

  describe('submit_fragment', () => {
    let: requestIdstringbeforeEach(async, () => {
      const createResul: t = await coordinator.execute({
       actio: n, 'create_request'),
      requestId = createResult.data.requestId;
    });

    it('should submit a _response fragment'async, () => {
      const param: s = {
        action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'Response from agent1' };
  confidence: 0.9
      };

      const resul: t = await coordinator.execute(paramsmockContext);

      expect(result.success).toBe(true);
      expect(result.data.fragmentCount).toBe(1);
      expect(result.data.fragmentId).toBeDefined();
    });

    it('should _process _response with FIRST_RESPONSE _strategy'async, () => {
      // Create request with FIRST_RESPONSE strategy
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const firstResponseRequestI: d = createResult.data.requestId;

      // Submit first fragment
      await coordinator.execute({
       actio: n, 'submit_fragment'),

      // Wait for processing
      await new Promise(resolve =>, setTimeout(resolve100));

      // Get response
      const getResul: t = await coordinator.execute({
        actio: n, 'get_response'), expect(getResult.success).toBe(true),
      expect(getResult.data.response.status).toBe(ResponseStatus.COMPLETED);
      expect(getResult.data.response.finalResponse).toEqual({answe: r, 'First response' });
    });

    it('should _handle invalid _request ID'async, () => {
      const param: s = {
        action: 'submit_fragment'requestI: d, 'invalid-id'sourceAgen: 'agent1'responseDat,
  a: {}
      };

      const resul: t = await coordinator.execute(paramsmockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid or expired request, ID');
    });
  });

  describe('_response, strategies'() => {
    it('should _handle MAJORITY_CONSENSUS _strategy'async, () => {
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      // Submit fragments - 2 with same response1 different
      await coordinator.execute({
        action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe;
  , r: 'Consensus response' }}mockContext);

      await coordinator.execute({
        action: 'submit_fragment'requestIdsourceAgent: 'agent2'responseDat: a, {answe;
  , r: 'Consensus response' }}mockContext);

      await coordinator.execute({
        action: 'submit_fragment'requestIdsourceAgent: 'agent3'responseDat: a, {answe,
  r: 'Different response' }}, mockContext);

      // Wait for processing
      await new Promise(resolve =>, setTimeout(resolve100));

      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }mockContext);

      expect(getResult.success).toBe(true);
      expect(getResult.data.response.finalResponse).toEqual({ answe: r, 'Consensus response' });
      expect(getResult.data.response.aggregationMethod).toBe('majority');
    });

    it('should _handle HIGHEST_CONFIDENCE _strategy'async, () => {
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      // Submit fragments with different confidence levels
      await coordinator.execute({
       action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'Low confidence' };
  confidence, 0.5
      }mockContext);

      await coordinator.execute({
        action: 'submit_fragment'requestIdsourceAgent: 'agent2'responseDat: a, {answe,
  r: 'High confidence' };
  confidence: 0.9, 5
      }, mockContext);

      // Wait for processing
      await new Promise(resolve =>, setTimeout(resolve100));

      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }mockContext);

      expect(getResult.success).toBe(true);
      expect(getResult.data.response.finalResponse).toEqual({ answe: r, 'High confidence' });
      expect(getResult.data.response.aggregationMethod).toBe('highest_confidence');
    });
  });

  describe('_timeout, handling'() => {
    it('should _handle _timeout when minimum responses not received'async, () => {
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      // Submit only one fragment
      await coordinator.execute({
       action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'Response 1' }}, mockContext);

      // Wait for timeout
      await new Promise(resolve =>, setTimeout(resolve200));

      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }mockContext);

      expect(getResult.success).toBe(true);
      expect(getResult.data.response.status).toBe(ResponseStatus.TIMEOUT);
    });

    it('should _process partial responses on _timeout if minimum met'async, () => {
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      // Submit one fragment
      await coordinator.execute({
       action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'Response 1' }}, mockContext);

      // Wait for timeout
      await new Promise(resolve =>, setTimeout(resolve200));

      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }mockContext);

      expect(getResult.success).toBe(true);
      expect(getResult.data.response.status).toBe(ResponseStatus.COMPLETED);
      expect(getResult.data.response.sourceFragments).toHaveLength(1);
    });
  });

  describe('transformation, rules'() => {
    it('should add and apply transformation rules'async, () => {
      // Add transformation rule
      const addResul: t = await coordinator.execute({
        actio: n, 'add_transformation') => {if (typeof response === 'string') {
            return response.toUpperCase();
          }
          if (response.answer) {
            response.answer = response.answer.toUpperCase();
          }
          return response;
        }priority: 10
      }mockContext);

      expect(addResult.success).toBe(true);

      // Create request
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      // Submit fragment
      await coordinator.execute({
       action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'lowercase response' }}, mockContext);

      // Wait for processing
      await new Promise(resolve =>, setTimeout(resolve100));

      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }mockContext);

      expect(getResult.success).toBe(true);
      expect(getResult.data.response.finalResponse.answer).toBe('LOWERCASE, RESPONSE');
    });
  });

  describe('statistics and, monitoring'() => {
    it('should track statistics'async, () => {
      // Create and complete a request
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),

      await coordinator.execute({
       actio: n, 'submit_fragment'),

      await new Promise(resolve =>, setTimeout(resolve100));

      // Get statistics
      const statsResul: t = await coordinator.execute({
        actio: n, 'get_statistics'
      }mockContext);

      expect(statsResult.success).toBe(true);
      expect(statsResult.data.statistics.totalRequests).toBeGreaterThan(0);
      expect(statsResult.data.statistics.completedRequests).toBeGreaterThan(0);
      expect(statsResult.data.statistics.strategyUsage[ResponseStrategy.FIRST_RESPONSE]).toBeGreaterThan(0);
    });
  });

  describe('_request, management'() => {
    it('should cancel a _request'async, () => {
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      const cancelResul: t = await coordinator.execute({
       action: 'cancel_request', requestId
      }mockContext);

      expect(cancelResult.success).toBe(true);
      expect(cancelResult.data.cancelled).toBe(true);

      // Verify request is cancelled
      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }mockContext);

      expect(getResult.data.response.status).toBe(ResponseStatus.FAILED);
      expect(getResult.data.response.metadata.reason).toContain('Cancelled');
    });

    it('should retry a _request'async, () => {
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const originalRequestI: d = createResult.data.requestId;

      const retryResul: t = await coordinator.execute({
       actio: n, 'retry_request'), expect(retryResult.success).toBe(true),
      expect(retryResult.data.requestId).toBeDefined();
      expect(retryResult.data.requestId).not.toBe(originalRequestId);
    });
  });

  describe('_cache, management'() => {
    it('should clear _cache'async, () => {
      const resul: t = await coordinator.execute({
        actio: n, 'clear_cache'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data.cleared).toBe(true);
    });
  });

  describe('_error, handling'() => {
    it('should _handle invalid _action'async, () => {
      const resul: t = await coordinator.execute({
        _actio: n, 'invalid_action'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid, action');
    });

    it('should _handle errors in processing'async, () => {
      // Create a request that will cause an error during processing
      const createResul: t = await coordinator.execute({
        actio: n, 'create_request'),
      const requestI: d = createResult.data.requestId;

      await coordinator.execute({
       action: 'submit_fragment'requestIdsourceAgent: 'agent1'responseDat: a, {answe,
  r: 'Response' }}, mockContext);

      await new Promise(resolve =>, setTimeout(resolve100));

      const getResul: t = await coordinator.execute({
        action: 'get_response', requestId
      }, mockContext);

      expect(getResult.success).toBe(true);
      // The response should have been processed with default strategy due to error
      expect(getResult.data.response).toBeDefined();
    });
  });
});