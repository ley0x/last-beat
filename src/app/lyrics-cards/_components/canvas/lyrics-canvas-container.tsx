'use client';

import React, { useCallback, useRef } from 'react';

import { useAtom } from 'jotai';
import slugify from 'slugify';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

import { lcBgColor, lcSelectedTrack, lcShape } from '@/lib/store';

import { cn } from '@/lib/utils';
import { AvailableColors } from '@/lib/types';

import { CanvasBackground } from './canvas-background';
import { LyricsCanvas } from './lyrics-canvas';

const shapeStyle = {
  square: "size-96",
  horizontal: "w-96 h-72",
  vertical: "w-72 h-96",
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

export const LyricsCanvasContainer = () => {

  const [shape] = useAtom(lcShape);
  const [bgColor] = useAtom(lcBgColor);

  const [selectedTrack] = useAtom(lcSelectedTrack);
  const ref = useRef<HTMLDivElement>(null);


  const handleExport = useCallback(() => {
    const getTrackName = () => {
      if (!selectedTrack) return "-";
      return selectedTrack.name;
    }

    const getTrackArtist = () => {
      if (!selectedTrack) return "-";
      return selectedTrack.artist?.name ?? "-";
    }

    if (!ref.current) return;
    toPng(ref.current, { cacheBust: true, pixelRatio: 1.5 })
      .then((dataUrl) => {
        const name = `${slugify(getTrackArtist(), { lower: true }) || 'artist'}-${slugify(getTrackName(), { lower: true }) || 'song'}-card.png`;
        download(dataUrl, name);
      })
      .catch(console.error);
  }, [selectedTrack]);

  return (
    <div
      ref={ref}
      onClick={handleExport}
      id="lyrics-canvas"
      className={cn("mx-auto relative cursor-pointer shadow-lg rounded-sm overflow-hidden", shapeStyle[shape], bgColorMap[bgColor])}>
      <LyricsCanvas />
      <CanvasBackground />
    </div>
  );
};
