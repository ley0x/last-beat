import { createFileRoute } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

import { z } from 'zod'

import Header from '@common/header'
import { ComingSoon } from '@common/comming-soon'

import { SelectTimeframe } from '@stats/top/select-timeframe'
import { TopContainer } from '@stats/top/top-container'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

import { LastFmTopTags, LastFmUserFriends, UsernameSchema } from '@lib/schemas'

export const Route = createFileRoute('/stats/$username/')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Stats not found</NotFound>
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    const { username } = z.object({ username: UsernameSchema }).parse(await params)
    const friends = await fetch(`/api/lastfm/user/friends?q=${username}&limit=20`)
      .then(res => res.json())
      .then(data => LastFmUserFriends.array().parse(data.data))
    const tags = await fetch(`/api/lastfm/user/tags?q=${username}&timeframe=1month&limit=10`)
      .then(res => res.json())
      .then(data => LastFmTopTags.array().parse(data.data))
    return { friends, tags, username }
  }
})

function RouteComponent() {
  const { friends, tags, username } = Route.useLoaderData()
  return (
    <Tabs defaultValue="trendings" className="w-full">
      <TabsList className="bg-secondary/60 w-full gap-2 border-0 shadow">
        <TabsTrigger
          value="trendings"
          className="cursor-pointer shadow-none data-[state=active]:shadow-none border-0 dark:data-[state=active]:bg-card"
        >
          <span>🎤</span>
          <span>Trendings</span>
        </TabsTrigger>
        <TabsTrigger
          value="charts"
          className="cursor-pointer border data-[state=active]:shadow-none dark:border-0 dark:data-[state=active]:bg-card"
        >
          <span>📊</span>
          <span>Charts</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="trendings" className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Header as="h1">
            Your <span className="text-primary">Last.fm</span> statistics
          </Header>
          <SelectTimeframe />
        </div>
        <TopContainer username={username} tags={tags} friends={friends} />
      </TabsContent>
      <TabsContent value="charts" className="flex flex-col gap-5">
        <ComingSoon />
      </TabsContent>
    </Tabs>
  )
}
