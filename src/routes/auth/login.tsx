import { useAuthStore } from '@/src/common/store/authStore';
import { LoginPage } from '@/src/pages/auth/login';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  beforeLoad: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({
        to: '/music/tracks'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
