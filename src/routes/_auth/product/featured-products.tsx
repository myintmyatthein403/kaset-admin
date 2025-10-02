import { FeaturedproductPage } from '@/pages/product/featured-products'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/featured-products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FeaturedproductPage />
}
