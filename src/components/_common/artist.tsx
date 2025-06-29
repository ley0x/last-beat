import { LastFmTopArtists } from '@lib/schemas'
import { useEffect, useState } from 'react'
import { z } from 'zod'

import { Link } from "@tanstack/react-router"

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { cn, findLargestImage } from '@lib/utils';

import { useQuery } from '@tanstack/react-query';

import Header from '@common/header';
import { ArtistSkeleton } from '@common/artist-skeleton';

type Props = {
  artist: z.infer<typeof LastFmTopArtists>;
  className?: string;
}

const search = async (artistName: string) => {
  const url = new URL('/api/spotify/search/artist-profile-picture', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(artistName));
  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error("Error searching artist profile picture", res.statusText);
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const profilePicture = z.string().url().parse(json.data);
  return profilePicture;
}


export const Artist = ({ artist, className }: Props) => {
  const [profilePicture, setProfilePicture] = useState(findLargestImage(artist.image));

  const { isPending, data } = useQuery({ queryKey: ['search-profile-picture', artist.name], queryFn: () => search(artist.name) });

  useEffect(() => {
    if (!data) return;
    setProfilePicture(data);
  }, [data]);

  if (isPending) {
    return <ArtistSkeleton />
  }

  return (
    <div className={cn("shrink-0 w-34 flex flex-col justify-between items-center", className)}>
      <Link to={artist.url ?? "#"} rel="noopener noreferrer" target="_blank">
        <Avatar>
          <AvatarImage className="h-34 w-34 object-cover rounded-full shadow" src={profilePicture === "#" ? "/placeholder.webp" : profilePicture} />
          <AvatarFallback>{artist.name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="w-full">
        <Header className="text-xs mb-0 truncate" as="h3"><span className="text-muted-foreground">{artist['@attr'].rank}.</span> {artist.name}</Header>
        <Header className="text-xs mt-0 mb-0 text-muted-foreground font-normal" as="h4">{artist.playcount} plays</Header>
      </div>
    </div>
  )
}
