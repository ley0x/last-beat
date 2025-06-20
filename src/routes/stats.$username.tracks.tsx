import { createFileRoute } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

export const Route = createFileRoute('/stats/$username/tracks')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Tracks not found</NotFound>
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return (
    <div>
      <h3>Top Tracks for {params.username}</h3>
      <p>Here are the top tracks...</p>
    </div>
  )
} 