"use client";
import { useFetchAllTracks } from "@hooks/use-fetch-all-tracks";
import { timeframeAtom } from "@lib/store";
import { useAtom } from "jotai";

import { TopTags } from "@/app/stats/_components/top/tags/top-tags"
import { TopAlbums } from "@/app/stats/_components/top/albums/top-albums"
import { TopTracks } from "@/app/stats/_components/top/tracks/top-tracks"
import { TopArtists } from "@/app/stats/_components/top/artists/top-artists"

import { Friends } from "@/app/stats/_components/music/friends"

import { LastFmUserFriends, LastFmTopTags } from "@lib/schemas";

import Divider from "@common/divider"
import { z } from "zod";

type TopContainerProps = {
  username: string;
  friends: z.infer<typeof LastFmUserFriends>[];
  tags: z.infer<typeof LastFmTopTags>[];
}

export const TopContainer = ({ friends, tags, username }: TopContainerProps) => {
  const [timeframe] = useAtom(timeframeAtom);
  useFetchAllTracks({ username, timeframe, limit: 100 });
  return (
    <div>
      <TopAlbums username={username} viewMore />
      <Divider />
      <TopArtists username={username} viewMore />
      <Divider />
      <TopTracks username={username} viewMore />
      <TopTags tags={tags} />
      <Divider />
      {friends.length > 0 && (
        <Friends username={username} friends={friends} />
      )}
    </div>
  )
}
