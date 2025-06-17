import { NextRequest } from 'next/server';
import { z } from 'zod';

import { DeezerAlbumSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);

    const term = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));
    const res = await fetch(`https://api.deezer.com/search/album?q=${term}&limit=25`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    const json = await res.json();
    const data = DeezerAlbumSchema.array().parse(json.data);
    return Response.json({ success: true, data });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
