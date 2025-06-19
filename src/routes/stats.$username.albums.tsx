import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/layout/layout'
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
    <Layout>
      <div>Hello "/stats/{params.username}/albums"!</div>
    </Layout>
  )
} 