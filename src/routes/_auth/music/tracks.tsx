import { TrackPage } from '@/pages/music/tracks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/tracks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TrackPage />
}
