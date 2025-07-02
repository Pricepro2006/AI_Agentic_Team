import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname === route)
  
  // For now, allow all routes in development
  // In production, you would check for auth token
  if (!isPublicRoute && pathname !== '/favicon.ico') {
    // Check for auth (simplified for TypeScript demo)
    // In production, check cookies/headers for auth token
    const isAuthenticated = true // Simplified for demo
    
    if (!isAuthenticated && !pathname.startsWith('/_next')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}