import { Login } from "@/components/login";
import { Wrapper } from "@/components/_common/wrapper";
import { Main } from "@/components/_common/main";
import Header from "@/components/_common/header";
import Divider from "@/components/_common/divider";
import { Logo } from "@/components/_common/logo";

export default function Home() {
  return (
    <Main>
      <Wrapper className="flex-col justify-start items-center h-full">
        <div>
          <Header as="h1" className="flex flew-wrap gap-2 items-center justify-center"><Logo withText /></Header>
          <Header as="h3" className="text-center">The Rhythm of Your Life, Quantified</Header>
          <Header as="h5" className="text-center text-gray-400">Feel the Beat, See the Stats</Header>
        </div>
        <Divider />
        <Login />
      </Wrapper>
    </Main>
  );
}
