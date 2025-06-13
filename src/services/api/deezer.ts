import { z } from "zod";
import { DeezerAlbumSchema } from "@/lib/schemas";

export const deezerSearchAlbum = async (q: string): Promise<z.infer<typeof DeezerAlbumSchema>[]> => {

  try {
    const term = decodeURIComponent(z.string().min(2).max(200).trim().parse(q));
    const res = await fetch(`https://api.deezer.com/search/album?q=${term}&limit=25`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
    const json = await res.json();
    const data = DeezerAlbumSchema.array().parse(json.data);
    return data;
  } catch (e: unknown) {
    console.error('Error in deezerSearchAlbum:', e);
    return [];
  }
}
