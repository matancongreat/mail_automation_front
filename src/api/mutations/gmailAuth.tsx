import { useMutation} from '@tanstack/react-query';
import { apiClient } from '../client.tsx';

// Connect Using Gmail Mutation
export const useGmailConnectMutation = (
) => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post('/gmail/authorize');
      console.log(response.data)
      return response.data;
    }
  });
};