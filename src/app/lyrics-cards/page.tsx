import Header from "@common/header"
import { Main } from "@common/main"

import { ReactQueryProvider } from "@common/react-query-provider"
import { TrackLyrics } from "./_components/track-lyrics"
import { Wrapper } from "@common/wrapper"
import { Search } from "./_components/search/search"
import { LyricsCanvasContainer } from "./_components/canvas/lyrics-canvas-container"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CustomizeCard } from "./_components/customize/customize-card"
import { ResetButton } from "./_components/customize/reset-button"

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
          <Tabs defaultValue="lyrics">
            <TabsList className="bg-secondary/60 w-full border dark:border-0">
              <TabsTrigger value="lyrics" className="border-0 dark:data-[state=active]:bg-card ">
                <span>📝</span>
                <span>Lyrics</span>
              </TabsTrigger>
              <TabsTrigger value="customization" className="border-0 dark:data-[state=active]:bg-card ">
                <span>🛠️</span>
                <span>Customization</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="lyrics">
              <Card>
                <CardHeader>
                  <CardTitle>Lyrics</CardTitle>
                  <CardDescription>
                    Search for a song and then select the lyrics you want to use for your card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Search />
                  <TrackLyrics />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="customization">
              <Card>
                <CardHeader>
                  <div className="flex flew-wrap justify-between">
                    <div>
                      <CardTitle>Customization</CardTitle>
                      <CardDescription>
                        Make your lyrics cards look unique and personalize them with your favorite colors, images and more.
                      </CardDescription>
                    </div>
                    <ResetButton />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CustomizeCard />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Wrapper>
      </ReactQueryProvider>
    </Main>
  )
}
