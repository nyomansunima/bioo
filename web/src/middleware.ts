import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const pathname = req.nextUrl.pathname

  if (pathname.includes('/signin') && token) {
    return NextResponse.redirect(new URL('/verify', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin/:path*'],
}
