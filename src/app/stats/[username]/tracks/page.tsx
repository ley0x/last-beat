import Divider from "@common/divider"
import Header from "@common/header"
import { Main } from "@common/main"
import { ReactQueryProvider } from "@common/react-query-provider"
import { Wrapper } from "@common/wrapper"

import { Profile } from "@stats/profile"
import { SelectTimeframe } from "@stats/top/select-timeframe"
import { TopTracks } from "@stats/top/tracks/top-tracks"

import { environment } from "@lib/env"
import { LastFmUserInfo } from "@lib/schemas"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;

  const data = await fetch(`${environment.HOST}/api/lastfm/user/info?q=${username}`).then(res => res.json()).then(data => LastFmUserInfo.parse(data.data))
  return <Main className="flex-col">
    <Profile data={data} />
    <Wrapper className="flex-col gap-5 py-5">
      <div className="flex items-center justify-between">
        <Header as="h1">Your <span className="text-primary">Last.fm</span> statistics</Header>
        <SelectTimeframe />
      </div>
      <Divider />
      <ReactQueryProvider>
        <TopTracks username={username} />
      </ReactQueryProvider>
    </Wrapper>
  </Main>
}
