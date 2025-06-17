import { Main } from "@common/main"

import { ReactQueryProvider } from "@common/react-query-provider"
import { TopsterDndContext } from "@topsters/topster-dnd-context"

export default async function Page() {
  return (
    <>
      <Main className="flex flex-col grow p-2 overflow-hidden max-w-full">
        <ReactQueryProvider>
          <div className="w-full flex flex-col 2xl:flex-row gap-2">
            <TopsterDndContext />
          </div>
        </ReactQueryProvider>
      </Main>
    </>
  )
}
