import { auth } from '@/lib/auth'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/auth/$').methods({
  GET: ({ request }) => {
    console.log('GET request received')
    console.log({ get: request })
    return auth.handler(request)
  },
  POST: ({ request }) => {
    console.log('POST request received')
    console.log({ post: request })
    return auth.handler(request)
  }
})
