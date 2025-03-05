"use client";

import React from 'react'
import Header from './_common/header';
import { z } from 'zod';
import { LastFmTopTags } from '@/lib/zod/schemas';

import { Badge } from "@/components/ui/badge"

type Props = {
  tags: z.infer<typeof LastFmTopTags>[]
}

export const TopTags = ({ tags }: Props) => {
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Genres</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top genres from the last 7 days.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">
        {tags.map((tag, i) => (<>
          <Badge variant="outline">{tag.name}</Badge>
        </>))}
      </div>
    </section>
  )
}
