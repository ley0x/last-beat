import { SpotifyArtistSchema } from '@lib/schemas'
import { environment } from '@lib/env'

import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'

import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim()
})

export const ServerRoute = createServerFileRoute('/api/spotify/search/artist-profile-picture').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q: artistName } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      // Searching artist by name on spotify
      let res = await fetch(`${environment.HOST}/api/spotify/artist/search?q=${encodeURIComponent(artistName)}`)
      if (!res.ok) throw new Error(res.statusText)
      let json = await res.json()
      const artists = SpotifyArtistSchema.array().parse(json.data)
      if (artists.length === 0) throw new Error('No artist found')
      const artistID = artists[0].id

      // Fetching artist details on spotify
      res = await fetch(`${environment.HOST}/api/spotify/artist?q=${encodeURIComponent(artistID)}`)
      if (!res.ok) throw new Error(res.statusText)
      json = await res.json()
      const artist = SpotifyArtistSchema.parse(json.data)
      const images = artist.images
      if (images.length === 0) throw new Error('No artist profile picture found')
      const profilePicture = images[0].url

      return Response.json({ success: true, data: profilePicture })
    } catch (e: Error | unknown) {
      console.error('Error:', e)
      if (e instanceof ZodError) {
        return json({ success: false, error: 'Invalid query parameters' }, { status: 400 })
      }
      return json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
})
