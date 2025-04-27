import { lcSelectedTrack, lcShowCredits } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
}

export const LyricsCanvasAuthor = ({ className }: Props) => {

  const [selectedTrack] = useAtom(lcSelectedTrack);

  const [artistName, setArtistName] = useState<string>("");
  const [trackName, setTrackName] = useState<string>("");

  const [credits] = useAtom(lcShowCredits);


  useEffect(() => {
    setArtistName(selectedTrack?.artist?.name ?? "");
    setTrackName(selectedTrack?.name ?? "");
  }, [selectedTrack]);

  if (!credits) return null;
  return (
    <p
      className={cn('text-left text-xs max-w-full bg-white/90 text-gray-950 shadow-sm rounded-xs sm:px-1 line-clamp-2', className)}
    >
      <span className="opacity-80 font-semibold">
        {artistName || 'Artist'}
      </span>
      <span className="ml-2">
        "{trackName || 'Track'}"
      </span>
    </p>
  )
}
