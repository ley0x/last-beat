"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAtom } from 'jotai';

import { cn, findLargestImage } from '@lib/utils';
import { topsterRoundCornersAtom } from '@lib/store';
import { AlbumProps } from '@lib/types';

const PLACEHOLDER = "/placeholder.svg";

function isValidImageUrl(url: string) {
  return url && url !== "#" && url.startsWith("https");
}

/**
 * Album component that displays an album cover image
 */
export const Album = ({ album }: AlbumProps) => {
  const [topsterRoundCorners] = useAtom(topsterRoundCornersAtom);
  const image = findLargestImage(album.image);
  const [img, setImg] = useState(
    isValidImageUrl(image) ? image : PLACEHOLDER
  );

  const handleError = () => {
    console.warn("Image error", album.name, album.artist, image);
    setImg(PLACEHOLDER);
  };

  useEffect(() => {
    setImg(isValidImageUrl(image) ? image : PLACEHOLDER);
  }, [image]);

  if(img === PLACEHOLDER) return null;

  return (
    <Image
      src={img}
      alt={`${album.name} by ${album.artist}`}
      width={120}
      height={120}
      onError={handleError}
      className={cn(
        "relative aspect-square object-scale-down w-full h-full",
        {
          "rounded": topsterRoundCorners,
          "opacity-5": img === PLACEHOLDER
        }
      )}
      loading="lazy"
      unoptimized
    />
  );
};

