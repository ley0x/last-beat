import { environment } from '@lib/env'
import { LastFmUserFriends, UsernameSchema } from '@lib/schemas'
import { z } from 'zod'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

const SearchParamsSchema = z.object({
  q: UsernameSchema,
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1)
})

export const ServerRoute = createServerFileRoute('/api/lastfm/user/friends').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q: username, limit, page } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        user: username,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'user.getFriends',
        limit: limit.toString(),
        page: page.toString()
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      const friends = LastFmUserFriends.array().parse(data.friends?.user ?? [])

      return Response.json({ success: true, data: friends })
    } catch (e: Error | unknown) {
      return handleApiError(e, request)
    }
  }
})
