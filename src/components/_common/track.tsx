import { LastFmTopTracks, SpotifyTrackSchema } from '@/lib/zod/schemas'
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
    <div className="w-42 flex flex-col justify-start items-center h-50">
      <Link href={track.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-sm shadow" src={image} />
          <AvatarFallback>{track.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center line-clamp-2" as="h4">{track['@attr'].rank}. {track.name}</Header>
    </div>
  )
}
