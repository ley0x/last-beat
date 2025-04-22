import React from 'react';
import { useAtom } from 'jotai';
import { Credits } from './credits';
import { lcSelectedLyrics, lcTrackArtist, lcTrackName } from '@/lib/store';
import { Quote } from 'lucide-react';

type Props = {
  size: 'sm' | 'md' | 'lg';
  noOfLines?: number;
};

const sizeMap: Record<Props['size'], string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Lyrics: React.FC<Props> = ({ size, noOfLines }) => {
  const [lyrics] = useAtom(lcSelectedLyrics);
  const [artist] = useAtom(lcTrackArtist);
  const [track] = useAtom(lcTrackName);

  const clampClass = `line-clamp-${noOfLines ?? 5}`;

  return (
    <div className="flex flex-col absolute bottom-2 left-0 pr-6 pl-6 z-50 gap-2">
      <div className="flex gap-2 text-white">
        <span className="flex">
          <Quote />
        </span>

        <p
          className={`${sizeMap[size]} font-semibold leading-tight bg-white text-black px-2 ${clampClass}`}
        >
          {lyrics}
        </p>

        <span className="flex items-end">
          <Quote className="-scale-100" />
        </span>
      </div>

      <Credits artist={artist} track={track} size={size} />
    </div>
  );
};
