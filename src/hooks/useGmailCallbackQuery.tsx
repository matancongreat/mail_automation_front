import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';

export const useGmailCallbackQuery = (search: string) => {
  return useQuery({
    queryKey: ['gmail-callback', search],
    queryFn: async () => {
      const res = await apiClient.get(`/gmail/callback${search}`);
      return res.data;
    },
    retry: false,
  });
};
