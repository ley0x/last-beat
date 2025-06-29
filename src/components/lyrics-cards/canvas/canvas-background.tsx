;
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
          <img
            src={img}
            alt="Illustration to lyrics"
            className="object-fill"
          />
        </div>
      )}
    </div>
  )
}
