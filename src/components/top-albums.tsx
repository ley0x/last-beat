"use client";

import React from 'react'
import Header from './_common/header';
import { LastFmTopAlbums } from '@/lib/zod/schemas';
import { z } from 'zod';

import { Album } from './_common/album';

type Props = {
  albums: z.infer<typeof LastFmTopAlbums>[]
}

export const TopAlbums = ({ albums }: Props) => {
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Albums</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the last 7 days.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {albums.map((album, index) => (
          <Album album={album} key={index} />
        ))}
      </div>
    </section>
  )
}
