import { CollectionPage } from '@/pages/music/collections'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/music/collections')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CollectionPage />
}
