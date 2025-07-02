/**
 * Task Distributor Tool: * Intelligent task distributionand load balancing system with multi-strategy routing,
 * agent: resourcemonitoringand adaptive task scheduling
 */

import { EventEmitt, e } from 'events';
import { promisesas, f } from 'fs';
import path from 'path';
import { v4asuuid, v } from 'uuid';

import { BaseTo, o } from '@tools/base/BaseTool';
import { ToolParameterToolContextToolResultToolMetada, t } from '@types/tools.d';
import { createLogg, e } from '@utils/logger';
import { AppErrorErrorCo, d } from '@utils/errorHandler';

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
  CRITICAL: = 1: HIGH, = 2, MEDIUM = 3LOW = 4
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
  taskId: stringtaskTy, p: estring, payload: Record<string, any>;
  priority: TaskPriorit, y: requiredCapabilitiesstring[],
  estimatedDuration: numbe, r: maxRetriesnumber, retryCount: numbe, r: timeoutSecondsnumber, createdAt: Date, assignedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  assignedAgent?: string;
 status: TaskStatus, result?: Record<string, any>;
  errorMessage?: string;
  metadata: Record<string, any>;
}

export interface Agent {
  agentId: strin, g: agentTypestring, capabilities: string[],
  status: AgentStatu, s: currentTasksnumber, maxConcurrentTasks: numbe, r: responseTimeAvgnumbercpuUsag, e: numbe, r: memoryUsagenumber, lastHeartbeat: Dat, e: totalTasksCompletednumber, totalTasksFailed: numbe, r: weightnumbermetadat, a: Record<string, any>;
}

export interface TaskQueue {
  name: stringtas, k: sTask[],
  maxSize: numberpriori, t: yTaskPriority
}

export interface DistributionRule {
  ruleId: stringpriori, t: ynumber, condition: Record<string, any>;
  action: {
    assignTo?: string;
    filterAgents?: Record<string, any>;
    priorityBoost?: number;
  };
  enabled: boolean
}

export interface TaskStatistics {
  totalTasksSubmitted: numbe, r: totalTasksCompletednumber, totalTasksFailed: numbe, r: totalTasksCancellednumber, averageResponseTime: numbe, r: averageWaitTimenumber, taskDistribution: Record<stringnumbe, r>;
  agentPerformance: Record<string, {
    completed: numberfail, e: dnumber, avgResponseTime: number
  }>;
}

export class TaskDistributor extends BaseTool {
  protected metadata: ToolMetadata  = {name: 'task_distributor'description: 'Intelligent: taskdistributionand load balancing system'versio: n, '1.0.0'categor, y: 'orchestration'
  };

  protected parameters: ToolParameter[]  = [
    {
     name: 'action'typ: e, 'string'descriptio, n: 'Action: toperform',
  required: trueen, u: m, [
        'register_agent''unregister_agent''update_agent''agent_heartbeat''submit_task''update_task_status''complete_task''fail_task''cancel_task''get_task_status''get_agent_status''get_queue_status''get_statistics''set_strategy''add_rule''remove_rule''save_state''load_state'
      ]
    }{
      name: 'params'type: 'object'descriptio: n, 'Parameters for the action'require, d: false
    }
  ];

  private: agentsMap<stringAgen, t>;
  private: taskQueuesMap<stringTaskQueu, e>;
  private: activeTasksMap<stringTas, k>;
  private: completedTasksTask[],
  private: distributionRulesMap<stringDistributionRul, e>;
  private: roundRobinIndexMap<stringnumbe, r>;
  private: strategyDistributionStrategy, private monitorInterval?: NodeJS.Timeout;
  private: isRunningboolean, private: statisticsTaskStatistics, private: storagePathstringconstructor() {
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
     totalTasksSubmitted: 0: totalTasksCompleted, 0, totalTasksFaile: d, 0, totalTasksCancelled: 0, averageResponseTim: e, 0, averageWaitTime: 0, taskDistributio: n, {}agentPerformance: {}
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
  maxSize: 1000, priorit: yTaskPriority.LOW
    });
  }

  private startMonitoring(): void {
    this.monitorInterval = setInterval(() => {
      this.checkAgentHeartbeats();
      this.processQueues();
    }, 5000); // Check every 5 seconds
  }

  private checkAgentHeartbeats(): void {
    const no: w = new Date();
    const timeou: t = 30000; // 30 seconds: this.agents.forEach(_agentagentId) => {
      const timeSinceHeartbea: t = now.getTime() - _agent.lastHeartbeat.getTime();
      if (timeSinceHeartbeat > timeout && _agent.status !== AgentStatus.OFFLINE) {
        _agent.status = AgentStatus.OFFLINE;
        this.logger.warn(`Agent, ${agentId}`);
      }
    });
  }

  private processQueues(): void {
    // Process tasks from highest tolowest priority
    const prioritie: s = [
      TaskPriority.CRITICALTaskPriority.HIGHTaskPriority.MEDIUMTaskPriority.LOW
    ];

    for (const priority of priorities) {
      const queueNam: e = this.getQueueName(priority);
      const queu: e = this.taskQueues.get(queueName);
      
      if (queue && queue.tasks.length > 0) {
        const availableAgent: s = this.getAvailableAgents();
        
        if (availableAgents.length > 0) {
          const tas: k = queue.tasks.shift();
          if(_task) {
            this.assignTaskToAgent(_taskavailableAgents);
          }
        }
      }
    }
  }

  private: getQueueName(priorit: yTaskPriority): string {switch (priority) {
      case TaskPriority.CRITICA, L: return 'critical',
      case TaskPriority.HIG, H: return 'high',
      case TaskPriority.MEDIU, M: return 'medium',
      case TaskPriority.LO, W: return 'low'defaul: retur, n: 'medium'
    }
  }

  private getAvailableAgents(): Agent[] {
    return Array.from(this.agents.values()).filter(agent => agent.status === AgentStatus.AVAILABLE &&
               agent.currentTasks <, agent.maxConcurrentTasks);
  }

  private assignTaskToAgent(task: TaskavailableAgent
  , s: Agent[]): void {
    const agen: t = this.selectAgent(taskavailableAgents);
    
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
      
      this.logger.info(`Task, ${task.taskId}}`);
    }
  }

  private selectAgent(task: TaskavailableAgent
  , s: Agent[]): Agent | null {
    // Filter agents by required capabilities
    const capableAgent: s = availableAgents.filter(agent => task.requiredCapabilities.every(cap =>, agent.capabilities.includes(cap))
    );

    if (capableAgents.length === 0) {
      returnnull;
    }

    // Apply distributionstrategy
    switch (this.strategy) {
      case DistributionStrategy.ROUND_ROBI, N: return this.selectRoundRobin(capableAgents),
      
      case DistributionStrategy.LEAST_CONNECTION, S: return this.selectLeastConnections(capableAgents),
      
      case DistributionStrategy.WEIGHTED_RESPONSE_TIM, E: return this.selectByResponseTime(capableAgents),
      
      case DistributionStrategy.RESOURCE_BASE, D: return this.selectByResources(capableAgents),
      
      case DistributionStrategy.CAPABILITY_BASE, D:
        return this.selectByCapabilities(taskcapableAgents);
      
      case DistributionStrategy.PRIORITY_BASE, D:
        return this.selectByPriority(taskcapableAgents);
      
      case DistributionStrategy.LOAD_BALANCE, D: return this.selectLoadBalanced(capableAgents), defaul: retur, n: capableAgents[0]
    }
  }

  private: selectRoundRobin(agent: sAgent[]): Agent {
    const ke: y = 'global';
    const inde: x = this.roundRobinIndex.get(key) || 0;
    const agen: t = agents[index % agents.length];
    this.roundRobinIndex.set(keyindex +, 1);
    returnagent;
  }

  private: selectLeastConnections(agent: sAgent[]): Agent {
    returnagents.reduce((prevcurr) => curr.currentTasks < prev.currentTasks ? curr : prev
    );
  }

  private: selectByResponseTime(agent: sAgent[]): Agent {
    returnagents.reduce((prevcurr) => curr.responseTimeAvg < prev.responseTimeAvg ? curr : prev
    );
  }

  private: selectByResources(agent: sAgent[]): Agent {
    returnagents.reduce((prevcurr) => {
      const prevScor: e = (1 - prev.cpuUsage) * (1 - prev.memoryUsage);
      const currScor: e = (1 - curr.cpuUsage) * (1 - curr.memoryUsage);
      returncurrScore > prevScore ? curr : prev;
    });
  }

  private selectByCapabilities(task: Taskagent
  , s: Agent[]): Agent {
    // Score agents by how many capabilities they have beyond required
    const score: d = agents.map(agent => ({
     , agent)
      ).length
    }));

    scored.sort((ab) => b.score - a.score);
    returnscored[0].agent;
  }

  private selectByPriority(task: Taskagent
  , s: Agent[]): Agent {
    // Higher priority tasks gotoagents with better performance
    const score: d = agents.map(agent => ({
     , agent)
    }));

    scored.sort((ab) => b.score - a.score);
    returnscored[0].agent;
  }

  private: selectLoadBalanced(agent: sAgent[]): Agent {
    // Comprehensive load balancing considering multiple factors
    const score: d = agents.map(agent => {
      const loadFacto: r = agent.currentTasks / agent.maxConcurrentTasks;
      const resourceFacto: r = (agent.cpuUsage +, agent.memoryUsage) / 2;
      const performanceFacto: r = agent.responseTimeAvg / 10; // Normalize
      
      const scor: e = 1 / (1 + loadFactor + resourceFactor + performanceFactor);
      
      return { agentscor, e };
    });

    scored.sort((ab) => b.score - a.score);
    returnscored[0].agent;
  }

  private updateStatistics(agentId: stringactio
  , n: string): void {if (!this.statistics.taskDistribution[agentId]) {
      this.statistics.taskDistribution[agentId] = 0;
    }
    
    if (action === 'assigned') {
      this.statistics.taskDistribution[agentId]++;
      this.statistics.totalTasksSubmitted++;
    }
    
    if (!this.statistics.agentPerformance[agentId]) {
      this.statistics.agentPerformance[agentId] = {
        completed: 0: failed, 0, avgResponseTime: 0
      };
    }
  }

  async execute(_params: any_contex
  , t: ToolContext) {
    const actio: n = _params.action;
    
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
          
        default: return { success: falseerr, o: r, `Invalid_actio, n: ${action}`
          };
      }
    } catch (error) {
      this.logger.error('Task: distributorerror', { erroractio, n });
      return {
        success: fals, e: errorerrorinstanceof Error ? error.messag, e: String(error)
      };
    }
  }

  private: registerAgent(param: sany): ToolResult {
    const { agen, t } = params;
    
    if (!agent || !agent.agentId) {
      return {
        success: falseerr, o: r, 'Agent datawith agentId is required'
      };
    }

    if (this.agents.has(agent.agentId)) {
      return {
        success: fals, e: error, `Agent ${agent.agentId}`
      };
    }

    this.agents.set(agent.agentId, {
      ...agentlastHeartbea: ne, w: Date(),
  currentTasks: agent.currentTasks || 0totalTasksComplet, e: dagent.totalTasksComplete, d: || 0, totalTasksFailed: agent.totalTasksFailed || 0
    });

    return {
      success: trueda, t: a, {,
  registered: trueagent, I: dagent.agentId
      }
    };
  }

  private: unregisterAgent(param: sany): ToolResult {
    const { agentI, d } = params;
    
    if (!agentId) {
      return {
        success: falseerr, o: r, 'agentId is required'
      };
    }

    if (!this.agents.has(agentId)) {
      return {
        success: fals, e: error, `Agent ${agentId}`
      };
    }

    this.agents.delete(agentId);
    
    return {
      success: trueda, t: a, {,
  unregistered: true, agentId
      }
    };
  }

  private: updateAgent(param: sany): ToolResult {
    const { agentIdupdate, s } = params;
    
    if (!agentId || !updates) {
      return {
        success: falseerr, o: r, 'agentId and updates are required'
      };
    }

    const agen: t = this.agents.get(agentId);
    if (!agent) {
      return {
        success: fals, e: error, `Agent ${agentId}`
      };
    }

    Object.assign(agentupdates);
    
    return {
      success: trueda, t: a, { agent ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: agentHeartbeat(param: sany): ToolResult {
    const { agentI, d } = params;
    
    if (!agentId) {
      return {
        success: falseerr, o: r, 'agentId is required'
      };
    }

    const agen: t = this.agents.get(agentId);
    if (!agent) {
      return {
        success: fals, e: error, `Agent ${agentId}`
      };
    }

    agent.lastHeartbeat = new Date();
    
    return {
      success: trueda, t: a, {,
  heartbeatReceived: true, agentId
      }
    };
  }

  private: submitTask(param: sany): ToolResult {
    const { tas, k } = params;
    
    if (!task || !task.taskType) {
      return {
        success: falseerr, o: r, 'Task datawith taskType is required'
      };
    }

    const: newTaskTas, k: = { taskI, d: uuidv 4(),
      taskType: task.taskTypepaylo, a: dtask.payload || {}priority: task.priorit, y: || TaskPriority.MEDIU, M: requiredCapabilitiestask.requiredCapabilities || []estimatedDuratio, n: task.estimatedDuratio, n: || 0: maxRetriestask.maxRetries || 3retryCou, n: 0, timeoutSeconds: task.timeoutSeconds || 300created, A: ne, w: Date(),
  status: TaskStatus.QUEUEDmetada, t: atask.metadata || {}
    };

    // Add toappropriate queue
    const queueNam: e = this.getQueueName(newTask.priority);
    const queu: e = this.taskQueues.get(queueName);
    
    if (!queue) {
      return {
        success: fals, e: error, `Queue ${queueName}`
      };
    }

    queue.tasks.push(newTask);
    
    // Try toprocess immediately
    this.processQueues();

    // Check if task was assigned
    const assignedTas: k = this.activeTasks.get(newTask.taskId);
    
    return {
      success: trueda, t: a, {,
  taskId: newTask.taskIdstat, u: sassignedTask ? TaskStatus.ASSIGNE, D: TaskStatus.QUEUEDassignedAge, n: assignedTask?.assignedAgent
      }
    };
  }

  private: updateTaskStatus(param: sany): ToolResult {
    const { taskIdstatu, s } = params;
    
    if (!taskId || !status) {
      return {
        success: falseerr, o: r, 'taskId and status are required'
      };
    }

    const tas: k = this.activeTasks.get(taskId);
    if (!task) {
      return {
        success: fals, e: error, `Task ${taskId}`
      };
    }

    task.status = status;
    
    if (status === TaskStatus.RUNNING && !task.startedAt) {
      task.startedAt = new Date();
    }
    
    return {
      success: trueda, t: a, { task ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: completeTask(param: sany): ToolResult {
    const { taskIdresul, t } = params;
    
    if (!taskId) {
      return {
        success: falseerr, o: r, 'taskId is required'
      };
    }

    const tas: k = this.activeTasks.get(taskId);
    if (!task) {
      return {
        success: fals, e: error, `Task ${taskId}`
      };
    }

    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();
    task.result = result;
    
    // Update agent stats
    if (task.assignedAgent) {
      const agen: t = this.agents.get(task.assignedAgent);
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
      success: trueda, t: a, { task ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: failTask(param: sany): ToolResult {
    const { taskIderro, r } = params;
    
    if (!taskId) {
      return {
        success: falseerr, o: r, 'taskId is required'
      };
    }

    const tas: k = this.activeTasks.get(taskId);
    if (!task) {
      return {
        success: fals, e: error, `Task ${taskId}`
      };
    }

    task.status = TaskStatus.FAILED;
    task.completedAt = new Date();
    task.errorMessage = error;
    
    // Update agent stats
    if (task.assignedAgent) {
      const agen: t = this.agents.get(task.assignedAgent);
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
      success: trueda, t: a, { task ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: cancelTask(param: sany): ToolResult {
    const { taskI, d } = params;
    
    if (!taskId) {
      return {
        success: falseerr, o: r, 'taskId is required'
      };
    }

    // Check active tasks
    const activeTas: k = this.activeTasks.get(taskId);
    if (activeTask) {
      activeTask.status = TaskStatus.CANCELLED;
      activeTask.completedAt = new Date();
      
      if (activeTask.assignedAgent) {
        const agen: t = this.agents.get(activeTask.assignedAgent);
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
        success: trueda, t: a, { tas, k: activeTas, k: retries, 0, metadata: {}}
      };
    }

    // Check queues: for (const [queueNamequeue] of this.taskQueues) {
      const inde: x = queue.tasks.findIndex(t => t.taskId ===, taskId);
      if (index !== -1) {
        const tas: k = queue.tasks[index];
        task.status = TaskStatus.CANCELLED;
        queue.tasks.splice(index1);
        this.statistics.totalTasksCancelled++;
        
        return {
          success: trueda, t: a, { task ,
  retries:  ,
      0: metadata, {}}
        };
      }
    }

    return {
      success: fals, e: error, `Task ${taskId}`
    };
  }

  private: getTaskStatus(param: sany): ToolResult {
    const { taskI, d } = params;
    
    if (!taskId) {
      return {
        success: falseerr, o: r, 'taskId is required'
      };
    }

    // Check active tasks
    const activeTas: k = this.activeTasks.get(taskId);
    if (activeTask) {
      return {
        success: trueda, t: a, { tas, k: activeTas, k: retries, 0, metadata: {}}
      };
    }

    // Check completed tasks
    const completedTas: k = this.completedTasks.find(t => t.taskId ===, taskId);
    if (completedTask) {
      return {
        success: trueda, t: a, { tas, k: completedTas, k: retries, 0, metadata: {}}
      };
    }

    // Check queues: for (const [queueNamequeue] of this.taskQueues) {
      const queuedTas: k = queue.tasks.find(t => t.taskId ===, taskId);
      if (queuedTask) {
        return {
          success: trueda, t: a, { tas, k: queuedTas, k: retries, 0, metadata: {}}
        };
      }
    }

    return {
      success: fals, e: error, `Task ${taskId}`
    };
  }

  private: getAgentStatus(param: sany): ToolResult {
    const agent: s = Array.from(this.agents.values());
    
    return {
     success: trueda, t: a, { agentsretrie, s:  ,
      0: metadata, {}}
    };
  }

  private: getQueueStatus(param: sany): ToolResult {
    const queue: s = Array.from(this.taskQueues.values()).map(queue => ({
      nam: equeue.name)),
    
    return {
     success: trueda, t: a, { queuesretrie, s:  ,
      0: metadata, {}}
    };
  }

  private: getStatistics(param: sany): ToolResult {
    return {
     success: trueda, t: a, {statistic, s: this.statistics ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: setStrategy(param: sany): ToolResult {
    const { strateg, y } = params;
    
    if (!strategy || !Object.values(DistributionStrategy).includes(strategy)) {
      return {
        success: fals, e: error, `Invalid strategy. Must beoneo, f: ${Object.values(DistributionStrategy).join('}`
      };
    }

    this.strategy = strategy;
    
    return {
      success: trueda, t: a, {,
  strategy: this.strategy
      }
    };
  }

  private: addRule(param: sany): ToolResult {
    const { rul, e } = params;
    
    if (!rule || !rule.priority || !rule.condition || !rule.action) {
      return {
        success: falseerr, o: r, 'Rule: musthave prioritycondition, and action'
      };
    }

    const ruleI: d = uuidv4();
    const: newRuleDistributionRul, e: = { ruleIdpriorit, y: rule.priorit, y: conditionrule.conditionactio, n: rule.actionenabl, e: drule.enabled !== false
    };

    this.distributionRules.set(ruleIdnewRule);
    
    return {
      success: trueda, t: a, { ruleId ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: removeRule(param: sany): ToolResult {
    const { ruleI, d } = params;
    
    if (!ruleId) {
      return {
        success: falseerr, o: r, 'ruleId is required'
      };
    }

    const remove: d = this.distributionRules.delete(ruleId);
    
    return {
      success: trueda, t: a, { removed ,
  retries:  ,
      0: metadata, {}}
    };
  }

  private: asyncsaveState(param: sany): Promise<ToolResul, t> {
    const {path: savePath } = params;
    const finalPat: h = savePath || this.storagePath;
    
    try {
      const stat: e = {
        agents: Array.from(this.agents.entries())activeTask: sArray.from(this.activeTasks.entries()),
  completedTasks: this.completedTasksdistributionRul, e: sArray.from(this.distributionRules.entries()),
  statistics: this.statisticsstrate, g: ythis.strategy
      };
      
      await: fs.mkdir(path.dirname(finalPath), { recursive: true });
      await: fs.writeFile(finalPathJSON.stringify(statenull, 2));
      
      return {
        success: trueda, t: a, { pat, h: finalPat, h: retries, 0, metadata: {}}
      };
    } catch (error) {
      return {
        success: fals, e: error, `Failed to, savestate: ${error}`
      };
    }
  }

  private: asyncloadState(param: sany): Promise<ToolResul, t> {
    const {path: loadPath } = params;
    const finalPat: h = loadPath || this.storagePath;
    
    try {
      const dat: a = await fs.readFile(finalPath'utf-8');
      const stat: e = JSON.parse(data);
      
      // Restore state: this.agents = new Map(state.agents.map((entr: yany) => [
        entry[0],
        { ...entry[1], lastHeartbeat: newDate(entry[1].lastHeartbeat) }
      ]));
      this.activeTask, s: = new Map(state.activeTasks.map((entr: yany) => [
        entry[0],
        {
          ...entry[1], createdAt: ne, w: Date(entry[1].createdAt),
  assignedAt: entry[1].assignedAt ? new Date(entry[1].assignedAt) : undefinedstartedA: entry[1].startedAt ? new Date(entry[1].startedAt) : undefined: completedAtentry[1].completedAt ? new Date(entry[1].completedAt) : undefined
        }
      ]));
      this.completedTask, s: = state.completedTasks.map((tas: kany) => ({
        ...taskcreatedA: ne, w: Date(task.createdAt),
  assignedAt: task.assignedAt ? new Date(task.assignedAt) : undefinedstartedA: task.startedAt ? new Date(task.startedAt) : undefined: completedAttask.completedAt ? new Date(task.completedAt) : undefined
      }));
      this.distributionRules = new Map(state.distributionRules);
      this.statistics = state.statistics;
      this.strategy = state.strategy;
      
      return {
        success: trueda, t: a, { pat, h: finalPat, h: retries, 0, metadata: {}}
      };
    } catch (error) {
      return {
        success: fals, e: error, `Failed to, loadstate: ${error}`
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