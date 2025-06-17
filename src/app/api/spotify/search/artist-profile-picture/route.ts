import { NextRequest } from 'next/server';
import { z } from 'zod';
import { SpotifyArtistSchema } from '@/lib/schemas';
import { environment } from '@/lib/env';

export const dynamic = 'force-dynamic' // defaults to force-static


export async function GET(request: NextRequest): Promise<void | Response> {

  try {
    const { searchParams } = new URL(request.url);
    const artistName = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));

    // Searching artist by name on spotify
    let res = await fetch(`${environment.HOST}/api/spotify/artist/search?q=${encodeURIComponent(artistName)}`);
    if (!res.ok) throw new Error(res.statusText);
    let json = await res.json();
    const artists = SpotifyArtistSchema.array().parse(json.data);
    if (artists.length === 0) throw new Error("No artist found");
    const artistID = artists[0].id;

    // Fetching artist details on spotify
    res = await fetch(`${environment.HOST}/api/spotify/artist?q=${encodeURIComponent(artistID)}`);
    if (!res.ok) throw new Error(res.statusText);
    json = await res.json();
    const artist = SpotifyArtistSchema.parse(json.data);
    const images = artist.images;
    if (images.length === 0) throw new Error("No artist profile picture found");
    const profilePicture = images[0].url;

    return Response.json({ success: true, data: profilePicture });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
