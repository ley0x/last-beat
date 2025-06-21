import { environment } from '@lib/env'
import { LastFmTopArtists, TimeframeSchema } from '@lib/schemas'

import { z } from 'zod'

import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim(),
  timeframe: TimeframeSchema.optional().default('1month'),
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1)
})

export const ServerRoute = createServerFileRoute('/api/lastfm/top/artists').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q, timeframe, limit, page } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        user: q,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'user.getTopArtists',
        period: timeframe,
        limit: limit.toString(),
        page: page.toString()
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      const topArtists = LastFmTopArtists.array().parse(data.topartists.artist)

      return Response.json({ success: true, data: topArtists, page, limit })
    } catch (e: Error | unknown) {
      return handleApiError(e, request)
    }
  }
})
