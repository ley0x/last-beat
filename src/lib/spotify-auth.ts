import { z } from 'zod'
import { environment } from '@lib/env'

/**
 * Get Spotify access token using client credentials flow
 * This token can be used for public API calls that don't require user authentication
 */
export const getSpotifyAccessToken = async (): Promise<string> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: environment.SPOTIFY_CLIENT_ID,
      client_secret: environment.SPOTIFY_CLIENT_SECRET
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to get Spotify access token: ${response.status} - ${response.statusText}`)
  }

  const json = await response.json()
  return z.string().parse(json.access_token)
}

/**
 * Make authenticated request to Spotify API
 * Automatically handles access token retrieval and authorization header
 */
export const spotifyApiRequest = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const accessToken = await getSpotifyAccessToken()
  const BASE_URL = 'https://api.spotify.com/v1'

  return fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
}
