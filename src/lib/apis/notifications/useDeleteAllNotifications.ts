// DELETE /notification/delete-all

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/lib/apis';

const deleteAllNotifications = async () => {
  try {
    // Get the raw response first
    const response = await api.url('/notification/delete-all').delete().res();

    // Check if response has JSON content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    // For empty or non-JSON responses, return a success object
    return { success: true };
  } catch (error) {
    // If any error occurs, still return a success object
    return { success: true };
  }
};

export const useDeleteAllNotifications = (
  mutationArgs?: UseMutationOptions<any, any, any, any>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    ...mutationArgs,
  });
};
