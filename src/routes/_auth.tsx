import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect } from '@tanstack/react-router'
import { SideBarLayout } from '@/components/layouts/side-bar.layout'
import { useAuthStore } from '@/common/store/authStore'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <SideBarLayout>
      <Outlet />
    </SideBarLayout>
  )
}
