import { LastFmTopArtists } from '@/lib/zod/schemas'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from './header';
import { findLargestImage } from '@/lib/utils';

type Props = {
  artist: z.infer<typeof LastFmTopArtists>
}

export const Artist = ({ artist }: Props) => {
  const [profilePicture, setProfilePicture] = useState(findLargestImage(artist.image));

  useEffect(() => {
    const search = async () => {
      const url = new URL('/api/spotify/search/artist-profile-picture', window.location.origin);
      url.searchParams.set('q', encodeURIComponent(artist.name));
      const res = await fetch(url.toString());
      if (!res.ok) {
        console.error(res);
        return;
      }

      const json = await res.json()
      const profilePicture = z.string().url().parse(json.data);
      return profilePicture;
    }
    search().then((profilePicture) => {
      if (!profilePicture) return;
      setProfilePicture(profilePicture);
    });

  }, [])
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
