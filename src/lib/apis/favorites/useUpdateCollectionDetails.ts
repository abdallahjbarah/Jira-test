import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

interface UpdateCollectionDetailsPayload {
  id: string;
  collectionName?: string;
}

const updateCollectionDetails = async (
  data: UpdateCollectionDetailsPayload
): Promise<UpdateCollectionDetailsPayload> => {
  const { id, ...rest } = data;
  const response = await api.url(`/users/favorites/${id}`).patch(rest).json();
  return response as UpdateCollectionDetailsPayload;
};

export const useUpdateCollectionDetails = (
  options?: UseMutationOptions<
    UpdateCollectionDetailsPayload,
    Error,
    UpdateCollectionDetailsPayload
  >
) => {
  return useMutation({
    mutationFn: updateCollectionDetails,
    ...options,
  });
};
