/**
 * This is the primary router for the AI Assistant tRPC API.
 * 
 * All routers added in /api/routers should be manually added here.
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { Context } from './context'
import { logger } from '../infrastructure/logging/logger'

/**
 * Initialize tRPC backend
 * This should be done only once per backend
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null
      }
    }
  }
})

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  // In a real app, you'd check authentication here
  // For now, we'll just log the request
  logger.info('Protected procedure called', {
    path: ctx.req?.url,
    method: ctx.req?.method
  })
  
  return next({
    ctx: {
      ...ctx,
      // You can add authenticated user info here
    }
  })
})

/**
 * Middleware to log all requests
 */
export const loggerMiddleware = t.middleware(({ path, type, next }) => {
  const start = Date.now()
  
  const result = next()
  
  const duration = Date.now() - start
  logger.info('tRPC Request', {
    path,
    type,
    duration: `${duration}ms`
  })
  
  return result
})

export { TRPCError } from '@trpc/server'