import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  authToken: string;
  id: number;
  name: string;
  email: string;
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      const res = await apiClient.post('/api/login', payload);
      return res.data.data;
    },
  });
};