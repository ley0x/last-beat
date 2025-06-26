import { auth } from '@/lib/auth'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'

export const requireAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()

  const session = await auth.api.getSession({
    headers,
    query: {
      // ensure session is fresh
      // https://www.better-auth.com/docs/concepts/session-management#session-caching
      disableCookieCache: true
    }
  })

  if (!session) {
    throw redirect({ to: '/login' })
  }

  return session.user
})
