import { z } from 'zod'

export const environment = z
  .object({
    LASTFM_BASE_URL: z.string(),
    LASTFM_API_KEY: z.string(),
    LASTFM_SHARED_SECRET: z.string(),
    LASTFM_APPLICATION_NAME: z.string(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    GENIUS_CLIENT_ID: z.string(),
    GENIUS_CLIENT_SECRET: z.string(),
    GENIUS_CLIENT_ACCESS_TOKEN: z.string(),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
  })
  .parse(process.env)
