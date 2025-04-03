"use client";

import React, { useState } from 'react'
import { useAtom } from 'jotai';

import { LastFmTopArtists } from '@/lib/zod/schemas';
import { Timeframe } from '@/lib/types';

import { timeframeAtom } from '@/lib/store';
import { Artist } from '@/components/_common/artist';
import { StatsContainer } from '@/components/music/stats-container';
import { ArtistSkeleton } from '@/components/music/artist-skeleton';
import { ErrorStatus } from '@/components/_common/error-status';

import {
  useQuery
} from '@tanstack/react-query'
import { DataTable } from '@/components/table/data-table';
import { ArtistsColumns } from './columns';
import { MAX, MIN } from '@/lib/constances';

type Props = {
  username: string
  viewMore?: boolean
}

const fetchUserTopArtists = async (username: string, timeframe: Timeframe, limit: number = MIN, page: number = 1) => {
  const url = new URL('/api/lastfm/top/artists', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopArtists.array().parse(json.data);
  return data;
}

export const TopArtists = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom);

  const [mode, setMode] = useState<"grid" | "list">("list");
  const [page, setPage] = useState(1);
  const [limit] = useState(viewMore ? MIN : MAX);
  const { data: artists, isPending, isError, error } = useQuery({ queryKey: ['top-artists', username, timeframe, limit, page], queryFn: () => fetchUserTopArtists(username, timeframe, limit, page) });

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="artists" viewMore={!!viewMore} setMode={setMode} mode={mode}>
        {Array(limit).fill(0).map((_, index) => (
          <ArtistSkeleton key={index} />
        ))}
      </StatsContainer >
    )
  }

  if (isError) {
    return <ErrorStatus message={error.message} />
  }

  return (
    <StatsContainer page={page} setPage={setPage} type="artists" viewMore={!!viewMore} setMode={setMode} mode={mode}>
      {mode === "grid" && (
        <DataTable columns={ArtistsColumns} data={artists} />
      )}
      {mode === "list" && (
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-evenly items-center">
          {artists && artists.map((artist, index) => (
            <Artist artist={artist} key={index} />
          ))}
        </div>
      )}
    </StatsContainer>
  )
}
