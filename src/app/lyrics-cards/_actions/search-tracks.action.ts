'use server';

import { lastFmTrackGetInfo } from '@/lib/lastfm';
import { environment } from '@/lib/zod/environment';
import { LastFmSearchTrackSchema, LastFmTrackSchema } from '@/lib/zod/schemas';
import { z } from 'zod';


type SearchTracksReturn = {
  success: boolean;
  data?: z.infer<typeof LastFmTrackSchema>[];
  error?: string;
}

export const searchLastFmTrack = async (q: string): Promise<SearchTracksReturn> => {
  if (!q) {
    return { success: false, error: 'Query parameter is required' };
  }
  try {

    const args = {
      method: 'track.search',
      track: q,
      api_key: environment.LASTFM_API_KEY,
      format: 'json',
      limit: "5",
    }

    const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
    const res = await fetch(url);
    const data = await res.json();
    const parsedData = LastFmSearchTrackSchema.array().parse(data.results.trackmatches?.track ?? []);

    const output: z.infer<typeof LastFmTrackSchema>[] = [];
    for (const track of parsedData) {
      const trackInfo = await lastFmTrackGetInfo(track.name, track.artist);
      output.push(trackInfo);
    }

    return {
      success: true,
      data: output,
    };
  } catch (e) {

    console.error('Error in searchLastFmTrack:', e);
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Unknown error occurred'
    };
  }
}
