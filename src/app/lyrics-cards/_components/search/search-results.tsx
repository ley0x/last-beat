import Image from "next/image";

import { useAtom } from "jotai";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { getLyricsAction } from "../../_actions/fetch-lyrics";

import { lcSelectedTrack, lcTrackLyrics } from "@/lib/store";
import { LastFmTrackSchema } from "@/lib/zod/schemas";
import { findLargestImage } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import Divider from "@/components/_common/divider";
import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
  foundTracks: z.infer<typeof LastFmTrackSchema>[];
}

export const SearchResults = ({ loading, foundTracks }: Props) => {
  const [, setSelectedTrack] = useAtom(lcSelectedTrack);
  const [, setLyrics] = useAtom(lcTrackLyrics);

  const handleClick = async (track: z.infer<typeof LastFmTrackSchema>) => {
    const json = await getLyricsAction(`${track.name} ${track.artist?.name}`)
    if (!json.success) {
      console.error(json);
      return;
    }
    if (!json.data) {
      console.error(json);
      return;
    }
    setSelectedTrack(track);
    setLyrics(json.data.lyrics);
  }

  return (

    <div className="mt-5">
      {loading && (
        Array(5).fill(0).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-10 w-full rounded-sm shadow bg-muted" />
            <Divider className="my-1" />
          </div>
        )))}
      {!loading && foundTracks.map((track, index) => {
        const getCover = (): string => {
          const images = track?.album?.image;
          if (!images) return "/placeholder.webp";
          const largestImage = findLargestImage(images) === "#" ? "/placeholder.webp" : findLargestImage(images)
          return largestImage;
        }
        return (
          <div key={index}>
            <Button
              size="lg"
              onClick={() => handleClick(track)}
              variant="ghost"
              className="flex flex-row w-full justify-between items-center flex-wrap gap-2 rounded-none h-auto py-1 cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                <Image src={getCover()} alt={track.name} width={40} height={50} unoptimized loading="lazy" />
                <div className='flex flex-col items-start'>
                  <p>{track.name}</p>
                  <p className="text-card-foreground/80 text-sm">{track.artist?.name}</p>
                </div>
              </div>
              <ArrowRight />
            </Button>
            <Divider className="my-0" />
          </ div>
        )
      }
      )}
    </div>
  )
}
