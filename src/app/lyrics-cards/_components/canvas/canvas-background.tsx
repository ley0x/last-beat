import Image from "next/image";
import { lcLyricsBackground } from "@/lib/store";
import { useAtom } from "jotai";

export const CanvasBackground = () => {
  const [img] = useAtom(lcLyricsBackground);
  return (
    <div>
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
