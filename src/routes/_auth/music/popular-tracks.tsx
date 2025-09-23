import { PopularTrackPage } from '@/pages/music/popular-tracks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/popular-tracks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PopularTrackPage />
}
