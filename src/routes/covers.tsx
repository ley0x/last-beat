import { createFileRoute } from '@tanstack/react-router'

import { Main } from '@common/main'
import { Wrapper } from '@common/wrapper'

import { Covers } from '@covers/covers'
import Header from '@common/header'

export const Route = createFileRoute('/covers')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Main>
      <Wrapper className="flex-col gap-5 py-5">
        <header>
          <Header as="h1">
            Download your favorite album covers from{' '}
            <span className="text-green-400 hover:underline text-decoration-primary">Spotify</span>,{' '}
            <span className="text-red-400 hover:underline text-decoration-primary">Last.fm</span>, and{' '}
            <span className="text-violet-400 hover:underline text-decoration-primary">Deezer</span>.
          </Header>
          <p className="text-sm text-muted-foreground">
            Use <span className="font-bold">deezer</span> (highest resolution),{' '}
            <span className="font-bold">spotify</span> (good resolution) or <span className="font-bold">last.fm</span>{' '}
            (usually bad resolution but largest choice) to download your album covers.
          </p>
        </header>
        <Covers />
      </Wrapper>
    </Main>
  )
}
