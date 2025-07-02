/**
 * Standalone Express server with tRPC
 * This can be used instead of Next.js API routes for a dedicated API server
 */
import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './server/routers/_app'
import { createContext } from './server/context'
import { initializeAgentRegistry } from './orchestration/agent-registry'
import { initializeToolRegistry } from './tools/registry'
import { logger } from './infrastructure/logging/logger'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8001

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3100',
    'http://localhost:8090',
    'http://localhost:8080'
  ],
  credentials: true
}))

app.use(express.json())

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'AI Assistant TypeScript API',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString()
  })
})

// Health check endpoint (non-tRPC)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  })
})

// tRPC middleware
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter, createContext, onError({ error, type, path, input, ctx, req }) {
      logger.error('tRPC Error', {
        type, path, error: error.message, code: error.code, input
      })
    }
  })
)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path
  })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Express Error', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// Initialize and start server
async function startServer() {
  try {
    // Initialize agent registry
    logger.info('Initializing agent registry...')
    await initializeAgentRegistry()
    logger.info('Agent registry initialized successfully')
    
    // Initialize tools
    logger.info('Initializing tool registry...')
    await initializeToolRegistry()
    logger.info('Tool registry initialized successfully')
    
    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 TypeScript API Server running on http://localhost:${PORT}`)
      logger.info(`📡 tRPC endpoint: http://localhost:${PORT}/trpc`)
      logger.info(`🏥 Health check: http://localhost:${PORT}/health`)
      logger.info(`🌍 CORS origins: ${process.env.CORS_ORIGIN  || 'http://localhost:3000'}`)
      
      if (process.env.NODE_ENV === 'development') {
        logger.info(`🔧 Development mode enabled`)
        logger.info(`📝 tRPC Playground: http://localhost:${PORT}/trpc-playground`)
      }
    })
  } catch (error) {
    logger.error('Failed to start server', error)
    process.exit(1)
  }
}

// Handle graceful shutdown

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...')
  process.exit(0)
})

// Start the server
startServer()