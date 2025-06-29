import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/lib/apis';

const deleteAllNotifications = async () => {
  try {
    const response = await api.url('/notification/delete-all').delete().res();

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return { success: true };
  } catch (error) {
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
