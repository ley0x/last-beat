import { Main } from "@/components/_common/main"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { TopsterDndContext } from "./_components/topster-dnd-context"


export default async function Page() {
  return (
    <>
      <Main className="flex flex-col grow p-2">
        <ReactQueryProvider>
          <div className="w-full flex gap-x-2">
            <TopsterDndContext />
          </div>
        </ReactQueryProvider>
      </Main>
    </>
  )
}
