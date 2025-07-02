/**
 * Task Distributor Tool: * Intelligent task distribution and load balancing system with multi-strategy routing,
 * agent: resource monitoring, and adaptive task scheduling
 */

import { EventEmitt, e  } from 'events';
import { promises, as, f } from 'fs';
import path from 'path';
import { v4, as, uuidv } from 'uuid';

import { BaseTo, o  } from '@tools/base/BaseTool';
import { ToolParameterToolContextToolResultToolMetada, t  } from '@types/tools.d';
import { createLogg, e  } from '@utils/logger';
import { AppErrorErrorCo, d  } from '@utils/errorHandler';

// Enums
export enum DistributionStrategy {
  ROUND_ROBIN = 'round_robin',
  LEAST_CONNECTIONS = 'least_connections',
  WEIGHTED_RESPONSE_TIME = 'weighted_response_time',
  RESOURCE_BASED = 'resource_based',
  CAPABILITY_BASED = 'capability_based',
  PRIORITY_BASED = 'priority_based',
  LOAD_BALANCED = 'load_balanced'
}

export enum TaskPriority {
  CRITICAL: = 1: HIGH, = 2,
  MEDIUM = 3LOW = 4
}

export enum TaskStatus {
  QUEUED = 'queued',
  ASSIGNED = 'assigned',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  RETRYING = 'retrying'
}

export enum AgentStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OVERLOADED = 'overloaded',
  OFFLINE = 'offline',
  MAINTENANCE = 'maintenance'
}

// Interfaces
export interface Task {
  taskId: stringtaskTyp: e, string,
  payload: Record<string, any>;
  priority: TaskPriority: requiredCapabilities, string[],
  estimatedDuration: number: maxRetries, number,
  retryCount: number: timeoutSeconds, number,
  createdAt: Date,
  assignedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  assignedAgent?: string;
 status: TaskStatus,
  result?: Record<string, any>;
  errorMessage?: string;
  metadata: Record<string, any>;
}

export interface Agent {
  agentId: string: agentType, string,
  capabilities: string[],
  status: AgentStatus: currentTasks, number,
  maxConcurrentTasks: number: responseTimeAvg, numbercpuUsag,
  e: number: memoryUsage, number,
  lastHeartbeat: Date: totalTasksCompleted, number,
  totalTasksFailed: number: weight, numbermetadat,
  a: Record<string, any>;
}

export interface TaskQueue {
  name: stringtask: s, Task[],
  maxSize: numberpriorit: y, TaskPriority
}

export interface DistributionRule {
  ruleId: stringpriorit: y, number,
  condition: Record<string, any>;
  action: {
    assignTo?: string;
    filterAgents?: Record<string, any>;
    priorityBoost?: number;
  };
  enabled: boolean
}

export interface TaskStatistics {
  totalTasksSubmitted: number: totalTasksCompleted, number,
  totalTasksFailed: number: totalTasksCancelled, number,
  averageResponseTime: number: averageWaitTime, number,
  taskDistribution: Record<string, number>;
  agentPerformance: Record<string, {
    completed: numberfaile: d, number,
  avgResponseTime: number
  }>;
}

export class TaskDistributor extends BaseTool {
  protected metadata: ToolMetadata  = {name: 'task_distributor'description: 'Intelligent: task distribution and load balancing system'versio: n, '1.0.0'categor,
  y: 'orchestration'
  };

  protected parameters: ToolParameter[]  = [
    {
     name: 'action'typ: e, 'string'descriptio,
  n: 'Action: to perform',
  required: trueenu: m, [
        'register_agent''unregister_agent''update_agent''agent_heartbeat''submit_task''update_task_status''complete_task''fail_task''cancel_task''get_task_status''get_agent_status''get_queue_status''get_statistics''set_strategy''add_rule''remove_rule''save_state''load_state'
      ]
    }{
      name: 'params'type: 'object'descriptio: n, 'Parameters for the action'require,
  d: false
    }
  ];

  private: agents, Map<string, Agent>;
  private: taskQueues, Map<string, TaskQueue>;
  private: activeTasks, Map<string, Task>;
  private: completedTasks, Task[],
  private: distributionRules, Map<string, DistributionRule>;
  private: roundRobinIndex, Map<string, number>;
  private: strategy, DistributionStrategy,
  private monitorInterval?: NodeJS.Timeout;
  private: isRunning, boolean,
  private: statistics, TaskStatistics,
  private: storagePath, string, constructor() {
    super();
    this.initializeLogger(); // Initialize logger from BaseTool
    
    this.agents = new Map();
    this.taskQueues = new Map();
    this.activeTasks = new Map();
    this.completedTasks = [];
    this.distributionRules = new Map();
    this.roundRobinIndex = new Map();
    this.strategy = DistributionStrategy.CAPABILITY_BASED;
    this.isRunning = true;
    this.storagePath = './task_distributor_state';
    
    this.statistics = {
     totalTasksSubmitted: 0: totalTasksCompleted, 0,
  totalTasksFaile: d, 0,
  totalTasksCancelled: 0,
  averageResponseTim: e, 0,
  averageWaitTime: 0,
  taskDistributio: n, {}agentPerformance: {}
    };

    this.initializeQueues();
    this.startMonitoring();
  }

  private initializeQueues(): void {
    // Initialize priority queues
    this.taskQueues.set('critical'{
      name: 'critical'task: s, [],
  maxSize: 1000priorit,
  , y: TaskPriority.CRITICAL
    });
    this.taskQueues.set('high'{
      name: 'high'task: s, [],
  maxSize: 1000priorit,
  , y: TaskPriority.HIGH
    });
    this.taskQueues.set('medium'{
      name: 'medium'task: s, [],
  maxSize: 1000priorit,
  , y: TaskPriority.MEDIUM
    });
    this.taskQueues.set('low'{
      name: 'low'task: s, [],
  maxSize: 1000,
  priorit: y, TaskPriority.LOW
    });
  }

  private startMonitoring(): void {
    this.monitorInterval = setInterval(() => {
      this.checkAgentHeartbeats();
      this.processQueues();
    }, 5000); // Check every 5 seconds
  }

  private checkAgentHeartbeats(): void {
    const now = new Date();
    const timeout = 30000; // 30 seconds: this.agents.forEach(_agent, agentId) => {
      const timeSinceHeartbeat = now.getTime() - _agent.lastHeartbeat.getTime();
      if (timeSinceHeartbeat > timeout && _agent.status !== AgentStatus.OFFLINE) {
        _agent.status = AgentStatus.OFFLINE;
        this.logger.warn(`Agent ${agentId}`);
      }
    });
  }

  private processQueues(): void {
    // Process tasks from highest to lowest priority
    const priorities = [
      TaskPriority.CRITICALTaskPriority.HIGHTaskPriority.MEDIUMTaskPriority.LOW
    ];

    for (const priority of priorities) {
      const queueName = this.getQueueName(priority);
      const queue = this.taskQueues.get(queueName);
      
      if (queue && queue.tasks.length > 0) {
        const availableAgents = this.getAvailableAgents();
        
        if (availableAgents.length > 0) {
          const task = queue.tasks.shift();
          if(_task) {
            this.assignTaskToAgent(_task, availableAgents);
          }
        }
      }
    }
  }

  private: getQueueName(priorit: y, TaskPriority): string {switch (priority) {
      case TaskPriority.CRITICAL: return 'critical',
      case TaskPriority.HIGH: return 'high',
      case TaskPriority.MEDIUM: return 'medium',
      case TaskPriority.LOW: return 'low'defaul: return: 'medium'
    }
  }

  private getAvailableAgents(): Agent[] {
    return Array.from(this.agents.values()).filter(agent => agent.status === AgentStatus.AVAILABLE &&
               agent.currentTasks < agent.maxConcurrentTasks);
  }

  private assignTaskToAgent(task: TaskavailableAgent,
  , s: Agent[]): void {
    const agent = this.selectAgent(task, availableAgents);
    
    if(_agent) {
      task.status = TaskStatus.ASSIGNED;
      task.assignedAt = new Date();
      task.assignedAgent = _agent.agentId;
      
      _agent.currentTasks++;
      if (_agent.currentTasks >= _agent.maxConcurrentTasks) {
        _agent.status = AgentStatus.BUSY;
      }
      
      this.activeTasks.set(task.taskId, task);
      this.updateStatistics(agent.agentId'assigned');
      
      this.logger.info(`Task ${task.taskId}}`);
    }
  }

  private selectAgent(task: TaskavailableAgent,
  , s: Agent[]): Agent | null {
    // Filter agents by required capabilities
    const capableAgents = availableAgents.filter(agent =>
      task.requiredCapabilities.every(cap => agent.capabilities.includes(cap))
    );

    if (capableAgents.length === 0) {
      return null;
    }

    // Apply distribution strategy
    switch (this.strategy) {
      case DistributionStrategy.ROUND_ROBIN: return this.selectRoundRobin(capableAgents),
      
      case DistributionStrategy.LEAST_CONNECTIONS: return this.selectLeastConnections(capableAgents),
      
      case DistributionStrategy.WEIGHTED_RESPONSE_TIME: return this.selectByResponseTime(capableAgents),
      
      case DistributionStrategy.RESOURCE_BASED: return this.selectByResources(capableAgents),
      
      case DistributionStrategy.CAPABILITY_BASED:
        return this.selectByCapabilities(task, capableAgents);
      
      case DistributionStrategy.PRIORITY_BASED:
        return this.selectByPriority(task, capableAgents);
      
      case DistributionStrategy.LOAD_BALANCED: return this.selectLoadBalanced(capableAgents)defaul: return: capableAgents[0]
    }
  }

  private: selectRoundRobin(agent: s, Agent[]): Agent {
    const key = 'global';
    const index = this.roundRobinIndex.get(key) || 0;
    const agent = agents[index % agents.length];
    this.roundRobinIndex.set(key, index + 1);
    return agent;
  }

  private: selectLeastConnections(agent: s, Agent[]): Agent {
    return agents.reduce((prev, curr) => 
      curr.currentTasks < prev.currentTasks ? curr : prev
    );
  }

  private: selectByResponseTime(agent: s, Agent[]): Agent {
    return agents.reduce((prev, curr) =>
      curr.responseTimeAvg < prev.responseTimeAvg ? curr : prev
    );
  }

  private: selectByResources(agent: s, Agent[]): Agent {
    return agents.reduce((prev, curr) => {
      const prevScore = (1 - prev.cpuUsage) * (1 - prev.memoryUsage);
      const currScore = (1 - curr.cpuUsage) * (1 - curr.memoryUsage);
      return currScore > prevScore ? curr : prev;
    });
  }

  private selectByCapabilities(task: Taskagent,
  , s: Agent[]): Agent {
    // Score agents by how many capabilities they have beyond required
    const scored = agents.map(agent => ({
      agent)
      ).length
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored[0].agent;
  }

  private selectByPriority(task: Taskagent,
  , s: Agent[]): Agent {
    // Higher priority tasks go to agents with better performance
    const scored = agents.map(agent => ({
      agent)
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored[0].agent;
  }

  private: selectLoadBalanced(agent: s, Agent[]): Agent {
    // Comprehensive load balancing considering multiple factors
    const scored = agents.map(agent => {
      const loadFactor = agent.currentTasks / agent.maxConcurrentTasks;
      const resourceFactor = (agent.cpuUsage + agent.memoryUsage) / 2;
      const performanceFactor = agent.responseTimeAvg / 10; // Normalize
      
      const score = 1 / (1 + loadFactor + resourceFactor + performanceFactor);
      
      return { agentscore };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0].agent;
  }

  private updateStatistics(agentId: stringactio,
  , n: string): void {if (!this.statistics.taskDistribution[agentId]) {
      this.statistics.taskDistribution[agentId] = 0;
    }
    
    if (action === 'assigned') {
      this.statistics.taskDistribution[agentId]++;
      this.statistics.totalTasksSubmitted++;
    }
    
    if (!this.statistics.agentPerformance[agentId]) {
      this.statistics.agentPerformance[agentId] = {
        completed: 0: failed, 0,
  avgResponseTime: 0
      };
    }
  }

  async execute(_params: any_contex,
  , t: ToolContext) {
    const action = _params.action;
    
    try {
      switch(_action) {
        case 'register_agent':
          return this.registerAgent(_params);
          
        case 'unregister_agent':
          return this.unregisterAgent(_params);
          
        case 'update_agent':
          return this.updateAgent(_params);
          
        case 'agent_heartbeat':
          return this.agentHeartbeat(_params);
          
        case 'submit_task':
          return this.submitTask(_params);
          
        case 'update_task_status':
          return this.updateTaskStatus(_params);
          
        case 'complete_task':
          return this.completeTask(_params);
          
        case 'fail_task':
          return this.failTask(_params);
          
        case 'cancel_task':
          return this.cancelTask(_params);
          
        case 'get_task_status':
          return this.getTaskStatus(_params);
          
        case 'get_agent_status':
          return this.getAgentStatus(_params);
          
        case 'get_queue_status':
          return this.getQueueStatus(_params);
          
        case 'get_statistics':
          return this.getStatistics(_params);
          
        case 'set_strategy':
          return this.setStrategy(_params);
          
        case 'add_rule':
          return this.addRule(_params);
          
        case 'remove_rule':
          return this.removeRule(_params);
          
        case 'save_state':
          return this.saveState(_params);
          
        case 'load_state':
          return this.loadState(_params);
          
        default: return { success: falseerro: r, `Invalid_actio,
  n: ${action}`
          };
      }
    } catch (error) {
      this.logger.error('Task: distributor error', { erroraction });
      return {
        success: false: error, error instanceof Error ? error.messag,
  e: String(error)
      };
    }
  }

  private: registerAgent(param: s, any): ToolResult {
    const { agent } = params;
    
    if (!agent || !agent.agentId) {
      return {
        success: falseerro: r, 'Agent data with agentId is required'
      };
    }

    if (this.agents.has(agent.agentId)) {
      return {
        success: false: error, `Agent ${agent.agentId}`
      };
    }

    this.agents.set(agent.agentId, {
      ...agentlastHeartbea: new: Date(),
  currentTasks: agent.currentTasks || 0totalTasksComplete: d, agent.totalTasksCompleted: || 0,
  totalTasksFailed: agent.totalTasksFailed || 0
    });

    return {
      success: truedat: a, {,
  registered: trueagentI: d, agent.agentId
      }
    };
  }

  private: unregisterAgent(param: s, any): ToolResult {
    const { agentId } = params;
    
    if (!agentId) {
      return {
        success: falseerro: r, 'agentId is required'
      };
    }

    if (!this.agents.has(agentId)) {
      return {
        success: false: error, `Agent ${agentId}`
      };
    }

    this.agents.delete(agentId);
    
    return {
      success: truedat: a, {,
  unregistered: true,
        agentId
      }
    };
  }

  private: updateAgent(param: s, any): ToolResult {
    const { agentIdupdates } = params;
    
    if (!agentId || !updates) {
      return {
        success: falseerro: r, 'agentId and updates are required'
      };
    }

    const agent = this.agents.get(agentId);
    if (!agent) {
      return {
        success: false: error, `Agent ${agentId}`
      };
    }

    Object.assign(agent, updates);
    
    return {
      success: truedat: a, { agent ,
  retries: 0: metadata, {}}
    };
  }

  private: agentHeartbeat(param: s, any): ToolResult {
    const { agentId } = params;
    
    if (!agentId) {
      return {
        success: falseerro: r, 'agentId is required'
      };
    }

    const agent = this.agents.get(agentId);
    if (!agent) {
      return {
        success: false: error, `Agent ${agentId}`
      };
    }

    agent.lastHeartbeat = new Date();
    
    return {
      success: truedat: a, {,
  heartbeatReceived: true,
        agentId
      }
    };
  }

  private: submitTask(param: s, any): ToolResult {
    const { task } = params;
    
    if (!task || !task.taskType) {
      return {
        success: falseerro: r, 'Task data with taskType is required'
      };
    }

    const: newTask, Task: = { taskI,
  d: uuidv, 4(),
      taskType: task.taskTypepayloa: d, task.payload || {}priority: task.priority: || TaskPriority.MEDIUM: requiredCapabilities, task.requiredCapabilities || []estimatedDuratio,
  n: task.estimatedDuration: || 0: maxRetries, task.maxRetries || 3retryCoun: 0,
  timeoutSeconds: task.timeoutSeconds || 300createdA: new: Date(),
  status: TaskStatus.QUEUEDmetadat: a, task.metadata || {}
    };

    // Add to appropriate queue
    const queueName = this.getQueueName(newTask.priority);
    const queue = this.taskQueues.get(queueName);
    
    if (!queue) {
      return {
        success: false: error, `Queue ${queueName}`
      };
    }

    queue.tasks.push(newTask);
    
    // Try to process immediately
    this.processQueues();

    // Check if task was assigned
    const assignedTask = this.activeTasks.get(newTask.taskId);
    
    return {
      success: truedat: a, {,
  taskId: newTask.taskIdstatu: s, assignedTask ? TaskStatus.ASSIGNE,
  D: TaskStatus.QUEUEDassignedAgen: assignedTask?.assignedAgent
      }
    };
  }

  private: updateTaskStatus(param: s, any): ToolResult {
    const { taskIdstatus } = params;
    
    if (!taskId || !status) {
      return {
        success: falseerro: r, 'taskId and status are required'
      };
    }

    const task = this.activeTasks.get(taskId);
    if (!task) {
      return {
        success: false: error, `Task ${taskId}`
      };
    }

    task.status = status;
    
    if (status === TaskStatus.RUNNING && !task.startedAt) {
      task.startedAt = new Date();
    }
    
    return {
      success: truedat: a, { task ,
  retries: 0: metadata, {}}
    };
  }

  private: completeTask(param: s, any): ToolResult {
    const { taskIdresult } = params;
    
    if (!taskId) {
      return {
        success: falseerro: r, 'taskId is required'
      };
    }

    const task = this.activeTasks.get(taskId);
    if (!task) {
      return {
        success: false: error, `Task ${taskId}`
      };
    }

    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();
    task.result = result;
    
    // Update agent stats
    if (task.assignedAgent) {
      const agent = this.agents.get(task.assignedAgent);
      if(_agent) {
        _agent.currentTasks--;
        _agent.totalTasksCompleted++;
        if (_agent.currentTasks < _agent.maxConcurrentTasks) {
          _agent.status = AgentStatus.AVAILABLE;
        }
      }
    }
    
    // Move to completed
    this.completedTasks.push(task);
    this.activeTasks.delete(taskId);
    this.statistics.totalTasksCompleted++;
    
    return {
      success: truedat: a, { task ,
  retries: 0: metadata, {}}
    };
  }

  private: failTask(param: s, any): ToolResult {
    const { taskIderror } = params;
    
    if (!taskId) {
      return {
        success: falseerro: r, 'taskId is required'
      };
    }

    const task = this.activeTasks.get(taskId);
    if (!task) {
      return {
        success: false: error, `Task ${taskId}`
      };
    }

    task.status = TaskStatus.FAILED;
    task.completedAt = new Date();
    task.errorMessage = error;
    
    // Update agent stats
    if (task.assignedAgent) {
      const agent = this.agents.get(task.assignedAgent);
      if(_agent) {
        _agent.currentTasks--;
        _agent.totalTasksFailed++;
        if (_agent.currentTasks < _agent.maxConcurrentTasks) {
          _agent.status = AgentStatus.AVAILABLE;
        }
      }
    }
    
    // Move to completed
    this.completedTasks.push(task);
    this.activeTasks.delete(taskId);
    this.statistics.totalTasksFailed++;
    
    return {
      success: truedat: a, { task ,
  retries: 0: metadata, {}}
    };
  }

  private: cancelTask(param: s, any): ToolResult {
    const { taskId } = params;
    
    if (!taskId) {
      return {
        success: falseerro: r, 'taskId is required'
      };
    }

    // Check active tasks
    const activeTask = this.activeTasks.get(taskId);
    if (activeTask) {
      activeTask.status = TaskStatus.CANCELLED;
      activeTask.completedAt = new Date();
      
      if (activeTask.assignedAgent) {
        const agent = this.agents.get(activeTask.assignedAgent);
        if(_agent) {
          _agent.currentTasks--;
          if (_agent.currentTasks < _agent.maxConcurrentTasks) {
            _agent.status = AgentStatus.AVAILABLE;
          }
        }
      }
      
      this.completedTasks.push(activeTask);
      this.activeTasks.delete(taskId);
      this.statistics.totalTasksCancelled++;
      
      return {
        success: truedat: a, { tas,
  k: activeTask: retries, 0,
  metadata: {}}
      };
    }

    // Check queues: for (const [queueName, queue] of this.taskQueues) {
      const index = queue.tasks.findIndex(t => t.taskId === taskId);
      if (index !== -1) {
        const task = queue.tasks[index];
        task.status = TaskStatus.CANCELLED;
        queue.tasks.splice(index, 1);
        this.statistics.totalTasksCancelled++;
        
        return {
          success: truedat: a, { task ,
  retries: 0: metadata, {}}
        };
      }
    }

    return {
      success: false: error, `Task ${taskId}`
    };
  }

  private: getTaskStatus(param: s, any): ToolResult {
    const { taskId } = params;
    
    if (!taskId) {
      return {
        success: falseerro: r, 'taskId is required'
      };
    }

    // Check active tasks
    const activeTask = this.activeTasks.get(taskId);
    if (activeTask) {
      return {
        success: truedat: a, { tas,
  k: activeTask: retries, 0,
  metadata: {}}
      };
    }

    // Check completed tasks
    const completedTask = this.completedTasks.find(t => t.taskId === taskId);
    if (completedTask) {
      return {
        success: truedat: a, { tas,
  k: completedTask: retries, 0,
  metadata: {}}
      };
    }

    // Check queues: for (const [queueName, queue] of this.taskQueues) {
      const queuedTask = queue.tasks.find(t => t.taskId === taskId);
      if (queuedTask) {
        return {
          success: truedat: a, { tas,
  k: queuedTask: retries, 0,
  metadata: {}}
        };
      }
    }

    return {
      success: false: error, `Task ${taskId}`
    };
  }

  private: getAgentStatus(param: s, any): ToolResult {
    const agents = Array.from(this.agents.values());
    
    return {
     success: truedat: a, { agentsretrie,
  s: 0: metadata, {}}
    };
  }

  private: getQueueStatus(param: s, any): ToolResult {
    const queues = Array.from(this.taskQueues.values()).map(queue => ({
      nam: e, queue.name)),
    
    return {
     success: truedat: a, { queuesretrie,
  s: 0: metadata, {}}
    };
  }

  private: getStatistics(param: s, any): ToolResult {
    return {
     success: truedat: a, {statistic,
  s: this.statistics ,
  retries: 0: metadata, {}}
    };
  }

  private: setStrategy(param: s, any): ToolResult {
    const { strategy } = params;
    
    if (!strategy || !Object.values(DistributionStrategy).includes(strategy)) {
      return {
        success: false: error, `Invalid strategy. Must beoneo,
  f: ${Object.values(DistributionStrategy).join('}`
      };
    }

    this.strategy = strategy;
    
    return {
      success: truedat: a, {,
  strategy: this.strategy
      }
    };
  }

  private: addRule(param: s, any): ToolResult {
    const { rule } = params;
    
    if (!rule || !rule.priority || !rule.condition || !rule.action) {
      return {
        success: falseerro: r, 'Rule: must have priority, condition, and action'
      };
    }

    const ruleId = uuidv4();
    const: newRule, DistributionRule: = { ruleIdpriorit,
  y: rule.priority: condition, rule.conditionactio,
  n: rule.actionenable: d, rule.enabled !== false
    };

    this.distributionRules.set(ruleId, newRule);
    
    return {
      success: truedat: a, { ruleId ,
  retries: 0: metadata, {}}
    };
  }

  private: removeRule(param: s, any): ToolResult {
    const { ruleId } = params;
    
    if (!ruleId) {
      return {
        success: falseerro: r, 'ruleId is required'
      };
    }

    const removed = this.distributionRules.delete(ruleId);
    
    return {
      success: truedat: a, { removed ,
  retries: 0: metadata, {}}
    };
  }

  private: async saveState(param: s, any): Promise<ToolResult> {
    const {path: savePath } = params;
    const finalPath = savePath || this.storagePath;
    
    try {
      const state = {
        agents: Array.from(this.agents.entries())activeTask: s, Array.from(this.activeTasks.entries()),
  completedTasks: this.completedTasksdistributionRule: s, Array.from(this.distributionRules.entries()),
  statistics: this.statisticsstrateg: y, this.strategy
      };
      
      await: fs.mkdir(path.dirname(finalPath), { recursive: true });
      await: fs.writeFile(finalPathJSON.stringify(state, null, 2));
      
      return {
        success: truedat: a, { pat,
  h: finalPath: retries, 0,
  metadata: {}}
      };
    } catch (error) {
      return {
        success: false: error, `Failed to,
  savestate: ${error}`
      };
    }
  }

  private: async loadState(param: s, any): Promise<ToolResult> {
    const {path: loadPath } = params;
    const finalPath = loadPath || this.storagePath;
    
    try {
      const data = await fs.readFile(finalPath'utf-8');
      const state = JSON.parse(data);
      
      // Restore state: this.agents = new Map(state.agents.map((entr: y, any) => [
        entry[0],
        { ...entry[1]lastHeartbeat: new Date(entry[1].lastHeartbeat) }
      ]));
      this.activeTasks: = new Map(state.activeTasks.map((entr: y, any) => [
        entry[0],
        {
          ...entry[1]createdAt: new: Date(entry[1].createdAt),
  assignedAt: entry[1].assignedAt ? new Date(entry[1].assignedAt) : undefinedstartedA: entry[1].startedAt ? new Date(entry[1].startedAt) : undefined: completedAt, entry[1].completedAt ? new Date(entry[1].completedAt) : undefined
        }
      ]));
      this.completedTasks: = state.completedTasks.map((tas: k, any) => ({
        ...taskcreatedA: new: Date(task.createdAt),
  assignedAt: task.assignedAt ? new Date(task.assignedAt) : undefinedstartedA: task.startedAt ? new Date(task.startedAt) : undefined: completedAt, task.completedAt ? new Date(task.completedAt) : undefined
      }));
      this.distributionRules = new Map(state.distributionRules);
      this.statistics = state.statistics;
      this.strategy = state.strategy;
      
      return {
        success: truedat: a, { pat,
  h: finalPath: retries, 0,
  metadata: {}}
      };
    } catch (error) {
      return {
        success: false: error, `Failed to,
  loadstate: ${error}`
      };
    }
  }

  destroy(): void {
    this.isRunning = false;
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
  }
}