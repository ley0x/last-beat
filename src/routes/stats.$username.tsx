import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

import { z } from 'zod'

import Header from '@common/header'
import { Main } from '@common/main'
import { Wrapper } from '@common/wrapper'
import { ComingSoon } from '@common/comming-soon'

import { Profile } from '@stats/profile'
import { SelectTimeframe } from '@stats/top/select-timeframe'
import { TopContainer } from '@stats/top/top-container'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

import { LastFmTopTags, LastFmUserFriends, LastFmUserInfo, UsernameSchema } from '@lib/schemas'
export const Route = createFileRoute('/stats/$username')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Stats not found</NotFound>
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    const { username } = z.object({ username: UsernameSchema }).parse(await params)
    const profile = await fetch(`/api/lastfm/user/info?q=${username}`)
      .then(res => res.json())
      .then(data => LastFmUserInfo.parse(data.data))
    const friends = await fetch(`/api/lastfm/user/friends?q=${username}&limit=20`)
      .then(res => res.json())
      .then(data => LastFmUserFriends.array().parse(data.data))
    const tags = await fetch(`/api/lastfm/user/tags?q=${username}&timeframe=1month&limit=10`)
      .then(res => res.json())
      .then(data => LastFmTopTags.array().parse(data.data))
    return { profile, friends, tags, username }
  }
})

function RouteComponent() {
  const { profile, friends, tags, username } = Route.useLoaderData()
  return (
    <Main className="flex-col">
      <Profile data={profile} />
      <Wrapper className="flex-col gap-5 py-5">
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
      </Wrapper>
    </Main>
  )
}
