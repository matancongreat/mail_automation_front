import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client.tsx';
import { GmailAuthResponse } from '@/types/GmailAuthResponse.tsx';

// Connect Using Google Mutation
export const useGoogleConnectMutation = () => {
  return useMutation<GmailAuthResponse>({
    mutationFn: async () => {
      const response = await apiClient.get('/google/authenticate');
      return response.data;
    }
  });
};
