'use client';

import { useState } from "react"
import { z } from "zod"

import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas"

import { SearchBar } from "./searchbar"
import { Album } from "./album"

export const Covers = () => {
  const [albums, setAlbums] = useState<z.infer<typeof LastFmSearchAlbumSchema>[]>([]);
  return (
    <div className="flex flex-col items-center space-y-4">
      <SearchBar setAlbums={setAlbums} />
      <div className="flex justify-around flex-wrap gap-2">
        {albums.filter(album => album.image.some(image => image['#text'].length > 0)).map((album, index) => (
          <Album
            album={album}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
