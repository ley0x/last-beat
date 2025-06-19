import { createFileRoute } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

export const Route = createFileRoute('/stats/$username')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Stats not found</NotFound>
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div>Hello "/stats/$username"!</div>
  )
}