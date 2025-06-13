import { LastFmTopTracks, SpotifyTrackSchema } from '@/lib/schemas'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ArtistSkeleton } from '../music/artist-skeleton';

type Props = {
  track: z.infer<typeof LastFmTopTracks>
}

const search = async (track: string, artist: string) => {
  const url = new URL('/api/spotify/search/track', window.location.origin);
  url.searchParams.set('track', encodeURIComponent(track));
  url.searchParams.set('artist', encodeURIComponent(artist));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();
  const foundTrack = SpotifyTrackSchema.parse(json.data);
  return foundTrack;
}

export const Track = ({ track }: Props) => {

  const [image, setImage] = useState(findLargestImage(track.image));

  const { isPending, data } = useQuery({ queryKey: ['search-track', track.name, track.artist], queryFn: () => search(track.name, track.artist.name) });

  useEffect(() => {
    if (!!data) {
      setImage(data.album.images[0].url);
    }
  }, [data])

  if (isPending) {
    return <ArtistSkeleton />
  }

  return (
    <div className="w-34 flex flex-col justify-start items-center h-50">
      <Link href={track.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-34 w-34 rounded-sm shadow" src={image} />
          <AvatarFallback>{track.name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="w-full">
        <Header className="text-xs mb-0 truncate" as="h3"><span className="text-muted-foreground">{track['@attr'].rank}.</span> {track.name}</Header>
        <Header className="text-xs mt-0 mb-0 text-muted-foreground font-normal" as="h4">{track.playcount} plays • {track.artist.name}</Header>
      </div>
    </div>
  )
}
