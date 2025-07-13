import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  const isLoggedIn = !!token
  const isOnLoginPage = request.nextUrl.pathname === '/login'

  // If not logged in and not on login page, redirect to /login
  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If logged in and on login page, redirect to home
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    // protect all routes except login, register, static files, etc.
    '/((?!_next/static|favicon.ico|login|register|api).*)',
  ],
}
