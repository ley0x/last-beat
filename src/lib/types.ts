import { z } from "zod";
import { DeezerAlbumSchema, LastFmSearchAlbumSchema, LastFmTopTracks, SpotifyAlbumSchema, TimeframeSchema } from "./schemas";

export type Timeframe = z.infer<typeof TimeframeSchema>;

export type Alltracks = z.infer<typeof LastFmTopTracks>[] | null;

export type Provider = "deezer" | "spotify" | "lastfm";

export type AvailableColors = "red" | "orange" | "amber" | "yellow" | "green" | "emerald" | "cyan" | "sky" | "blue" | "indigo" | "purple" | "pink" | "rose" | "white" | "black";
export type AvailableShapes = "horizontal" | "square" | "vertical";
export type AvailableTxtSizes = "sm" | "md" | "lg";

export type SearchAlbumsResponse = {
  "spotify"?: z.infer<typeof SpotifyAlbumSchema>[],
  "deezer"?: z.infer<typeof DeezerAlbumSchema>[],
  "lastfm"?: z.infer<typeof LastFmSearchAlbumSchema>[],
}


export type TopsterGridAlbum = z.infer<typeof LastFmSearchAlbumSchema> | null;

export type GridSize = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
