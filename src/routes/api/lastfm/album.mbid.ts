import { environment } from '@lib/env'
import { LastFmAlbumSchema } from '@lib/schemas'

import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'

import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  mbid: z.string().min(2).max(200).trim()
})

export const ServerRoute = createServerFileRoute('/api/lastfm/album/mbid').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { mbid } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        mbid: encodeURIComponent(mbid),
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'album.getinfo'
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      const album = LastFmAlbumSchema.parse(data.album)

      return Response.json({ success: true, data: album })
    } catch (e: Error | unknown) {
      console.error('Error:', e)
      if (e instanceof ZodError) {
        return json({ success: false, error: 'Invalid query parameters' }, { status: 400 })
      }
      return json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
})
