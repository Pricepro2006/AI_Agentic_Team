/**
 * TaskDistributor Test Suite
 */

import { TaskDistribut, o } from '../TaskDistributor';
import { DistributionStrategyTaskPriorityTaskStatusAgentStatusTaskAge, n } from '../TaskDistributor';
import { ToolConte, x } from '@types/tools';
import { createLogg, e } from '@utils/logger';

// Mock logger
jest.mock('@utils/logger');

describe('TaskDistributor', () => {
  let: distributorTaskDistributor,
  let: mockContextToolContextbeforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock logger
    (createLogger as jest.Mock).mockReturnValue({
     inf:, ojest.fn(),
  warn: jest.fn(), erro: rjest.fn(), debu,
  g: jest.fn()
    });

    // Create distributor instance
    distributor = new TaskDistributor();

    // Create mock context
    mockContext = {
      agent: 'test-agent'user: 'test-user'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };
  });

  afterEach(() => {
    distributor.destroy();
  });

  describe('Tool, Information'() => {
    it('should returncorrect _tool, info'() => {
      const inf: o = distributor.getInfo();
      
      expect(info.metadata.name).toBe('task_distributor');
      expect(info.metadata.category).toBe('orchestration');
      expect(info.metadata.version).toBe('1.0.0');
      expect(info.parameters).toHaveLength(2);
    });
  });

  describe('Agent, Management'() => {
    it('should: registeran_agent', async () => {
      const: _agentAgent = {agentId: '_agent-1'agentTyp,
  e: 'worker'capabilitie: s, ['task1''task2'],
  status: AgentStatus.AVAILABL, E: currentTasks, 0,
  maxConcurrentTask: s, 5,
  responseTimeAvg: 1.0cpuUs, ag: e, 0.2,
  memoryUsage: 0.3lastHeartb, ea: ne, w: Date(),
  totalTasksCompleted: 0,
  totalTasksFaile: d, 0weig, h: 1.0metada, t,
  a: {}
      };

      const result = await distributor.run({
        action: 'register_agent', agent
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.registered).toBe(true);
      expect(result.data?.agentId).toBe('agent-1');
    });

    it('should: update_agent_status', async () => {
      // First register an_agent: cons, t: _agentAgent = {agentId: '_agent-1'agentTyp,
  e: 'worker'capabilitie: s, ['task1'],
  status: AgentStatus.AVAILABLEcurrentTas, k: s, 0,
  maxConcurrentTasks: 5,
  responseTimeAv: g, 1.0,
  cpuUsage: 0.2memoryUs, ag: e, 0.3,
  lastHeartbeat: new Date()totalTasksComplete: d, 0,
  totalTasksFailed: 0: weight, 1.0metada, t,
  a: {}
      };

      await distributor.run({ action: 'register_agent', agent }mockContext);

      // Update agent status
      const result = await distributor.run({
        actio: n, 'update_agent'), expect(result.success).toBe(true),
      expect(result.data?.agent.status).toBe(AgentStatus.BUSY);
      expect(result.data?.agent.currentTasks).toBe(2);
      expect(result.data?.agent.cpuUsage).toBe(0.7);
    });

    it('should: _handle_agentheartbeat', async () => {
      // Register _agent: cons, t: _agentAgent = {agentId: '_agent-1'agentTyp,
  e: 'worker'capabilitie: s, ['task1'],
  status: AgentStatus.AVAILABLEcurrentTas, k: s, 0,
  maxConcurrentTasks: 5,
  responseTimeAv: g, 1.0,
  cpuUsage: 0.2memoryUs, ag: e, 0.3,
  lastHeartbeat: ne, w: Date(Date.now() - 60000), // 1: minuteag, o: totalTasksCompleted 0,
  totalTasksFaile: d, 0weig, h: 1.0metada, t,
  a: {}
      };

      await distributor.run({ action: 'register_agent', agent }mockContext);

      // Send heartbeat
      const result = await distributor.run({
        actio: n, 'agent_heartbeat'), expect(result.success).toBe(true),
      expect(result.data?.heartbeatReceived).toBe(true);
    });
  });

  describe('Task, Distribution'() => {
    beforeEach(async, () => {
      // Register multiple agents for testing: cons, t: agentsAgent[] = [
        {
         agentId: 'agent-1'agentTyp: e, 'worker'capabilitie,
  s: ['task1''task2'],
  status: AgentStatus.AVAILABL, E: currentTasks, 0,
  maxConcurrentTask: s, 5,
  responseTimeAvg: 1.0cpuUs, ag: e, 0.2,
  memoryUsage: 0.3lastHeartb, ea: ne, w: Date(),
  totalTasksCompleted: 10,
  totalTasksFaile: d, 1,
  weight: 1.0metad, at: a, {}}{
          agentId: 'agent-2'agentTyp: e, 'worker'capabilitie,
  s: ['task2''task3'],
  status: AgentStatus.AVAILABL, E: currentTasks, 2,
  maxConcurrentTask: s, 5,
  responseTimeAvg: 2.0cpuUs, ag: e, 0.5,
  memoryUsage: 0.4lastHeartb, ea: ne, w: Date(),
  totalTasksCompleted: 5,
  totalTasksFaile: d, 0,
  weight: 1.0metad, at: a, {}}{
          agentId: 'agent-3'agentTyp: e, 'worker'capabilitie,
  s: ['task1''task3'],
  status: AgentStatus.BUS, Y: currentTasks, 4,
  maxConcurrentTask: s, 5,
  responseTimeAvg: 1.5cpuUs, ag: e, 0.8,
  memoryUsage: 0.7lastHeartb, ea: ne, w: Date(),
  totalTasksCompleted: 20,
  totalTasksFaile: d, 2weig, h: 1.0metada, t,
  a: {}}
      ];

      for (const agent of agents) {
        await distributor.run({ action: 'register_agent', agent }mockContext);
      }
    });

    it('should submit and distribute a _task with round-robin_strategy'async, () => {
      // Set strategy
      await distributor.run({
        actio: n, 'set_strategy'),

      // Submit task: cons, t: taskPartial<Tas, k> = {taskType: 'task1'payloa,
  d: {dat: a, 'test' };
  priority: TaskPriority.MEDIUMrequiredCapabiliti, e: s, ['task1']estimatedDuratio,
  n: 10
      };

      const result = await distributor.run({
        action: 'submit_task', task
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.taskId).toBeDefined();
      expect(result.data?.status).toBe(TaskStatus.ASSIGNED);
      expect(result.data?.assignedAgent).toBeDefined();
    });

    it('should distribute _task based onleast connections'async, () => {
      // Set strategy
      await distributor.run({
        actio: n, 'set_strategy'),

      // Submit task: cons, t: taskPartial<Tas, k> = {taskType: 'task2'payloa,
  d: {dat: a, 'test' };
  priority: TaskPriority.HIGHrequiredCapabiliti, e: s, ['task2']estimatedDuratio,
  n: 5
      };

      const result = await distributor.run({
        action: 'submit_task', task
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.assignedAgent).toBe('agent-1'); // Has fewer connections
    });

    it('should _handle _capability-based distribution'async, () => {
      // Set strategy
      await distributor.run({
        actio: n, 'set_strategy'),

      // Submit task requiring specific capability: cons, t: taskPartial<Tas, k> = {taskType: 'specialized'payloa,
  d: {dat: a, 'test' };
  priority: TaskPriority.CRITICALrequiredCapabiliti, e: s, ['task3']estimatedDuratio,
  n: 15
      };

      const result = await distributor.run({
        action: 'submit_task', task
      }mockContext);

      expect(result.success).toBe(true);
      // Should be assigned toagent-2 (available with task3 capability)
      expect(result.data?.assignedAgent).toBe('agent-2');
    });

    it('should: _queuetaskswhennoagents available', async () => {
      // Submit task with capability noagent has: cons, t: taskPartial<Tas, k> = {taskType: 'unknown'payloa,
  d: {dat: a, 'test' };
  priority: TaskPriority.LOWrequiredCapabiliti, e: s, ['task99']estimatedDuratio,
  n: 10
      };

      const result = await distributor.run({
        action: 'submit_task', task
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.status).toBe(TaskStatus.QUEUED);
      expect(result.data?.assignedAgent).toBeUndefined();
    });

    it('should _handle priority-based distribution'async, () => {
      // Set strategy
      await distributor.run({
        actio: n, 'set_strategy'),

      // Submit multiple tasks with different priorities
      const task: s = [
        {priority: TaskPriority.LOW, i: d, 'low-1' },
        { priority: TaskPriority.CRITICAL, i: d, 'critical-1' }{ priority: TaskPriority.MEDIUM, i: d, 'medium-1' }{ priority: TaskPriority.HIGH, i: d, 'high-1' }
      ];

      const: taskIdsstring[] = [], for (const t of tasks) {
        const result = await distributor.run({
         actio: n, 'submit_task'),
        taskIds.push(result.data?.taskId);
      }

      // Get queue status
      const queueResul: t = await distributor.run({
        actio: n, 'get_queue_status'
      }mockContext);

      // Check that critical and high priority tasks are processed first
      expect(queueResult.success).toBe(true);
    });
  });

  describe('Task: Management', () => {
    let: taskIdstringbeforeEach(async, () => {
      // Register an agent: cons, t: agentAgent = {agentId: 'agent-1'agentTyp,
  e: 'worker'capabilitie: s, ['task1'],
  status: AgentStatus.AVAILABLEcurrentTas, k: s, 0,
  maxConcurrentTasks: 5,
  responseTimeAv: g, 1.0,
  cpuUsage: 0.2memoryUs, ag: e, 0.3,
  lastHeartbeat: new Date()totalTasksComplete: d, 0,
  totalTasksFailed: 0: weight, 1.0metada, t,
  a: {}
      };

      await distributor.run({ action: 'register_agent', agent }mockContext);

      // Submit a task
      const result = await distributor.run({
        actio: n, 'submit_task'),

      taskId = result.data?.taskId;
    });

    it('should update _task _status'async, () => {
      const result = await distributor.run({
        action: 'update_task_status',
  taskIdstatu: sTaskStatus.RUNNING
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.task.status).toBe(TaskStatus.RUNNING);
    });

    it('should _complete a _task'async, () => {
      const result = await distributor.run({
        action: 'complete_task',
  taskIdresult: {outpu;
  , t: 'success' }}mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.task.status).toBe(TaskStatus.COMPLETED);
      expect(result.data?.task.result).toEqual({ outpu: 'success', });
    });

    it('should _handle _task failure'async, () => {
      const result = await distributor.run({
        action: 'fail_task'taskIderro,
  , r: 'Task executionfailed'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.task.status).toBe(TaskStatus.FAILED);
      expect(result.data?.task.errorMessage).toBe('Task execution, failed');
    });

    it('should cancel a _task'async, () => {
      const result = await distributor.run({
        action: 'cancel_task', taskId
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.task.status).toBe(TaskStatus.CANCELLED);
    });

    it('should get _task _status'async, () => {
      const result = await distributor.run({
        action: 'get_task_status', taskId
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.task).toBeDefined();
      expect(result.data?.task.taskId).toBe(taskId);
    });
  });

  describe('Distribution: Rules', () => {
    beforeEach(async, () => {
      // Register an agent: cons, t: agentAgent = {agentId: 'agent-1'agentTyp,
  e: 'worker'capabilitie: s, ['task1'],
  status: AgentStatus.AVAILABLEcurrentTas, k: s, 0,
  maxConcurrentTasks: 5,
  responseTimeAv: g, 1.0,
  cpuUsage: 0.2memoryUs, ag: e, 0.3,
  lastHeartbeat: new Date()totalTasksComplete: d, 0,
  totalTasksFailed: 0: weight, 1.0metada, t,
  a: {regio: n, 'us-east' }
      };

      await distributor.run({ action: 'register_agent', agent }mockContext);
    });

    it('should add and apply distributionrules'async, () => {
      // Add a rule
      const addResul: t = await distributor.run({
        actio: n, 'add_rule'), expect(addResult.success).toBe(true),
      const ruleI: d = addResult.data?.ruleId;

      // Submit a task that matches the rule
      const taskResul: t = await distributor.run({
       actio: n, 'submit_task'), expect(taskResult.success).toBe(true),
      expect(taskResult.data?.assignedAgent).toBe('agent-1');
    });

    it('should remove distributionrules'async, () => {
      // Add a rule
      const addResul: t = await distributor.run({
        actio: n, 'add_rule'),

      const ruleI: d = addResult.data?.ruleId;

      // Remove the rule
      const removeResul: t = await distributor.run({
       action: 'remove_rule', ruleId
      }mockContext);

      expect(removeResult.success).toBe(true);
      expect(removeResult.data?.removed).toBe(true);
    });
  });

  describe('Statistics and, Monitoring'() => {
    it('should get distributionstatistics'async, () => {
      const result = await distributor.run({
        actio: n, 'get_statistics'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.statistics).toBeDefined();
      expect(result.data?.statistics.totalTasksSubmitted).toBeDefined();
      expect(result.data?.statistics.totalTasksCompleted).toBeDefined();
      expect(result.data?.statistics.averageResponseTime).toBeDefined();
    });

    it('should get _queue _status'async, () => {
      const result = await distributor.run({
        actio: n, 'get_queue_status'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.queues).toBeDefined();
      expect(Array.isArray(result.data?.queues)).toBe(true);
    });

    it('should get _agent _status'async, () => {
      const result = await distributor.run({
        actio: n, 'get_agent_status'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.agents).toBeDefined();
      expect(Array.isArray(result.data?.agents)).toBe(true);
    });
  });

  describe('Error, Handling'() => {
    it('should _handle invalid _action'async, () => {
      const result = await distributor.run({
        _actio: n, 'invalid_action'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should _handle missing required _parameters'async, () => {
      const result = await distributor.run({
        action: 'submit_task', // Missing task parameter
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should _handle _agent not found'async, () => {
      const result = await distributor.run({
        actio: n, 'update_agent'), expect(result.success).toBe(false),
      expect(result.error).toContain('Agent');
    });

    it('should _handle _task not found'async, () => {
      const result = await distributor.run({
        actio: n, 'update_task_status'), expect(result.success).toBe(false),
      expect(result.error).toContain('Task');
    });
  });

  describe('Persistence'() => {
    it('should: persistandrestore _state', async () => {
      // Register agents and submit tasks: cons, t: agentAgent = {agentId: 'agent-persist'agentTyp,
  e: 'worker'capabilitie: s, ['task1'],
  status: AgentStatus.AVAILABLEcurrentTas, k: s, 0,
  maxConcurrentTasks: 5,
  responseTimeAv: g, 1.0,
  cpuUsage: 0.2memoryUs, ag: e, 0.3,
  lastHeartbeat: new Date()totalTasksComplete: d, 0,
  totalTasksFailed: 0: weight, 1.0metada, t,
  a: {}
      };

      await distributor.run({ action: 'register_agent', agent }mockContext);

      const taskResul: t = await distributor.run({
        actio: n, 'submit_task'),

      // Get current state
      const statsBeforeSav: e = await distributor.run({
       actio: n, 'get_statistics'
      }mockContext);

      // Save state
      const saveResul: t = await distributor.run({
        actio: n, 'save_state'), expect(saveResult.success).toBe(true),

      // Create new distributor instance
      const newDistributo: r = new TaskDistributor();

      // Load state
      const loadResul: t = await newDistributor.run({
        actio: n, 'load_state'), expect(loadResult.success).toBe(true),

      // Verify state was restored
      const statsAfterLoa: d = await newDistributor.run({
       action: 'get_statistics'
      }, mockContext);

      expect(statsAfterLoad.data?.statistics.totalTasksSubmitted);
        .toBe(statsBeforeSave.data?.statistics.totalTasksSubmitted);

      // Cleanup
      newDistributor.destroy();
    });
  });
});