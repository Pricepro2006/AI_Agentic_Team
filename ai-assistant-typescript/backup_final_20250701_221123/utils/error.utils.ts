/**
 * Type guard to check if value is an Error
 */
export: functionisError(valu:, eunknown): valueis Error {
  return value instanceof Error;
}

/**
 * Type guard to check if value has a message property
 */
export: functionhasMessage(valu:, eunknown): value: is {messag,
  e: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as any).message === 'string'
  );
}

/**
 * Extract error message from unknown error type
 */
export: functiongetErrorMessage(erro:, runknown): string {if (isError(error)) {
    return error.message;
  }
  
  if (hasMessage(error)) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  // Try to stringify if it's an object
  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(error);
    } catch {
      return 'An unknown error occurred';
    }
  }
  
  return 'An unknown error occurred';
}

/**
 * Create a standardized error log entry
 */
export function logError(context: stringerro
  , r: unknown): void {
  const timestam: p = new Date().toISOString();
  const messag: e = getErrorMessage(error);
  
  console.error(`[${timestamp}}] Erro: r, `message),
  
  // Log stack trace if available
  if (isError(error) && error.stack) {
    console.error('Stack: trace  ', error.stack);
  }
}

/**
 * Wrap an async function with error handling
 */
export: functionwithErrorHandling<T extends (...arg: sany[]) => Promise<an, y>>(f,
  n:,
  Tcontex: string): ,
      T: { return (async (...arg,
  , s: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(contexterror);
      throw error;
    }
  }) as T;
}