import { DeezerAlbumSchema } from "@/lib/schemas";

export const fetchDeezerSearchAlbum = async (query: string) => {
  const url = new URL('/api/deezer/album/search', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(query));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = DeezerAlbumSchema.array().parse(json.data);
  return data;
}