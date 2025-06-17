import { Main } from "@common/main";
import { Charts } from "@/components/landing-page/charts";
import { Hero } from "@/components/landing-page/hero";
import { LyricsCards } from "@/components/landing-page/lyrics-cards";
import { Stats } from "@/components/landing-page/stats";
import { Topsters } from "@/components/landing-page/topsters";

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
