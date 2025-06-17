import Image from "next/image";
import { useAtom } from "jotai";

import { lcLyricsBackground } from "@lib/store";

import { LyricsCanvasBgImage } from './lyrics-canvas-bg-image';

export const CanvasBackground = () => {
  const [img] = useAtom(lcLyricsBackground);
  return (
    <div>
      <LyricsCanvasBgImage />
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
  )
}
