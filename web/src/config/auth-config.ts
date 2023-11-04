import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { apiConnection } from './api-config'
import { configuration } from './setting-config'

/** Next Auth Configuration that contain the providers and methods */
export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: configuration.auth.github.clientId,
      clientSecret: configuration.auth.github.clientSecret,
    }),
    GoogleProvider({
      clientId: configuration.auth.google.clientId,
      clientSecret: configuration.auth.google.clientSecret,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider == 'google') {
        const res = await apiConnection<any>('/auth/google', {
          method: 'POST',
          body: {
            idToken: account.id_token,
            accessToken: account.access_token,
          },
        })

        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken
        user.issueAt = res.iat
        user.expiredAt = res.exp

        return true
      }

      if (account?.provider == 'github') {
        const res = await apiConnection<any>('/auth/github', {
          method: 'POST',
          body: { accessToken: account.access_token },
        })

        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken
        user.issueAt = res.iat
        user.expiredAt = res.exp

        return true
      }
      return false
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.issueAt = user.issueAt
        token.expiredAt = user.expiredAt
      }

      return token
    },
    session: async ({ session, token }) => {
      // check if the access Token stil valid
      // then refresh it when needed
      if (token.issueAt * 1000 < Date.now()) {
      }

      // get the user info from the access token
      const user = await apiConnection<any>('/user', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })

      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.issueAt = token.issueAt
      session.expiredAt = token.expiredAt
      session.user = user

      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
}
