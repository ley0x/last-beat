"use client";

import React from 'react'

import { LastFmUserFriends } from '@lib/schemas';
import { z } from 'zod';

import Header from '@common/header';
import { Friend } from '@/app/stats/_components/music/friend';

type Props = {
  username: string;
  friends: z.infer<typeof LastFmUserFriends>[];
}

export const Friends = ({ friends, username }: Props) => {
  if (friends.length === 0) return null;
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div>
        <div className="w-full flex flew-wrap gap-2 items-center justify-between">
          <Header as="h2">Friends of {username}</Header>
        </div>
        <Header as="h4" className="text-gray-400 font-normal">Check out your friends stats.</Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-start items-center">
        {friends && friends.map((friend, index) => (
          <Friend friend={friend} key={index} />
        ))}
      </div>
    </div>
  )
}
