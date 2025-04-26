import { lcSelectedTrack } from "@/lib/store";
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

  useEffect(() => {
    setArtistName(selectedTrack?.artist?.name ?? "");
    setTrackName(selectedTrack?.name ?? "");
  }, [selectedTrack]);
  return (
    <p
      className={cn('max-w-full bg-white shadow-sm rounded-xs font-bold px-2 truncate', className)}
    >
      {artistName || 'Artist'} - {trackName || 'Track'}
    </p>
  )
}
