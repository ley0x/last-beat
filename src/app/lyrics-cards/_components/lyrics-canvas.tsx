'use client';

import React, { useCallback, useRef } from 'react';
import Image from 'next/image';

import { useAtom } from 'jotai';
import slugify from 'slugify';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

import { lcBgColor, lcLyricsBackground, lcShape, lcTrackArtist, lcTrackName } from '@/lib/store';

import { Lyrics } from './lyrics';
import { cn } from '@/lib/utils';
import { AvailableColors } from '@/lib/types';

const shapeStyle = {
  square: "aspect-square",
  horizontal: "aspect-3/2",
  vertical: "aspect-2/3",
}

const bgColorMap: Record<AvailableColors, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
  white: "bg-neutral-50",
  black: "bg-neutral-950",
}

export const LyricsCanvas = () => {

  const [shape] = useAtom(lcShape);
  const [bgColor] = useAtom(lcBgColor);

  const [img] = useAtom(lcLyricsBackground);
  const [artist] = useAtom(lcTrackArtist);
  const [track] = useAtom(lcTrackName);
  const ref = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(() => {
    if (!ref.current) return;
    toPng(ref.current, { cacheBust: true, pixelRatio: 1.5 })
      .then((dataUrl) => {
        const name = `${slugify(artist, { lower: true }) || 'artist'}-${slugify(track, { lower: true }) || 'song'}-card.png`;
        download(dataUrl, name);
      })
      .catch(console.error);
  }, [artist, track]);

  return (
    <div
      ref={ref}
      onClick={handleExport}
      id="lyrics-canvas"
      className={cn("relative cursor-pointer shadow-lg rounded-sm overflow-hidden max-w-full w-md", shapeStyle[shape], bgColorMap[bgColor])}>
      <Lyrics />
      {img && (
        <div className="absolute inset-0 z-0">
          <Image
            src={img}
            alt="Illustration to lyrics"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};
