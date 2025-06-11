import { GridDimension } from '../_types';

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