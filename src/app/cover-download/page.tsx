import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { Covers } from "./_components/covers"
import Header from "@/components/_common/header"


export default async function Page() {
  return (
    <Main>
      <Wrapper className="flex-col gap-5 py-5">

        <ReactQueryProvider>
          <header>
            <Header as="h1">
              Download your favorite album covers from <span className="text-green-400 hover:underline text-decoration-primary">Spotify</span>, <span className="text-red-400 hover:underline text-decoration-primary">Last.fm</span>, and <span className="text-violet-400 hover:underline text-decoration-primary">Deezer</span>.
            </Header>
            <p className="text-sm text-muted-foreground">
              Use deezer or spotify providers if you want high quality covers. Use last.fm if you want a largest choice, but usually the quality is lower.
            </p>
          </header>
          <Covers />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
