import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { LyricsCanvas } from "./_components/lyrics-canvas"
import { TrackLyrics } from "./_components/track-lyrics"
import { CustomizeCard } from "./_components/customize-card"


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default async function Page() {
  return (
    <Main className="h-full max-w-svw overflow-x-hidden px-2 sm:px-5 flex-col">
      <ReactQueryProvider>
        <ResizablePanelGroup
          direction="horizontal"
          className="border h-svh w-svw mt-5"
        >
          <ResizablePanel className="p-5" defaultSize={50}>
            <Header as="h1">Make your own <span className="text-red-400">lyrics cards</span> and share it.</Header>
            <TrackLyrics />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel className="w-full flex justify-center items-center px-5" defaultSize={52}>
                <LyricsCanvas />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="px-5 py-2 overflow-y-scroll flex flex-col" defaultSize={48}>
                <CustomizeCard />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>

      </ReactQueryProvider>
    </Main>
  )
}
