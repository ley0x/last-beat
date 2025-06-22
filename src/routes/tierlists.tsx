import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@common/main'
import { Wrapper } from '@common/wrapper'

import { ComingSoon } from '@common/comming-soon'

export const Route = createFileRoute('/tierlists')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Main>
      <Wrapper className="flex-col gap-5 py-5">
        <ComingSoon />
      </Wrapper>
    </Main>
  )
}
