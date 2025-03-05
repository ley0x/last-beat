"use client";

import React from 'react'
import Header from './_common/header';
import { z } from 'zod';
import { LastFmTopArtists } from '@/lib/zod/schemas';
import { Artist } from './_common/artist';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Ellipsis, Grid3x3, Share } from 'lucide-react';
import { useTimeframe } from '@/hooks/useTimeframe';

type Props = {
  artists: z.infer<typeof LastFmTopArtists>[]
}

export const TopArtists = ({ artists }: Props) => {
  const timeframe = useTimeframe();
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <div className="w-full flex flew-wrap gap-2 items-center justify-between">
          <Header as="h2">Top Artists</Header>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <Grid3x3 /> </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ChevronLeft /> </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ChevronRight /> </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <Share /> </Button>
          </div>
        </div>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {timeframe}.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {artists.map((artist, index) => (
          <Artist artist={artist} key={index} />
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="outline" className="hover:cursor-pointer"><span>View more</span><Ellipsis /> </Button>
      </div>
    </section>
  )
}
