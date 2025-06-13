import { environment } from '@/lib/env';
import { LastFmUserFriends, UsernameSchema } from '@/lib/schemas';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const username = decodeURIComponent(UsernameSchema.parse(searchParams.get('q')));
    const limit = z.number().parse(Number(searchParams.get('limit') ?? "10"));
    const page = z.number().parse(Number(searchParams.get('page') ?? "1"));

    const args = {
        user: username,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'user.getFriends',
        limit: limit.toString(),
        page: page.toString(),
    }
    const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    const data = await res.json();
    const friends = LastFmUserFriends.array().parse(data.friends?.user ?? []);

    return Response.json({ success: true, data: friends });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
