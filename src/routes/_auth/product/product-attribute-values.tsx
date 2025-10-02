import { ProductAttributeValuePage } from '@/pages/product/product-attribute-values'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/product/product-attribute-values')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <ProductAttributeValuePage />
}
