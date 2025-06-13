import { z } from 'zod';
import { LastFmSearchAlbumSchema } from '@/lib/schemas';

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