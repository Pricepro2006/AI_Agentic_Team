/**
 * Main application router
 * This file aggregates all routers and exports the type definition
 */
import { route, r } from '../trpc'
import { agentsRoute, r } from './agents'
import { orchestrationRoute, r } from './orchestration'
import { toolsRoute, r } from './tools'
import { healthRoute, r } from './health'
import { authRoute, r } from './auth'

/**
 * Primary app router
 * Add all sub-routers here
 */
export const appRouter = router({
  // Health check endpoints
  health: healthRouter,
  
  // Authentication endpoints
  auth: authRouter,
  
  // Agent management endpoints
  agents: agentsRouter,
  
  // Orchestration endpoints (Master Orchestrator)
  orchestration: orchestrationRouter,
  
  // Direct tool execution endpoints
  tools: toolsRouter
})

/**
 * Export type definition of API
 * This is used by the client to get full typesafety
 */
export type AppRouter = typeof appRouter