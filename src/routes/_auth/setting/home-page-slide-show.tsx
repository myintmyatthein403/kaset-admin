import { HomePageSlideShowPage } from '@/pages/setting/home-page-slide-show'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/home-page-slide-show')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HomePageSlideShowPage />
}
