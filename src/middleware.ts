import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/sign-in', 'sign-up'];

export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url));
}
export const config = {
  matcher: '/courses/:path*',
};
