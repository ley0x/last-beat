import { SpotifyArtistSchema } from '@lib/schemas'
import { environment } from '@lib/env'
import { spotifyApiRequest } from '@lib/spotify-auth'

import { z } from 'zod'

import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

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
      return handleApiError(e, request)
    }
  }
})
