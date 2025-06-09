"use client";

import React, { useState } from "react";
import { z } from "zod";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";

import { SearchBar } from "./searchbar";
import { DraggableAlbum } from "./draggable-album";
import { getCellId } from "@/lib/utils";
import { useAtom } from "jotai";
import { gridAlbumsAtom } from "@/lib/store";

export function TopsterAlbumSearch() {
  const [albums, setAlbums] = useState<z.infer<typeof LastFmSearchAlbumSchema>[]>([]);
  const [topsterAlbums] = useAtom(gridAlbumsAtom);

  const filteredAlbums = albums.filter(album => 
    !topsterAlbums.some(topsterAlbum => topsterAlbum?.url === album.url)
  );

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex-shrink-0 p-3 border-b">
        <SearchBar setAlbums={setAlbums} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {filteredAlbums.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-start">
            {filteredAlbums.map((album, index) => (
              <DraggableAlbum 
                album={album} 
                id={getCellId(album, index)} 
                key={getCellId(album, index)} 
              />
            ))}
          </div>
        ) : albums.length > 0 ? (
          <div className="text-center text-muted-foreground py-8">
            All albums are already in your topster
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Search for albums to add to your topster
          </div>
        )}
      </div>
    </div>
  );
} 
