import { environment } from '@lib/env'
import { LastFmTopTags, TimeframeSchema, UsernameSchema } from '@lib/schemas'
import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'
import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  q: UsernameSchema,
  timeframe: TimeframeSchema.optional().default('1month'),
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1)
})

export const ServerRoute = createServerFileRoute('/api/lastfm/user/tags').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const {
        q: username,
        timeframe,
        limit,
        page
      } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        user: username,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'user.getTopTags',
        period: timeframe,
        limit: limit.toString(),
        page: page.toString()
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      const tags = LastFmTopTags.array().parse(data.toptags.tag)

      return Response.json({ success: true, data: tags })
    } catch (e: Error | unknown) {
      console.error('Error:', e)
      if (e instanceof ZodError) {
        return json({ success: false, error: 'Invalid query parameters' }, { status: 400 })
      }
      return json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
})
