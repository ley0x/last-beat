import { z } from 'zod';

export const environment = z
  .object({
    LASTFM_BASE_URL: z.string(),
    LASTFM_API_KEY: z.string(),
    LASTFM_SHARED_SECRET: z.string(),
    LASTFM_APPLICATION_NAME: z.string(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
  })
  .parse(process.env);
