"use client";

import React, { useState } from 'react'
import Header from './_common/header';
import { LastFmTopAlbums } from '@/lib/zod/schemas';

import { Album } from './_common/album';
import { Button } from './ui/button';
import { Ellipsis } from 'lucide-react';
import { useTimeframe } from '@/hooks/useTimeframe';

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Controls } from './controls';
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
  const router = useRouter();
  const params = useParams<{ username: string; }>()
  const time = useTimeframe();
  const [timeframe] = useAtom(timeframeAtom);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(viewMore ? 10 : 50);
  const { data: albums, isPending, isError, error } = useQuery({ queryKey: ['top-albums', username, timeframe, limit, page], queryFn: () => fetchUserTopAlbums(username, timeframe, limit, page) });
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <div className="w-full flex flew-wrap gap-2 items-center justify-between">
          <Header as="h2">Top Albums</Header>
          <Controls setPage={setPage} page={page} />
        </div>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {time}.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {albums && albums.map((album, index) => (
          <Album album={album} key={index} />
        ))}
      </div>
      {!!viewMore && (
        <div className="flex justify-end">
          <Button onClick={() => router.push(`/stats/${params.username}/albums`)} variant="outline" className="hover:cursor-pointer"><span>View more</span><Ellipsis /> </Button>
        </div>
      )}
    </section>
  )
}
