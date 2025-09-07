import { createFileRoute } from '@tanstack/react-router'
import { SocialLinkPage } from '@/pages/setting/social-link'

export const Route = createFileRoute('/_auth/setting/social-link')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SocialLinkPage/>
}
