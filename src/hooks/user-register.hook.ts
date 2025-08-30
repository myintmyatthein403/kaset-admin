import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/lib/axios';
import { useNavigate } from '@tanstack/react-router';
import type { RegisterSchemaType } from '@/common/schemas/register.schema';

const registerUser = async (data: RegisterSchemaType) => {
  const response = await fetcher('/auth/register', {
    method: "POST",
    data: {
      email: data.email,
      name: data.name,
      password: data.password
    }
  });
  return response.data;
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate({ to: '/auth/login' })
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });
};
