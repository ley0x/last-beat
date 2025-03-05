import { Profile } from "@/components/profile"
import { lastFmUserGetInfo, lastFmUserGetTopArtists } from "@/lib/lastfm"

import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"
import { TopAlbums } from "@/components/top-albums"
import { TopTracks } from "@/components/top-tracks"
import { TopArtists } from "@/components/top-artists"
import { SelectTimeframe } from "@/components/select-timeframe"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const data = await lastFmUserGetInfo(username)
  const artists = await lastFmUserGetTopArtists(username, "1-month")
  return <Main className="flex-col">
    <Profile data={data} />
    <Wrapper className="flex-col gap-5 py-5">
      <div className="flex justify-end">
        <SelectTimeframe />
      </div>
      <TopArtists artists={artists} />
      <TopAlbums />
      <TopTracks />
    </Wrapper>
  </Main>
}
