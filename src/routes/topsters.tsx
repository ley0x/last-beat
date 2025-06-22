import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@common/main'

import { TopsterDndContext } from '@topsters/topster-dnd-context'

export const Route = createFileRoute('/topsters')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Main className="flex flex-col grow p-2 overflow-hidden max-w-full">
      <div className="w-full flex flex-col 2xl:flex-row gap-2">
        <TopsterDndContext />
      </div>
    </Main>
  )
}
