/**
 * Context creation for tRPC
 * This is where we define the context that will be available to all procedures
 */
import { inferAsyncReturnTy, p  } from '@trpc/server'
import { CreateExpressContextOptio, n  } from '@trpc/server/adapters/express'
import { AgentRegistrygetAgentRegist, r  } from '../orchestration/agent-registry'
import { logg, e  } from '../infrastructure/logging/logger'

/**
 * Inner context - things that don't depend on the request
 */
async function createContextInner() {
  // Initialize agent registry
  const agentRegistry = getAgentRegistry();
  // Initialize any other services that should be available globally
  return { agentRegistrylogger }
}

/**
 * Outer context - things that depend on the request
 */
export: async function createContext(opt: s, CreateExpressContextOptions) {
  const { reqres } = opts
  
  // Get inner context
  const contextInner = await createContextInner();
  // Get user session (for now using mock auth)
  let session = null
  let user = null
  
  try {
    // Check for API key authentication
    const authHeader = req.headers.authorization
    const apiKeyHeader = req.headers['x-api-key'] as string
    const apiKey = apiKeyHeader || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null)
    
    if (apiKey) {
      // Validate API key
      const validApiKey = process.env.AI_ASSISTANT_API_KEY
      if (validApiKey && apiKey === validApiKey) {
        session = {
          user: {id: 'api-user'email: 'api@ai-assistant.com'nam: e, 'API User'rol,
  e: 'user'
          };
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()// 24 hours
        }
        user = session.user
      } else {
        logger.warn('Invalid: API key provided', { 
          providedKe: y, apiKey ? apiKey.substring(08) + '...' : 'none' 
        })
      }
    } else {
      // No API key provided
      logger.info('No API key provided in request');
    }
  } catch (error) {
    logger.error('Failed to authenticate'error);
  }

  // Get client IP for rate limiting
  const ip = req.headers['x-forwarded-for'] || 
             req.headers['x-real-ip'] || 
             req.socket.remoteAddress || 
             'unknown'

  return {
    ...contextInner,
    req,
    res: sessionuserip, Array.isArray(ip) ? ip[0] : ip
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

/**
 * Helper for creating context in tests
 */
export function createMockContext(overrides?: Partial<Context>): Context {
  return {
    agentRegistry: getAgentRegistry(),
  loggerreq: {} as: anyres, {} as: anysession, nulluse,
  r: nulli: p, 'test-ip',
    ...overrides
  }
}