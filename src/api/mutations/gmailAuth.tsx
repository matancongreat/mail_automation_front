import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client.tsx';
import { GmailAuthResponse } from '@/types/GmailAuthResponse.tsx';

// Connect Using Gmail Mutation
export const useGmailConnectMutation = () => {
  return useMutation<GmailAuthResponse>({
    mutationFn: async () => {
      const response = await apiClient.get('/google/authorize');
      return response.data;
    }
  });
};