import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/layout/layout'

export const Route = createFileRoute('/covers')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/covers"!</div>
  )
}
