import { NextRequest } from 'next/server';
import { z } from 'zod';

import { SpotifyTrackSchema } from '@/lib/schemas';
import { environment } from '@/lib/env';

const getSpotifyAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: environment.SPOTIFY_CLIENT_ID,
      client_secret: environment.SPOTIFY_CLIENT_SECRET,
    }),
  });
  const json = await response.json();
  return z.string().parse(json.access_token);
};



export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const artist = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('artist')));
    const name = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('name')));

    const accessToken = await getSpotifyAccessToken();
    const args = {
      q: `track:${name} artist:${artist}`,
      type: 'track',
      limit: '1'
    }

    const url = `https://api.spotify.com/v1/search/?${new URLSearchParams(args)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const json = await response.json();
    const data = SpotifyTrackSchema.parse(json.tracks.items[0]);

    return Response.json({ success: true, data });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}