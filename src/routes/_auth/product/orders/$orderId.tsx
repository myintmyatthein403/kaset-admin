import { OrderDetail } from '@/pages/product/order/detail'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/orders/$orderId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { orderId } = useParams({ from: Route.id })
  return <OrderDetail orderId={orderId} />
}
