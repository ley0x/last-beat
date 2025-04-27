'use client';

import React, { useCallback, useRef } from 'react';

import { useAtom } from 'jotai';
import slugify from 'slugify';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

import { lcBgColor, lcBlur, lcBrightness, lcCenterText, lcGrayscale, lcOpacity, lcSelectedTrack, lcShape, lcShowBgImage, lcShowCredits, lcShowQuotes, lcShowWatermark, lcTxtColor, lcTxtSize } from '@/lib/store';

import { cn } from '@/lib/utils';

import { CanvasBackground } from './canvas-background';
import { LyricsCanvas } from './lyrics-canvas';
import { CustomizeCard } from '../customize/customize-card';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Button } from '@/components/ui/button';
import { Watermark } from './watermark';
import { LyricsCanvasAuthor } from './lyrics-canvas-author';
import { bgColorMap, shapeStyle } from '@/lib/constances';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const LyricsCanvasContainer = () => {

  const [shape] = useAtom(lcShape);
  const [bgColor] = useAtom(lcBgColor);

  const [selectedTrack] = useAtom(lcSelectedTrack);
  const ref = useRef<HTMLDivElement>(null);

  const [, setBgColor] = useAtom(lcBgColor);
  const [, setTxtColor] = useAtom(lcTxtColor);
  const [, setTxtSize] = useAtom(lcTxtSize);
  const [, setShape] = useAtom(lcShape);

  const [, setBgImage] = useAtom(lcShowBgImage);
  const [, setWatermark] = useAtom(lcShowWatermark);
  const [, setGrayscale] = useAtom(lcGrayscale);
  const [, setBlur] = useAtom(lcBlur);
  const [, setBrightness] = useAtom(lcBrightness);
  const [, setOpacity] = useAtom(lcOpacity);

  const [, setShowQuotes] = useAtom(lcShowQuotes);
  const [, setShowCredits] = useAtom(lcShowCredits);
  const [, setCenter] = useAtom(lcCenterText);

  const handleReset = () => {
    setBgColor("black");
    setTxtColor("white");
    setTxtSize("md");
    setShape("horizontal");
    setBgImage(true);
    setWatermark(true);
    setGrayscale(false);
    setBlur(false);
    setBrightness(false);
    setOpacity(false);
    setShowQuotes(true);
    setShowCredits(true);
    setCenter(false);
  }

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
      <div className="w-full flex flew-wrap gap-2 items-center">
        <CustomizeCard />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" className="text-lg cursor-pointer" onClick={handleReset}>🔄</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset appearance</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" className="text-lg cursor-pointer" onClick={handleExport}>📸</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as PNG</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div >
  );
};
