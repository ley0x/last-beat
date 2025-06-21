import { z } from 'zod'
import { json } from '@tanstack/react-start'

import { DeezerAlbumSchema } from '@lib/schemas'
import { logger, getRequestContext } from '@lib/logger'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim(),
  limit: z.string().min(1).max(100).default('25')
})

export const ServerRoute = createServerFileRoute('/api/deezer/album/search').methods({
  GET: async ({ request }) => {
    const { endpoint, method } = getRequestContext(request)

    try {
      const { searchParams } = new URL(request.url)
      const { q, limit } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      logger.info('Searching Deezer albums', {
        endpoint,
        method,
        params: { q, limit }
      })

      const res = await fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(q)}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      }

      const data = await res.json()
      const albums = DeezerAlbumSchema.array().parse(data.data)

      logger.info('Successfully fetched Deezer albums', {
        endpoint,
        method,
        params: { q, limit, resultCount: albums.length }
      })

      return json({ success: true, data: albums })
    } catch (e: Error | unknown) {
      return handleApiError(e, request)
    }
  }
})
