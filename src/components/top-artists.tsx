"use client";

import React, { useState } from 'react'
import { LastFmTopArtists } from '@/lib/zod/schemas';
import { Artist } from '@/components/_common/artist';
import { Timeframe } from '@/lib/types';

import { useAtom } from 'jotai';
import { timeframeAtom } from '@/lib/store';
import { StatsContainer } from '@/components/music/stats-container';
import { ArtistSkeleton } from '@/components/music/artist-skeleton';
import { ErrorStatus } from '@/components/_common/error-status';

import {
  useQuery
} from '@tanstack/react-query'

type Props = {
  username: string
  viewMore?: boolean
}

const fetchUserTopArtists = async (username: string, timeframe: Timeframe, limit: number = 10, page: number = 1) => {
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

  const [page, setPage] = useState(1);
  const [limit] = useState(viewMore ? 10 : 50);
  const { data: artists, isPending, isError, error } = useQuery({ queryKey: ['top-artists', username, timeframe, limit, page], queryFn: () => fetchUserTopArtists(username, timeframe, limit, page) });

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="artists" viewMore={!!viewMore}>
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
    <StatsContainer page={page} setPage={setPage} type="artists" viewMore={!!viewMore}>
      {artists && artists.map((artist, index) => (
        <Artist artist={artist} key={index} />
      ))}
    </StatsContainer>
  )
}
