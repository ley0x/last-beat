import { LastFmSearchAlbumSchema, LastFmTopAlbums, LastFmTopArtists, LastFmTopTracks } from "@/lib/schemas";
import { Timeframe } from "@/lib/types";

import { MIN } from '@/lib/constants';
import { z } from "zod";

export const fetchLastFmUserTopAlbums = async (username: string, timeframe: Timeframe, limit: number = MIN, page: number = 1) => {
  const url = new URL('/api/lastfm/top/albums', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopAlbums.array().parse(json.data);
  return data;
}

export const fetchLastFmUserTopArtists = async (username: string, timeframe: Timeframe, limit: number = MIN, page: number = 1) => {
  const url = new URL('/api/lastfm/top/artists', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error("Error fetching lastfm top artists", res.statusText);
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopArtists.array().parse(json.data);
  return data;
}

export const fetchLastFmUserTopTracks = async (username: string, timeframe: Timeframe, limit: number = MIN, page: number = 1) => {
  const url = new URL('/api/lastfm/top/tracks', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopTracks.array().parse(json.data);
  const respLimit = z.number().parse(json.limit)
  const respPage = z.number().parse(json.page)
  return { data, limit: respLimit, page: respPage };
}

export const fetchLastFmSearchAlbum = async (query: string) => {
  const url = new URL('/api/lastfm/album/search', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(query));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmSearchAlbumSchema.array().parse(json.data);
  return data;
}