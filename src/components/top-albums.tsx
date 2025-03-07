"use client";

import React, { useState } from 'react'
import { LastFmTopAlbums } from '@/lib/zod/schemas';

import { Album } from './_common/album';
import { Timeframe } from '@/lib/types';
import { useAtom } from 'jotai';
import { timeframeAtom } from '@/lib/store';

import {
  useQuery
} from '@tanstack/react-query'
import { AlbumSkeleton } from './music/album-skeleton';
import { StatsContainer } from './music/stats-container';
import { ErrorStatus } from './_common/error-status';

type Props = {
  username: string
  viewMore?: boolean
}


const fetchUserTopAlbums = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1) => {
  const url = new URL('/api/lastfm/top/albums', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopAlbums.array().parse(json.data);
  return data;
}

export const TopAlbums = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom);

  const [page, setPage] = useState(1);
  const [limit] = useState(viewMore ? 10 : 50);
  const { data: albums, isPending, isError, error } = useQuery({ queryKey: ['top-albums', username, timeframe, limit, page], queryFn: () => fetchUserTopAlbums(username, timeframe, limit, page) });

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="albums" viewMore={!!viewMore}>
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
    <StatsContainer page={page} setPage={setPage} type="albums" viewMore={!!viewMore}>
      {albums && albums.map((album, index) => (
        <Album album={album} key={index} />
      ))}
    </StatsContainer >
  )
}
