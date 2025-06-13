'use server';

import { environment } from '@/lib/env';
import { GeniusSearchTrackSchema } from '@/lib/schemas';
import { z } from 'zod';

export const searchTracks = async (query: string): Promise<z.infer<typeof GeniusSearchTrackSchema>[]> => {
  if (!query) {
    throw new Error('Query parameter is required');
  }
  try {
    const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${environment.GENIUS_CLIENT_ACCESS_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error while fetching");
    }

    const data = await res.json();
    if (!data.response.hits.length) {
      throw new Error('No results found');
    }

    const Intermediate = z.object({
      result: GeniusSearchTrackSchema
    })

    const intermediate = Intermediate.array().parse(data?.response?.hits);
    const tracks = intermediate.map((elt) => elt.result);

    return tracks
  } catch (e: Error | unknown) {
    console.error('Error in searchGeniusTrack:', e);
    return []
  }
}

