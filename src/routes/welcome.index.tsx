import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/_common/main'
import { Wrapper } from '@/components/_common/wrapper'

export const Route = createFileRoute('/welcome/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Main>
      <Wrapper className="flex-col">
        <h1>Hello "/welcome/"!</h1>
      </Wrapper>
    </Main>
  )
}
