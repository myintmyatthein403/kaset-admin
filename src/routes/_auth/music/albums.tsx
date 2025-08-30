import { AlbumPage } from '@/pages/music/albums'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/albums')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AlbumPage />
}
