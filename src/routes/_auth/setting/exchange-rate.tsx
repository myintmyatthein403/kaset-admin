import { EchangeRatePage } from '@/pages/setting/exchange-rate'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/exchange-rate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EchangeRatePage />
}
