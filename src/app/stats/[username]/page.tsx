import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { Profile } from "@/components/profile"

import { SelectTimeframe } from "@/components/top/select-timeframe"

import { lastFmUserGetFriends, lastFmUserGetInfo, lastFmUserGetTopTags } from "@/lib/lastfm"
import { TopContainer } from "@/components/top/top-container"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;
  const profile = await lastFmUserGetInfo(username);
  const friends = await lastFmUserGetFriends(username, 20);
  const tags = await lastFmUserGetTopTags(username, "1month");


  return (
    <Main className="flex-col">
      <Profile data={profile} />
      <Wrapper className="flex-col gap-5 py-5">
        <div className="flex items-center justify-between">
          <Header as="h1">Your <span className="text-primary">Last.fm</span> statistics</Header>
          <SelectTimeframe />
        </div>
        <ReactQueryProvider>
          <TopContainer username={username} tags={tags} friends={friends} />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
