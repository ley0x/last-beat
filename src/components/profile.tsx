"use client";

import { LastFmUserInfo } from '@/lib/zod/schemas'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'
import { z } from 'zod'
import Header from './_common/header';
import { Wrapper } from './_common/wrapper';
import Link from 'next/link'
import { ToggleTheme } from './_common/toggle-theme';
import { findLargestImage } from '@/lib/utils';

type Props = {
  data: z.infer<typeof LastFmUserInfo>
}

export const Profile = ({ data }: Props) => {

  const image = findLargestImage(data.image);

  function beautify(number: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    const formattedNumber = formatter.format(number).replace(/,/g, ' ');

    return formattedNumber;
  }
  return (
    <section className="py-5 bg-primary-foreground">
      <Wrapper className="flex-wrap gap-5 justify-center">
        <Link href={data.url ?? "#"} rel="noopener noreferrer" target="_blank">
          <Avatar>
            <AvatarImage className="h-24 w-24 rounded-full shadow" src={image === "#" ? "/placeholder.webp" : image} />
            <AvatarFallback>{data.name}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col grow">
          <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
            <Header as="h1">{data.name}</Header>
            <ToggleTheme />
          </div>
          <Header as="h3">Hey there! 👋 I&apos;m using <strong className="text-red-400">LastBeat</strong> to track my Last.fm scrobbles.</Header>
          <ul className="list-disc list-inside">
            <li>Playcount: <strong className="text-red-400">{beautify(parseInt(data.playcount ?? "0", 10))}</strong></li>
            <li>Albums: <strong className="text-red-400">{beautify(parseInt(data.album_count ?? "0", 10))}</strong></li>
            <li>Tracks: <strong className="text-red-400">{beautify(parseInt(data.track_count ?? "0", 10))}</strong></li>
          </ul>
        </div>
      </Wrapper>
    </section>
  )
}
