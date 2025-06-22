import Divider from '@common/divider'
import Header from '@common/header'

import { SelectTimeframe } from '@stats/top/select-timeframe'
import { createFileRoute } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { z } from 'zod'
import { UsernameSchema } from '@lib/schemas'
import { NotFound } from '@/components/not-found'
import { TopAlbums } from '@stats/top/albums/top-albums'

export const Route = createFileRoute('/stats/$username/albums')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Albums not found</NotFound>
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
      <TopAlbums username={username} />
    </>
  )
}
