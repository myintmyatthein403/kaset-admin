import { createRootRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

interface MyRouterContext {
  auth: boolean
}

export const Route = createRootRoute<MyRouterContext>({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
