import { Main } from '@/components/_common/main'
import { Wrapper } from '@/components/_common/wrapper'
import { NotFound } from '@/components/not-found'
import { Profile } from '@/components/stats/profile'
import { LastFmUserInfo, UsernameSchema } from '@/lib/schemas'
import { lastfmUserExists } from '@/services/server/lastfm-user-exists'
import { createFileRoute, ErrorComponent, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/stats/$username')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Not found</NotFound>
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    const { username } = z.object({ username: UsernameSchema }).parse(await params)
    await lastfmUserExists({ data: username })
    const profile = await fetch(`/api/lastfm/user/info?q=${username}`)
      .then(res => res.json())
      .then(data => LastFmUserInfo.parse(data.data))
    return { profile }
  }
})

function RouteComponent() {
  const { profile } = Route.useLoaderData()
  return (
    <Main className="flex-col">
      <Profile data={profile} />
      <Wrapper className="flex-col gap-5 py-5">
        <Outlet />
      </Wrapper>
    </Main>
  )
}
