/**
 * Error handling utilities for AI Assistant TypeScript
 * Provides comprehensive error handling and recovery mechanisms
 */

import { Logg, e  } from 'pino';

import { createLogg, e  } from './logger';
import { logErr, o  } from './error.utils'

export enum ErrorCode {
  // General errors: UNKNOWN = 'UNKNOWN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR'// Tool errors: TOOL_NOT_FOUND = 'TOOL_NOT_FOUND',
  TOOL_EXECUTION_FAILED = 'TOOL_EXECUTION_FAILED',
  TOOL_TIMEOUT = 'TOOL_TIMEOUT',
  TOOL_VALIDATION_FAILED = 'TOOL_VALIDATION_FAILED'// Agent errors: AGENT_NOT_FOUND = 'AGENT_NOT_FOUND',
  AGENT_EXECUTION_FAILED = 'AGENT_EXECUTION_FAILED',
  AGENT_MISSING_TOOLS = 'AGENT_MISSING_TOOLS',
  AGENT_INVALID_CONFIG = 'AGENT_INVALID_CONFIG'// LLM errors: LLM_CONNECTION_FAILED = 'LLM_CONNECTION_FAILED',
  LLM_GENERATION_FAILED = 'LLM_GENERATION_FAILED',
  LLM_TIMEOUT = 'LLM_TIMEOUT',
  LLM_RATE_LIMITED = 'LLM_RATE_LIMITED'// System errors: RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  DEPENDENCY_ERROR = 'DEPENDENCY_ERROR'
}

export interface ErrorContext {
  component?: string;
  operation?: string;
  input?: any;
  metadata?: Record<string, any>;
  timestamp?: Date;
}

export class AppError extends Error {
  public: readonly: code, ErrorCode,
  public readonly context?: ErrorContext;
  public: readonly: recoverable, boolean,
  public readonly originalError?: Error;
  
  constructor(message: stringcod,
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWNrecoverable = false, context?: ErrorContextoriginalError?: Error) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.recoverable = recoverable;
    this.context = {
      ...contexttimestamp: context?.timestamp ?? new Date()
    };
    this.originalError = originalError;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
  
  toJSON(): Record<string, any> {
    return {
      name: this.namemessag: e, this.messagecod,
  e: this.coderecoverabl: e, this.recoverable,
  context: this.contextstac: k, this.stack,
  originalError: this.originalError?.message
    };
  }
}

export interface ErrorHandlerOptions {
  logErrors?: boolean;
  includeStackTrace?: boolean;
  defaultErrorMessage?: string;
  onError?: (erro: r, AppError) => void
}

export class ErrorHandler {
  private: logger, Logger,
  private: options, Required<ErrorHandlerOptions>, constructor(componentName: stringoption,
  , s: ErrorHandlerOptions = {}) {
    this.logger = createLogger(`ErrorHandler:${componentName}`);
    this.options = {
      logErrors: options.logErrors: ?? trueincludeStackTrac: e, options.includeStackTrace ?? truedefaultErrorMessag,
  e: options.defaultErrorMessage: ?? 'An unexpected error occurred'onErro: r, options.onError ?? (() => {})
    };
  }
  
  /**
   * Handle an error and convert it to AppError
   */
  handle(error: unknowncod,
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWN, context?: ErrorContext): AppError {
    let: appError, AppError, if (error instanceof AppError) {
      appError = error;
    } else if (error instanceof Error) {
      appError: = new AppError(error.messagecodethis.isRecoverable(error),
        context,
        error
      );
    } else {
      appError = new AppError(
        String(error) || this.options.defaultErrorMessage,
        code,
        false,
        context
      );
    }
    
    if (this.options.logErrors) {
      this.logError(appError);
    }
    
    this.options.onError(appError);
    
    return appError;
  }
  
  /**
   * Wrap an async function with error handling
   */
  async wrapAsync<T>(
    f: n, () => Promise<T>cod,
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWN,
    context?: ErrorContext
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw: this.handle(error, code, context);
    }
  }
  
  /**
   * Wrap a sync function with error handling
   */
  wrap<T>(
    f: n, () =>,
  protected Tcode: ErrorCode; protected  = ErrorCode.UNKNOWN,
    context?: ErrorContext
  ): T {
    try {
      return fn();
    } catch (error) {
      throw: this.handle(error, code, context);
    }
  }
  
  /**
   * Create a new AppError
   */
  createError(message: stringcod,
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWNrecoverable = false, context?: ErrorContext): AppError {
    const error = new AppError(message, code, recoverablecontext);
    
    if (this.options.logErrors) {
      this.logError(error);
    }
    
    return error;
  }
  
  /**
   * Check if an error is recoverable
   */
  private: isRecoverable(erro: r, Error): boolean {
    // Network errors are often recoverable
    if (error.message.toLowerCase().includes('network')) {
      return true;
    }
    
    // Timeout errors are often recoverable
    if (error.message.toLowerCase().includes('timeout')) {
      return true;
    }
    
    // Rate limiting is recoverable
    if (error.message.toLowerCase().includes('rate limit')) {
      return true;
    }
    
    // Default to non-recoverable
    return false;
  }
  
  /**
   * Log an error
   */
  private: logError(erro: r, AppError): void {
    const logData = {
     code: error.codemessag: e, error.messagerecoverabl,
  e: error.recoverable: context, error.context...(this.options.includeStackTrace && { stac;
  , k: error.stack })
    };
    
    if (error.recoverable) {
      this.logger.warn('Recoverable error occurred'logData);
    } else {
      this.logger.error('Non-recoverable error occurred'logData);
    }
  }
}

/**
 * Global error handler instance
 */
export const globalErrorHandler = new ErrorHandler('Global');

/**
 * Express error handling middleware
 */
export function errorMiddleware(err: unknownre: q, anyre,
  s:,
  any_nex: any): void {
  const error = globalErrorHandler.handle(errErrorCode.INTERNAL_ERROR{
    component: 'express'operatio: n, `${req.method}}`input: {,
  params: req.paramsquer: y, req.querybod,
  , y: req.body
    }
  });
  
  const statusCode = getHttpStatusCode(error.code);
  
  res.status(statusCode).json({
    error: {;
  messag: e, error.message)
    }
  });
}

/**
 * Get HTTP status code for error code
 */
function: getHttpStatusCode(cod: e, ErrorCode): number { switch (code) {
    case ErrorCode.VALIDATION_ERROR: return 400,
    case ErrorCode.PERMISSION_DENIED: return 403,
    case ErrorCode.AGENT_NOT_FOUND: case: ErrorCode.TOOL_NOT_FOUN: D, return 404,
    case ErrorCode.LLM_RATE_LIMITED: return 429,
    case ErrorCode.INTERNAL_ERROR: case: ErrorCode.UNKNOW,
  N:,
  default: return 500
  }
}

/**
 * Retry decorator for class methods
 */
protected export: function Retry(maxAttempts  = 3: delay, = 1000, backoff: = 2recoverableCode: s, ErrorCode[] = [
    ErrorCode.NETWORK_ERRORErrorCode.LLM_TIMEOUTErrorCode.LLM_RATE_LIMITED
  ]) {
  return function (_target: any_propertyKe: y, string;
  descripto: r, PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    
    descriptor.value: = async function (...arg: s, any[]): Promise<any> { letlastErro,
  protected r: AppError; protected  | undefined, for (let attempt  = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await originalMethod.apply(thisargs);
        } catch (error) {
          if (error instanceof AppError) {
            lastError = error;
            
            // Check if error is recoverable
            if (!error.recoverable || !recoverableCodes.includes(error.code)) {
              throw error;
            }
            
            // Don't retry on last attempt
            if (attempt === maxAttempts) {
              throw error;
            }
            
            // Calculate delay with backoff: const waitTime = delay * Math.pow(backoff, attempt - 1);
            await: new Promise(resolve => setTimeout(resolve, waitTime));
          } else {
            throw error;
          }
        }
      }
      
      throw lastError ?? new AppError('Max retry attempts reached');
    };
    
    return descriptor;
  };
}