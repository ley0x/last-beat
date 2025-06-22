import { environment } from '@/lib/env'
import { UsernameSchema } from '@lib/schemas'
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

export const lastfmUserExists = createServerFn()
  .validator(UsernameSchema.parse)
  .handler(async ctx => {
    const res = await fetch(
      `${environment.LASTFM_BASE_URL}/?method=user.getinfo&user=${ctx.data}&api_key=${environment.LASTFM_API_KEY}&format=json`
    )
    if (!res.ok) {
      throw redirect({ to: '/stats' })
    }
    return true
  })
