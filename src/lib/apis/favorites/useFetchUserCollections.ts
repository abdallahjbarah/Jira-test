// GET /users/favCollections

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { FavoriteCollection } from '@/lib/types';

const fetchUserFavoriteCollections = async (): Promise<
  FavoriteCollection[]
> => {
  const response = await api.url('/users/favCollections').get().json();
  return response as FavoriteCollection[];
};

export const useFetchUserFavoriteCollections = (
  queryOptions?: Partial<UseQueryOptions<FavoriteCollection[], Error>>,
) =>
  useQuery({
    queryKey: ['userFavoriteCollections'],
    queryFn: fetchUserFavoriteCollections,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...queryOptions,
  });
