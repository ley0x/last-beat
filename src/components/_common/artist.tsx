import { LastFmTopArtists } from '@/lib/zod/schemas'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  artist: z.infer<typeof LastFmTopArtists>
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

export function ArtistSkeleton() {
  return (
    <div className="w-42 flex flex-col items-center gap-4">
      <Skeleton className="h-32 w-32 rounded-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export const Artist = ({ artist }: Props) => {
  const [profilePicture, setProfilePicture] = useState(findLargestImage(artist.image));

  const { isPending, isError, data, error } = useQuery({ queryKey: ['search-profile-picture', artist.name], queryFn: () => search(artist.name) });

  useEffect(() => {
    if (!data) return;
    setProfilePicture(data);
  }, [data]);

  if (isPending) {
    return <ArtistSkeleton />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="w-42 flex flex-col justify-center items-center">
      <Link href={artist.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-full shadow" src={profilePicture} />
          <AvatarFallback>{artist.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center" as="h3">{artist['@attr'].rank}. {artist.name}</Header>
    </div>
  )
}
