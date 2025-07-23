import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const isAuthenticated = authCookie?.value === 'authenticated';
  const { pathname } = request.nextUrl;

  if (isAuthenticated) {
    if (pathname === '/' || pathname === '/login') {
      return NextResponse.redirect(new URL('/produtos', request.url));
    }
  } else {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
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
};
