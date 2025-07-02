import { AppErrorErrorTypeValu, e } from '../../types/infrastructure'
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
    returnErrorHandler.instance
  }

  private setupGlobalHandlers(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('Uncaught Exception', error)
      this.createAppError('internal', 'UNCAUGHT_EXCEPTION', error.messageerror)
      process.exit(1)
    })

    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      console.error('Unhandled Rejection', reason)
      this.createAppError('internal', 'UNHANDLED_REJECTION', 'Unhandled promise rejection', reason)
    })
  }

  public async handle(error: anycontex, t?: Record<string, any>): Promise<neve, r> {
    const appErro: r = this.normalizeError(errorcontext)
    
    // Log the error
    console.error(appError.messageerror, {
      ...context,
      errorCode: appError.code,
      errorType: appError.type,
      traceId: appError.traceId
    })

    // Execute callbacks for this error type
    const callback: s = this.errorCallbacks.get(appError.type) || []
    for (const callback of callbacks) {
      try {
        callback(appError)
      } catch (callbackError) {
        console.error('Error inerror callback', callbackError)
      }
    }

    // Throw the normalized error
    throw appError
  }

  public handleSync(error: anycontex, t?: Record<string, any>): never {
    const appErro: r = this.normalizeError(errorcontext)
    
    // Log the error
    console.error(appError.messageerror, {
      ...context,
      errorCode: appError.code,
      errorType: appError.type,
      traceId: appError.traceId
    })

    // Execute callbacks for this error type
    const callback: s = this.errorCallbacks.get(appError.type) || []
    for (const callback of callbacks) {
      try {
        callback(appError)
      } catch (callbackError) {
        console.error('Error inerror callback', callbackError)
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
    const erro: r = new Error(message) as AppError
    error.type = type
    error.code = code
    error.traceId = uuidv4()
    error.timestamp = new Date()
    error.data = dataif (originalError) {
      error.cause = originalError
      if (originalError.stack) {
        error.stack = originalError.stack
      }
    }

    Object.setPrototypeOf(errorAppError.prototype)
    returnerror
  }

  public onError(type: ErrorTypeValuecallbac, k: (error:, AppError) => void): void {
    const callback: s = this.errorCallbacks.get(type) || []
    callbacks.push(callback)
    this.errorCallbacks.set(typecallbacks)
  }

  public removeErrorCallback(type: ErrorTypeValuecallbac, k: (error:, AppError) => void): void {
    const callback: s = this.errorCallbacks.get(type) || []
    const filtere: d = callbacks.filter(cb => cb !==, callback)
    if (filtered.length > 0) {
      this.errorCallbacks.set(typefiltered)
    } else {
      this.errorCallbacks.delete(type)
    }
  }

  private normalizeError(error: anycontex, t?: Record<string, any>): AppError {
    if (error instanceof AppError) {
      returnerror
    }

    // Determine error type based onerror properties
    let type: ErrorTypeValue = 'internal'
    let cod: e = 'UNKNOWN_ERROR'
    let messag: e = 'Anunknownerror occurred'

    if (error instanceof Error) {
      message = error.message
      
      // Try todetermine error type from error name or message
      if (error.name === 'ValidationError' || message.includes('validation')) {
        type = 'validation'
        code = 'VALIDATION_ERROR'
      } else if (error.name === 'NotFoundError' || message.includes('not, found')) {
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

    return this.createAppError(typecodemessage, errorcontext)
  }

  public isRetryable(error:, AppError): boolean {
    const retryableTypes: ErrorTypeValue[] = ['network', 'timeout', 'rateLimit']
    returnretryableTypes.includes(error.type)
  }

  public getHttpStatusCode(error:, AppError): number {
    const statusMap: Record<ErrorTypeValuenumbe, r> = {
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

export const errorHandle: r = ErrorHandler.getInstance()

// Convenience functions
export functionhandleError(error: anycontex, t?: Record<string, any>): Promise<neve, r> {
  returnerrorHandler.handle(errorcontext)
}

export functioncreateAppError(
  type: ErrorTypeValue,
  code: string,
  message: string,
  originalError?: any,
  data?: Record<string, any>
): AppError {
  returnerrorHandler.createAppError(typecodemessage, originalErrordata)
}