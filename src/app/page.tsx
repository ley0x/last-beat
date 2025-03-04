import { Login } from "@/components/login";
import { Wrapper } from "@/components/_common/wrapper";
import { Main } from "@/components/_common/main";

export default function Home() {
  return (
    <Main className="h-full">
      <Wrapper className="flex-col justify-center items-center h-full">
        <Login />
      </Wrapper>
    </Main>
  );
}
