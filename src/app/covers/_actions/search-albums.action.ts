'use server';

import { Provider, SearchAlbumsResponse } from "@/lib/types";
import { deezerSearchAlbum } from "@/services/api/deezer";
import { fetchLastFmSearchAlbum } from "@/services/api/lastfm";
import { spotifySearchAlbum } from "@/services/api/spotify";


export async function searchAlbums(q: string, provider: Provider): Promise<SearchAlbumsResponse> {
  try {
    if (!q) throw new Error('q parameter is required');
    if (!provider) throw new Error('provider parameter is required');

    if (provider === "deezer") {
      const data = await deezerSearchAlbum(q);
      return { "deezer": data };
    }
    if (provider === "spotify") {
      const data = await spotifySearchAlbum(q);
      return { "spotify": data };
    }
    if (provider === "lastfm") {
      const data = await fetchLastFmSearchAlbum(q);
      return { "lastfm": data.filter(album => album.image.some(image => image['#text'].length > 0)) };
    }
    return { "deezer": [], "lastfm": [], "spotify": [] };

  } catch (e: Error | unknown) {
    console.error('Error in getLyricsAction:', e);
    return { "deezer": [], "lastfm": [], "spotify": [] };
  }
}
