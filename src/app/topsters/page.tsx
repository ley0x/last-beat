import Header from "@/components/_common/header"
import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { CommingSoon } from "@/components/_common/comming-soon"


export default async function Page() {
  return (
    <Main className="flex-col">
      <Wrapper className="flex-col gap-5 py-5">
        <Header as="h1">Make your own <span className="text-red-400">Topsters</span> and share it.</Header>
        <ReactQueryProvider>
          <CommingSoon />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
