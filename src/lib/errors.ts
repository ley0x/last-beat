import { ZodError } from 'zod'
import { getRequestContext, logger } from './logger'
import { json } from '@tanstack/react-start'

export const handleApiError = (e: unknown, request: Request) => {
  const { endpoint, method } = getRequestContext(request)

  if (e instanceof ZodError) {
    logger.apiError(endpoint, method, 'Invalid username parameter', e, {
      params: Object.fromEntries(new URL(request.url).searchParams.entries()),
      validationErrors: e.errors
    })
    return json({ success: false, error: 'Invalid query parameters' }, { status: 400 })
  }

  logger.apiError(endpoint, method, 'API request failed', e, {
    params: Object.fromEntries(new URL(request.url).searchParams.entries())
  })
  return json({ success: false, error: 'Internal server error' }, { status: 500 })
}
