import { NotFound } from '@/components/not-found'
import { createFileRoute } from '@tanstack/react-router'

import { ErrorComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/stats')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Stats not found</NotFound>
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
    Hello "/stats"
    </div>
  )
}
