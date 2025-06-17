"use client";

import { useAtom } from "jotai";

import { z } from "zod";

import { useFetchAllTracks } from "@hooks/use-fetch-all-tracks";
import { timeframeAtom } from "@lib/store";

import { TopTags } from "@stats/top/tags/top-tags"
import { TopAlbums } from "@stats/top/albums/top-albums"
import { TopTracks } from "@stats/top/tracks/top-tracks"
import { TopArtists } from "@stats/top/artists/top-artists"
import { Friends } from "@stats/music/friends"

import { LastFmUserFriends, LastFmTopTags } from "@lib/schemas";

import Divider from "@common/divider"

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
