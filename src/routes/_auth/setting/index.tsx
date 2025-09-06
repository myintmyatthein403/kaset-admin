import { SettingPage } from '@/pages/setting/setting'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SettingPage />
}
