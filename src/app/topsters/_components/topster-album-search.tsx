"use client";

import React, { useState } from "react";
import { z } from "zod";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";

import Divider from "@/components/_common/divider";

import { SearchBar } from "./searchbar";
import { DraggableAlbum } from "./draggable-album";
import { getCellId } from "@/lib/utils";
import { useAtom } from "jotai";
import { gridAlbumsAtom } from "@/lib/store";

export function TopsterAlbumSearch() {
  const [albums, setAlbums] = useState<z.infer<typeof LastFmSearchAlbumSchema>[]>([]);
  const [topsterAlbums] = useAtom(gridAlbumsAtom);

  return (
    <div className="w-96 flex flex-col gap-2 max-h-full p-3 border border-red-500">
      <SearchBar setAlbums={setAlbums} />
      <Divider />
      {albums && albums.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 overflow-y-scroll">
          {albums.filter(album => !topsterAlbums.some(topsterAlbum => topsterAlbum?.url === album.url)).map((album, index) => (
            <DraggableAlbum album={album} id={getCellId(album, index)} key={getCellId(album, index)} />
          ))}
        </div>
      )
      }
    </div >
  );
} 
