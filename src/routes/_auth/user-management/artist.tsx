import { ArtistPage } from '@/pages/user-management/artists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/user-management/artist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ArtistPage />
}
