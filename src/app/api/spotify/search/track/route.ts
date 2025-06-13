import { NextRequest } from 'next/server';
import { z } from 'zod';
import { searchSpotifyTrack } from '@/services/api/spotify';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const track = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('track')));
    const artist = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('artist')));
    const foundTrack = await searchSpotifyTrack(track, artist);

    return Response.json({ success: true, data: foundTrack });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
