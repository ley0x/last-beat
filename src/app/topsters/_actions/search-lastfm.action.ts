'use server';

import { lastFmAlbumSearch } from "@/lib/lastfm";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";
import { z } from "zod";


export async function searchAlbums(q: string): Promise<z.infer<typeof LastFmSearchAlbumSchema>[]> {
  try {
    if (!q) throw new Error('q parameter is required');
    const data = await lastFmAlbumSearch(q);
    return data.filter(album => album.image.some(image => image['#text'].length > 0));

  } catch (e: Error | unknown) {
    console.error('Error in getLyricsAction:', e);
    return []
  }
}
