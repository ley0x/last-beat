import { NextRequest } from 'next/server';
import { z } from 'zod';
import { LastFmTopTracks, TimeframeSchema } from '@/lib/schemas';
import { environment } from '@/lib/env';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const q = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));
    const timeframe = TimeframeSchema.parse(searchParams.get('timeframe') ?? "1month");
    const limit = z.number().parse(Number(searchParams.get('limit') ?? "10"));
    const page = z.number().parse(Number(searchParams.get('page') ?? "1"));
    const args = {
      user: q,
      api_key: environment.LASTFM_API_KEY,
      format: 'json',
      method: 'user.getTopTracks',
      period: timeframe,
      limit: limit.toString(),
      page: page.toString(),
    }
    const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    const data = await res.json();
    const topTracks = LastFmTopTracks.array().parse(data.toptracks.track);

    return Response.json({ success: true, data: topTracks, page, limit });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
