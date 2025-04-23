import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { Profile } from "@/components/profile"

import { lastFmUserGetInfo } from "@/lib/lastfm"
import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { ComingSoon } from "@/components/_common/comming-soon"
import { SelectTimeframe } from "@/components/top/select-timeframe"


export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;
  const profile = await lastFmUserGetInfo(username);
  return (
    <Main className="flex-col">
      <Profile data={profile} />
      <Wrapper className="flex-col gap-5 py-5">
        <div className="flex items-center justify-between">
          <Header as="h1">Your <span className="text-red-400">Last.fm</span> statistics, shown with beautiful charts.</Header>
          <SelectTimeframe />
        </div>
        <ReactQueryProvider>
          <ComingSoon />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
