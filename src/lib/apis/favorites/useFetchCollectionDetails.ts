import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { FavoriteCollection } from '@/lib/types';

const fetchCollectionDetails = async (
  collectionId: string
): Promise<FavoriteCollection> => {
  const response = await api
    .url(`/users/collection/${collectionId}`)
    .get()
    .json();
  return response as FavoriteCollection;
};

export const useFetchCollectionDetails = (
  collectionId: string,
  queryOptions?: UseQueryOptions<FavoriteCollection, Error>
) => {
  return useQuery({
    queryKey: ['collectionDetails', collectionId],
    queryFn: () => fetchCollectionDetails(collectionId),
    ...queryOptions,
  });
};
