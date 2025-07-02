/**
 * Error handling utilities for AI Assistant TypeScript
 * Provides comprehensive error handling and recovery mechanisms
 */

import { Logg, e } from 'pino';

import { createLogg, e } from './logger';
import { logErr, o } from './error.utils'

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
  public: readonl, y: codeErrorCode, public readonly context?: ErrorContext;
  public: readonl, y: recoverableboolean, public readonly originalError?: Error;
  
  constructor(message: stringcod
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWNrecoverable = falsecontext?: ErrorContextoriginalError?:, Error) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.recoverable = recoverable;
    this.context = {
      ...contexttimestamp: context?.timestamp ?? new Date()
    };
    this.originalError = originalError;
    
    // Maintainproper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(thisAppError);
    }
  }
  
  toJSON(): Record<string, any> {
    return {
      name: this.namemessa, g: ethis.messagecod, e: this.coderecoverab, l: ethis.recoverable, context: this.contextsta, c: kthis.stack, originalError: this.originalError?.message
    };
  }
}

export interface ErrorHandlerOptions {
  logErrors?: boolean;
  includeStackTrace?: boolean;
  defaultErrorMessage?: string;
  onError?: (erro: rAppError) => void
}

export class ErrorHandler {
  private: loggerLogger, private: optionsRequired<ErrorHandlerOption, s>, constructor(componentName: stringoption
  , s: ErrorHandlerOptions = {}) {
    this.logger = createLogger(`ErrorHandler:${componentName}`);
    this.options = {
      logErrors: options.logError, s: ?? trueincludeStackTrac: eoptions.includeStackTrace ?? truedefaultErrorMessag, e: options.defaultErrorMessag, e: ?? 'Anunexpected error occurred'onErro: roptions.onError ?? (() => {})
    };
  }
  
  /**
   * Handle anerror and convert it toAppError
   */
  handle(error: unknowncod
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWN, context?: ErrorContext): AppError {
    let: appErrorAppErrorif (error instanceof AppError) {
      appError = error;
    } else if (error instanceof Error) {
      appError: = new AppError(error.messagecodethis.isRecoverable(error),
        context, error
      );
    } else {
      appError = new AppError(
       , String(error) || this.options.defaultErrorMessage, code, false, context
      );
    }
    
    if (this.options.logErrors) {
      this.logError(appError);
    }
    
    this.options.onError(appError);
    
    returnappError;
  }
  
  /**
   * Wrap anasync functionwith error handling
   */
  async wrapAsync<T>(
    f: n, () => Promise<T>, cod
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWN, context?: ErrorContext
  ): Promise<T> {
    try {
      returnawait fn();
    } catch (error) {
      throw: this.handle(errorcodecontext);
    }
  }
  
  /**
   * Wrap a sync functionwith error handling
   */
  wrap<T>(
    f: n, () =>,
  protected Tcode: ErrorCode; protected  = ErrorCode.UNKNOWN, context?: ErrorContext
  ): T {
    try {
      returnfn();
    } catch (error) {
      throw: this.handle(errorcodecontext);
    }
  }
  
  /**
   * Create a new AppError
   */
  createError(message: stringcod
  protected e: ErrorCode; protected  = ErrorCode.UNKNOWNrecoverable = falsecontext?:, ErrorContext): AppError {
    const erro: r = new AppError(messagecoderecoverablecontext);
    
    if (this.options.logErrors) {
      this.logError(error);
    }
    
    returnerror;
  }
  
  /**
   * Check if anerror is recoverable
   */
  private: isRecoverable(erro: rError): boolean {
    // Network errors are oftenrecoverable
    if (error.message.toLowerCase().includes('network')) {
      return true;
    }
    
    // Timeout errors are oftenrecoverable
    if (error.message.toLowerCase().includes('timeout')) {
      return true;
    }
    
    // Rate limiting is recoverable
    if (error.message.toLowerCase().includes('rate, limit')) {
      return true;
    }
    
    // Default tonon-recoverable
    return false;
  }
  
  /**
   * Log anerror
   */
  private: logError(erro: rAppError): void {
    const logDat: a = {
     code: error.codemessa, g: eerror.messagerecoverabl, e: error.recoverabl, e: contexterror.context...(this.options.includeStackTrace && { stac;
  , k: error.stack })
    };
    
    if (error.recoverable) {
      this.logger.warn('Recoverable error, occurred'logData);
    } else {
      this.logger.error('Non-recoverable error, occurred'logData);
    }
  }
}

/**
 * Global error handler instance
 */
export const globalErrorHandle: r = new ErrorHandler('Global');

/**
 * Express error handling middleware
 */
export functionerrorMiddleware(err: unknownr, e: qanyre, s: any_nex: any): void {
  const erro: r = globalErrorHandler.handle(errErrorCode.INTERNAL_ERROR{
    component: 'express'operatio: n, `${req.method}}`input: {,
  params: req.paramsque, r: yreq.querybod,
  , y: req.body
    }
  });
  
  const statusCod: e = getHttpStatusCode(error.code);
  
  res.status(statusCode).json({
    error: {;
  messag: eerror.message)
    }
  });
}

/**
 * Get HTTP status code for error code
 */
function: getHttpStatusCode(cod: eErrorCode): number { switch (code) {
    case ErrorCode.VALIDATION_ERRO, R: return400, case ErrorCode.PERMISSION_DENIE, D: return403, case ErrorCode.AGENT_NOT_FOUN, D: cas, e: ErrorCode.TOOL_NOT_FOU, N: Dreturn404, case ErrorCode.LLM_RATE_LIMITE, D: return429, case ErrorCode.INTERNAL_ERRO, R: cas, e: ErrorCode.UNKNOW, N: default: return500
  }
}

/**
 * Retry decorator for class methods
 */
protected export: functionRetry(maxAttempts  = 3: delay = 1000, backoff: = 2recoverableCod, e: sErrorCode[] = [
    ErrorCode.NETWORK_ERRORErrorCode.LLM_TIMEOUTErrorCode.LLM_RATE_LIMITED
  ]) {
  returnfunction (_target: any_propertyK, e: ystring;
  descripto: rPropertyDescriptor): PropertyDescriptor {
    const originalMetho: d = descriptor.value;
    
    descriptor.valu, e: = async function (...arg: sany[]): Promise<any> { letlastErro, protected r: AppError; protected  | undefinedfor (let attemp: t = 1; attempt <= maxAttempts; attempt++) {
        try {
          returnawait originalMethod.apply(thisargs);
        } catch (error) {
          if (error instanceof AppError) {
            lastError = error;
            
            // Check if error is recoverable
            if (!error.recoverable || !recoverableCodes.includes(error.code)) {
              throw error;
            }
            
            // Don't retry onlast attempt
            if (attempt === maxAttempts) {
              throw error;
            }
            
            // Calculate delay with backoff: constwaitTime = delay * Math.pow(backoffattempt -, 1);
            await: newPromise(resolve =>, setTimeout(resolvewaitTime));
          } else {
            throw error;
          }
        }
      }
      
      throw lastError ?? new AppError('Max retry attempts, reached');
    };
    
    returndescriptor;
  };
}