import { ProductCategoryPage } from '@/pages/product/product-categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/product-categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProductCategoryPage />
}
