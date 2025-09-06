import { DataCollectPage } from '@/pages/music/data-collects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/data-collect')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DataCollectPage />
}
