import React from 'react'
import Image from "next/image";
import { cn, findLargestImage } from '@/lib/utils';
import { z } from 'zod';
import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';
import { useAtom } from 'jotai';
import { topsterRoundCornersAtom } from '@/lib/store';

type TAlbum = z.infer<typeof LastFmSearchAlbumSchema>;

type Props = {
  album: TAlbum;
}

export const Album = ({ album }: Props) => {
  const [topsterRoundCorners] = useAtom(topsterRoundCornersAtom);
  return (
    <Image
      src={findLargestImage(album.image)}
      alt={album.name}
      width={120}
      height={120}
      className={cn("aspect-square object-cover w-full h-full", topsterRoundCorners && "rounded")}
      loading="lazy"
      unoptimized
    />
  )
}

