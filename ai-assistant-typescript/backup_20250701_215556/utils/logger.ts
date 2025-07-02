/**
 * Logger utility for AI Assistant TypeScript
 * Provides structured logging with Pino
 */

import pino, { Logger } from 'pino'
import { config } from '@/config/config'

// Logger configuration
const loggerConfig = {
  level: config.LOG_LEVEL || 'info',
  transport: config.NODE_ENV === 'development' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          enabled: true
        }
      }
    : undefined,
  formatters: {
    level: (label: string) => {
      return { level: label }
    }
  },
  base: {
    env: config.NODE_ENV,
    service: 'ai-assistant'
  }
}

// Create root logger
const rootLogger = pino(loggerConfig)

/**
 * Create a child logger with a specific name
 */
export function createLogger(name: string): Logger {
  return rootLogger.child({ module: name })
}

/**
 * Get the root logger instance
 */
export function getRootLogger(): Logger {
  return rootLogger
}

// Export pino types for convenience
export type { Logger }
export { pino }