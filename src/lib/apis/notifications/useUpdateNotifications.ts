import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface UpdateNotificationData {
  id: string;
}

const updateNotification = async (data: UpdateNotificationData) => {
  const { id } = data;

  const response = await api
    .url(`/notification/read-unread/${id}`)
    .patch()
    .json();
  return response;
};

export const useUpdateNotifications = (
  mutationArgs?: UseMutationOptions<any, any, UpdateNotificationData, any>
) => {
  return useMutation({
    mutationFn: (data: UpdateNotificationData) => updateNotification(data),
    ...mutationArgs,
  });
};
