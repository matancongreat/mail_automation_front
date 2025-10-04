import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';

export const useGoogleCallbackQuery = (search: string) => {
  return useQuery({
    queryKey: ['google-callback', search],
    queryFn: async () => {
      const res = await apiClient.get(`/google/callback${search}`);
      return res.data;
    },
    retry: false,
  });
};
