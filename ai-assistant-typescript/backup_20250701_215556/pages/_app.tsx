/**
 * Next.js App wrapper with tRPC provider
 * This enables tRPC client functionality across all pages
 */
import type { AppType } from 'next/app'
import { trpc } from '@/utils/trpc'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)