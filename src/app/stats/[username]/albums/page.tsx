import Divider from "@/components/_common/divider"
import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { Profile } from "@/components/profile"
import { SelectTimeframe } from "@/components/select-timeframe"
import { TopAlbums } from "@/components/top-albums"

import { lastFmUserGetInfo, lastFmUserGetTopAlbums } from "@/lib/lastfm"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;

  const data = await lastFmUserGetInfo(username)
  const albums = await lastFmUserGetTopAlbums(username, "1month", 50)
  return <Main className="flex-col">
    <Profile data={data} />
    <Wrapper className="flex-col gap-5 py-5">
      <div className="flex items-center justify-between">
        <Header as="h1">Your <span className="text-red-400">Last.fm</span> statistics</Header>
        <SelectTimeframe />
      </div>
      <Divider />
      <TopAlbums albums={albums} />
    </Wrapper>
  </Main>
}
