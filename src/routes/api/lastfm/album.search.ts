import { environment } from '@lib/env'
import { LastFmSearchAlbumSchema } from '@lib/schemas'

import { z } from 'zod'

import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim()
})

export const ServerRoute = createServerFileRoute('/api/lastfm/album/search').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const args = {
        album: q,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'album.search'
      }
      const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      const data = await res.json()
      if (!data.results.albummatches.album) {
        throw new Error('No albums found')
      }

      const albums = LastFmSearchAlbumSchema.array().parse(data.results.albummatches.album)
      const filteredAlbums = albums.filter(album => album.image.some(image => image['#text'].length > 0))

      return Response.json({ success: true, data: filteredAlbums })
    } catch (e: Error | unknown) {
      return handleApiError(e, request)
    }
  }
})
