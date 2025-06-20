import { z, ZodError } from 'zod'
import { json } from '@tanstack/react-start'

import { DeezerAlbumSchema } from '@lib/schemas'
import { createServerFileRoute } from '@tanstack/react-start/server'

const SearchParamsSchema = z.object({
  q: z.string().min(2).max(200).trim(),
  limit: z.string().min(1).max(100).default('25'),
})

export const ServerRoute = createServerFileRoute('/api/deezer/album/search').methods({
  GET: async ({ request }) => {
    try {
      const { searchParams } = new URL(request.url)
      const { q, limit } = SearchParamsSchema.parse(Object.fromEntries(searchParams.entries()))

      const res = await fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(q)}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`)
      }

      const data = await res.json();
      const albums = DeezerAlbumSchema.array().parse(data.data)

      return json({ success: true, data: albums })
    } catch (e: Error | unknown) {
      console.error('Error:', e)
      if (e instanceof ZodError) {
        return json({ success: false, error: "Invalid query parameters" }, { status: 400 })
      }
      return json({ success: false, error: "Internal server error" }, { status: 500 })
    }
  },
})
