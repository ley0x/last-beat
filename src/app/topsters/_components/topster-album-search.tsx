"use client";

import React, { useState } from "react";
import { useAtom } from "jotai";

import { getCellId } from "@/lib/utils";
import { gridAlbumsAtom } from "@/lib/store";
import { Album } from "@/lib/types";
import { filterAvailableAlbums } from "@/lib/utils";
import { EMPTY_STATES } from "@/lib/constants";
import { SearchBar } from "./searchbar";
import { DraggableAlbum } from "./draggable-album";

/**
 * Album search component that allows users to search and drag albums into the topster
 */
export const TopsterAlbumSearch = () => {
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [topsterAlbums] = useAtom(gridAlbumsAtom);

  const availableAlbums = filterAvailableAlbums(searchResults, topsterAlbums);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SearchHeader setAlbums={setSearchResults} />
      <SearchResults albums={availableAlbums} hasResults={searchResults.length > 0} />
    </div>
  );
};

/**
 * Search header component containing the search bar
 */
interface SearchHeaderProps {
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}

const SearchHeader = ({ setAlbums }: SearchHeaderProps) => (
  <div className="flex-shrink-0 p-3 border-b">
    <SearchBar setAlbums={setAlbums} />
  </div>
);

/**
 * Search results component that displays available albums
 */
interface SearchResultsProps {
  albums: Album[];
  hasResults: boolean;
}

const SearchResults = ({ albums, hasResults }: SearchResultsProps) => (
  <div className="flex-1 max-h-96 overflow-y-auto p-2">
    {albums.length > 0 ? (
      <AlbumGrid albums={albums} />
    ) : (
      <EmptyState hasResults={hasResults} />
    )}
  </div>
);

/**
 * Grid of draggable albums
 */
interface AlbumGridProps {
  albums: Album[];
}

const AlbumGrid = ({ albums }: AlbumGridProps) => (
  <div className="flex flex-wrap justify-start gap-1">
    {albums.map((album, index) => (
      <DraggableAlbum
        album={album}
        id={getCellId(album, index)}
        key={getCellId(album, index)}
      />
    ))}
  </div>
);

/**
 * Empty state component
 */
interface EmptyStateProps {
  hasResults: boolean;
}

const EmptyState = ({ hasResults }: EmptyStateProps) => (
  <div className="text-center text-muted-foreground py-8">
    {hasResults ? EMPTY_STATES.allAdded : EMPTY_STATES.noResults}
  </div>
); 
