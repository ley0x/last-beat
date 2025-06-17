import { LastFmUserFriends } from '@lib/schemas'
import React from 'react'
import { z } from 'zod'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Header from '@/components/_common/header';
import { findLargestImage } from '@lib/utils';

type Props = {
  friend: z.infer<typeof LastFmUserFriends>
}

export const Friend = ({ friend }: Props) => {

  const image = findLargestImage(friend.image);
  const getLink = (friend: z.infer<typeof LastFmUserFriends>) => {
    if (friend.name) return `/stats/${encodeURIComponent(friend.name)}`;
    return `#`;
  }
  return (
    <div className="w-42 flex flex-col justify-center items-center">
      <Link href={getLink(friend)}>
        <Avatar>
          <AvatarImage className="h-32 w-32 rounded-full shadow" src={image === "#" ? "/placeholder.webp" : image} />
          <AvatarFallback>{friend.name}</AvatarFallback>
        </Avatar>
      </Link>
      <Header className="text-center" as="h3">{friend.name}</Header>
    </div>
  )
}
