import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/orders/$orderId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { orderId } = useParams({ from: Route.id })
  return <div>Hello /_auth/product/orders/{orderId}!</div>
}
