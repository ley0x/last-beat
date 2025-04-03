"use client";

import React, { useState } from 'react'

import { StatsContainer } from '@/components/music/stats-container';
import { AlbumSkeleton } from '@/components/music/album-skeleton';
import { ErrorStatus } from '@/components/_common/error-status';
import { Track } from '@/components/_common/track';

import { LastFmTopTracks } from '@/lib/zod/schemas';
import { Timeframe } from '@/lib/types';

import { timeframeAtom } from '@/lib/store';

import { useAtom } from 'jotai';
import {
  useQuery
} from '@tanstack/react-query'
import { MAX, MIN } from '@/lib/constances';
import { DataTable } from '@/components/table/data-table';
import { TrackColumns } from './columns';


type Props = {
  username: string
  viewMore?: boolean
}

const fetchUserTopTracks = async (username: string, timeframe: Timeframe, limit: number = MIN, page: number = 1) => {
  const url = new URL('/api/lastfm/top/tracks', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopTracks.array().parse(json.data);
  return data;
}

export const TopTracks = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<"grid" | "list">("list");

  const [limit] = useState(viewMore ? MIN : MAX);
  const { data: tracks, isPending, isError, error } = useQuery({ queryKey: ['top-tracks', username, timeframe, limit, page], queryFn: () => fetchUserTopTracks(username, timeframe, limit, page) });

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="tracks" viewMore={!!viewMore} setMode={setMode} mode={mode}>
        {Array(limit).fill(0).map((_, index) => (
          <AlbumSkeleton key={index} />
        ))}
      </StatsContainer >
    )
  }

  if (isError) {
    return <ErrorStatus message={error.message} />
  }

  return (
    <StatsContainer page={page} setPage={setPage} type="tracks" viewMore={!!viewMore} setMode={setMode} mode={mode}>
      {mode === "grid" && (
        <DataTable columns={TrackColumns} data={tracks} />
      )}
      {mode === "list" && (
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-evenly items-center">
          {tracks && tracks.map((track, index) => (
            <Track track={track} key={index} />
          ))}
        </div>
      )}
    </StatsContainer>
  )
}
