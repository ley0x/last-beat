import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { LyricsCanvas } from "./_components/lyrics-canvas"
import { ImageUploader } from "./_components/image-uploader"
import { TrackLyrics } from "./_components/track-lyrics"


export default async function Page() {
  return (
    <Main className="h-max flex-col">
      <Wrapper className="flex-col gap-5 py-5">
        <Header as="h1">Make your own <span className="text-red-400">lyrics cards</span> and share it.</Header>
        <ReactQueryProvider>
          <LyricsCanvas />
          <ImageUploader />
          <TrackLyrics />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
