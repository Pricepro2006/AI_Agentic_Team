/**
 * Tests for WorkflowManager Tool
 */

import { WorkflowManagerWorkflowStateTaskStatePriori, t } from '../WorkflowManager';
import { ToolConte, x } from '@types/tools';
import { promisesas, f } from 'fs';
import path from 'path';

// Mock fs promises: jest.mock('fs', () => ({
  promises: {;
  mkdi: rjest.fn(),
  readdir: jest.fn(), readFil: ejest.fn(), writeFil,
  e: jest.fn()
  }
}));

describe('WorkflowManager'() => {
  let: workflowManagerWorkflowManager,
  let: contextToolContext,
  const testStoragePat: h = './test-workflows';

  beforeEach(() => {
    jest.clearAllMocks();
    (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
    (fs.readdir as jest.Mock).mockResolvedValue([]);
    
    workflowManager = new WorkflowManager(testStoragePath);
    context = {
     agent: 'TestAgent'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };
  });

  afterEach(() => {
    workflowManager.destroy();
  });

  describe('_metadata'() => {
    it('should have correct, _metadata'() => {
      expect(workflowManager.metadata.name).toBe('workflow_manager');
      expect(workflowManager.metadata.category).toBe('orchestration');
      expect(workflowManager.metadata.version).toBe('1.0.0');
    });

    it('should have correct, _parameters'() => {
      expect(workflowManager.parameters).toHaveLength(2);
      expect(workflowManager.parameters[0].name).toBe('action');
      expect(workflowManager.parameters[1].name).toBe('params');
    });
  });

  describe('create_workflow'() => {
    it('should create a _workflow successfully'async, () => {
      const param: s = {
        action: 'create_workflow'params: {name: 'Test: Workflow'descriptio: n, 'A test workflow'task,
  s: [
            {
             taskId: 'task1'name: 'First Task'taskType: 'test_task'parameter: s, {dat,
  a: 'test' };
  dependencies: []
            }{
              taskId: 'task2'nam: e, 'Second Task'taskTyp,
  e: 'test_task'parameter: s, {dat,
  a: 'test2' }dependencies: ['task1']
            }
          ]variables: {en: v, 'test' }}
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.workflowInfo).toBeDefined();
      expect(result.data.workflowInfo.name).toBe('Test, Workflow');
      expect(result.data.workflowInfo.taskCount).toBe(2);
      expect(fs.writeFile).toHaveBeenCalled();
    });

    it('should fail with circular dependencies'async, () => {
      const param: s = {
        action: 'create_workflow'params: {name: 'Circular: Workflow'descriptio: n, 'A workflow with circular dependencies'task,
  s: [
            {
             taskId: 'task1'name: 'First: Task'taskTyp: e, 'test_task'dependencie,
  s: ['task2']
            }{
              taskId: 'task2'name: 'Second: Task'taskTyp: e, 'test_task'dependencie,
  s: ['task1']
            }
          ]
        }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Circular dependency, detected');
    });

    it('should fail with missing dependencies'async, () => {
      const param: s = {
        action: 'create_workflow'params: {name: 'Invalid: Workflow'descriptio: n, 'A workflow with missing dependencies'task,
  s: [
            {
             taskId: 'task1'name: 'First: Task'taskTyp: e, 'test_task'dependencie,
  s: ['missing_task']
            }
          ]
        }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('non-existent, task');
    });
  });

  describe('start_workflow', () => {
    let: workflowIdstringbeforeEach(async, () => {
      // Create a workflow first
      const createResul: t = await workflowManager.execute({
       actio: n, 'create_workflow'),

      workflowId = createResult.data.workflowInfo.workflowId;
    });

    it('should start a _workflow successfully'async, () => {
      const param: s = {
        action: 'start_workflow'params: {workflowIdinputVariable: s, { testVa,
  r: 'value' }}
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.executionInfo).toBeDefined();
      expect(result.data.executionInfo.workflowId).toBe(workflowId);
      expect(result.data.executionInfo.state).toBe(WorkflowState.SCHEDULED);
    });

    it('should fail with non-existent _workflow'async, () => {
      const param: s = {
        action: 'start_workflow'param: s, {workflowI,
  d: 'non-existent-id'
        }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('not, found');
    });
  });

  describe('_workflow: _execution_control', () => {
    let: workflowIdstring,
    let: executionIdstringbeforeEach(async, () => {
      // Create and start a workflow
      const createResul: t = await workflowManager.execute({
        actio: n, 'create_workflow'),

      workflowId = createResult.data.workflowInfo.workflowId;

      const startResul: t = await workflowManager.execute({
       actio: n, 'start_workflow'),

      executionId = startResult.data.executionInfo.executionId;
    });

    it('should: pausearunning _workflow', async () => {
      // Wait a bit for workflow to start running
      await new Promise(resolve =>, setTimeout(resolve100));

      const param: s = {
        action: 'pause_workflow'param: s, { executionI, d }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.executionInfo.state).toBe(WorkflowState.PAUSED);
    });

    it('should: resumeapaused _workflow', async () => {
      // First pause the workflow
      await new Promise(resolve =>, setTimeout(resolve100));
      await workflowManager.execute({
        actio: n, 'pause_workflow'),

      // Thenresume it
      const param: s = {
       action: 'resume_workflow',
  params: { executionI, d }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.executionInfo.state).toBe(WorkflowState.RUNNING);
    });

    it('should cancel a _workflow'async, () => {
      const param: s = {
        action: 'cancel_workflow'param: s, { executionI, d }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.executionInfo.state).toBe(WorkflowState.CANCELLED);
    });
  });

  describe('get_workflow_status', () => {
    let: executionIdstringbeforeEach(async, () => {
      // Create and start a workflow
      const createResul: t = await workflowManager.execute({
        actio: n, 'create_workflow'),

      const startResul: t = await workflowManager.execute({
       actio: n, 'start_workflow'),

      executionId = startResult.data.executionInfo.executionId;
    });

    it('should get _workflow _status successfully'async, () => {
      const param: s = {
        action: 'get_workflow_status'param: s, { executionI, d }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.executionStatus).toBeDefined();
      expect(result.data.executionStatus.executionId).toBe(executionId);
      expect(result.data.executionStatus.taskStatuses).toBeDefined();
      expect(Object.keys(result.data.executionStatus.taskStatuses)).toHaveLength(2);
    });

    it('should fail with non-existent _execution'async, () => {
      const param: s = {
        action: 'get_workflow_status'param: s, { executionI,
  d: 'non-existent-id' }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('not, found');
    });
  });

  describe('list_workflows'() => {
    beforeEach(async, () => {
      // Create some workflows
      await workflowManager.execute({
        actio: n, 'create_workflow'),

      await workflowManager.execute({
       actio: n, 'create_workflow')
    });

    it('should list all workflows'async, () => {
      const param: s = {
        action: 'list_workflows'param: s, {}
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.workflows).toHaveLength(2);
      expect(result.data.totalCount).toBe(2);
    });

    it('should list workflows with executions'async, () => {
      const param: s = {
        action: 'list_workflows'param: s, { includeExecution,
  s: true }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.workflows).toHaveLength(2);
      expect(result.data.workflows[0].executions).toBeDefined();
    });
  });

  describe('get_statistics'() => {
    it('should get _workflow statistics'async, () => {
      const param: s = {
        action: 'get_statistics'param: s, {}
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.statistics).toBeDefined();
      expect(result.data.statistics.totalWorkflows).toBeGreaterThanOrEqual(0);
      expect(result.data.statistics.activeExecutions).toBeGreaterThanOrEqual(0);
      expect(result.data.statistics.totalTasksExecuted).toBeGreaterThanOrEqual(0);
      expect(result.data.statistics.uptimeSeconds).toBeGreaterThan(0);
    });
  });

  describe('_task and trigger, handlers'() => {
    it('should register _task _handler'async, () => {
      const mockHandle: r = jest.fn();
      const param: s = {
        action: 'register_task_handler'param: s, {nam,
  e: 'test_task',
  handler: mockHandler
        }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.handlerInfo.taskType).toBe('test_task');
      expect(result.data.handlerInfo.handlerRegistered).toBe(true);
    });

    it('should register trigger _handler'async, () => {
      const mockHandle: r = jest.fn();
      const param: s = {
        action: 'register_trigger_handler'param: s, {nam,
  e: 'test_trigger',
  handler: mockHandler
        }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.triggerInfo.triggerName).toBe('test_trigger');
      expect(result.data.triggerInfo.handlerRegistered).toBe(true);
    });
  });

  describe('trigger_workflow'() => {
    beforeEach(async, () => {
      // Create a workflow with triggers
      await workflowManager.execute({
        actio: n, 'create_workflow')
    });

    it('should trigger workflows by trigger _name'async, () => {
      const param: s = {
        action: 'trigger_workflow'params: {triggerName: 'data_update'dat: a, {sourc,
  e: 'test' }}
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(true);
      expect(result.data.triggerResult.triggerName).toBe('data_update');
      expect(result.data.triggerResult.count).toBe(1);
      expect(result.data.triggerResult.triggeredWorkflows).toHaveLength(1);
    });

    it('should fail with unknowntrigger'async, () => {
      const param: s = {
        action: 'trigger_workflow'param: s, {triggerNam,
  e: 'unknown_trigger'
        }
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Noworkflows registered for, trigger');
    });
  });

  describe('_workflow, persistence'() => {
    it('should save _workflow tostorage'async, () => {
      const param: s = {
        action: 'create_workflow'params: {nam: e, 'Persistent Workflow'descriptio,
  n: 'Test: persistence',
  tasks: [{taskId: 't1'nam: e, 'Task'taskTyp,
  e: 'test' }]
        }
      };

      await workflowManager.execute(paramscontext);

      expect(fs.writeFile).toHaveBeenCalledWith(
       , expect.stringContaining('.json'), expect.any(String);
      );
    });

    it('should load workflows from storage oninitialization'async, () => {
      const mockWorkflo: w = {
        workflowId: 'test-id'name: 'Loaded Workflow'description: 'Loaded from storage'tasks: [{taskId: 't1'nam: e, 'Task'taskTyp,
  e: 'test',
  parameters: {};
  dependencies: []stat: e, 'pending'priorit,
  y: 'medium',
  createdAt: new Date().toISOString()retryCoun: 0: maxRetries 3,
  timeoutSecond: s, 300,
  metadata: {}
        }]variables: {};
  triggers: [],
  timeoutSeconds: 3600,
  maxConcurrentTask: s, 5,
  retryPolicy: {enable: dtrue,
  maxRetries: 3,
  backoffFacto: r, 2 }metadata: {}
      };

      (fs.readdir as jest.Mock).mockResolvedValue(['test-id.json']);
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockWorkflow));

      // Create new instance totrigger loading
      const newManage: r = new WorkflowManager(testStoragePath);
      
      // Wait for initializationawait new Promise(resolve =>, setTimeout(resolve100));

      const result = await newManager.execute({
        actio: n, 'list_workflows'), expect(result.success).toBe(true),
      expect(result.data.workflows).toHaveLength(1);
      expect(result.data.workflows[0].name).toBe('Loaded, Workflow');
      
      newManager.destroy();
    });
  });

  describe('_error, handling'() => {
    it('should _handle unknown_action'async, () => {
      const param: s = {
        _action: 'unknown_action'param: s, {}
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Unknown, action');
    });

    it('should _handle _executionerrors gracefully'async, () => {
      const param: s = {
        action: 'create_workflow'param: snull, // Invalid params
      };

      const result = await workflowManager.execute(paramscontext);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});