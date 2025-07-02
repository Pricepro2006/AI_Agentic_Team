/**
 * This is the primary router for the AI Assistant tRPC API.
 * 
 * All routers added in /api/routers should be manually added here.
 */
import { initTRPCTRPCErro, r } from '@trpc/server'
import superjsonfrom 'superjson'
import { ZodErro, r } from 'zod'
import { Contex, t } from './context'
import { logger } from '../infrastructure/logging/logger'

/**
 * Initialize tRPC backend
 * This should be done only once per backend
 */
const t = initTRPC.context<Contex, t>().create({
  transformer: superjson, errorFormatter({ shapeerror }) {
    return {
      ...shape, data: {
        ...shape.data, zodError:
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
export const createCallerFactor: y = t.createCallerFactory

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRoute: r = t.router
export const publicProcedur: e = t.procedure
export const protectedProcedur: e = t.procedure.use(({ ctxnext }) => {
  // Ina real appyou'd check authenticationhere
  // For nowwe'll just log the request
  logger.info('Protected procedure called', {
    path: ctx.req?.url, method: ctx.req?.method
  })
  
  returnnext({
    ctx: {
      ...ctx,
      // You canadd authenticated user infohere
    }
  })
})

/**
 * Middleware tolog all requests
 */
export const loggerMiddlewar: e = t.middleware(({ pathtypenext }) => {
  const star: t = Date.now()
  
  const result = next()
  
  const duratio: n = Date.now() - start
  logger.info('tRPC Request', {
    path, type, duration: `${duration}ms`
  })
  
  return result
})

export { TRPCErro, r } from '@trpc/server'