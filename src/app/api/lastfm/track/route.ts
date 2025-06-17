import { NextRequest } from 'next/server';
import { z } from 'zod';
import { environment } from '@lib/env';
import { LastFmTrackSchema } from '@lib/schemas';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const track = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('track')));
    const artist = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('artist')));

    const args = {
      track,
      artist,
      api_key: environment.LASTFM_API_KEY,
      format: 'json',
      method: 'track.getinfo',
    }
    const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    const data = await res.json();
    const foundTrack = LastFmTrackSchema.parse(data.track);

    return Response.json({ success: true, data: foundTrack });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
