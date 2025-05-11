'use server';

import { lastFmAlbumSearch } from "@/lib/lastfm";

import { Provider, SearchAlbumsResponse } from "@/lib/types";
import { deezerSearchAlbum } from "@/lib/deezer";
import { spotifySearchAlbum } from "@/lib/spotify";


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
      const data = await lastFmAlbumSearch(q);
      return { "lastfm": data.filter(album => album.image.some(image => image['#text'].length > 0)) };
    }
    return { "deezer": [], "lastfm": [], "spotify": [] };

  } catch (e: Error | unknown) {
    console.error('Error in getLyricsAction:', e);
    return { "deezer": [], "lastfm": [], "spotify": [] };
  }
}
