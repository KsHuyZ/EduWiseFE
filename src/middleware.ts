import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ERoles, TUser } from '@/types';

const authRoutes = ['/sign-in', 'sign-up'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = JSON.parse(request.cookies.get('user')?.value ?? '') as TUser;
  const { pathname } = request.nextUrl;
  if (!token) return NextResponse.redirect(new URL('/sign-in', request.url));
  if (token && authRoutes.includes(pathname))
    return NextResponse.redirect(new URL('/', request.url));
  if (pathname.startsWith('/teacher') && !user.role.includes(ERoles.TEACHER))
    return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
}
export const config = {
  matcher: '/courses/:path*',
};
