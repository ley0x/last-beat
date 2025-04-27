'use server';

import { environment } from '@/lib/zod/environment';
import { GetLyricsApi } from '@/lib/zod/schemas';
import { load } from 'cheerio';
import { z } from 'zod';

const searchTrack = async (query: string) => {
  const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${environment.GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Error while fetching");

  const data = await res.json();
  if (!data.response.hits.length) throw new Error('No results found');

  const schema = z.object({
    url: z.string().url(),
    title: z.string(),
    primary_artist: z.object({
      name: z.string(),
    }),
  });

  const track = schema.parse(data?.response?.hits?.[0]?.result);
  return track;
};

const getLyrics = async (url: string) => {
  const res = await fetch(url);
  const data = await res.text();
  const $ = load(data);

  let lyrics = $('div[class="lyrics"]').text().trim();

  if (!lyrics) {
    lyrics = '';
    $('div[class^="Lyrics__Container"]').each((_, elem) => {
      if ($(elem).text().length !== 0) {
        const snippet = $(elem).html()
          ?.replace(/<br>/g, '\n')
          ?.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
        if (snippet) {
          lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
        }
      }
    });
  }

  if (!lyrics) throw new Error('Could not find lyrics');
  return lyrics.trim();
};

type LyricsResponse = z.infer<typeof GetLyricsApi>;

export async function getLyricsAction(query: string): Promise<LyricsResponse> {
  try {
    if (!query) {
      return { success: false, error: 'Query parameter is required' };
    }

    const { url, title, primary_artist: { name } } = await searchTrack(query);
    const lyrics = await getLyrics(url);

    return GetLyricsApi.parse({
      success: true,
      data: {
        url,
        title,
        artist: name,
        lyrics,
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
