"use client";

import React, { useState } from 'react'
import { useAtom } from 'jotai';

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
import { MAX, MIN } from '@/lib/constants';
import { fetchLastFmUserTopArtists } from '@/services/api/lastfm';

type Props = {
  username: string
  viewMore?: boolean
}

export const TopArtists = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom);

  const [mode, setMode] = useState<"grid" | "list">("list");
  const [page, setPage] = useState(1);
  const [limit] = useState(viewMore ? MIN : MAX);
  const { data: artists, isPending, isError, error } = useQuery({ queryKey: ['top-artists', username, timeframe, limit, page], queryFn: () => fetchLastFmUserTopArtists(username, timeframe, limit, page) });

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
