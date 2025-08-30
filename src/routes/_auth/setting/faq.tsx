import { FAQPage } from '@/pages/setting/faq'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/setting/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FAQPage />
}
