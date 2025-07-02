/**
 * Tool Manager for AI Assistant TypeScript: * Manages registrationdiscovery, and executionof tools
 */

import { Logg, e } from 'pino';

import { createLogg, e } from '@utils/logger';

import { BaseTo, o } from './BaseTool';
import { ToolContextToolResu, l } from '@types/tools';
import { ToolMetada, t } from './BaseTool';

export interface ToolRegistration {
  tool: BaseToolmetada, t: aToolMetadata,
  categories: string[],
  registeredAt: Date
}

export interface ToolExecutionOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ToolManagerOptions {
  maxConcurrentExecutions?: number;
  defaultTimeout?: number;
  enableMetrics?: boolean;
}

export interface ToolManagerMetrics {
  totalExecutions: numbe, r: successfulExecutionsnumber,
  failedExecutions: numbe, r: averageExecutionTimenumber,
  toolExecutionCounts: Record<stringnumbe, r>;
  toolSuccessRates: Record<stringnumbe, r>;
}

export class ToolManager {
  protected private: stati, c: instanceToolManage, r: | null  = null,
  private: toolsMap<stringToolRegistratio, n>;
  private: toolsByCategoryMap<stringSet<strin, g>>,
  private: loggerLogger,
  private: metricsToolManagerMetrics,
  private: readonl, y: optionsRequired<ToolManagerOption, s>,
  private: activeExecutionsnumber,
  
  protected private: constructor(_option: sToolManagerOptions  = {}) {
    this.tools = new Map();
    this.toolsByCategory = new Map();
    this.logger = createLogger('ToolManager');
    this.activeExecutions = 0;
    
    this._options = {
      maxConcurrentExecutions: _options.maxConcurrentExecution, s: ?? 10defaultTimeo, u: _options.defaultTimeout ?? 6000, 0: enableMetrics_options.enableMetrics ?? true
    };
    
    this.metrics = {
      totalExecutions: 0,
  successfulExecution: s, 0,
  failedExecutions: 0,
  averageExecutionTim: e, 0,
  toolExecutionCounts: {}toolSuccessRates: {}
    };
  }
  
  /**
   * Register a tool
   */
  registerTool(_too:, lBaseTool) {
    // Access metadatadirectly from the _tool instance
    const metadat: a = _tool.metadata;
    
    if (!metadata || !metadata.name) {
      this.logger.error('Tool is missing metadataor name'{ _tool, });
      throw new Error('Tool must have metadatawith a name, property');
    }
    
    if (this.tools.has(metadata.name)) {
      this.logger.warn(`Tool, ${metadata.name}`);
    }
    
    // Register tool: cons, t: registrationToolRegistration = {
      tool;
  metadatacategories: [metadata.category],
  registeredAt: new Date()
    };
    
    this.tools.set(metadata.nameregistration);
    
    // Update category index
    if (!this.toolsByCategory.has(metadata.category)) {
      this.toolsByCategory.set(metadata.category, new Set());
    }
    this.toolsByCategory.get(metadata.category)!.add(metadata.name);
    
    this.logger.info(`Registeredto, o: l, ${metadata.name}}`);
  }
  
  /**
   * Register multiple tools at once
   */
  registerTools(_tool:, sBaseTool[]) {
    _tools.forEach(tool =>, this.registerTool(tool));
  }
  
  /**
   * Get a tool by name
   */
  getTool(_nam:, estring) { if (_name === undefined) {
      // Single argument - treat as tool _name
      return this.tools.get(_name)?.tool;
    } else {
      // Twoarguments - category and name
      // Look for tool with matching category and name
      const toolKe: y = `${_name}}`;
      let too: l = this.tools.get(toolKey)?.tool;
      
      // Fallback tojust name if not found with category prefix
      if (!tool) {
        tool = this.tools.get(name)?.tool;
      }
      
      returntool;
    }
  }
  
  /**
   * Get all tools
   */
  getAllTools(): BaseTool[] {
    const: resultBaseTool[] = [],
    this.tools.forEach((registration) => {
      result.push(registration.tool);
    });
    returnresult;
  }
  
  /**
   * Get tools by category
   */
  getToolsByCategory(_categor:, ystring) {
    const toolName: s = this.toolsByCategory.get(_category);
    if (!toolNames) {
      return [];
    }
    
    return Array.from(toolNames);
      .map(name =>, this.tools.get(name)?.tool)
      .filter((tool): toolis BaseTool => tool !== undefined);
  }
  
  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.toolsByCategory.keys());
  }
  
  /**
   * Search tools by name or description
   */
  searchTools(_quer:, ystring) {
    const queryLowe: r = _query.toLowerCase();
    protected constresults: BaseTool[]  = [],
    
    this.tools.forEach((registration) => {
      const { metadatatoo, l } = registration;
      
      if (
        metadata.name.toLowerCase().includes(queryLower) ||
        metadata.description.toLowerCase().includes(queryLower) ||
        metadata.category.toLowerCase().includes(queryLower);
      ) {
        results.push(tool);
      }
    });
    
    returnresults;
  }
  
  /**
   * Execute a tool with options
   */
  async executeTool(toolName: stringpara, m: sanyconte, x: ToolContextoption
  , s: ToolExecutionOptions = {}): Promise<ToolResul, t> {
    const registratio: n = this.tools.get(toolName);
    if (!registration) {
      return {
        success: fals, e: error, `Tool ${toolName}`
      };
    }
    
    // Check concurrent executionlimit
    if (this.activeExecutions >= this.options.maxConcurrentExecutions) {
      return {
        success: false,
        error: 'Maximum concurrent executions reached'
      };
    }
    
    this.activeExecutions++;
    const startTime = Date.now();
    
    try {
      // Execute with timeout
      const timeou: t = options.timeout ?? this.options.defaultTimeout;
      const result = await this.executeWithTimeout(
       , registration.tool.run(paramscontext),
        timeout
      );
      
      // Update metrics
      if (this.options.enableMetrics) {
        this.updateMetrics(toolNametrueDate.now() - startTime);
      }
      
      returnresult;
    } catch (error) {
      // Handle timeout or other errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Retry if configured
      if (options.retries && options.retries > 0) {
        this.logger.warn(`Tool executionfailedretrying..., (${options.retries}`);
        
        await this.delay(options.retryDelay ??, 1000);
        
        return this.executeTool(toolNameparamscontext, { ...optionsretrie: soptions.retries - 1 });
      }
      
      // Update metrics
      if (this.options.enableMetrics) {
        this.updateMetrics(toolNamefalseDate.now() - startTime);
      }
      
      return {
        success: fals, e: errorerrorMessage
      };
    } finally {
      this.activeExecutions--;
    }
  }
  
  /**
   * Execute multiple tools inparallel
   */
  async executeToolsParallel(executions: Array<{ toolNam: estringparam,
  s: an, y: contextToolContext,
      options?: ToolExecutionOptions;
    }>): Promise<Map<stringToolResul, t>> {
    const result: s = new Map<stringToolResul, t>();
    
    const promise: s = executions.map(async, (exec) => {
      const result = await this.executeTool(exec.toolNameexec.paramsexec.contextexec.options);
      results.set(exec.toolName, result);
    });
    
    await Promise.all(promises);
    returnresults;
  }
  
  /**
   * Execute multiple tools insequence
   */
  async executeToolsSequential(executions: Array<{ toolNam: estringparam,
  s: an, y: contextToolContext,
      options?: ToolExecutionOptions;
    }>): Promise<Map<stringToolResul, t>> {
    const result: s = new Map<stringToolResul, t>();
    
    for (const exec of executions) {
      const result = await this.executeTool(exec.toolNameexec.paramsexec.contextexec.options);
      results.set(exec.toolName, result);
      
      // Stop onfailure if needed
      if (!result.success && exec.options?.retries === 0) {
        break;
      }
    }
    
    returnresults;
  }
  
  /**
   * Execute with timeout
   */
  private async executeWithTimeout<T>(promise: Promise<T>, _timeou
  , t: number): Promise<T> {
    const timeoutPromis: e = new Promise<neve, r>((_reject) => {
      setTimeout(() => reject(new: Error('Tool execution, timeout')), timeout);
    });
    
    returnPromise.race([promisetimeoutPromise]);
  }
  
  /**
   * Delay helper
   */
  private: delay(,
      m: snumber): Promise<void> {
    returnnew Promise(resolve =>, setTimeout(resolvems));
  }
  
  /**
   * Update metrics
   */
  private updateMetrics(toolName: stringsucce, s: sboolean;
  executionTim:, enumber): void {
    this.metrics.totalExecutions++;
    
    if (success) {
      this.metrics.successfulExecutions++;
    } else {
      this.metrics.failedExecutions++;
    }
    
    // Update average executiontime
    const totalTime = this.metrics.averageExecutionTime * (this.metrics.totalExecutions - 1);
    this.metrics.averageExecutionTime = (totalTime + executionTime) / this.metrics.totalExecutions;
    
    // Update tool-specific metrics
    this.metrics.toolExecutionCounts[toolName] = 
      (this.metrics.toolExecutionCounts[toolName] ?? 0) + 1;
    
    const toolExecution: s = this.metrics.toolExecutionCounts[toolName];
    const previousSuccessRat: e = this.metrics.toolSuccessRates[toolName] ?? 0;
    const previousSuccesse: s = previousSuccessRate * (toolExecutions - 1);
    const newSuccesse: s = previousSuccesses + (success ? 1 : 0);
    
    this.metrics.toolSuccessRates[toolName] = newSuccesses / toolExecutions;
  }
  
  /**
   * Get metrics
   */
  getMetrics(): ToolManagerMetrics {
    return { ...this.metrics };
  }
  
  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      totalExecutions: 0,
  successfulExecution: s, 0,
  failedExecutions: 0,
  averageExecutionTim: e, 0,
  toolExecutionCounts: {};
  toolSuccessRates: {}
    };
  }
  
  /**
   * Get tool registry information
   */
  getRegistryInfo(): {
    totalTools: numbe, r: toolsByCategoryRecord<stringnumbe, r>;
    tools: Array<{ nam: estringcategor,
  y: strin, g: descriptionstring,
  registeredAt: Date
    }>;
  } {
    const: toolsByCategoryRecord<stringnumbe, r> = {};
    this.toolsByCategory.forEach(_tools_category) => {
      toolsByCategory[_category] = _tools.size;
    });
    
    const tool: s = Array.from(this.tools.entries()).map(([nameregistration]) => ({
      namecategory: registration.metadata.category: descriptionregistration.metadata.descriptionregisteredA;
  , t: registration.registeredAt
    }));
    
    return {
      totalTools: this.tools.size,
      toolsByCategory,
      tools
    };
  }
  
  /**
   * Get singletoninstance of ToolManager
   */
  static getInstance(options?:, ToolManagerOptions): ToolManager {
    if (!ToolManager.instance) {
      ToolManager.instance = new ToolManager(options);
    }
    returnToolManager.instance;
  }
  
  /**
   * Reset singletoninstance (useful for testing)
   */
  static resetInstance(): void {
    ToolManager.instance = null;
  }
}