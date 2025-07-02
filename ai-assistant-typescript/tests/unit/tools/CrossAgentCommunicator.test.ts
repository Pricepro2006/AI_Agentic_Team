/**
 * Unit tests for CrossAgentCommunicator tool
 */

import { CrossAgentCommunicator } from '@tools/implementations/orchestrator/CrossAgentCommunicator';
import { ToolContext } from '@types/tools';

describe('CrossAgentCommunicator', () => {
  let communicator: CrossAgentCommunicator;
  let context: ToolContext;

  beforeEach(() => {
    communicator = new CrossAgentCommunicator();
    context = {
      agent: 'TestAgent',
      sessionId: 'test-session-123',
      traceId: 'test-trace-123',
      metadata: {},
    };
    
    // Clear any existing handlers and queues
    CrossAgentCommunicator['messageHandlers'].clear();
    CrossAgentCommunicator['messageQueue'].clear();
  });

  describe('metadata', () => {
    it('should have correct metadata', () => {
      expect(communicator.metadata).toEqual({
        name: 'cross_agent_communicator',
        description: 'Enables communication between different AI agents in the system',
        version: '1.0.0',
        author: 'AI Assistant Team',
        category: 'orchestration',
        requiredPermissions: ['agent:communicate'],
      });
    });

    it('should have correct parameters', () => {
      expect(communicator.parameters).toHaveLength(6);
      expect(communicator.parameters[0]).toMatchObject({
        name: 'sourceAgent',
        type: 'string',
        required: true,
      });
      expect(communicator.parameters[1]).toMatchObject({
        name: 'targetAgent',
        type: 'string',
        required: true,
      });
    });
  });

  describe('execute', () => {
    it('should successfully queue a message', async () => {
      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'Test message',
        priority: 'medium' as const,
      };

      const result = await communicator.execute(params, context);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        status: 'queued',
        targetAgent: 'AgentB',
      });
      expect(result.data?.messageId).toBeDefined();
    });

    it('should reject when source and target are the same', async () => {
      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentA',
        message: 'Test message',
      };

      const result = await communicator.execute(params, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Source and target agents cannot be the same');
    });

    it('should handle synchronous communication when response required', async () => {
      const mockHandler = jest.fn().mockResolvedValue({ status: 'processed' });
      CrossAgentCommunicator.registerHandler('AgentB', mockHandler);

      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'Test message',
        requiresResponse: true,
      };

      const result = await communicator.execute(params, context);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        status: 'sent',
        targetAgent: 'AgentB',
        response: { status: 'processed' },
      });
      expect(mockHandler).toHaveBeenCalled();
    });

    it('should handle handler errors gracefully', async () => {
      const mockHandler = jest.fn().mockRejectedValue(new Error('Handler error'));
      CrossAgentCommunicator.registerHandler('AgentB', mockHandler);

      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'Test message',
        requiresResponse: true,
      };

      const result = await communicator.execute(params, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Target agent handler failed');
    });

    it('should respect priority levels', async () => {
      jest.useFakeTimers();

      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'High priority message',
        priority: 'high' as const,
      };

      const result = await communicator.execute(params, context);

      expect(result.success).toBe(true);
      expect(result.data?.status).toBe('queued');

      // High priority should process immediately
      jest.runAllImmediates();

      jest.useRealTimers();
    });
  });

  describe('static methods', () => {
    it('should register and retrieve handlers', () => {
      const mockHandler = jest.fn();
      CrossAgentCommunicator.registerHandler('TestAgent', mockHandler);

      expect(CrossAgentCommunicator['messageHandlers'].has('TestAgent')).toBe(true);
    });

    it('should get queued messages', async () => {
      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'Test message',
      };

      await communicator.execute(params, context);

      const queuedMessages = CrossAgentCommunicator.getQueuedMessages('AgentB');
      expect(queuedMessages).toHaveLength(1);
      expect(queuedMessages[0]).toMatchObject({
        source: 'AgentA',
        target: 'AgentB',
        content: 'Test message',
      });
    });

    it('should clear message queue', async () => {
      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'Test message',
      };

      await communicator.execute(params, context);
      
      expect(CrossAgentCommunicator.getQueuedMessages('AgentB')).toHaveLength(1);
      
      CrossAgentCommunicator.clearQueue('AgentB');
      
      expect(CrossAgentCommunicator.getQueuedMessages('AgentB')).toHaveLength(0);
    });
  });

  describe('validation', () => {
    it('should be a valid tool result', async () => {
      const params = {
        sourceAgent: 'AgentA',
        targetAgent: 'AgentB',
        message: 'Test message',
      };

      const result = await communicator.run(params, context);

      expect(result).toBeValidToolResult();
    });
  });
});