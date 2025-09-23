import { ApiTokenPage } from '@/pages/setting/api-token'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/api-token')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ApiTokenPage />
}
