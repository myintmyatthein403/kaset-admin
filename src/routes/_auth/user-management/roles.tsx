import { RolePage } from '@/pages/user-management/roles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/user-management/roles')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RolePage />
}
