/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable experimental features if needed
  },
  typescript: {
    // Type checking is handled by the TypeScript compiler
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint errors are handled separately
    ignoreDuringBuilds: false,
  },
  // Enable source maps in development
  productionBrowserSourceMaps: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig