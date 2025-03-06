"use client";

import React from 'react'
import Header from './_common/header';
import { LastFmTopTracks } from '@/lib/zod/schemas';
import { z } from 'zod';
import { Track } from './_common/track';
import { useTimeframe } from '@/hooks/useTimeframe';
import { Button } from './ui/button';
import { Ellipsis } from 'lucide-react';

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'


type Props = {
  tracks: z.infer<typeof LastFmTopTracks>[]
  viewMore?: boolean
}

export const TopTracks = ({ tracks, viewMore }: Props) => {
  const router = useRouter();
  const params = useParams<{ username: string; }>()
  const timeframe = useTimeframe();
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Tracks</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {timeframe}.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {tracks.map((track, index) => (
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
