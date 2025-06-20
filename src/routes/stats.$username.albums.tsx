import { createFileRoute } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

export const Route = createFileRoute('/stats/$username/albums')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Albums not found</NotFound>
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return (
    <div>
      <h3>Top Albums for {params.username}</h3>
      <p>Here are the top albums...</p>
    </div>
  )
} 