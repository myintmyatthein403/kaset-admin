import { GenrePage } from '@/pages/music/genres'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/genres')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GenrePage />
}
