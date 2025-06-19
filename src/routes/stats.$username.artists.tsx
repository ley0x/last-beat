import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/layout/layout'
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
    <Layout>
      <div>Hello "/stats/{params.username}/artists"!</div>
    </Layout>
  )
} 