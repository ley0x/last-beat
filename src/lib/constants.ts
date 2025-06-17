import { AvailableColors, AvailableTxtSizes, GridDimension } from "@lib/types";

export const MIN = 8;
export const MAX = 80;

export const colors: Record<AvailableColors, string> = {
  "red": "bg-red-500",
  "orange": "bg-orange-500",
  "amber": "bg-amber-500",
  "yellow": "bg-yellow-500",
  "green": "bg-green-500",
  "emerald": "bg-emerald-500",
  "cyan": "bg-cyan-500",
  "sky": "bg-sky-500",
  "blue": "bg-blue-500",
  "indigo": "bg-indigo-500",
  "purple": "bg-purple-500",
  "pink": "bg-pink-500",
  "rose": "bg-rose-500",
  "white": "bg-neutral-50",
  "black": "bg-neutral-950",
}


export const sizeMap: Record<AvailableTxtSizes, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

export const quoteMap: Record<AvailableTxtSizes, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

export const bgColorMap: Record<AvailableColors, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
  white: "bg-neutral-50",
  black: "bg-neutral-950",
}


export const shapeStyle = {
  square: "size-96",
  horizontal: "w-96 h-72",
  vertical: "w-72 h-96",
}

export const MAX_TOPSTER_WIDTH = 10;
export const MAX_TOPSTER_HEIGHT = 10;
export const MIN_TOPSTER_WIDTH = 2;
export const MIN_TOPSTER_HEIGHT = 2;

// Grid configuration
export const GRID_DIMENSIONS: readonly GridDimension[] = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const GRID_CLASSES = {
  cols: {
    2: 'grid-cols-2',
    3: 'grid-cols-3', 
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10'
  } as const,
  rows: {
    2: 'grid-rows-2',
    3: 'grid-rows-3',
    4: 'grid-rows-4', 
    5: 'grid-rows-5',
    6: 'grid-rows-6',
    7: 'grid-rows-7',
    8: 'grid-rows-8',
    9: 'grid-rows-9',
    10: 'grid-rows-10'
  } as const
};

// Empty state messages
export const EMPTY_STATES = {
  noResults: 'Search for albums to add to your topster',
  allAdded: 'All albums are already in your topster',
  dropHere: 'Drop here'
} as const; 