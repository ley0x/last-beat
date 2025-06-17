import { Main } from "@common/main"
import { Wrapper } from "@common/wrapper"

import { ReactQueryProvider } from "@common/react-query-provider"
import { ComingSoon } from "@common/comming-soon"


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
