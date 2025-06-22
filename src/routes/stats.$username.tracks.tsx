import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import { z } from 'zod'

import Divider from '@common/divider'
import Header from '@common/header'

import { SelectTimeframe } from '@stats/top/select-timeframe'
import { TopTracks } from '@stats/top/tracks/top-tracks'

import { UsernameSchema } from '@lib/schemas'
import { NotFound } from '@/components/not-found'

export const Route = createFileRoute('/stats/$username/tracks')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Tracks not found</NotFound>
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    const { username } = z.object({ username: UsernameSchema }).parse(await params)
    return { username }
  }
})

function RouteComponent() {
  const { username } = Route.useLoaderData()

  return (
    <>
      <div className="flex items-center justify-between">
        <Header as="h1">
          Your <span className="text-primary">Last.fm</span> statistics
        </Header>
        <SelectTimeframe />
      </div>
      <Divider />
      <TopTracks username={username} />
    </>
  )
}
