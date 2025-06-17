import { LastFmTopAlbums } from '@lib/schemas'
import React from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@lib/utils';

type Props = {
  album: z.infer<typeof LastFmTopAlbums>
}

export const Album = ({ album }: Props) => {
  const image = findLargestImage(album.image);

  return (
    <div className="shrink-0 w-34 flex flex-col justify-start items-center h-50">
      <Link href={album.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-34 w-34 object-cover rounded-sm shadow" src={image === "#" ? "/placeholder.webp" : image} />
          <AvatarFallback>{album.name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="w-full">
        <Header className="text-xs mb-0 truncate" as="h3"><span className="text-muted-foreground">{album['@attr'].rank}.</span> {album.name}</Header>
        <Header className="text-xs mt-0 mb-0 line-clamp-2 text-muted-foreground font-normal" as="h4">{album.playcount} plays • {album.artist.name}</Header>
      </div>
    </div>
  )
}
