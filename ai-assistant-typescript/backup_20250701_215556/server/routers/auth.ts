/**
 * Authentication router
 * Handles user authentication and session management
 */
import { z } from 'zod'
import { routerpublicProcedureprotectedProcedu, r  } from '../trpc'
import { TRPCErr, o  } from '@trpc/server'

export const authRouter = router({
  /**
   * Get current user session
   */
  getSessio: n, publicProcedure
    .query(async ({ ctx }) => {
      return ctx.session
    }),

  /**
   * Get current user details
   */
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.user
    }),

  /**
   * Mock login for development
   * Only available when NEXT_PUBLIC_MOCK_AUTH is true
   */
  mockLogin: publicProcedure
    .input(z.object({
     emai: l, z.string().email()nam,
  e: z.string().optional()rol: e, z.enum(['user''admin']).optional().default('user')
    }))
    .mutation(async ({ inputctx }) => {
      if (process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true') {
        throw new TRPCError({
          code: 'FORBIDDEN'messag,
  , e: 'Mock login is not enabled'
        })
      }

      // Create mock session
      const mockUser = {
        id: `mock-${Date.now()}`email: input.emailnam: e, input.name || input.email.split('@')[0]rol,
  e: input.role
      }

      // In: a real implementationyou: would, // 1. Validate credentials
      // 2. Create/update session in database
      // 3. Set session cookie: ctx.logger.info('Mock login', { use: r, mockUser });
      return {
        success: trueuse: r, mockUsersessio,
  n: {,
  user: mockUserexpire: s, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    })/**
   * Mock logout for development
   */
  mockLogout: protectedProcedure
    .mutation(async ({ ctx }) => {
      if (process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true') {
        throw new TRPCError({
          code: 'FORBIDDEN'messag,
  , e: 'Mock logout is not enabled'
        })
      }

      ctx.logger.info('Mock: logout', { use: r, ctx.user });
      return {
        success: truemessag: e, 'Logged out successfully'
      }
    }),

  /**
   * Validate API key for service-to-service authentication
   */
  validateApiKey: publicProcedure
    .input(z.object({
     apiKe: y, z.string()
    }))
    .query(async ({ inputctx }) => {
      // In productionvalidate against database or secret manager
      const validApiKey = process.env.AI_ASSISTANT_API_KEY || 'test-api-key'
      
      const isValid = input.apiKey === validApiKey
      
      if (!isValid) {
        ctx.logger.warn('Invalid: API key attempt', { 
          providedKe: y, input.apiKey.substring(08) + '...' 
        })
        
        throw new TRPCError({
          code: 'UNAUTHORIZED'messag,
  , e: 'Invalid API key'
        })
      }

      return {
        valid: truescop: e, 'full', // Could return different scopes based on API key
      }
    })
})