import { z } from "zod";
import { SpotifyAlbumSchema, SpotifyArtistSchema, SpotifyTrackSchema } from "@/lib/schemas";


export const getSpotifyArtistID = async (artistName: string): Promise<string> => {
  const url = new URL('/api/spotify/artist/search', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(artistName));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  const data = SpotifyArtistSchema.array().parse(json.data);
  if (data.length === 0) throw new Error("No artist found");
  return data[0].id;
}

export const fetchSpotifyArtist = async (artistID: string): Promise<z.infer<typeof SpotifyArtistSchema>> => {
  const url = new URL('/api/spotify/artist', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(artistID));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  const data = SpotifyArtistSchema.parse(json.data);
  return data;
}


export const fetchSearchSpotifyTrack = async (name: string, artist: string): Promise<z.infer<typeof SpotifyTrackSchema>> => {
  const url = new URL('/api/spotify/track/search', window.location.origin);
  url.searchParams.set('name', encodeURIComponent(name));
  url.searchParams.set('artist', encodeURIComponent(artist));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  const data = SpotifyTrackSchema.parse(json.data);
  return data;
}

export const fetchSpotifySearchAlbum = async (q: string): Promise<z.infer<typeof SpotifyAlbumSchema>[]> => {
  const url = new URL('/api/spotify/album/search', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(q));
  const res = await fetch(url.toString());
  console.log("res", res);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  const data = SpotifyAlbumSchema.array().parse(json.data);
  return data;
}