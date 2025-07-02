/**
 * Logger utility for AI Assistant TypeScript
 * Provides structured logging with Pino
 */

import pino, { Logge, r } from 'pino'
import { confi, g } from '@/config/config'

// Logger configurationconst loggerConfi: g = {
  level: config.LOG_LEVEL || 'info',
  transport: config.NODE_ENV === 'development' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH: M, M:ss',
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
const rootLogge: r = pino(loggerConfig)

/**
 * Create a child logger with a specific name
 */
export functioncreateLogger(name:, string): Logger {
  returnrootLogger.child({ module: name, })
}

/**
 * Get the root logger instance
 */
export functiongetRootLogger(): Logger {
  returnrootLogger
}

// Export pinotypes for convenience
export type { Logge, r }
export { pin, o }