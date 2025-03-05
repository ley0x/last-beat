import { Profile } from "@/components/profile"
import { lastFmUserGetInfo, lastFmUserGetTopAlbums, lastFmUserGetTopArtists, lastFmUserGetTopTags, lastFmUserGetTopTracks } from "@/lib/lastfm"

import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"
import { TopAlbums } from "@/components/top-albums"
import { TopTracks } from "@/components/top-tracks"
import { TopArtists } from "@/components/top-artists"
import { SelectTimeframe } from "@/components/select-timeframe"
import { TopTags } from "@/components/top-tags"
import { getArtistProfilePicture, getSpotifyArtistID } from "@/lib/spotify"
import Divider from "@/components/_common/divider"
import Header from "@/components/_common/header"

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
  const artistId = await getSpotifyArtistID("Kendrick Lamar");
  const profilePicture = await getArtistProfilePicture(artistId ?? "");
  console.log(profilePicture)
  return <Main className="flex-col">
    <Profile data={data} />
    <Wrapper className="flex-col gap-5 py-5">
      <div className="flex items-center justify-between">
        <Header as="h1">Your <span className="text-red-400">Last.fm</span> statistics</Header>
        <SelectTimeframe />
      </div>
      <Divider />
      <TopArtists artists={artists} />
      <Divider />
      <TopAlbums albums={albums} />
      <TopTags tags={tags} />
      <Divider />
      <TopTracks tracks={tracks} />
    </Wrapper>
  </Main>
}
