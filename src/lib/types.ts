import { z } from "zod";
import { DeezerAlbumSchema, LastFmSearchAlbumSchema, LastFmTopTracks, SpotifyAlbumSchema, TimeframeSchema } from "@lib/schemas";

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

// Core types
export type Album = z.infer<typeof LastFmSearchAlbumSchema>;
export type TopsterAlbum = Album | null;

// Grid types
export type GridDimension = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface GridDimensions {
  width: GridDimension;
  height: GridDimension;
}

export interface GridPosition {
  row: number;
  col: number;
  index: number;
}

// Component props
export interface AlbumProps {
  album: Album;
}

export interface DraggableAlbumProps extends AlbumProps {
  id: string;
}

export interface SortableCellProps {
  id: string;
  album: TopsterAlbum;
}

export interface DroppableCellProps {
  id: string;
}

export interface SearchBarProps {
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}

// DnD types
export interface DragData {
  album: Album;
  sourceType: 'search' | 'grid';
  sourceIndex?: number;
}

export interface DropResult {
  sourceIndex: number;
  targetIndex: number;
  album: Album;
  operation: 'move' | 'add';
} 