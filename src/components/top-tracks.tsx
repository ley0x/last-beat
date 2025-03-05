"use client";

import React from 'react'
import Header from './_common/header';
import { LastFmTopTracks } from '@/lib/zod/schemas';
import { z } from 'zod';
import { Track } from './_common/track';
import { useTimeframe } from '@/hooks/useTimeframe';

type Props = {
  tracks: z.infer<typeof LastFmTopTracks>[]
}

export const TopTracks = ({ tracks }: Props) => {
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
    </section>
  )
}
