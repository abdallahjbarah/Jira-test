import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index';
import { CollectionStatus } from '@/utils/constants';
import { collectionsData, Collection } from './data';

const fetchCollections = async (
  collectionStatus: CollectionStatus,
): Promise<{ data: Collection[] }> => {
  // Simulate API delay for more realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return data from our mock data file instead of making a real API call
  return {
    data: collectionsData[collectionStatus] || [],
  };
};

export const useFetchCollections = (
  collectionStatus: CollectionStatus,
  queryOptions: UseQueryOptions<
    { data: Collection[] },
    Error,
    { data: Collection[] },
    any
  >,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['collections', collectionStatus],
    queryFn: () => fetchCollections(collectionStatus),
    enabled: !!collectionStatus,
  });
};
