import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin/:path*'],
}
