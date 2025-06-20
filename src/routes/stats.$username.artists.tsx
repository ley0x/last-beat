import { createFileRoute } from '@tanstack/react-router'
import { ErrorComponent } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'

export const Route = createFileRoute('/stats/$username/artists')({
  errorComponent: ErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Artists not found</NotFound>
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return (
    <div>
      <h3>Top Artists for {params.username}</h3>
      <p>Here are the top artists...</p>
    </div>
  )
} 