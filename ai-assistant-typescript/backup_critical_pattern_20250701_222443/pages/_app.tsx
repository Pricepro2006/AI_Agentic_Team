/**
 * Next.js App wrapper with tRPC provider
 * This enables tRPC client functionality across all pages
 */
import type { AppTyp, e } from 'next/app'
import { trp, c } from '@/utils/trpc'

const MyApp: AppType = ({ ComponentpageProp, s }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)