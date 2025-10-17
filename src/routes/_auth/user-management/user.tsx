import { UserPage } from '@/pages/user-management/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/user-management/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserPage />
}
