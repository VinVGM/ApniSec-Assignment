import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'jsonwebtoken';

// Paths that do not require authentication
const publicPaths = [
    '/login', 
    '/register', 
    '/forgot-password',
    '/reset-password',
    '/api/auth/login', 
    '/api/auth/register',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/' // Landing page
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  console.log(`[Middleware] Path: ${pathname}, Token: ${token ? 'Present' : 'Missing'}`);

  // 1. Redirect logged-in users away from auth pages
  if (token && (
      pathname === '/login' || 
      pathname === '/register' || 
      pathname === '/forgot-password' || 
      pathname === '/reset-password'
  )) {
    console.log('[Middleware] Authenticated user on auth page - Redirecting to Dashboard');
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // 2. Allow public paths and static assets
  if (publicPaths.some(path => pathname === path || pathname.startsWith('/_next') || pathname.startsWith('/static')) || pathname.includes('.')) {
    return NextResponse.next();
  }

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Basic Token existence check (Verification happens in API handlers usually, 
  // but for middleware we mostly check presence to redirect)
  // Real verification is complex in Edge Middleware because of jsonwebtoken library support.
  // We'll trust the presence + HttpOnly nature for now, and API routes will verify validity.
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
