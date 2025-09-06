import { ProductPage } from '@/pages/product/products'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProductPage />
}
