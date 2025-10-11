import { OrderPage } from '@/pages/product/order'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OrderPage />
}
