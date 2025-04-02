import { LastFmTopArtists } from '@/lib/zod/schemas'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { cn, findLargestImage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

import { ErrorStatus } from '@/components/_common/error-status';
import { ArtistSkeleton } from '../music/artist-skeleton';

type Props = {
  artist: z.infer<typeof LastFmTopArtists>;
  className?: string;
}

const search = async (artistName: string) => {
  const url = new URL('/api/spotify/search/artist-profile-picture', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(artistName));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const profilePicture = z.string().url().parse(json.data);
  return profilePicture;
}


export const Artist = ({ artist, className }: Props) => {
  const [profilePicture, setProfilePicture] = useState(findLargestImage(artist.image));

  const { isPending, isError, data } = useQuery({ queryKey: ['search-profile-picture', artist.name], queryFn: () => search(artist.name) });

  useEffect(() => {
    if (!data) return;
    setProfilePicture(data);
  }, [data]);

  if (isPending) {
    return <ArtistSkeleton />
  }

  if (isError) {
    return (<ErrorStatus message={"Artist not found"} />)
  }

  return (
    <div className={cn("shrink-0 flex flex-col justify-between items-center", className)}>
      <Link href={artist.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-full shadow" src={profilePicture === "#" ? "/placeholder.webp" : profilePicture} />
          <AvatarFallback>{artist.name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="w-full">
        <Header className="text-sm mb-0" as="h3"><span className="text-primary/80">{artist['@attr'].rank}.</span> {artist.name}</Header>
        <Header className="text-sm mt-0 mb-0 text-primary/80" as="h4">{artist.playcount} plays</Header>
      </div>
    </div>
  )
}
