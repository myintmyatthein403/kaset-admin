import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logoutUser = useAuthStore((state) => state.logout);

  const logout = () => {
    logoutUser();
    localStorage.removeItem('token');
    redirect({ to: '/auth/login' });
  };

  return {
    isAuthenticated,
    logout,
  };
};
