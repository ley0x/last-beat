import { lcSelectedTrack, lcShowCredits } from "@lib/store";
import { cn } from "@lib/utils";
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
    setArtistName(selectedTrack?.artist_names ?? "");
    setTrackName(selectedTrack?.title ?? "");
  }, [selectedTrack]);

  if (!credits) return null;
  return (
    <p
      className={cn('text-left text-xs max-w-full line-clamp-2', className)}
    >
      <span className="opacity-80 font-semibold">
        {artistName || 'Artist'}
      </span>
      <span className="ml-2">
        &quot;
        {trackName || 'Track'}
        &quot;
      </span>
    </p>
  )
}
