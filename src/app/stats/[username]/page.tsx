import { Profile } from "@/components/profile"
import { lastFmUserGetInfo, lastFmUserGetTopAlbums, lastFmUserGetTopArtists, lastFmUserGetTopTags, lastFmUserGetTopTracks } from "@/lib/lastfm"

import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"
import { TopAlbums } from "@/components/top-albums"
import { TopTracks } from "@/components/top-tracks"
import { TopArtists } from "@/components/top-artists"
import { SelectTimeframe } from "@/components/select-timeframe"
import { TopTags } from "@/components/top-tags"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const data = await lastFmUserGetInfo(username)
  const artists = await lastFmUserGetTopArtists(username, "1month")
  const albums = await lastFmUserGetTopAlbums(username, "1month")
  const tracks = await lastFmUserGetTopTracks(username, "1month")
  const tags = await lastFmUserGetTopTags(username, "1month")
  return <Main className="flex-col">
    <Profile data={data} />
    <Wrapper className="flex-col gap-5 py-5">
      <div className="flex justify-end">
        <SelectTimeframe />
      </div>
      <TopTags tags={tags} />
      <TopArtists artists={artists} />
      <TopAlbums albums={albums} />
      <TopTracks tracks={tracks} />
    </Wrapper>
  </Main>
}
