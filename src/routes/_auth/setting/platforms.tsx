import { PlatfromPage } from '@/pages/setting/platform'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/platforms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PlatfromPage />
}
