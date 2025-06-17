'use client';

import Image from 'next/image';

import { cn } from '@lib/utils';
import { useAtom } from 'jotai';
import { lcBlur, lcBrightness, lcGrayscale, lcOpacity, lcSelectedTrack, lcShowBgImage } from '@lib/store';

export const LyricsCanvasBgImage = () => {
  const [selectedTrack] = useAtom(lcSelectedTrack);
  const [grayscale] = useAtom(lcGrayscale);
  const [blur] = useAtom(lcBlur);
  const [brightness] = useAtom(lcBrightness);
  const [opacity] = useAtom(lcOpacity);
  const [showBgImage] = useAtom(lcShowBgImage);

  if (!selectedTrack || !showBgImage) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={selectedTrack.header_image_thumbnail_url}
        alt=""
        width={100}
        height={100}
        className={cn("object-cover w-full h-full", {
          "grayscale": grayscale,
          "opacity-50": opacity,
          "blur-xs": blur,
          "brightness-50": brightness,
        })}
        unoptimized
        loading="lazy"
      />
    </div>
  )
}
