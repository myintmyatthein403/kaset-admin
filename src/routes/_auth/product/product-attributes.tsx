import { ProductAttributePage } from '@/pages/product/product-attributes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/product-attributes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProductAttributePage />
}
