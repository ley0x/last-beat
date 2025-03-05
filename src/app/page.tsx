import { ChartColumn } from "lucide-react";

import { Login } from "@/components/login";
import { Wrapper } from "@/components/_common/wrapper";
import { Main } from "@/components/_common/main";
import Header from "@/components/_common/header";
import Divider from "@/components/_common/divider";

export default function Home() {
  return (
    <Main className="h-full">
      <Wrapper className="flex-col justify-start items-center h-full">
        <div>
          <Header as="h1" className="flex flew-wrap gap-2 items-center justify-center"><ChartColumn className="text-red-400 text-8xl" /><span>StatsFM</span></Header>
          <Header as="h3" className="text-center">Your music, your stats, your story.</Header>
          <Header as="h5" className="text-center text-gray-400">Enter a new dimension of music by getting unique insights into your music taste.</Header>
        </div>
        <Divider />
        <Login />
      </Wrapper>
    </Main>
  );
}
