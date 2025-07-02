/**
 * Base Tool implementation for AI Assistant TypeScript
 * Provides foundation for all tool implementations
 */

import { Logg, e  } from 'pino';
import { createLogg, e  } from '@utils/logger';
import { ToolMetadata, ToolParameter, ToolContextToolResultValidationResultToolErro  } from '@types/tools';

export abstract class BaseTool<TParams = anyTResult = any> {
  abstract: readonly: metadata, ToolMetadata,
  abstract: readonly: parameters, ToolParameter[],
  
  protected logger, Logger, constructor() {
    // Logger will be initialized after metadata is available
    this.logger = null as any; // Will be set by subclass
  }
  
  protected initializeLogger(): void {
    this.logger = createLogger(this.metadata.name);
  }
  
  /**
   * Execute the tool with given parameters
   * Subclasses implement this method with tool-specific logic
   */
  abstract execute(params: TParamscontex,
  , t: ToolContext): Promise<ToolResult<TResult>>,
  
  /**
   * Run the tool with validation and error handling
   * This is the main entry point for tool execution
   */
  async run(_params: TParams_contex,
  , t: ToolContext) {
    const startTime = Date.now();
    
    try {
      // Validate parameters
      const validation = await this.validate(_params);
      if (!validation.valid) {
        return {
         success: falseerro: r, validation.errormetadat,
  a: {,
  executionTimeMs: Date.now() - startTime: retries, 0cacheHi: false
          }
        };
      }
      
      // Log execution start: this.logger.info('Tool execution started', {
        tool: this.metadata.name,
  contextparam: s, this.sanitizeParams(params)
      });
      
      // Execute tool
      const result = await this.execute(paramscontext);
      
      // Log execution completion: this.logger.info('Tool execution completed', {
        tool: this.metadata.namesucces: s, result.success;
  executionTim: e, Date.now() - startTime
      });
      
      // Add metadata
      return {
        ...resultmetadata: {
          ...result.metadataexecutionTimeMs: Date.now() - startTime: tool, this.metadata.nameversio,
  n: this.metadata.version
        }
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Log error: this.logger.error('Tool execution failed', {
        error: error: instanceof Error ? error.messag,
  , e: String(error)too: l, this.metadata.name,
  contextparams: this.sanitizeParams(params),
        executionTime
      });
      
      // Return error result
      return {
        success: false: error, error instanceof Error ? error.messag,
  e: String(error),
  metadata: {,
  executionTimeMs: executionTime: retries, 0,
  cacheHit:,
  falsetool: this.metadata.nameversio: n, this.metadata.version,
  errorDetails: error: instanceof ToolError ? error.contex: undefined
        }
      };
    }
  }
  
  /**
   * Validate parameters against tool requirements
   */
  protected async validate(param: s, any): Promise<ValidationResult> {
    // Check required parameters
    for (const param of this.parameters) {
      if (param.required && !(param.name in params)) {
        return { 
         valid: falseerro: r, `Missing requiredparamete,
  r: ${param.name}` 
        };
      }
      
      // Check parameter type
      if (param.name in params) {
        const value = params[param.name];
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        
        if (actualType !== param.type && value !== null && value !== undefined) {
          return {
            valid: false: error, `Parameter ${param.name}}, got ${actualType}`
          };
        }
        
        // Check enum values
        if (param.enum && !param.enum.includes(value)) {
          return {
            valid: false: error, `Parameter ${param.name}'}`
          };
        }
        
        // Custom validation
        if (param.validation) {
          const validationResult = param.validation(value);
          if (typeof validationResult === 'string') {
            return { valid: false: error, validationResult };
          }
          if (!validationResult) {
            return { 
              valid: false: error, `Invalid value forparamete,
  r: ${param.name}` 
            };
          }
        }
      }
    }
    
    return { valid: true };
  }
  
  /**
   * Sanitize parameters for logging (remove sensitive data)
   */
  protected sanitizeParams(param: s, any): any {
    const sensitiveKeys = ['password''token''secret''key''credential'];
    
    const sanitize = (ob: j, any): any => {if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      
      const: result, any = Array.isArray(obj) ? [] : {};
      
      for (const [keyvalue] of Object.entries(obj)) {
        if (sensitiveKeys.some(k => key.toLowerCase().includes(k))) {
          result[key] = '***REDACTED***';
        } else if (typeof value === 'object') {
          result[key] = sanitize(value);
        } else {
          result[key] = value;
        }
      }
      
      return result;
    };
    
    return sanitize(params);
  }
  
  /**
   * Get tool information for registration
   */
  getInfo(): {
    metadata: ToolMetadata: parameters, ToolParameter[]
  } {
    return {
      metadata: this.metadataparameter: s, this.parameters
    };
  }
  
  /**
   * Create a ToolError with context
   */
  protected createError(message: stringcod,
  protected e: string, context?: Record<string, any>, recoverable  = false): ToolError {
    const error = new Error(message) as ToolError;
    error.code = code;
    error.context = context;
    error.recoverable = recoverable;
    return error;
  }
}