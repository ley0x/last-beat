import { Main } from "@/components/_common/main"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { TopsterDndContext } from "./_components/topster-dnd-context"

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
