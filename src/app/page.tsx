import { Main } from "@common/main";

import { Charts } from "@landing-page/charts";
import { Hero } from "@landing-page/hero";
import { LyricsCards } from "@landing-page/lyrics-cards";
import { Stats } from "@landing-page/stats";
import { Topsters } from "@landing-page/topsters";

import { Footer } from "@layout/footer";

export default function Home() {
  return (
    <Main className="relative h-full">
      <Hero />
      <div className="flex flex-col gap-5">
        <Stats />
        <Charts />
        <Topsters />
        <LyricsCards />
      </div>
      <Footer />
    </Main>
  );
}
