import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  status: string;
}

interface AuthState {
  accessToken: string | null; // Renamed from 'token' for clarity
  refreshToken: string | null; // New field for refresh token
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void; // Updated parameters
  logout: () => void;
  // Potentially add a function for token refresh if you implement that later
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null, // Initialize refresh token
      user: null,
      isAuthenticated: false,
      login: (accessToken, refreshToken, user) => { // Updated login function signature
        set({
          accessToken,
          refreshToken, // Store refresh token
          user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null, // Clear refresh token on logout
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }), // Specify which parts of the state to persist
    }
  )
);
