import { NotFound } from '@/components/not-found'
import { createFileRoute } from '@tanstack/react-router'

import { Wrapper } from "@common/wrapper";
import { Main } from "@common/main";
import Header from "@common/header";
import Divider from "@common/divider";
import { Logo } from "@common/logo";

import { Login } from "@stats/login";
import { ErrorComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Stats not found</NotFound>
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Main>
      <Wrapper className="flex-col justify-start items-center h-full">
        <div>
          <Header
            as="h1"
            className="flex flew-wrap gap-2 items-center justify-center"
          >
            <Logo withText notClickable />
          </Header>
          <Header as="h3" className="text-center">
            The Rhythm of Your Life, Quantified
          </Header>
          <Header as="h5" className="text-center text-gray-400">
            Feel the Beat, See the Stats
          </Header>
        </div>
        <Divider />
        <Login />
      </Wrapper>
    </Main>
  )
}
