"use client";

import { useState } from "react";
import { SearchResults } from "./search-results"
import { SearchBar } from "./searchbar"
import { GeniusSearchTrackSchema } from "@/lib/schemas";
import { z } from "zod";

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
