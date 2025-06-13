import React from 'react';
import Image from "next/image";
import { useAtom } from 'jotai';

import { cn, findLargestImage } from '@/lib/utils';
import { topsterRoundCornersAtom } from '@/lib/store';
import { AlbumProps } from '../_types';

/**
 * Album component that displays an album cover image
 */
export const Album = ({ album }: AlbumProps) => {
  const [topsterRoundCorners] = useAtom(topsterRoundCornersAtom);

  return (
    <Image
      src={findLargestImage(album.image)}
      alt={`${album.name} by ${album.artist}`}
      width={120}
      height={120}
      className={cn(
        "aspect-square object-scale-down w-full h-full",
        {
          "rounded": topsterRoundCorners
        }
      )}
      loading="lazy"
      unoptimized
    />
  );
};

