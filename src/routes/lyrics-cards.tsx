import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/layout/layout'

export const Route = createFileRoute('/lyrics-cards')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/lyrics-cards"!</div>
  )
}
