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


type Props = {
  username: string
  viewMore?: boolean
}

const fetchUserTopTracks = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1) => {
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
  const [limit] = useState(viewMore ? 10 : 50);

  const { data: tracks, isPending, isError, error } = useQuery({ queryKey: ['top-tracks', username, timeframe], queryFn: () => fetchUserTopTracks(username, timeframe) });

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="tracks" viewMore={!!viewMore}>
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
    <StatsContainer page={page} setPage={setPage} type="tracks" viewMore={!!viewMore}>
      {tracks && tracks.map((track, index) => (
        <Track track={track} key={index} />
      ))}
    </StatsContainer>
  )
}
