// PATCH /notification/read-all

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/lib/apis';

const readAllNotifications = async () => {
  const response = await api.url('/notification/read-all').patch().res();

  return response.json();
};

export const useReadAllNotifications = (
  mutationArgs?: UseMutationOptions<any, any, any, any>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    ...mutationArgs,
  });
};
