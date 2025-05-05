import { NextRequest } from 'next/server';
import { z } from 'zod';
import { environment } from '@/lib/zod/environment';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return Response.json({ success: false, error: 'Query parameter is required' }, { status: 400 });
    }

    const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${environment.GENIUS_CLIENT_ACCESS_TOKEN}`,
      },
    });

    if (!res.ok) {
      return Response.json({ success: false, error: "Error while fetching" }, { status: res.status });
    }

    const data = await res.json();
    if (!data.response.hits.length) {
      return Response.json({ success: false, error: 'No results found' }, { status: 404 });
    }
    console.log(data);

    const schema = z.object({
      url: z.string().url(),
      title: z.string(),
      primary_artist: z.object({
        name: z.string(),
      }),
    });

    const track = schema.parse(data?.response?.hits?.[0]?.result);
    console.log(track);

    return Response.json({ success: true, data: track });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
