import { useAtom } from 'jotai';

import { cn } from '@lib/utils';

import { lcCenterText, lcSelectedLyrics, lcShowQuotes, lcTxtColor, lcTxtSize } from '@lib/store';

import { Quote } from '@common/quote'
import { bgColorMap, quoteMap, sizeMap } from '@lib/constants';

import { LyricsCanvasAuthor } from './lyrics-canvas-author';

export const LyricsCanvas = () => {
  const [size] = useAtom(lcTxtSize);

  const [txtColor] = useAtom(lcTxtColor);
  const [lyrics] = useAtom(lcSelectedLyrics);
  const [quotes] = useAtom(lcShowQuotes);
  const [center] = useAtom(lcCenterText);

  return (
    <div className={cn("flex flex-col absolute bottom-2 left-0 right-0 pr-6 pl-6 z-50 gap-2", {
      "top-2 flex flex-col justify-center": center,
    })}>
      <div className="flex gap-2">
        {quotes && (
          <span className="flex">
            <Quote color={txtColor} className={cn(quoteMap[size])} />
          </span>
        )}
        <p className={cn('grow text-left font-medium leading-tight bg-white px-2 whitespace-pre-line', {
          "text-white": txtColor !== "white",
          "text-neutral-950": txtColor === "white",
        }, sizeMap[size], bgColorMap[txtColor])}>
          {lyrics}
        </p>
      </div>
      <LyricsCanvasAuthor className={cn({
        "text-white": txtColor === "white",
        "text-neutral-950": txtColor !== "white",
      })} />
    </div>
  );
};
