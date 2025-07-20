import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

const deleteCollection = async (id: string) => {
  const response = await api
    .url(`/users/collection/delete/${id}`)
    .delete()
    .text();
  return response;
};

export const useDeleteCollectionMutate = (
  options?: UseMutationOptions<any, Error, string>
) => {
  return useMutation({
    mutationFn: deleteCollection,
    ...options,
  });
};
