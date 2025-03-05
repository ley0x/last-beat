import { LastFmTopArtists } from '@/lib/zod/schemas'
import React from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@/lib/utils';

type Props = {
  artist: z.infer<typeof LastFmTopArtists>
}

export const Artist = ({ artist }: Props) => {

  return (
    <div className="w-42 flex flex-col justify-center items-center">
      <Link href={artist.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-full shadow" src={findLargestImage(artist.image)} />
          <AvatarFallback>{artist.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center" as="h3">{artist['@attr'].rank}. {artist.name}</Header>
    </div>
  )
}
