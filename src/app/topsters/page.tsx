import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { TopsterDndContext } from "./_components/topster-dnd-context"


export default async function Page() {
  return (
    <>
      <Header as="h1" className="my-2">Make your own <span className="text-red-400">Topsters</span> and share it.</Header>
      <Main className="flex flex-col grow overflow-y-scroll p-2">
        <ReactQueryProvider>
          <div className="w-full flex flex-wrap gap-x-2 h-min max-h-full">
            <TopsterDndContext />
          </div>
        </ReactQueryProvider>
      </Main>
    </>
  )
}
