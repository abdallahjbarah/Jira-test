import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

interface AddToCollectionPayload {
  siteId?: string;
  collectionId?: string;
  collectionName?: string;
}

const addToCollection = async (data: AddToCollectionPayload) => {
  const response = await api
    .url(`/users/favorites/add-to-collection`)
    .post(data)
    .json();
  return response as AddToCollectionPayload;
};

export const useAddToCollectionMutate = (
  options?: UseMutationOptions<
    AddToCollectionPayload,
    Error,
    AddToCollectionPayload
  >
) => {
  return useMutation({
    mutationFn: addToCollection,
    ...options,
  });
};
