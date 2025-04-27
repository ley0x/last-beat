import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { TrackLyrics } from "./_components/track-lyrics"
import { Wrapper } from "@/components/_common/wrapper"
import { Search } from "./_components/search/search"
import { LyricsCanvasContainer } from "./_components/canvas/lyrics-canvas-container"

export default async function Page() {
  return (
    <Main className="max-w-svw overflow-x-hidden px-2 sm:px-5 flex-col">
      <ReactQueryProvider>
        <Wrapper className="flex-col gap-8">
          <header>
            <Header as="h1">Create awesome <span className="text-red-400 hover:underline text-decoration-primary">cards</span> with your favorite <span className="text-red-400 hover:underline text-decoration-primary">lyrics</span>.</Header>
            <p className="text-sm text-muted-foreground">
              Create, customize and share your own lyrics cards with your friends.
            </p>
          </header>
          <LyricsCanvasContainer />
          <Search />
          <TrackLyrics />
        </Wrapper>
      </ReactQueryProvider>
    </Main>
  )
}
