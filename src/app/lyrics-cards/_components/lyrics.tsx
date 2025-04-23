import React from 'react';
import { useAtom } from 'jotai';
import { lcSelectedLyrics, lcTrackArtist, lcTrackName, lcTxtColor, lcTxtSize } from '@/lib/store';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AvailableColors } from '@/lib/types';

type Props = {
  size: 'sm' | 'md' | 'lg';
  noOfLines?: number;
};

const sizeMap: Record<Props['size'], string> = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
};

const quoteMap: Record<Props['size'], string> = {
  sm: 'size-6',
  md: 'size-10',
  lg: 'size-12',
};

const txtColorMap: Record<AvailableColors, string> = {
  red: "text-red-500",
  orange: "text-orange-500",
  amber: "text-amber-500",
  yellow: "text-yellow-500",
  green: "text-green-500",
  emerald: "text-emerald-500",
  cyan: "text-cyan-500",
  sky: "text-sky-500",
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  rose: "text-rose-500",
  white: "text-neutral-50",
  black: "text-neutral-950",
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

export const Lyrics = () => {
  const [size] = useAtom(lcTxtSize);

  const [txtColor] = useAtom(lcTxtColor);
  const [lyrics] = useAtom(lcSelectedLyrics);
  const [artist] = useAtom(lcTrackArtist);
  const [track] = useAtom(lcTrackName);

  return (
    <div className="flex flex-col absolute bottom-2 left-0 pr-6 pl-6 z-50 gap-2">
      <div className="flex gap-2">
        <span className="flex">
          <Quote className={cn(quoteMap[size], txtColorMap[txtColor])} />
        </span>
        <p className={cn(`font-semibold leading-tight bg-white px-2 `, {
          "text-white": txtColor !== "white",
          "text-neutral-950": txtColor === "white",
        }, sizeMap[size], bgColorMap[txtColor])}>
          {lyrics}
        </p>
        <span className="flex items-end">
          <Quote className={cn("-scale-100", quoteMap[size], txtColorMap[txtColor])} />
        </span>
      </div>
      <p
        className={cn('font-semibold leading-tight px-2 truncate', sizeMap[size], txtColorMap[txtColor])}
      >
        {artist || 'Artist'} - {track || 'Track'}
      </p>
    </div>
  );
};
