import { SpotifyAlbumSchema } from '@lib/schemas'
import { environment } from '@lib/env'
import { spotifyApiRequest } from '@lib/spotify-auth'

import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'

import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim(),
  limit: z.coerce.number().min(1).max(100).optional().default(24)
})

export const ServerRoute = createServerFileRoute('/api/spotify/album/search').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q, limit } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        q,
        type: 'album',
        limit: `${limit}`
      }

      const endpoint = `/search/?${new URLSearchParams(args)}`
      const response = await spotifyApiRequest(endpoint)

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`)
      }

      const json = await response.json()
      const data = SpotifyAlbumSchema.array().parse(json.albums.items)

      return Response.json({ success: true, data })
    } catch (e: Error | unknown) {
      console.error('Error:', e)
      if (e instanceof ZodError) {
        return json({ success: false, error: 'Invalid query parameters' }, { status: 400 })
      }
      return json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
})
