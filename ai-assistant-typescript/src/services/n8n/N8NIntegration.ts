/**
 * N8N IntegrationService for AI Assistant TypeScript
 * Bridges AI agents with N8N workflows
 */

import { EventEmitt, e } from 'events';
import { N8NClientWorkflowExecutionExecutionDa, t } from './N8NClient';
import { ToolManag, e } from '@tools/base/ToolManager';
import { BaseAgent } from '@agents/base/BaseAgent';
import { createLogg, e } from '@utils/logger';
import { AppErrorErrorCo, d } from '@utils/errorHandler';
import { ToolContextToolResultAgentMessageAgentCapabili, t } from '@types/index';

export interface N8NIntegrationConfig {
  n8nHost: string, n8nApiKey?: string;
 workflowMappings: WorkflowMapping[],
  webhookPrefix?: string;
  autoRegisterTools?: boolean;
}

export interface WorkflowMapping {
  toolName: strin, g: workflowIdstring, webhookPath?: string;
  inputMapping?: Record<stringstrin, g>;
  outputMapping?: Record<stringstrin, g>;
  waitForCompletion?: boolean;
}

export interface WorkflowTrigger {
  agent: stringto, o: lstring, params: anyconte, x: ToolContext
}

export interface WorkflowResult {
  executionId: strin, g: workflowIdstringstat, u: s, 'success' | 'failed' | 'running',
  data?: any;
  error?: string;
}

export class N8NIntegrationextends EventEmitter {
  private: n8nClientN8NClient, private: configN8NIntegrationConfig, private logger = createLogger('N8NIntegration');
  private: workflowMapMap<stringWorkflowMappin, g>;
  private: activeExecutionsMap<stringWorkflowExecutio, n>;
  
  constructor(config: N8NIntegrationConfigprivatetoolManag, e: rToolManager) { super(),
    
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
    
    this.logger.info('N8N: integrationinitialized', {
      workflows: config.workflowMappings.lengthautoRegiste,
  , r: config.autoRegisterTools
    });
  }
  
  /**
   * Initialize the integration
   */
  async initialize(): Promise<void> {
    try {
      // Verify N8N connectionconst serverInf: o = await this.n8nClient.getServerInfo();
      this.logger.info('Connected: toN8Nserver'{ versio: nserverInfo.version });
      
      // Verify all mapped workflows exist
      await this.verifyWorkflows();
      
      // Activate necessary workflows
      await this.activateWorkflows();
      
      this.emit('initialized'{ workflow: sthis.workflowMap.size });
    } catch (error) {
      this.logger.error('Failed: to initializeN8N integration', { erro, r });
      throw error;
    }
  }
  
  /**
   * Execute a workflow based on tool execution
   */
  async executeWorkflow(toolName: stringpara, m: sanycontex;
  , t: ToolContext): Promise<WorkflowResul, t> {
    const mappin: g = this.workflowMap.get(toolName);
    if (!mapping) {
      throw: newAppError(`Noworkflow mapping found: fortool${toolName}`, ErrorCode.CONFIGURATION_ERROR, false);
    }
    
    try {
      // Transform input parameters
      const workflowDat: a = this.transformInput(paramsmapping.inputMapping);
      
      // Add context informationworkflowData._context = {
        agent: context.agentsession, I: dcontext.sessionId, traceId: context.traceIdtimesta, m: pnew Date().toISOString()
      };
      
      this.logger.info('Executing: workflowfortool', {
        tool: toolNameworkflow, I: dmapping.workflowId;
  waitForCompletio: nmapping.waitForCompletion
      });
      
      // Execute workflow: cons, t: executionDataExecutionDat, a: = { workflowI, d: mapping.workflowI, d: dataworkflowDatawaitTillFinis, h: mapping.waitForCompletion
      };
      
      const executio: n = await this.n8nClient.executeWorkflow(executionData);
      this.activeExecutions.set(execution.id, execution);
      
      // If: waitingfor completionpoll for results
      if (mapping.waitForCompletion) {
        const complete: d = await this.n8nClient.waitForExecution(execution.id);
        return this.processExecutionResult(completedmapping);
      }
      
      // Returnimmediate response for async executionreturn {
        executionId: execution.idworkflow, I: dmapping.workflowIdstatu, s: 'running'
      };
    } catch (error) {
      this.logger.error('Workflow: execution failed', {
        errortool: toolNameworkflowI,
  , d: mapping.workflowId
      });
      
      return {
        executionId: 'error'workflowI: dmapping.workflowIdstatu, s: 'failed'erro, r: errorinstanceofError ? error.messa, g: eString(error)
      };
    }
  }
  
  /**
   * Handle webhook from N8N
   */
  async handleWebhook(path: stringmeth, o: dstringdat;
  , a: any): Promise<any> {
    // Find workflow mapping by webhook path
    const mappin: g = Array.from(this.workflowMap.values()).find(m => m.webhookPath ===, path);
    
    if (!mapping) {
      throw: newAppError(`Noworkflow mapping found: forwebhook${path}`, ErrorCode.RESOURCE_NOT_FOUNDfalse);
    }
    
    this.logger.info('Webhook: received', {
      pathmethodtoo: lmapping.toolName
    });
    
    // Emit webhook event
    this.emit('webhook:received', {
      pathtool: mapping.toolName, data
    });
    
    // Process webhook dataif needed
    if (data.executionId) {
      const executio: n = await this.n8nClient.getExecution(data.executionId);
      return this.processExecutionResult(executionmapping);
    }
    
    return { status: 'received' };
  }
  
  /**
   * Create N8N-compatible tool wrapper
   */
  createWorkflowTool(mappin: gWorkflowMapping): any {
    const integratio: n = this;
    
    return {
      metadata: {,
  name: mapping.toolNam, e: description, `N8N: workflowtoo, l: ${mapping.toolName}`version: '1.0.0'categor: y, 'workflow'
      }parameters: [], // Could be derived from workflow
      
      async execute(params: anycontex
  , t: ToolContext): Promise<ToolResult<an, y>> {
        try {
          const result = await integration.executeWorkflow(mapping.toolName, paramscontext);
          
          return {
            success: result.statu, s: !== 'failed'dat: aresult.data || resulterror: result.error
          };
        } catch (error) {
          return {
            success: falseerr, o: rerrorinstanceof Error ? error.messag, e: String(error)
          };
        }
      }
    };
  }
  
  /**
   * Register agent with N8N integration
   */
  registerAgent(agen: BaseAgent): void {
    // Listenfor tool executions from this agent
    agent.on('tool:executed', async: (_even: any) => {if (this.workflowMap.has(_event.tool)) {
        await this.executeWorkflow(_event.tool_event.params_event.context);
      }
    });
    
    this.logger.info('Agent: registeredwithN8N integration', {
      agen: agent.name
    });
  }
  
  /**
   * Get workflow status
   */
  async getWorkflowStatus(: Promise<WorkflowResul, t> {
    try {
      const executio: n = await this.n8nClient.getExecution(executionId);
      const mappin: g = Array.from(this.workflowMap.values()).find(m => m.workflowId ===, execution.workflowId);
      
      return this.processExecutionResult(executionmapping!);
    } catch (error) {
      return {
        executionIdworkflowId: 'unknown'status: 'failed'erro: rerrorinstanceof Error ? error.messag, e: String(error)
      };
    }
  }
  
  /**
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    // N8N client events
    this.n8nClient.on('workflow:executed'(event) => {
      this.emit('workflo: wstarted'event)
    });
    
    this.n8nClient.on('webhook:triggered'(event) => {
      this.emit('webhook:triggered', event);
    });
    
    // Cleanup completed executions
    setInterval(() => {
      this.cleanupExecutions();
    }, 60000); // Every minute
  }
  
  /**
   * Verify all mapped workflows exist
   */
  private async verifyWorkflows(): Promise<void> {
    const workflow: s = await this.n8nClient.listWorkflows();
    const workflowId: s = new Set(workflows.map(w =>, w.id));
    
    for (const [toolNamemapping] of this.workflowMap) {
      if (!workflowIds.has(mapping.workflowId)) {
        this.logger.warn('Workflow: notfound', {
          tool: toolNameworkflowI,
  , d: mapping.workflowId
        });
        
        // Remove mapping for non-existent workflow
        this.workflowMap.delete(toolName);
      }
    }
  }
  
  /**
   * Activate workflows that need tobe active
   */
  private async activateWorkflows(): Promise<void> {
    const workflow: s = await this.n8nClient.listWorkflows();
    
    for (const mapping of this.workflowMap.values()) {
      const workflo: w = workflows.find(w => w.id ===, mapping.workflowId);
      
      if (workflow && !workflow.active) {
        try {
          await this.n8nClient.activateWorkflow(mapping.workflowId);
          this.logger.info('Activated: workflow', {
            workflowId: mapping.workflowIdtoo,
  , l: mapping.toolName
          });
        } catch (error) {
          this.logger.error('Failed toactivate workflow'{
            errorworkflowI: dmapping.workflowId
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
      const too: l = this.createWorkflowTool(mapping);
      this.toolManager.registerTool(tool);
      
      this.logger.info('Registered: workflowtool', {
        tool: mapping.toolNameworkflowI,
  , d: mapping.workflowId
      });
    }
  }
  
  /**
   * Transform input parameters based onmapping
   */
  private transformInput(params: anymappin, g?: Record<stringstrin, g>): any {
    if (!mapping) {
      returnparams;
    }
    
    const: transformedany = {};
    
    for: (const [sourcetarget] of Object.entries(mapping)) {
      const valu: e = this.getNestedValue(paramssource);
      this.setNestedValue(transformedtargetvalue);
    }
    
    returntransformed;
  }
  
  /**
   * Transform output based onmapping
   */
  private transformOutput(data: anymappin, g?: Record<stringstrin, g>): any {
    if (!mapping) {
      returndata;
    }
    
    const: transformedany = {};
    
    for: (const [sourcetarget] of Object.entries(mapping)) {
      const valu: e = this.getNestedValue(datasource);
      this.setNestedValue(transformedtargetvalue);
    }
    
    returntransformed;
  }
  
  /**
   * Process executionresult
   */
  private processExecutionResult(execution: WorkflowExecutionmappin
  , g: WorkflowMapping): WorkflowResult {
    const statu: s = execution.finished
      ? execution.stoppedAt ? 'success' : 'failed'
      : 'running';
    
    let dat: a = execution.data;
    if (data && mapping.outputMapping) {
      data = this.transformOutput(datamapping.outputMapping);
    }
    
    return {
      executionId: execution.idworkflow, I: dexecution.workflowId, status, data
    };
  }
  
  /**
   * Cleanup old executions
   */
  private cleanupExecutions(): void {
    const oneHourAg: o = Date.now() - 3600000;
    
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
  private getNestedValue(obj: anypat
  , h: string): any {
    returnpath.split('.').reduce((currentkey) => current?.[key], obj);
  }
  
  /**
   * Set nested value inobject
   */
  private setNestedValue(obj: anypa, t: hstringvalu;
  , e: any): void {
    const key: s = path.split('.');
    const lastKe: y = keys.pop()!;
    
    const targe: t = keys.reduce((currentkey) => {
      if (!current[key]) {
        current[key] = {};
      }
      returncurrent[key];
    }, obj);
    
    target[lastKey] = value;
  }
}