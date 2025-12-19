import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decode } from 'jsonwebtoken';

// Paths that do not require authentication
const publicPaths = [
    '/login', 
    '/register', 
    '/api/auth/login', 
    '/api/auth/register',
    '/' // Landing page
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a public path or static asset
  if (publicPaths.some(path => pathname === path || pathname.startsWith('/_next') || pathname.startsWith('/static')) || pathname.includes('.')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

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
