"use client";

import { useState } from "react";
import { z } from "zod";

import { GeniusSearchTrackSchema } from "@lib/schemas";

import { SearchResults } from "@lyrics-cards/search/search-results"
import { SearchBar } from "@lyrics-cards/search/searchbar"

export const Search = () => {
  const [foundTracks, setFoundTracks] = useState<z.infer<typeof GeniusSearchTrackSchema>[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SearchBar setFoundTracks={setFoundTracks} setLoading={setLoading} />
      <SearchResults loading={loading} foundTracks={foundTracks} />
    </div>
  )
}
