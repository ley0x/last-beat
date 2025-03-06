"use client";

import React from 'react'
import Header from './_common/header';
import { z } from 'zod';
import { LastFmTopArtists } from '@/lib/zod/schemas';
import { Artist } from './_common/artist';
import { Button } from './ui/button';
import { Ellipsis } from 'lucide-react';
import { useTimeframe } from '@/hooks/useTimeframe';

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Controls } from './controls';

type Props = {
  artists: z.infer<typeof LastFmTopArtists>[]
  viewMore?: boolean
}

export const TopArtists = ({ artists, viewMore }: Props) => {
  const router = useRouter();
  const params = useParams<{ username: string; }>()
  const timeframe = useTimeframe();
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <div className="w-full flex flew-wrap gap-2 items-center justify-between">
          <Header as="h2">Top Artists</Header>
          <Controls />
        </div>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {timeframe}.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {artists.map((artist, index) => (
          <Artist artist={artist} key={index} />
        ))}
      </div>
      {!!viewMore && (
        <div className="flex justify-end">
          <Button onClick={() => router.push(`/stats/${params.username}/artists`)} variant="outline" className="hover:cursor-pointer"><span>View more</span><Ellipsis /> </Button>
        </div>
      )}
    </section>
  )
}
