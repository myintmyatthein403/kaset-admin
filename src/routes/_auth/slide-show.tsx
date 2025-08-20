import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/slide-show')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/slide-show"!</div>
}
