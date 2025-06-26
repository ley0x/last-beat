import { Main } from '@/components/_common/main'
import { Wrapper } from '@/components/_common/wrapper'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup/')({
  component: RouteComponent
})

function RouteComponent() {
  const handleClick = async () => {
    console.log('handleClick')

    const { data, error } = await signIn.social({
      provider: 'spotify',
      errorCallbackURL: '/error',
      newUserCallbackURL: '/welcome',
      // requestSignUp: true
    })

    if (error) {
      console.log(error)
      return
    }
    console.log(data)
    if (data.redirect && data.url) {
      window.location.href = data.url
      return
    }
  }

  return (
    <Main>
      <Wrapper className="flex-col justify-start items-center h-full">
        <p>Hello "/signup/"!</p>
        <Button onClick={() => handleClick()} className="cursor-pointer">
          Sign in with Spotify
        </Button>
      </Wrapper>
    </Main>
  )
}
