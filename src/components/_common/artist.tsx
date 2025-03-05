import { LastFmTopArtists } from '@/lib/zod/schemas'
import React from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';

type Props = {
  artist: z.infer<typeof LastFmTopArtists>
}

export const Artist = ({ artist }: Props) => {

  const findLargestImage = (data: z.infer<typeof LastFmTopArtists>) => {
    const images = data.image;
    let largestImage = images[0]['#text'];
    for (let i = 1; i < images.length; i++) {
      if (images[i]['#text'].length > largestImage.length) {
        largestImage = images[i]['#text'];
      }
    }
    return largestImage;
  }
  return (
    <div className="w-42 flex flex-col justify-center items-center">
      <Link href={artist.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-full shadow" src={findLargestImage(artist)} />
          <AvatarFallback>{artist.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center" as="h3">{artist['@attr'].rank}. {artist.name}</Header>
    </div>
  )
}
