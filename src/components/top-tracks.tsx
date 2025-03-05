"use client";

import React from 'react'
import Header from './_common/header';
import { LastFmTopTracks } from '@/lib/zod/schemas';
import { z } from 'zod';
import { Track } from './_common/track';

type Props = {
  tracks: z.infer<typeof LastFmTopTracks>[]
}

export const TopTracks = ({ tracks }: Props) => {
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Tracks</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top tracks from the last 7 days.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {tracks.map((track, index) => (
          <Track track={track} key={index} />
        ))}
      </div>
    </section>
  )
}
