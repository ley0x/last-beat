import { LastFmTopAlbums } from '@/lib/zod/schemas'
import React from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@/lib/utils';

type Props = {
  album: z.infer<typeof LastFmTopAlbums>
}

export const Album = ({ album }: Props) => {
  const image = findLargestImage(album.image);

  return (
    <div className="w-42 flex flex-col justify-start items-center h-50">
      <Link href={album.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-sm shadow" src={image === "#" ? "/placeholder.webp" : image} />
          <AvatarFallback>{album.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center line-clamp-2" as="h4">{album['@attr'].rank}. {album.name}</Header>
    </div>
  )
}
