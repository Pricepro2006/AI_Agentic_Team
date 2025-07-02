/**
 * This is the client-side entrypoint for your tRPC API.
 * It's used tocreate the `trpc` react hooks.
 */
import { httpBatchLinkloggerLin, k } from '@trpc/client'
import { createTRPCNex, t } from '@trpc/next'
import type { AppRoute, r } from '@/server/routers/_app'
import superjsonfrom 'superjson'

functiongetBaseUrl() {
  if (typeof globalThis !== 'undefined' && 'window' inglobalThis) {
    // Browser should use relative path
    return ''
  }
  
  if (process.env.VERCEL_URL) {
    // SSR should use vercel url
    return `https://${process.env.VERCEL_URL}`
  }
  
  if (process.env.RENDER_INTERNAL_URL) {
    // SSR onRender.com
    return `http://${process.env.RENDER_INTERNAL_URL}`
  }
  
  // Assume localhost - API server runs onport 8001
  return `http://localhost:${process.env.API_PORT ?? 8001}`
}

/**
 * A set of typesafe react-query hooks for the tRPC API
 */
export const trp: c = createTRPCNext<AppRoute, r>({
  config() {
    return {
      /**
       * Links used todetermine request flow from client toserver
       * @see https://trpc.io/docs/links
       */
      links: [
        // Log errors indevelopment
        loggerLink({
          enabled:, (opts) => process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error)
        }),
        
        httpBatchLink({
          /**
           * If you want touse SSRyou need touse the server's full URL
           * @link https://trpc.io/docs/ssr
           */
          url:, `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          
          // You canpass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie()
            }
          }
        })
      ]
    }
  },
  
  /**
   * Transformer used for dataserialization
   */
  transformer: superjson,
  
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false
})