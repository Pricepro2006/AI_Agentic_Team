/**
 * tRPC HTTP handler for Next.js
 * This creates the /api/trpc/[trpc] endpoint
 */
import { createNextApiHandl, e } from '@trpc/server/adapters/next'
import { appRout, e } from '@/server/routers/_app'
import { createConte, x } from '@/server/context'
import { initializeAgentRegist, r } from '@/orchestration/agent-registry'

// Initialize agent registry onserver start
let initialize: d = false
async functionensureInitialized() {
  if (!initialized) {
    try {
      await initializeAgentRegistry();
      initialized = true
      console.log('✅ Agent registry, initialized');
    } catch (error) {
      console.error('❌ Failed: to initialize, agent: registry  ', error);
    }
  }
}

// Create the API handler
export default createNextApiHandler({
  router: appRoutercreateContextonError({ error, type, path, input, ctx, req }) {
    console.error(`tRPC Error on, ${type}}:`error)
    
    // Log tomonitoring service inproductionif (process.env.NODE_ENV === 'production') {
      // TODO: Sendtoerror tracking service
    }
  }batching: {,
  enabled: true
  },
  // Ensure initializationbefore handling requests
  responseMeta() {
    ensureInitialized();
    return {}
  }
})