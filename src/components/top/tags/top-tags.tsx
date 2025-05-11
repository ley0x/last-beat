"use client";

import React from 'react'
import Header from '@/components/_common/header';
import { z } from 'zod';
import { LastFmTopTags } from '@/lib/zod/schemas';

import { Badge } from "@/components/ui/badge"
import { useTimeframe } from '@/hooks/useTimeframe';

type Props = {
  tags: z.infer<typeof LastFmTopTags>[]
}

export const TopTags = ({ tags }: Props) => {
  const timeframe = useTimeframe();
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Genres</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the {timeframe}.</Header>
      </div>
      <div className="flex flex-wrap gap-1 justify-around items-center">
        {tags.length === 0 && <Header as="h5" className="text-gray-400 font-normal">No genres found.</Header>}
        {tags.map((tag, i) => (
          <Badge variant="outline" key={i}>{tag.name}</Badge>
        ))}
      </div>
    </section>
  )
}
