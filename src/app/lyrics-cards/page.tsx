import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { TrackLyrics } from "./_components/track-lyrics"
import { Wrapper } from "@/components/_common/wrapper"
import { Search } from "./_components/search/search"
import { LyricsCanvasContainer } from "./_components/canvas/lyrics-canvas-container"
import { CustomizeCard } from "./_components/customize/customize-card"

export default async function Page() {
  return (
    <Main className="max-w-svw overflow-x-hidden px-2 sm:px-5 flex-col">
      <ReactQueryProvider>
        <Wrapper className="flex-col gap-8">
          <Header as="h1">Make your own <span className="text-red-400">lyrics cards</span> and share it.</Header>
          <LyricsCanvasContainer />
          <Search />
          <TrackLyrics />
          <CustomizeCard />
        </Wrapper>
      </ReactQueryProvider>
    </Main>
  )
}
