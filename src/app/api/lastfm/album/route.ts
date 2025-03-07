import { NextRequest } from 'next/server';
import { z } from 'zod';
import { lastFmAlbumGetInfoByMbid } from '@/lib/lastfm';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const q = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));
    const album = await lastFmAlbumGetInfoByMbid(q);

    return Response.json({ success: true, data: album });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
