"use client";

import React, { useState } from "react";
import { z } from "zod";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";

import Divider from "@/components/_common/divider";

import { Album } from "./album";
import { SearchBar } from "./searchbar";

export function TopsterAlbumSearch() {
  const [albums, setAlbums] = useState<z.infer<typeof LastFmSearchAlbumSchema>[]>([]);

  return (
    <div className="w-96 flex flex-col gap-2 max-h-full p-3 border">
      <SearchBar setAlbums={setAlbums} />
      <Divider />
      {albums && albums.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 overflow-y-scroll">
          {albums.map((album, index) => (
            <Album album={album} key={index} />
          ))}
        </div>
      )
      }
    </div >
  );
} 
