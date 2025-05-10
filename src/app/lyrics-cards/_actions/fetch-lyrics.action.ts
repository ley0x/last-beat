'use server';

import { load } from 'cheerio';

export async function getLyricsAction(url: string): Promise<string> {

  try {

    if (!url) {
      throw new Error('URL parameter is required');
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/'
      },
    });

    if (!res.ok) {
      throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    }

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

    if (!lyrics) {
      throw new Error('Could not find lyrics');
    }

    return lyrics.trim();
  } catch (e: Error | unknown) {
    console.error('Error in getLyricsAction:', e);
    return ""
  }
}
