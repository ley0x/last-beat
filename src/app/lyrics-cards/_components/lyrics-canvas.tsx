'use client';

import React, { useCallback, useRef } from 'react';
import Image from 'next/image';

import { useAtom } from 'jotai';
import slugify from 'slugify';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

import { lcLyricsBackground, lcTrackArtist, lcTrackName } from '@/lib/store';

import { Lyrics } from './lyrics';

export const LyricsCanvas = () => {
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
      className="relative bg-primary cursor-pointer shadow-lg rounded-sm max-w-md w-full sm:w-[8xl] h-80 overflow-hidden">
      <Lyrics size="lg" />
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
