import { createFileRoute, useRouter } from '@tanstack/react-router'

import { Main } from '@common/main'
import { Wrapper } from '@common/wrapper'

import { Covers } from '@covers/covers'
import Header from '@common/header'

import { requireAuth } from '@/services/server/require-auth'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth-client'

export const Route = createFileRoute('/covers')({
  component: RouteComponent,
  loader: async () => {
    const user = await requireAuth()
    return { user }
  }
})

function RouteComponent() {
  const { user } = Route.useLoaderData()
  const router = useRouter()

  const handleClick = async () => {
    await signOut()
    await router.invalidate();
  }

  return (
    <Main>
      <Wrapper className="flex-col gap-5 py-5">
        <header>
          <Header as="h1">
            Download your favorite album covers from{' '}
            <span className="text-green-400 hover:underline text-decoration-primary">Spotify</span>,{' '}
            <span className="text-red-400 hover:underline text-decoration-primary">Last.fm</span>, and{' '}
            <span className="text-violet-400 hover:underline text-decoration-primary">Deezer</span>.
          </Header>
          <p className="text-sm text-muted-foreground">
            Use <span className="font-bold">deezer</span> (highest resolution),{' '}
            <span className="font-bold">spotify</span> (good resolution) or <span className="font-bold">last.fm</span>{' '}
            (usually bad resolution but largest choice) to download your album covers.
          </p>
        </header>
        <section>
          <h1>Hello "/welcome/"!</h1>
          <h2>User: {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Image: {user.image}</h2>
          <p>You are signed in!</p>
          <Button onClick={handleClick} className="cursor-pointer">
            Sign out
          </Button>
        </section>
        <Covers />
      </Wrapper>
    </Main>
  )
}
