"use client";

import React from 'react'
import Header from './_common/header';
import { z } from 'zod';
import { LastFmTopArtists } from '@/lib/zod/schemas';
import { Artist } from './_common/artist';

type Props = {
  artists: z.infer<typeof LastFmTopArtists>[]
}

export const TopArtists = ({ artists }: Props) => {
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Artists</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top artists from the last 7 days.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {artists.map((artist, index) => (
          <Artist artist={artist} key={index} />
        ))}
      </div>
    </section>
  )
}
