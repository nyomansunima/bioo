import { NextRequest, NextResponse } from 'next/server'
import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
import { configuration } from '~/config/setting-config'

const githubStrategy = new GithubStrategy(
  {
    clientID: configuration.auth.github.clientId,
    clientSecret: configuration.auth.github.clientSecret,
    passReqToCallback: false,
    scope: 'user:email',
    callbackURL: `${configuration.app.host}/api/auth/github/callback`,
  },
  (acessToken, refreshToken, profile, done) => {
    return done(null, profile)
  },
)

passport.use(githubStrategy)

async function handler(req: NextRequest, res: NextResponse) {}

export { handler as GET, handler as POST }
