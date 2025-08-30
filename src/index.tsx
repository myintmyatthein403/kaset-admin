import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { ThemeProvider } from './common/providers/theme-provider';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryProviders } from './common/providers/query-provider';
import { useAuth } from '@/hooks/use-auth.hook';
import { Toaster } from 'sonner';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <h1>404!</h1>,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <React.StrictMode>
      <QueryProviders>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} context={{ auth: isAuthenticated }} />
          <Toaster position="top-right" />
        </ThemeProvider>
      </QueryProviders>
    </React.StrictMode>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />); // Render your App component
}
