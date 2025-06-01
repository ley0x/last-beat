import React from 'react'
import Image from "next/image";
import { findLargestImage } from '@/lib/utils';
import { z } from 'zod';
import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';

type TAlbum = z.infer<typeof LastFmSearchAlbumSchema>;

type Props = {
  album: TAlbum;
}

export const Album = ({ album }: Props) => {
  return (
    <Image
      src={findLargestImage(album.image)}
      alt={album.name}
      width={120}
      height={120}
      className="aspect-square object-cover w-full h-full"
      loading="lazy"
      unoptimized
    />
  )
}

