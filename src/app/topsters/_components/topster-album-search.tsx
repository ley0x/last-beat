"use client";

import React, { useState } from "react";
import { findLargestImage } from "@/lib/utils";
import Image from "next/image";
import { z } from "zod";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";
import { SearchBar } from "./searchbar";
import Divider from "@/components/_common/divider";

export function TopsterAlbumSearch() {
  const [albums, setAlbums] = useState<z.infer<typeof LastFmSearchAlbumSchema>[]>([]);

  return (
    <div className="w-96 flex flex-col gap-2 max-h-full p-3 border">
      <SearchBar setAlbums={setAlbums} />
      <Divider />
      {albums && albums.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 overflow-y-scroll">
          {albums.map((album, index) => (
            <Image
              src={findLargestImage(album.image)}
              key={index}
              alt={`Cover of the album ${album.name}`}
              height={120}
              width={120}
              loading="lazy"
              unoptimized
              className="aspect-square"
            />
          ))}
        </div>
      )
      }
    </div >
  );
} 
