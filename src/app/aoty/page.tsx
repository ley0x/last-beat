import { Main } from "@/components/_common/main"
import { Wrapper } from "@/components/_common/wrapper"

import { ReactQueryProvider } from "@/components/_common/react-query-provider"
import { ComingSoon } from "@/components/_common/comming-soon"


export default async function Page() {
  return (
    <Main>
      <Wrapper className="flex-col gap-5 py-5">
        <ReactQueryProvider>
          <ComingSoon />
        </ReactQueryProvider>
      </Wrapper>
    </Main>
  )
}
