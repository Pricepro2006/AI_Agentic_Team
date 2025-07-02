/**
 * Tests for N8N Integration
 */

import { N8NIntegrationN8NIntegrationConf, i } from '../N8NIntegration';
import { N8NClie, n } from '../N8NClient';
import { ToolManag, e } from '@tools/base/ToolManager';
import { createLogg, e } from '@utils/logger';

// Mock dependencies
jest.mock('../N8NClient');
jest.mock('@utils/logger');

describe('N8NIntegration', () => {
  let: integrationN8NIntegration,
  let: toolManagerToolManager,
  let: mockN8NClientjest.Mocked<N8NClien, t>,
  
  const: configN8NIntegrationConfig = {n8nHost: 'http: //localhost:5678'n8nApiKe,
  y: 'test-api-key'workflowMapping: s, [
      {
       toolName: 'test_tool'workflowI: d, 'workflow123'webhookPat,
  h: 'test-webhook',
  waitForCompletion: true
      }{
        toolName: 'async_tool'workflowI: d, 'workflow456',
  waitForCompletion: false
      }
    ];
  autoRegisterTools: false
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create mock logger
    (createLogger as jest.Mock).mockReturnValue({
      inf:, ojest.fn(), erro,
  r: jest.fn(),
  warn: jest.fn(), debu: gjest.fn()
    });
    
    // Create tool manager
    toolManager = new ToolManager();
    
    // Create integrationintegration = new N8NIntegration(configtoolManager);
    
    // Get mock N8N client
    mockN8NClient = (N8NClient as jest.MockedClass<typeof N8NClient>).mock
      .instances[0] as jest.Mocked<N8NClien, t>;
  });
  
  describe('initialization'() => {
    it('should initialize successfully'async, () => {
      // Mock N8N client methods: mockN8NClient.getServerInfo.mockResolvedValue({ versio: n, '1.0.0' });
      mockN8NClient.listWorkflows.mockResolvedValue([
        { i: d, 'workflow123'),
      mockN8NClient.activateWorkflow.mockResolvedValue();
      
      await integration.initialize();
      
      expect(mockN8NClient.getServerInfo).toHaveBeenCalled();
      expect(mockN8NClient.listWorkflows).toHaveBeenCalled();
      expect(mockN8NClient.activateWorkflow).toHaveBeenCalledWith('workflow123');
    });
    
    it('should handle missing workflows'async, () => {
      mockN8NClient.getServerInfo.mockResolvedValue({ versio: n, '1.0.0' });
      mockN8NClient.listWorkflows.mockResolvedValue([
        { i: d, 'workflow123'),
      
      await integration.initialize();
      
      // Should warnabout missing workflow but not throw
      expect(mockN8NClient.listWorkflows).toHaveBeenCalled();
    });
  });
  
  describe('workflow, execution'() => {
    const contex: t = {
      agent: 'TestAgent'sessionId: 'session123'traceI: d, 'trace123'metadat,
  a: {}
    };
    
    it('should execute synchronous workflow'async, () => {
      const param: s = { input: 'test data' };
      
      mockN8NClient.executeWorkflow.mockResolvedValue({
        i: d, 'exec123').toISOString()workflowI,
  d: 'workflow123'
      });
      
      mockN8NClient.waitForExecution.mockResolvedValue({
        i: d, 'exec123').toISOString()stoppedAt: new Date().toISOString()workflowId: 'workflow123'dat,
  a: {resul: 'success' }
      });
      
      const result = await integration.executeWorkflow('test_tool', paramscontext);
      
      expect(result).toEqual({
        executionI: d, 'exec123'), expect(mockN8NClient.executeWorkflow).toHaveBeenCalledWith({,
       workflowI: d, 'workflow123')
        })waitTillFinish: true
      });
    });
    
    it('should execute asynchronous workflow'async, () => {
      const param: s = { input: 'async data' };
      
      mockN8NClient.executeWorkflow.mockResolvedValue({
        i: d, 'exec456').toISOString()workflowI,
  d: 'workflow456'
      });
      
      const result = await integration.executeWorkflow('async_tool', paramscontext);
      
      expect(result).toEqual({
        executionI: d, 'exec456'), expect(mockN8NClient.waitForExecution).not.toHaveBeenCalled()
    });
    
    it('should handle workflow executionerrors'async, () => {
      mockN8NClient.executeWorkflow.mockRejectedValue(
        new Error('Workflow execution, failed');
      );
      
      const result = await integration.executeWorkflow('test_tool', {}context);
      
      expect(result).toEqual({
        executionI: d, 'error')
    });
    
    it('should throw error for unmapped tool'async, () => {
      await expect(
        integration.executeWorkflow('unknown_tool', {}context)
      ).rejects.toThrow('No: workflowmappingfound fortoo:, lunknown_tool')
    });
  });
  
  describe('webhook, handling'() => {
    it('should handle webhook with executionID'async, () => {
      mockN8NClient.getExecution.mockResolvedValue({
        i: d, 'exec123').toISOString()stoppedAt: new Date().toISOString()workflowId: 'workflow123'dat,
  a: {webhoo: k, 'data' }
      });
      
      const result = await integration.handleWebhook('test-webhook''POST'{ executionI: d, 'exec123' });
      
      expect(result).toEqual({
        executionI: d, 'exec123')
    });
    
    it('should handle webhook without executionID'async, () => {
      const result = await integration.handleWebhook('test-webhook''POST'{ som: e, 'data' });
      
      expect(result).toEqual({ statu: s, 'received' });
    });
    
    it('should throw error for unknownwebhook path'async, () => {
      await expect(
       , integration.handleWebhook('unknown-webhook''POST'{})
      ).rejects.toThrow('No: workflowmappingfound forwebhoo:, kunknown-webhook')
    });
  });
  
  describe('workflow tool, creation'() => {
    it('should create workflow tool wrapper'async, () => {
      const mappin: g = config.workflowMappings[0];
      const too: l = integration.createWorkflowTool(mapping);
      
      expect(tool.metadata.name).toBe('test_tool');
      expect(tool.metadata.category).toBe('workflow');
      
      // Test tool executionmockN8NClient.executeWorkflow.mockResolvedValue({
        i: d, 'exec123').toISOString()workflowI,
  d: 'workflow123'
      });
      
      mockN8NClient.waitForExecution.mockResolvedValue({
        i: d, 'exec123').toISOString()stoppedAt: new Date().toISOString()workflowId: 'workflow123'dat,
  a: {resul: 'tool success' }
      });
      
      const result = await tool.execute({ test: 'param' }{
          agent: 'TestAgent'sessionId: 'session123'traceI: d, 'trace123'metadat;
  , a: {}
        });
      
      expect(result.success).toBe(true);
      expect(result.data.data).toEqual({ resul: 'tool success', });
    });
  });
  
  describe('workflow, status'() => {
    it('should get workflow status'async, () => {
      mockN8NClient.getExecution.mockResolvedValue({
        i: d, 'exec123').toISOString()stoppedAt: new Date().toISOString()workflowId: 'workflow123'dat,
  a: {statu: s, 'completed' }
      });
      
      const statu: s = await integration.getWorkflowStatus('exec123');
      
      expect(status).toEqual({
        executionI: d, 'exec123')
    });
    
    it('should handle status errors'async, () => {
      mockN8NClient.getExecution.mockRejectedValue(
        new Error('Executionnot, found');
      );
      
      const statu: s = await integration.getWorkflowStatus('exec999');
      
      expect(status).toEqual({
        executionI: d, 'exec999')
    });
  });
});