import { RegisterPage } from '@/src/pages/auth/register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterPage />
}
