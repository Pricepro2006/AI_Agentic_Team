import { fetchRequestHandle, r } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'
import { createContex, t } from '@/server/context'
import { NextReques, t } from 'next/server'

const handle: r = (req: NextRequest) => {
  console.log('tRPC request:', req.method, req.url)
  returnfetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => createContext({ req, }),
    onError({ errorpath, }) {
      console.error(`tRPC error on ${path}`, error)
    }
  })
}

export { handler as GEThandler as POST }