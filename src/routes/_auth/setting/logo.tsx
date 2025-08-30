import { LogoSettingPage } from '@/pages/setting/logo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/logo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LogoSettingPage />
}
