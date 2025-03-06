"use client";

import React from 'react'
import Header from './_common/header';
import { LastFmTopAlbums } from '@/lib/zod/schemas';
import { z } from 'zod';

import { Album } from './_common/album';
import { Button } from './ui/button';
import { Ellipsis } from 'lucide-react';
import { useTimeframe } from '@/hooks/useTimeframe';

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Controls } from './controls';

type Props = {
  albums: z.infer<typeof LastFmTopAlbums>[]
  viewMore?: boolean
}

export const TopAlbums = ({ albums, viewMore }: Props) => {
  const router = useRouter();
  const params = useParams<{ username: string; }>()
  const timeframe = useTimeframe();
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <div className="w-full flex flew-wrap gap-2 items-center justify-between">
          <Header as="h2">Top Albums</Header>
          <Controls />
        </div>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {timeframe}.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {albums.map((album, index) => (
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
