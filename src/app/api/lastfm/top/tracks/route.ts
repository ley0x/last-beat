import { NextRequest } from 'next/server';
import { z } from 'zod';
import { TimeframeSchema } from '@/lib/zod/schemas';
import { lastFmUserGetTopTracks } from '@/lib/lastfm';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const q = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));
    const timeframe = TimeframeSchema.parse(searchParams.get('timeframe') ?? "1month");
    const limit = z.number().parse(Number(searchParams.get('limit') ?? "10"));
    const page = z.number().parse(Number(searchParams.get('page') ?? "1"));
    const topTracks = await lastFmUserGetTopTracks(q, timeframe, limit, page);

    return Response.json({ success: true, data: topTracks, page, limit });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
