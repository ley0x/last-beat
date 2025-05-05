'use server';

import { environment } from '@/lib/zod/environment';
import { GetLyricsApi } from '@/lib/zod/schemas';
import { z } from 'zod';

type LyricsResponse = z.infer<typeof GetLyricsApi>;

export async function getLyricsAction(query: string): Promise<LyricsResponse> {
  try {
    if (!query) {
      return { success: false, error: 'Query parameter is required' };
    }

    const baseUrl = environment.HOST;
    // Search for the track
    const searchRes = await fetch(`${baseUrl}/api/genius/search?q=${encodeURIComponent(query)}`);
    console.log(searchRes.status + ' - ' + searchRes.statusText);
    // console.log(await searchRes.text());
    const searchData = await searchRes.json();

    if (!searchData.success) {
      return { success: false, error: searchData.error || 'Failed to search for track' };
    }

    const track = searchData.data;

    // Get the lyrics
    const lyricsRes = await fetch(`${baseUrl}/api/genius/lyrics?url=${encodeURIComponent(track.url)}`);
    const lyricsData = await lyricsRes.json();

    if (!lyricsData.success) {
      return { success: false, error: lyricsData.error || 'Failed to get lyrics' };
    }

    return GetLyricsApi.parse({
      success: true,
      data: {
        url: track.url,
        title: track.title,
        artist: track.primary_artist.name,
        lyrics: lyricsData.data.lyrics,
      }
    });
  } catch (e) {
    console.error('Error in getLyricsAction:', e);
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Unknown error occurred'
    };
  }
}
