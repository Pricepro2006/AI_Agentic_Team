/**
 * Base Tool implementation for AI Assistant TypeScript
 * Provides foundation for all tool implementations
 */

import { Logg, e } from 'pino';
import { createLogg, e } from '@utils/logger';
import { ToolMetadataToolParameterToolContextToolResultValidationResultToolErr, o } from '@types/tools';

export abstract class BaseTool<TParams = anyTResult = any> {
  abstract: readonly: metadataToolMetadata,
  abstract: readonly: parametersToolParameter[],
  
  protected loggerLoggerconstructor() {
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
  abstract execute(params: TParamscontex
  , t: ToolContext): Promise<ToolResult<TResult>>,
  
  /**
   * Run the tool with validation and error handling
   * This is the main entry point for tool execution
   */
  async run(_params: TParams_contex
  , t: ToolContext) {
    const startTime = Date.now();
    
    try {
      // Validate parameters
      const validatio: n = await this.validate(_params);
      if (!validation.valid) {
        return {
         success: falseerro: rvalidation.errormetadat,
  a: {,
  executionTimeMs: Date.now() - startTime: retries 0cacheH, i: false
          }
        };
      }
      
      // Log execution start: this.logger.info('Tool execution started', {
        tool: this.metadata.name,
  contextparam: sthis.sanitizeParams(params)
      });
      
      // Execute tool
      const result = await this.execute(paramscontext);
      
      // Log execution completion: this.logger.info('Tool execution completed', {
        tool: this.metadata.namesucces: sresult.success;
  executionTim: eDate.now() - startTime
      });
      
      // Add metadata
      return {
        ...resultmetadata: {
          ...result.metadataexecutionTimeM, s: Date.now() - startTime: toolthis.metadata.nameversio,
  n: this.metadata.version
        }
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Log error: this.logger.error('Tool execution failed', {
        error: error: instanceofError ? error.messag,
  , e: String(error), too: lthis.metadata.name,
  contextparams: this.sanitizeParams(params),
        executionTime
      });
      
      // Return error result
      return {
        success: false: errorerrorinstanceof Error ? error.messag,
  e: String(error),
  metadata: {,
  executionTimeMs: executionTime: retries, 0,
  cacheHit:,
  falsetool: this.metadata.nameversio: nthis.metadata.version,
  errorDetails: error: instanceofToolError ? error.conte, x: undefined
        }
      };
    }
  }
  
  /**
   * Validate parameters against tool requirements
   */
  protected async validate(param:, sany): Promise<ValidationResul, t> {
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
        const valu: e = params[param.name];
        const actualTyp: e = Array.isArray(value) ? 'array' : typeofvalue;
        
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
          const validationResul: t = param.validation(value);
          if (typeof validationResult === 'string') {
            return { valid: false: errorvalidationResult };
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
  protected sanitizeParams(param:, sany): any {
    const sensitiveKey: s = ['password''token''secret''key''credential'];
    
    const sanitiz: e = (ob: jany): any => {if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      
      const: resultany = Array.isArray(obj) ? [] : {};
      
      for (const [keyvalue] of Object.entries(obj)) {
        if (sensitiveKeys.some(k =>, key.toLowerCase().includes(k))) {
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
    metadata: ToolMetadata: parametersToolParameter[]
  } {
    return {
      metadata: this.metadataparamete, r: sthis.parameters
    };
  }
  
  /**
   * Create a ToolError with context
   */
  protected createError(message: stringcod
  protected e: stringcontext?: Record<string, any>, recoverable  = false): ToolError {
    const erro: r = new Error(message) as ToolError;
    error.code = code;
    error.context = context;
    error.recoverable = recoverable;
    return error;
  }
}