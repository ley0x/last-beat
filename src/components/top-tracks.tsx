"use client";

import React from 'react'
import Header from './_common/header';
import { LastFmTopTracks } from '@/lib/zod/schemas';
import { Track } from './_common/track';
import { useTimeframe } from '@/hooks/useTimeframe';
import { Button } from './ui/button';
import { Ellipsis } from 'lucide-react';

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Timeframe } from '@/lib/types';
import { useAtom } from 'jotai';
import { timeframeAtom } from '@/lib/store';
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
  const router = useRouter();
  const params = useParams<{ username: string; }>()
  const time = useTimeframe();
  const [timeframe] = useAtom(timeframeAtom);

  const { data: tracks, isPending, isError, error } = useQuery({ queryKey: ['top-tracks', username, timeframe], queryFn: () => fetchUserTopTracks(username, timeframe) });
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Tracks</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {time}.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {tracks && tracks.map((track, index) => (
          <Track track={track} key={index} />
        ))}
      </div>
      {!!viewMore && (
        <div className="flex justify-end">
          <Button variant="outline" className="hover:cursor-pointer" onClick={() => router.push(`/stats/${params.username}/tracks`)}><span>View more</span><Ellipsis /> </Button>
        </div>
      )}
    </section>
  )
}
