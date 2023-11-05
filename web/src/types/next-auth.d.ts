import NextAuth from 'next-auth/next'
import { JWT } from 'next-auth/jwt'
import { UserProfile } from '.'

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    user: UserProfile
  }

  interface User {
    accessToken: string
    refreshToken: string
  }
}
