import { CreditKeyPage } from '@/pages/setting/credit-keys'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/credit-keys')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreditKeyPage />
}
