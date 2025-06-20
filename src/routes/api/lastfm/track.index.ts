import { environment } from '@lib/env'
import { LastFmTrackSchema } from '@lib/schemas'

import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'

import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  track: z.string().min(2).max(200).trim(),
  artist: z.string().min(2).max(200).trim()
})

export const ServerRoute = createServerFileRoute('/api/lastfm/track/').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { track, artist } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        track,
        artist,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'track.getinfo'
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      const foundTrack = LastFmTrackSchema.parse(data.track)

      return Response.json({ success: true, data: foundTrack })
    } catch (e: Error | unknown) {
      console.error('Error:', e)
      if (e instanceof ZodError) {
        return json({ success: false, error: 'Invalid query parameters' }, { status: 400 })
      }
      return json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
})
