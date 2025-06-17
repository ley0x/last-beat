'use client';

import { useAtom } from 'jotai';
import slugify from 'slugify';
import { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { GlowingEffect } from '@components/ui/glowing-effect';

import { bgColorMap, shapeStyle } from '@lib/constants';

import { lcBgColor, lcSelectedTrack, lcShape } from '@lib/store';

import { cn } from '@lib/utils';

import { CanvasBackground } from './canvas-background';
import { LyricsCanvas } from './lyrics-canvas';
import { Watermark } from './watermark';

export const LyricsCanvasContainer = () => {

  const [shape] = useAtom(lcShape);
  const [bgColor] = useAtom(lcBgColor);

  const [selectedTrack] = useAtom(lcSelectedTrack);
  const ref = useRef<HTMLDivElement>(null);


  const handleExport = useCallback(() => {
    const getTrackName = () => {
      if (!selectedTrack) return "-";
      return selectedTrack.title;
    }

    const getTrackArtist = () => {
      if (!selectedTrack) return "-";
      return selectedTrack.artist_names ?? "-";
    }

    if (!ref.current) return;
    toPng(ref.current, { cacheBust: true, pixelRatio: 2, skipFonts: true })
      .then((dataUrl) => {
        const name = `${slugify(getTrackArtist(), { lower: true }) || 'artist'}-${slugify(getTrackName(), { lower: true }) || 'song'}-card.png`;
        download(dataUrl, name);
      })
      .catch(console.error);
  }, [selectedTrack]);

  return (
    <div className="w-min flex flex-col gap-2 mx-auto">
      <li className={cn("min-h-[14rem] list-none")}>
        <div className="relative h-full rounded-sm border-[0.75px] border-border p-2 md:rounded-sm md:p-3">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div
            ref={ref}
            onClick={handleExport}
            id="lyrics-canvas"
            className={cn("mx-auto relative cursor-pointer shadow-lg rounded-sm overflow-hidden",
              shapeStyle[shape],
              bgColorMap[bgColor])}
          >
            <Watermark className="absolute top-2 right-2 z-50" />
            <LyricsCanvas />
            <CanvasBackground />
          </div>
        </div>
      </li>
    </div >
  );
};
