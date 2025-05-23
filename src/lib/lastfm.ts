import { z } from "zod";
import { environment } from "./zod/environment";
import { LastFmAlbumSchema, LastFmSearchAlbumSchema, LastFmTopAlbums, LastFmTopArtists, LastFmTopTags, LastFmTopTracks, LastFmTrackSchema, LastFmUserFriends, LastFmUserInfo } from "./zod/schemas";
import { Timeframe } from "./types";

export const lastFmAlbumSearch = async (q: string): Promise<z.infer<typeof LastFmSearchAlbumSchema>[]> => {
  const args = {
    album: q,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'album.search',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  if (!data.results.albummatches.album) {
    return [];
  }

  return LastFmSearchAlbumSchema.array().parse(data.results.albummatches.album);
}

export const lastFmAlbumGetInfo = async (album: z.infer<typeof LastFmSearchAlbumSchema>): Promise<z.infer<typeof LastFmAlbumSchema>> => {
  const args = {
    album: album.name,
    artist: album.artist,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'album.getInfo',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmAlbumSchema.parse(data.album);
}

export const lastFmAlbumGetInfoByMbid = async (mbid: string): Promise<z.infer<typeof LastFmAlbumSchema>> => {
  const args = {
    mbid: encodeURIComponent(mbid),
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'album.getinfo',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmAlbumSchema.parse(data.album);
}

export const lastFmTrackGetInfo = async (track: string, artist: string): Promise<z.infer<typeof LastFmTrackSchema>> => {
  const args = {
    track,
    artist,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'track.getinfo',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmTrackSchema.parse(data.track);
}

export const lastFmTrackGetInfoByMbid = async (trackMbid: string): Promise<z.infer<typeof LastFmTrackSchema>> => {
  const args = {
    mbid: trackMbid,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'track.getinfo',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmTrackSchema.parse(data.track);
}

export const lastFmUserGetInfo = async (username: string): Promise<z.infer<typeof LastFmUserInfo>> => {
  const args = {
    user: username,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'user.getInfo',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmUserInfo.parse(data.user);
}

export const lastFmUserGetTopArtists = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1): Promise<z.infer<typeof LastFmTopArtists>[]> => {
  const args = {
    user: username,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'user.getTopArtists',
    period: timeframe,
    limit: limit.toString(),
    page: page.toString(),
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmTopArtists.array().parse(data.topartists.artist);
}

export const lastFmUserGetTopAlbums = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1): Promise<z.infer<typeof LastFmTopAlbums>[]> => {
  const args = {
    user: username,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'user.getTopAlbums',
    period: timeframe,
    limit: limit.toString(),
    page: page.toString(),
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmTopAlbums.array().parse(data.topalbums.album);
}

export const lastFmUserGetTopTracks = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1): Promise<z.infer<typeof LastFmTopTracks>[]> => {
  const args = {
    user: username,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'user.getTopTracks',
    period: timeframe,
    limit: limit.toString(),
    page: page.toString(),
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmTopTracks.array().parse(data.toptracks.track);
}

export const lastFmUserGetTopTags = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1): Promise<z.infer<typeof LastFmTopTags>[]> => {
  const args = {
    user: username,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'user.getTopTags',
    period: timeframe,
    limit: limit.toString(),
    page: page.toString(),
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmTopTags.array().parse(data.toptags.tag);
}

export const lastFmUserGetFriends = async (username: string, limit: number = 10, page: number = 1): Promise<z.infer<typeof LastFmUserFriends>[]> => {
  const args = {
    user: username,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'user.getFriends',
    limit: limit.toString(),
    page: page.toString(),
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error while fetching: ${res.status} - ${res.statusText}`);
  const data = await res.json();
  return LastFmUserFriends.array().parse(data.friends?.user ?? []);
}
