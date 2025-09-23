import { FeaturedArtistPage } from '@/pages/music/featured-artists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/featured-artists')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FeaturedArtistPage />
}
