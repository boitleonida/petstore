import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Simple check for session cookie
  const session = request.cookies.get('session')?.value
  const adminToken = request.cookies.get('admin_token')?.value

  const pathname = request.nextUrl.pathname

  // Admin routes protection
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protected routes prefixes
  const breederRoutes = ['/breeders/applications', '/breeders/dashboard', '/breeders/pets']

  const isBreederRoute = breederRoutes.some(route => pathname.startsWith(route))

  if (isBreederRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // We could decode the JWT here to check roles (e.g. block Adopters from /admin)
  // But jose verify in Edge proxy can sometimes be tricky without proper setup, 
  // so for this MVP, we just check if they are logged in.
  // Role checks can be done inside the Server Components.

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
