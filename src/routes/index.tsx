// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

import { Charts } from '@landing-page/charts'
import { Hero } from '@landing-page/hero'
import { LyricsCards } from '@landing-page/lyrics-cards'
import { Stats } from '@landing-page/stats'
import { Topsters } from '@landing-page/topsters'
import { Main } from '@/components/_common/main'

const Home = () => {
  return (
    <Main className="relative h-full">
      <Hero />
      <div className="flex flex-col gap-5">
        <Stats />
        <Charts />
        <Topsters />
        <LyricsCards />
      </div>
    </Main>
  )
}
export const Route = createFileRoute('/')({
  component: Home
})
