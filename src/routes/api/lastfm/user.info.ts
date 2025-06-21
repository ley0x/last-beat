import { environment } from '@lib/env'
import { LastFmUserInfo, UsernameSchema } from '@lib/schemas'
import { logger, getRequestContext } from '@lib/logger'
import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

const SearchParamsSchema = z.object({
  q: UsernameSchema
})

export const ServerRoute = createServerFileRoute('/api/lastfm/user/info').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q: username } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        user: username,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'user.getInfo'
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      const infos = LastFmUserInfo.parse(data.user)

      return json({ success: true, data: infos })
    } catch (e: unknown) {
      return handleApiError(e, request)
    }
  }
})
