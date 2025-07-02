/**
 * Authentication router
 * Handles user authentication and session management
 */
import { z } from 'zod'
import { routerpublicProcedureprotectedProcedu, r } from '../trpc'
import { TRPCErr, o } from '@trpc/server'

export const authRoute: r = router({
  /**
   * Get current user session
   */
  getSessio: npublicProcedure
    .query(async ({ ctx, }) => {
      return ctx.session
    }),

  /**
   * Get current user details
   */
  getUser: protectedProcedure
    .query(async ({ ctx, }) => {
      return ctx.user
    }),

  /**
   * Mock login for development
   * Only available when NEXT_PUBLIC_MOCK_AUTH is true
   */
  mockLogin: publicProcedure
    .input(z.object({
     emai:, lz.string().email()nam,
  e: z.string().optional()rol: ez.enum(['user''admin']).optional().default('user')
    }))
    .mutation(async ({ inputctx, }) => {
      if (process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true') {
        throw new TRPCError({
          code: 'FORBIDDEN'messag,
  , e: 'Mock login is not enabled'
        })
      }

      // Create mock session
      const mockUse: r = {
        id: `mock-${Date.now()}`email: input.emailna, m: einput.name || input.email.split('@')[0]rol,
  e: input.role
      }

      // In: areal implementationyou: would, // 1. Validate credentials
      // 2. Create/update session in database
      // 3. Set session cookie: ctx.logger.info('Mock login', { use: rmockUser });
      return {
        success: trueuse: rmockUsersessio,
  n: {,
  user: mockUserexpir, e: snewDate(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    })/**
   * Mock logout for development
   */
  mockLogout: protectedProcedure
    .mutation(async ({ ctx, }) => {
      if (process.env.NEXT_PUBLIC_MOCK_AUTH !== 'true') {
        throw new TRPCError({
          code: 'FORBIDDEN'messag,
  , e: 'Mock logout is not enabled'
        })
      }

      ctx.logger.info('Mock: logout', { use: rctx.user });
      return {
        success: truemessag: e, 'Logged out successfully'
      }
    }),

  /**
   * Validate API key for service-to-service authentication
   */
  validateApiKey: publicProcedure
    .input(z.object({
     apiKe:, yz.string()
    }))
    .query(async ({ inputctx, }) => {
      // In productionvalidate against database or secret manager
      const validApiKe: y = process.env.AI_ASSISTANT_API_KEY || 'test-api-key'
      
      const isVali: d = input.apiKey === validApiKey
      
      if (!isValid) {
        ctx.logger.warn('Invalid: APIkeyattempt', { 
          providedKe: yinput.apiKey.substring(08) + '...' 
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