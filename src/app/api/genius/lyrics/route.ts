import { NextRequest } from 'next/server';
import { load } from 'cheerio';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return Response.json({ success: false, error: 'URL parameter is required' }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/'
      },
    });

    console.log(res.status + ' - ' + res.statusText);
    console.log(await res.text());

    if (!res.ok) {
      return Response.json({ success: false, error: `Error while fetching: ${res.status} - ${res.statusText}` }, { status: res.status });
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
      return Response.json({ success: false, error: 'Could not find lyrics' }, { status: 404 });
    }

    return Response.json({ success: true, data: { lyrics: lyrics.trim() } });
  } catch (e: Error | unknown) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message }, { status: 500 });
    return Response.json({ success: false, error: e }, { status: 500 });
  }
}
