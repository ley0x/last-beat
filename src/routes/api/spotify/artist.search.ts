import { SpotifyArtistSchema } from '@lib/schemas'
import { environment } from '@lib/env'
import { spotifyApiRequest } from '@lib/spotify-auth'

import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'

import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim()
})

export const ServerRoute = createServerFileRoute('/api/spotify/artist/search').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        q,
        type: 'artist',
        limit: '1'
      }
      const endpoint = `/search/?${new URLSearchParams(args)}`
      const response = await spotifyApiRequest(endpoint)

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`)
      }

      const json = await response.json()
      const data = SpotifyArtistSchema.array().parse(json.artists.items)
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
