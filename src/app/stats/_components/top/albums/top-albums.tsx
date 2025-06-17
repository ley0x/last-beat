"use client";

import React, { useState } from 'react'

import { useAtom } from 'jotai';

import { Album } from '@common/album';
import { timeframeAtom } from '@lib/store';

import {
  useQuery
} from '@tanstack/react-query'
import { AlbumSkeleton } from '@common/album-skeleton';
import { StatsContainer } from '@stats/music/stats-container';
import { ErrorStatus } from '@common/error-status';
import { DataTable } from '@stats/table/data-table';
import { AlbumsColumns } from '@stats/top/albums/columns';
import { MAX, MIN } from '@lib/constants';
import { fetchLastFmUserTopAlbums } from '@services/api/lastfm';

type Props = {
  username: string
  viewMore?: boolean
}


export const TopAlbums = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom);

  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<"grid" | "list">("list");
  const [limit] = useState(viewMore ? MIN : MAX);
  const { data: albums, isPending, isError, error } = useQuery({ queryKey: ['top-albums', username, timeframe, limit, page], queryFn: () => fetchLastFmUserTopAlbums(username, timeframe, limit, page) });

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="albums" viewMore={!!viewMore} setMode={setMode} mode={mode}>
        {Array(limit).fill(0).map((_, index) => (
          <AlbumSkeleton key={index} />
        ))}
      </StatsContainer >
    )
  }

  if (isError) {
    return <ErrorStatus className="w-34" message={error.message} />
  }

  return (
    <StatsContainer page={page} setPage={setPage} type="albums" viewMore={!!viewMore} setMode={setMode} mode={mode}>
      {mode === "grid" && (
        <DataTable columns={AlbumsColumns} data={albums} />
      )}
      {mode === "list" && (
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-evenly items-center">
          {albums && albums?.map((album, index) => (
            <Album album={album} key={index} />
          ))}
        </div>
      )}
    </StatsContainer >
  )
}
