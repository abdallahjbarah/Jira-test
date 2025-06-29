import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

const deleteNotification = async (id: string) => {
  try {
    const response = await api.url(`/notification/delete/${id}`).delete().res();

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return { success: true };
  } catch (error) {
    return { success: true };
  }
};

export const useDeleteNotifications = (
  mutationArgs?: UseMutationOptions<any, any, string, any>,
) => {
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    ...mutationArgs,
  });
};
