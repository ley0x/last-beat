import { TopsterAlbum, Album } from '../_types';

/**
 * Finds the index of a cell by its ID
 */
export const findCellIndex = (albums: TopsterAlbum[], cellId: string): number => {
  return albums.findIndex((item, i) => {
    const expectedId = item ? item.url : `empty-${i}`;
    return expectedId === cellId;
  });
};


/**
 * Filters out albums that are already in the grid
 */
export const filterAvailableAlbums = (searchResults: Album[], gridAlbums: TopsterAlbum[]): Album[] => {
  return searchResults.filter(album =>
    !gridAlbums.some(gridAlbum => gridAlbum?.url === album.url)
  );
};
