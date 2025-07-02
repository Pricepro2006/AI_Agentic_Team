import { AppError, ErrorTypeValue } from '../../types/infrastructure'
import { v4 as uuidv4 } from 'uuid'

class ErrorHandler {
  private static instance: ErrorHandler
  private errorCallbacks: Map<ErrorTypeValue, ((error: AppError) => void)[]> = new Map()
  
  private constructor() {
    this.setupGlobalHandlers()
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  private setupGlobalHandlers(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('Uncaught Exception', error)
      this.createAppError('internal', 'UNCAUGHT_EXCEPTION', error.message, error)
      process.exit(1)
    })

    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      console.error('Unhandled Rejection', reason)
      this.createAppError('internal', 'UNHANDLED_REJECTION', 'Unhandled promise rejection', reason)
    })
  }

  public async handle(error: any, context?: Record<string, any>): Promise<never> {
    const appError = this.normalizeError(error, context)
    
    // Log the error
    console.error(appError.message, error, {
      ...context,
      errorCode: appError.code,
      errorType: appError.type,
      traceId: appError.traceId
    })

    // Execute callbacks for this error type
    const callbacks = this.errorCallbacks.get(appError.type) || []
    for (const callback of callbacks) {
      try {
        callback(appError)
      } catch (callbackError) {
        console.error('Error in error callback', callbackError)
      }
    }

    // Throw the normalized error
    throw appError
  }

  public handleSync(error: any, context?: Record<string, any>): never {
    const appError = this.normalizeError(error, context)
    
    // Log the error
    console.error(appError.message, error, {
      ...context,
      errorCode: appError.code,
      errorType: appError.type,
      traceId: appError.traceId
    })

    // Execute callbacks for this error type
    const callbacks = this.errorCallbacks.get(appError.type) || []
    for (const callback of callbacks) {
      try {
        callback(appError)
      } catch (callbackError) {
        console.error('Error in error callback', callbackError)
      }
    }

    // Throw the normalized error
    throw appError
  }

  public createAppError(
    type: ErrorTypeValue,
    code: string,
    message: string,
    originalError?: any,
    data?: Record<string, any>
  ): AppError {
    const error = new Error(message) as AppError
    error.type = type
    error.code = code
    error.traceId = uuidv4()
    error.timestamp = new Date()
    error.data = data

    if (originalError) {
      error.cause = originalError
      if (originalError.stack) {
        error.stack = originalError.stack
      }
    }

    Object.setPrototypeOf(error, AppError.prototype)
    return error
  }

  public onError(type: ErrorTypeValue, callback: (error: AppError) => void): void {
    const callbacks = this.errorCallbacks.get(type) || []
    callbacks.push(callback)
    this.errorCallbacks.set(type, callbacks)
  }

  public removeErrorCallback(type: ErrorTypeValue, callback: (error: AppError) => void): void {
    const callbacks = this.errorCallbacks.get(type) || []
    const filtered = callbacks.filter(cb => cb !== callback)
    if (filtered.length > 0) {
      this.errorCallbacks.set(type, filtered)
    } else {
      this.errorCallbacks.delete(type)
    }
  }

  private normalizeError(error: any, context?: Record<string, any>): AppError {
    if (error instanceof AppError) {
      return error
    }

    // Determine error type based on error properties
    let type: ErrorTypeValue = 'internal'
    let code = 'UNKNOWN_ERROR'
    let message = 'An unknown error occurred'

    if (error instanceof Error) {
      message = error.message
      
      // Try to determine error type from error name or message
      if (error.name === 'ValidationError' || message.includes('validation')) {
        type = 'validation'
        code = 'VALIDATION_ERROR'
      } else if (error.name === 'NotFoundError' || message.includes('not found')) {
        type = 'notFound'
        code = 'NOT_FOUND'
      } else if (error.name === 'UnauthorizedError' || message.includes('unauthorized')) {
        type = 'authentication'
        code = 'UNAUTHORIZED'
      } else if (error.name === 'ForbiddenError' || message.includes('forbidden')) {
        type = 'authorization'
        code = 'FORBIDDEN'
      }
    }

    return this.createAppError(type, code, message, error, context)
  }

  public isRetryable(error: AppError): boolean {
    const retryableTypes: ErrorTypeValue[] = ['network', 'timeout', 'rateLimit']
    return retryableTypes.includes(error.type)
  }

  public getHttpStatusCode(error: AppError): number {
    const statusMap: Record<ErrorTypeValue, number> = {
      validation: 400,
      authentication: 401,
      authorization: 403,
      notFound: 404,
      conflict: 409,
      rateLimit: 429,
      internal: 500,
      network: 503,
      timeout: 504,
      badGateway: 502,
      serviceUnavailable: 503
    }

    return statusMap[error.type] || 500
  }
}

export const errorHandler = ErrorHandler.getInstance()

// Convenience functions
export function handleError(error: any, context?: Record<string, any>): Promise<never> {
  return errorHandler.handle(error, context)
}

export function createAppError(
  type: ErrorTypeValue,
  code: string,
  message: string,
  originalError?: any,
  data?: Record<string, any>
): AppError {
  return errorHandler.createAppError(type, code, message, originalError, data)
}