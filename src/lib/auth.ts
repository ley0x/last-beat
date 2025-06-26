import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { reactStartCookies } from 'better-auth/react-start'
import { db } from '@services/db'
import { environment } from './env'
import { account, session, user, verification } from '@/services/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification
    }
  }),
  secret: environment.BETTER_AUTH_SECRET,
  baseURL: environment.BETTER_AUTH_URL,
  trustedOrigins: ['http://localhost:3000', 'http://app:3000', 'http://127.0.0.1:3000'],
  socialProviders: {
    spotify: {
      clientId: environment.SPOTIFY_CLIENT_ID,
      clientSecret: environment.SPOTIFY_CLIENT_SECRET
    }
  },
  plugins: [reactStartCookies()] // make sure this is the last plugin in the array
})
