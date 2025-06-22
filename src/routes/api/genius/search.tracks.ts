import { environment } from '@lib/env'
import { GeniusSearchTrackSchema } from '@lib/schemas'

import { z } from 'zod'

import { createServerFileRoute } from '@tanstack/react-start/server'
import { handleApiError } from '@/lib/errors'
import { json } from '@tanstack/react-start'

const SearchParamsSchema = z.object({
  q: z.string().min(1, 'Query parameter is required')
})

export const ServerRoute = createServerFileRoute('/api/genius/search/tracks').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q } = SearchParamsSchema.parse({
        q: decodeURIComponent(searchParams.get('q') ?? '')
      })

      const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(q)}`, {
        headers: {
          Authorization: `Bearer ${environment.GENIUS_CLIENT_ACCESS_TOKEN}`
        }
      })

      if (!res.ok) {
        throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      }

      const data = await res.json()

      if (!data.response.hits.length) {
        return json({ success: true, data: [] })
      }

      const Intermediate = z.object({
        result: GeniusSearchTrackSchema
      })

      const intermediate = Intermediate.array().parse(data?.response?.hits)
      const tracks = intermediate.map(elt => elt.result)

      return json({ success: true, data: tracks })
    } catch (e: Error | unknown) {
      return handleApiError(e, request)
    }
  }
})
