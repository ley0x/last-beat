import { LastFmTopTracks } from '@/lib/zod/schemas'
import React from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@/lib/utils';

type Props = {
  track: z.infer<typeof LastFmTopTracks>
}

export const Track = ({ track }: Props) => {

  return (
    <div className="w-42 flex flex-col justify-start items-center h-50">
      <Link href={track.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-sm shadow" src={findLargestImage(track.image)} />
          <AvatarFallback>{track.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center line-clamp-2" as="h4">{track['@attr'].rank}. {track.name}</Header>
    </div>
  )
}
