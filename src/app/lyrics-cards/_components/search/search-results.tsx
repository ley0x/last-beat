import Image from "next/image";

import { useAtom } from "jotai";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { getLyricsAction } from "../../_actions/fetch-lyrics.action";

import { lcSelectedTrack, lcTrackLyrics } from "@/lib/store";
import { GeniusSearchTrackSchema } from "@/lib/schemas";

import { Skeleton } from "@/components/ui/skeleton";
import Divider from "@/components/_common/divider";
import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
  foundTracks: z.infer<typeof GeniusSearchTrackSchema>[];
}

export const SearchResults = ({ loading, foundTracks }: Props) => {
  const [, setSelectedTrack] = useAtom(lcSelectedTrack);
  const [, setLyrics] = useAtom(lcTrackLyrics);

  const handleClick = async (track: z.infer<typeof GeniusSearchTrackSchema>) => {
    const lyrics = await getLyricsAction(track.url)

    setSelectedTrack(track);
    setLyrics(lyrics);
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
          const image = track.header_image_url;
          if (!image) return "/placeholder.webp";
          return image;
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
                <Image src={getCover()} alt={track.title} width={40} height={50} unoptimized loading="lazy" />
                <div className='flex flex-col items-start'>
                  <p>{track.title_with_featured}</p>
                  <p className="text-card-foreground/80 text-sm">{track.artist_names}</p>
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
