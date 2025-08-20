import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router'; // Import TanStack Router navigate
import { useAuthStore } from '../store/authStore';
import { api } from '../lib/axios';

interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  meta: {
    message: string;
    accessToken: string;
    refreshToken: string;
  };
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    email: string;
    name: string;
    status: string;
    banned_reason: string | null;
    banned_until: string | null;
    last_login_at: string | null;
  };
}

export const useLogin = () => {
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/login', payload);
      return response.data;
    },
    onSuccess: (data) => {

      loginUser(
        data.meta.accessToken,
        data.meta.refreshToken,
        {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          status: data.data.status,
        }
      );

      navigate({ to: '/music/tracks' });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
