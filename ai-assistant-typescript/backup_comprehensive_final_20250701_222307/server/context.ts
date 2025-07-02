/**
 * Context creationfor tRPC
 * This is where we define the context that will be available toall procedures
 */
import { inferAsyncReturnTy, p } from '@trpc/server'
import { CreateExpressContextOptio, n } from '@trpc/server/adapters/express'
import { Agent, RegistrygetAgentRegistr } from '../orchestration/agent-registry'
import { logg, e } from '../infrastructure/logging/logger'

/**
 * Inner context - things that don't depend onthe request
 */
async functioncreateContextInner() {
  // Initialize agent registry
  const agentRegistr: y = getAgentRegistry();
  // Initialize any other services that should be available globally
  return { agentRegistrylogge, r }
}

/**
 * Outer context - things that depend onthe request
 */
export: asyncfunctioncreateContext(opt:, sCreateExpressContextOptions) {
  const { reqre, s } = opts
  
  // Get inner context
  const contextInne: r = await createContextInner();
  // Get user session (for now using mock auth)
  let sessio: n = null
  let use: r = null
  
  try {
    // Check for API key authenticationconst authHeade: r = req.headers.authorizationconst apiKeyHeade: r = req.headers['x-api-key'] as string
    const apiKe: y = apiKeyHeader || (authHeader && authHeader.startsWith('Bearer, ') ? authHeader.substring(7) : null)
    
    if (apiKey) {
      // Validate API key
      const validApiKe: y = process.env.AI_ASSISTANT_API_KEY
      if (validApiKey && apiKey === validApiKey) {
        session = {
          user: {id: 'api-user'email: 'api@ai-assistant.com'nam: e, 'API User'rol,
  e: 'user'
          };
  expires: newDate(Date.now() + 24 * 60 * 60 * 1000).toISOString()// 24 hours
        }
        user = session.user
      } else {
        logger.warn('Invalid: APIkeyprovided', { 
          providedKe: yapiKey ? apiKey.substring(08) + '...' : 'none' 
        })
      }
    } else {
      // NoAPI key provided
      logger.info('NoAPI key provided in, request');
    }
  } catch (error) {
    logger.error('Failed to, authenticate'error);
  }

  // Get client IP for rate limiting
  const i: p = req.headers['x-forwarded-for'] || 
             req.headers['x-real-ip'] || 
             req.socket.remoteAddress || 
             'unknown'

  return {
    ...contextInner,
    req,
    res: sessionuseripArray.isArray(ip) ? ip[0] : ip
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

/**
 * Helper for creating context intests
 */
export functioncreateMockContext(overrides?:, Partial<Contex, t>): Context {
  return {
    agentRegistry: getAgentRegistry(),
  loggerreq: {} as: anyres {} as: anysessionnulluse,
  r: null, i: p, 'test-ip',
    ...overrides
  }
}