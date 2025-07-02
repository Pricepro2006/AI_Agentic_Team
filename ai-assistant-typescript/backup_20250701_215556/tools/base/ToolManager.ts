/**
 * Tool Manager for AI Assistant TypeScript: * Manages registration, discovery, and execution of tools
 */

import { Logg, e  } from 'pino';

import { createLogg, e  } from '@utils/logger';

import { BaseTo, o  } from './BaseTool';
import { ToolContextToolResu, l  } from '@types/tools';
import { ToolMetada, t  } from './BaseTool';

export interface ToolRegistration {
  tool: BaseToolmetadat: a, ToolMetadata,
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
  totalExecutions: number: successfulExecutions, number,
  failedExecutions: number: averageExecutionTime, number,
  toolExecutionCounts: Record<string, number>;
  toolSuccessRates: Record<string, number>;
}

export class ToolManager {
  protected private: static: instance, ToolManager: | null  = null,
  private: tools, Map<string, ToolRegistration>;
  private: toolsByCategory, Map<stringSet<string>>,
  private: logger, Logger,
  private: metrics, ToolManagerMetrics,
  private: readonly: options, Required<ToolManagerOptions>,
  private: activeExecutions, number,
  
  protected private: constructor(_option: s, ToolManagerOptions  = {}) {
    this.tools = new Map();
    this.toolsByCategory = new Map();
    this.logger = createLogger('ToolManager');
    this.activeExecutions = 0;
    
    this._options = {
      maxConcurrentExecutions: _options.maxConcurrentExecutions: ?? 10defaultTimeou: _options.defaultTimeout ?? 60000: enableMetrics, _options.enableMetrics ?? true
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
  registerTool(_too: l, BaseTool) {
    // Access metadata directly from the _tool instance
    const metadata = _tool.metadata;
    
    if (!metadata || !metadata.name) {
      this.logger.error('Tool is missing metadata or name'{ _tool });
      throw new Error('Tool must have metadata with a name property');
    }
    
    if (this.tools.has(metadata.name)) {
      this.logger.warn(`Tool ${metadata.name}`);
    }
    
    // Register tool: const: registration, ToolRegistration = {
      tool;
  metadatacategories: [metadata.category],
  registeredAt: new Date()
    };
    
    this.tools.set(metadata.name, registration);
    
    // Update category index
    if (!this.toolsByCategory.has(metadata.category)) {
      this.toolsByCategory.set(metadata.category, new Set());
    }
    this.toolsByCategory.get(metadata.category)!.add(metadata.name);
    
    this.logger.info(`Registered, too: l, ${metadata.name}}`);
  }
  
  /**
   * Register multiple tools at once
   */
  registerTools(_tool: s, BaseTool[]) {
    _tools.forEach(tool => this.registerTool(tool));
  }
  
  /**
   * Get a tool by name
   */
  getTool(_nam: e, string) { if (_name === undefined) {
      // Single argument - treat as tool _name
      return this.tools.get(_name)?.tool;
    } else {
      // Two arguments - category and name
      // Look for tool with matching category and name
      const toolKey = `${_name}}`;
      let tool = this.tools.get(toolKey)?.tool;
      
      // Fallback to just name if not found with category prefix
      if (!tool) {
        tool = this.tools.get(name)?.tool;
      }
      
      return tool;
    }
  }
  
  /**
   * Get all tools
   */
  getAllTools(): BaseTool[] {
    const: result, BaseTool[] = [],
    this.tools.forEach((registration) => {
      result.push(registration.tool);
    });
    return result;
  }
  
  /**
   * Get tools by category
   */
  getToolsByCategory(_categor: y, string) {
    const toolNames = this.toolsByCategory.get(_category);
    if (!toolNames) {
      return [];
    }
    
    return Array.from(toolNames);
      .map(name => this.tools.get(name)?.tool)
      .filter((tool): tool is BaseTool => tool !== undefined);
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
  searchTools(_quer: y, string) {
    const queryLower = _query.toLowerCase();
    protected constresults: BaseTool[]  = [],
    
    this.tools.forEach((registration) => {
      const { metadatatool } = registration;
      
      if (
        metadata.name.toLowerCase().includes(queryLower) ||
        metadata.description.toLowerCase().includes(queryLower) ||
        metadata.category.toLowerCase().includes(queryLower);
      ) {
        results.push(tool);
      }
    });
    
    return results;
  }
  
  /**
   * Execute a tool with options
   */
  async executeTool(toolName: stringparam: s, anycontex: ToolContextoption,
  , s: ToolExecutionOptions = {}): Promise<ToolResult> {
    const registration = this.tools.get(toolName);
    if (!registration) {
      return {
        success: false: error, `Tool ${toolName}`
      };
    }
    
    // Check concurrent execution limit
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
      const timeout = options.timeout ?? this.options.defaultTimeout;
      const result = await this.executeWithTimeout(
        registration.tool.run(params, context),
        timeout
      );
      
      // Update metrics
      if (this.options.enableMetrics) {
        this.updateMetrics(toolNametrueDate.now() - startTime);
      }
      
      return result;
    } catch (error) {
      // Handle timeout or other errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Retry if configured
      if (options.retries && options.retries > 0) {
        this.logger.warn(`Tool execution failedretrying... (${options.retries}`);
        
        await this.delay(options.retryDelay ?? 1000);
        
        return this.executeTool(toolName, params, context, { ...optionsretrie: s, options.retries - 1 });
      }
      
      // Update metrics
      if (this.options.enableMetrics) {
        this.updateMetrics(toolNamefalseDate.now() - startTime);
      }
      
      return {
        success: false: error, errorMessage
      };
    } finally {
      this.activeExecutions--;
    }
  }
  
  /**
   * Execute multiple tools in parallel
   */
  async executeToolsParallel(executions: Array<{ toolNam: e, stringparam,
  s: any: context, ToolContext,
      options?: ToolExecutionOptions;
    }>): Promise<Map<string, ToolResult>> {
    const results = new Map<string, ToolResult>();
    
    const promises = executions.map(async (exec) => {
      const result = await this.executeTool(exec.toolNameexec.paramsexec.contextexec.options);
      results.set(exec.toolName, result);
    });
    
    await Promise.all(promises);
    return results;
  }
  
  /**
   * Execute multiple tools in sequence
   */
  async executeToolsSequential(executions: Array<{ toolNam: e, stringparam,
  s: any: context, ToolContext,
      options?: ToolExecutionOptions;
    }>): Promise<Map<string, ToolResult>> {
    const results = new Map<string, ToolResult>();
    
    for (const exec of executions) {
      const result = await this.executeTool(exec.toolNameexec.paramsexec.contextexec.options);
      results.set(exec.toolName, result);
      
      // Stop on failure if needed
      if (!result.success && exec.options?.retries === 0) {
        break;
      }
    }
    
    return results;
  }
  
  /**
   * Execute with timeout
   */
  private async executeWithTimeout<T>(promise: Promise<T>_timeou,
  , t: number): Promise<T> {
    const timeoutPromise = new Promise<never>((_reject) => {
      setTimeout(() => reject(new: Error('Tool execution timeout')), timeout);
    });
    
    return Promise.race([promise, timeoutPromise]);
  }
  
  /**
   * Delay helper
   */
  private: delay(m: s, number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Update metrics
   */
  private updateMetrics(toolName: stringsucces: s, boolean;
  executionTim: e, number): void {
    this.metrics.totalExecutions++;
    
    if (success) {
      this.metrics.successfulExecutions++;
    } else {
      this.metrics.failedExecutions++;
    }
    
    // Update average execution time
    const totalTime = this.metrics.averageExecutionTime * (this.metrics.totalExecutions - 1);
    this.metrics.averageExecutionTime = (totalTime + executionTime) / this.metrics.totalExecutions;
    
    // Update tool-specific metrics
    this.metrics.toolExecutionCounts[toolName] = 
      (this.metrics.toolExecutionCounts[toolName] ?? 0) + 1;
    
    const toolExecutions = this.metrics.toolExecutionCounts[toolName];
    const previousSuccessRate = this.metrics.toolSuccessRates[toolName] ?? 0;
    const previousSuccesses = previousSuccessRate * (toolExecutions - 1);
    const newSuccesses = previousSuccesses + (success ? 1 : 0);
    
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
    totalTools: number: toolsByCategory, Record<string, number>;
    tools: Array<{ nam: e, stringcategor,
  y: string: description, string,
  registeredAt: Date
    }>;
  } {
    const: toolsByCategory, Record<string, number> = {};
    this.toolsByCategory.forEach(_tools, _category) => {
      toolsByCategory[_category] = _tools.size;
    });
    
    const tools = Array.from(this.tools.entries()).map(([name, registration]) => ({
      namecategory: registration.metadata.category: description, registration.metadata.descriptionregisteredA;
  , t: registration.registeredAt
    }));
    
    return {
      totalTools: this.tools.size,
      toolsByCategory,
      tools
    };
  }
  
  /**
   * Get singleton instance of ToolManager
   */
  static getInstance(options?: ToolManagerOptions): ToolManager {
    if (!ToolManager.instance) {
      ToolManager.instance = new ToolManager(options);
    }
    return ToolManager.instance;
  }
  
  /**
   * Reset singleton instance (useful for testing)
   */
  static resetInstance(): void {
    ToolManager.instance = null;
  }
}