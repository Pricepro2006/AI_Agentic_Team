import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'
import { createContext } from '@/server/context'
import { NextRequest } from 'next/server'

const handler = (req: NextRequest) => {
  console.log('tRPC request:', req.method, req.url)
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => createContext({ req }),
    onError({ error, path }) {
      console.error(`tRPC error on ${path}`, error)
    }
  })
}

export { handler as GET, handler as POST }