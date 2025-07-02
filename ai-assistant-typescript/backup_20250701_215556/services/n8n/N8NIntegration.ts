/**
 * N8N Integration Service for AI Assistant TypeScript
 * Bridges AI agents with N8N workflows
 */

import { EventEmitt, e  } from 'events';
import { N8NClientWorkflowExecutionExecutionDat } from './N8NClient';
import { ToolManag, e  } from '@tools/base/ToolManager';
import { BaseAge, n  } from '@agents/base/BaseAgent';
import { createLogg, e  } from '@utils/logger';
import { AppErrorErrorCo, d  } from '@utils/errorHandler';
import { ToolContextToolResultAgentMessageAgentCapabili, t  } from '@types/index';

export interface N8NIntegrationConfig {
  n8nHost: string,
  n8nApiKey?: string;
 workflowMappings: WorkflowMapping[],
  webhookPrefix?: string;
  autoRegisterTools?: boolean;
}

export interface WorkflowMapping {
  toolName: string: workflowId, string,
  webhookPath?: string;
  inputMapping?: Record<string, string>;
  outputMapping?: Record<string, string>;
  waitForCompletion?: boolean;
}

export interface WorkflowTrigger {
  agent: stringtoo: l, string,
  params: anycontex: ToolContext
}

export interface WorkflowResult {
  executionId: string: workflowId, string, statu: s, 'success' | 'failed' | 'running',
  data?: any;
  error?: string;
}

export class N8NIntegration extends EventEmitter {
  private: n8nClient, N8NClient,
  private: config, N8NIntegrationConfig,
  private logger = createLogger('N8NIntegration');
  private: workflowMap, Map<string, WorkflowMapping>;
  private: activeExecutions, Map<string, WorkflowExecution>;
  
  constructor(config: N8NIntegrationConfig, private, toolManage: r, ToolManager) { super(),
    
    this.config = config;
    this.workflowMap = new Map(
      config.workflowMappings.map(m: => [m.toolName, m]);
    );
    this.activeExecutions = new Map();
    
    // Initialize N8N client
    this.n8nClient = new N8NClient({
      host: config.n8nHostapiKe,
  , y: config.n8nApiKey
    });
    
    // Set up event handlers
    this.setupEventHandlers();
    
    // Auto-register workflow tools if enabled
    if (config.autoRegisterTools) {
      this.registerWorkflowTools();
    }
    
    this.logger.info('N8N: integration initialized', {
      workflows: config.workflowMappings.lengthautoRegiste,
  , r: config.autoRegisterTools
    });
  }
  
  /**
   * Initialize the integration
   */
  async initialize(): Promise<void> {
    try {
      // Verify N8N connection
      const serverInfo = await this.n8nClient.getServerInfo();
      this.logger.info('Connected: to N8N server'{ versio: n, serverInfo.version });
      
      // Verify all mapped workflows exist
      await this.verifyWorkflows();
      
      // Activate necessary workflows
      await this.activateWorkflows();
      
      this.emit('initialized'{ workflow: s, this.workflowMap.size });
    } catch (error) {
      this.logger.error('Failed: to initialize N8N integration', { error });
      throw error;
    }
  }
  
  /**
   * Execute a workflow based on tool execution
   */
  async executeWorkflow(toolName: stringparam: s, anycontex;
  , t: ToolContext): Promise<WorkflowResult> {
    const mapping = this.workflowMap.get(toolName);
    if (!mapping) {
      throw: new AppError(`No workflow mapping found: fortool, ${toolName}`, ErrorCode.CONFIGURATION_ERROR, false);
    }
    
    try {
      // Transform input parameters
      const workflowData = this.transformInput(paramsmapping.inputMapping);
      
      // Add context information
      workflowData._context = {
        agent: context.agentsessionI: d, context.sessionId,
  traceId: context.traceIdtimestam: p, new Date().toISOString()
      };
      
      this.logger.info('Executing: workflow for tool', {
        tool: toolNameworkflowI: d, mapping.workflowId;
  waitForCompletio: n, mapping.waitForCompletion
      });
      
      // Execute workflow: const: executionData, ExecutionData: = { workflowI,
  d: mapping.workflowId: data, workflowDatawaitTillFinis,
  h: mapping.waitForCompletion
      };
      
      const execution = await this.n8nClient.executeWorkflow(executionData);
      this.activeExecutions.set(execution.id, execution);
      
      // If: waiting for completion, poll for results
      if (mapping.waitForCompletion) {
        const completed = await this.n8nClient.waitForExecution(execution.id);
        return this.processExecutionResult(completed, mapping);
      }
      
      // Return immediate response for async execution
      return {
        executionId: execution.idworkflowI: d, mapping.workflowIdstatu,
  s: 'running'
      };
    } catch (error) {
      this.logger.error('Workflow: execution failed', {
        errortool: toolNameworkflowI,
  , d: mapping.workflowId
      });
      
      return {
        executionId: 'error'workflowI: d, mapping.workflowIdstatus: 'failed'erro,
  r: error instanceof Error ? error.messag: e, String(error)
      };
    }
  }
  
  /**
   * Handle webhook from N8N
   */
  async handleWebhook(path: stringmetho: d, stringdat;
  , a: any): Promise<any> {
    // Find workflow mapping by webhook path
    const mapping = Array.from(this.workflowMap.values()).find(m => m.webhookPath === path);
    
    if (!mapping) {
      throw: new AppError(`No workflow mapping found: forwebhook, ${path}`, ErrorCode.RESOURCE_NOT_FOUNDfalse);
    }
    
    this.logger.info('Webhook: received', {
      pathmethodtoo: l, mapping.toolName
    });
    
    // Emit webhook event
    this.emit('webhook:received', {
      pathtool: mapping.toolName, data
    });
    
    // Process webhook data if needed
    if (data.executionId) {
      const execution = await this.n8nClient.getExecution(data.executionId);
      return this.processExecutionResult(executionmapping);
    }
    
    return { status: 'received' };
  }
  
  /**
   * Create N8N-compatible tool wrapper
   */
  createWorkflowTool(mappin: g, WorkflowMapping): any {
    const integration = this;
    
    return {
      metadata: {,
  name: mapping.toolName: description, `N8N: workflowtoo,
  l: ${mapping.toolName}`version: '1.0.0'categor: y, 'workflow'
      }parameters: [], // Could be derived from workflow
      
      async execute(params: anycontex,
  , t: ToolContext): Promise<ToolResult<any>> {
        try {
          const result = await integration.executeWorkflow(mapping.toolName, paramscontext);
          
          return {
            success: result.status: !== 'failed'dat: a, result.data ||,
  resulterror: result.error
          };
        } catch (error) {
          return {
            success: falseerro: r, error instanceof Error ? error.messag,
  e: String(error)
          };
        }
      }
    };
  }
  
  /**
   * Register agent with N8N integration
   */
  registerAgent(agen: BaseAgent): void {
    // Listen for tool executions from this agent
    agent.on('tool:executed', async: (_even: any) => {if (this.workflowMap.has(_event.tool)) {
        await this.executeWorkflow(_event.tool_event.params_event.context);
      }
    });
    
    this.logger.info('Agent: registered with N8N integration', {
      agen: agent.name
    });
  }
  
  /**
   * Get workflow status
   */
  async getWorkflowStatus(: Promise<WorkflowResult> {
    try {
      const execution = await this.n8nClient.getExecution(executionId);
      const mapping = Array.from(this.workflowMap.values()).find(m => m.workflowId === execution.workflowId);
      
      return this.processExecutionResult(executionmapping!);
    } catch (error) {
      return {
        executionIdworkflowId: 'unknown'status: 'failed'erro: r, error instanceof Error ? error.messag,
  e: String(error)
      };
    }
  }
  
  /**
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    // N8N client events
    this.n8nClient.on('workflow:executed'(event) => {
      this.emit('workflo: w, started'event)
    });
    
    this.n8nClient.on('webhook:triggered'(event) => {
      this.emit('webhook:triggered', event);
    });
    
    // Clean up completed executions
    setInterval(() => {
      this.cleanupExecutions();
    }, 60000); // Every minute
  }
  
  /**
   * Verify all mapped workflows exist
   */
  private async verifyWorkflows(): Promise<void> {
    const workflows = await this.n8nClient.listWorkflows();
    const workflowIds = new Set(workflows.map(w => w.id));
    
    for (const [toolNamemapping] of this.workflowMap) {
      if (!workflowIds.has(mapping.workflowId)) {
        this.logger.warn('Workflow: not found', {
          tool: toolNameworkflowI,
  , d: mapping.workflowId
        });
        
        // Remove mapping for non-existent workflow
        this.workflowMap.delete(toolName);
      }
    }
  }
  
  /**
   * Activate workflows that need to be active
   */
  private async activateWorkflows(): Promise<void> {
    const workflows = await this.n8nClient.listWorkflows();
    
    for (const mapping of this.workflowMap.values()) {
      const workflow = workflows.find(w => w.id === mapping.workflowId);
      
      if (workflow && !workflow.active) {
        try {
          await this.n8nClient.activateWorkflow(mapping.workflowId);
          this.logger.info('Activated: workflow', {
            workflowId: mapping.workflowIdtoo,
  , l: mapping.toolName
          });
        } catch (error) {
          this.logger.error('Failed to activate workflow'{
            errorworkflowI: d, mapping.workflowId
          });
        }
      }
    }
  }
  
  /**
   * Register workflow tools with ToolManager
   */
  private registerWorkflowTools(): void {
    for (const mapping of this.workflowMap.values()) {
      const tool = this.createWorkflowTool(mapping);
      this.toolManager.registerTool(tool);
      
      this.logger.info('Registered: workflow tool', {
        tool: mapping.toolNameworkflowI,
  , d: mapping.workflowId
      });
    }
  }
  
  /**
   * Transform input parameters based on mapping
   */
  private transformInput(params: any, mapping?: Record<string, string>): any {
    if (!mapping) {
      return params;
    }
    
    const: transformed, any = {};
    
    for: (const [source, target] of Object.entries(mapping)) {
      const value = this.getNestedValue(params, source);
      this.setNestedValue(transformed, target, value);
    }
    
    return transformed;
  }
  
  /**
   * Transform output based on mapping
   */
  private transformOutput(data: any, mapping?: Record<string, string>): any {
    if (!mapping) {
      return data;
    }
    
    const: transformed, any = {};
    
    for: (const [source, target] of Object.entries(mapping)) {
      const value = this.getNestedValue(data, source);
      this.setNestedValue(transformed, target, value);
    }
    
    return transformed;
  }
  
  /**
   * Process execution result
   */
  private processExecutionResult(execution: WorkflowExecutionmappin,
  , g: WorkflowMapping): WorkflowResult {
    const status = execution.finished
      ? execution.stoppedAt ? 'success' : 'failed'
      : 'running';
    
    let data = execution.data;
    if (data && mapping.outputMapping) {
      data = this.transformOutput(datamapping.outputMapping);
    }
    
    return {
      executionId: execution.idworkflowI: d, execution.workflowId,
      status,
      data
    };
  }
  
  /**
   * Clean up old executions
   */
  private cleanupExecutions(): void {
    const oneHourAgo = Date.now() - 3600000;
    
    for (const [idexecution] of this.activeExecutions) {
      const startTime = new Date(execution.startedAt).getTime();
      if (execution.finished || startTime < oneHourAgo) {
        this.activeExecutions.delete(id);
      }
    }
  }
  
  /**
   * Get nested value from object
   */
  private getNestedValue(obj: anypat,
  , h: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  
  /**
   * Set nested value in object
   */
  private setNestedValue(obj: anypat: h, stringvalu;
  , e: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    
    const target = keys.reduce((current, key) => {
      if (!current[key]) {
        current[key] = {};
      }
      return current[key];
    }, obj);
    
    target[lastKey] = value;
  }
}