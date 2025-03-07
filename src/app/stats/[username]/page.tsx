import Divider from "@/components/_common/divider"
import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { Profile } from "@/components/profile"

import { SelectTimeframe } from "@/components/select-timeframe"
import { TopTags } from "@/components/top-tags"

import { TopAlbums } from "@/components/top-albums"
import { TopTracks } from "@/components/top-tracks"
import { TopArtists } from "@/components/top-artists"

import { lastFmUserGetInfo, lastFmUserGetTopTags } from "@/lib/lastfm"
import { ReactQueryProvider } from "@/components/_common/react-query-provider"


export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;
  const profile = await lastFmUserGetInfo(username);
  const tags = await lastFmUserGetTopTags(username, "1month");
  return (
    <Main className="flex-col">
      <Profile data={profile} />
      <Wrapper className="flex-col gap-5 py-5">
        <div className="flex items-center justify-between">
          <Header as="h1">Your <span className="text-red-400">Last.fm</span> statistics</Header>
          <SelectTimeframe />
        </div>
        <Divider />
        <ReactQueryProvider>
          <TopAlbums username={username} viewMore />
          <Divider />
          <TopArtists username={username} viewMore />
          <Divider />
          <TopTracks username={username} viewMore />
          <TopTags tags={tags} />
          <Divider />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
