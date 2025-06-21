import { SpotifyTrackSchema } from '@lib/schemas'
import { spotifyApiRequest } from '@lib/spotify-auth'

import { z } from 'zod'
import { json } from '@tanstack/react-start'

import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

const SearchParamsSchema = z.object({
  artist: z.string().min(2).max(200).trim(),
  name: z.string().min(2).max(200).trim()
})

export const ServerRoute = createServerFileRoute('/api/spotify/track/search').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { artist, name } = SearchParamsSchema.parse({
        artist: decodeURIComponent(searchParams.get('artist') ?? ''),
        name: decodeURIComponent(searchParams.get('name') ?? '')
      })

      const args = {
        q: `track:${name} artist:${artist}`,
        type: 'track',
        limit: '1'
      }

      const endpoint = `/search?${new URLSearchParams(args)}`
      const response = await spotifyApiRequest(endpoint)

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`)
      }

      const respJson = await response.json()
      const tracks = SpotifyTrackSchema.array().parse(respJson.tracks.items)
      if (tracks.length === 0) {
        return json({ success: true, data: null }, { status: 404 })
      }
      const data = tracks[0]

      return json({ success: true, data })
    } catch (e: Error | unknown) {
      return handleApiError(e, request)
    }
  }
})
