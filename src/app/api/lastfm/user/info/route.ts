import { environment } from '@/lib/env';
import { LastFmUserInfo, UsernameSchema } from '@/lib/schemas';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const username = decodeURIComponent(UsernameSchema.parse(searchParams.get('q')));
    const args = {
        user: username,
        api_key: environment.LASTFM_API_KEY,
        format: 'json',
        method: 'user.getInfo',
    }
    const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    const data = await res.json();
    const infos = LastFmUserInfo.parse(data.user);

    return Response.json({ success: true, data: infos });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
