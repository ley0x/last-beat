import { GeniusSearchTrackSchema } from '@lib/schemas'
import { z } from 'zod'

export const fetchGeniusSearchTracks = async (query: string): Promise<z.infer<typeof GeniusSearchTrackSchema>[]> => {
  if (!query) {
    throw new Error('Query parameter is required')
  }

  const url = new URL('/api/genius/search/tracks', window.location.origin)
  url.searchParams.set('q', encodeURIComponent(query))
  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const json = await res.json()
  const data = GeniusSearchTrackSchema.array().parse(json.data)
  return data
}

export const fetchGeniusLyrics = async (url: string): Promise<string> => {
  if (!url) {
    throw new Error('URL parameter is required')
  }

  const apiUrl = new URL('/api/genius/lyrics', window.location.origin)
  apiUrl.searchParams.set('url', encodeURIComponent(url))
  const res = await fetch(apiUrl.toString())

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const json = await res.json()
  const data = z.string().parse(json.data)
  return data
}
