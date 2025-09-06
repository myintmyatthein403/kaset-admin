import { TrackPage } from '@/pages/music/track'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/tracks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TrackPage />
}
