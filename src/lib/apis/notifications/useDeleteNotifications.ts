// /notification/delete/{id}

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

const deleteNotification = async (id: string) => {
  const response = await api.url(`/notification/delete/${id}`).delete().json();
  return response;
};

export const useDeleteNotifications = (
  mutationArgs: UseMutationOptions<any, any, string, any>,
) => {
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    ...mutationArgs,
  });
};
