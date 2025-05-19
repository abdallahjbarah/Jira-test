import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index'; // Assuming api is setup for potential future API calls
import { Collection, collectionsData } from '../collections/data'; // Importing Collection type and mock data

const fetchDetails = async (
  id: string,
): Promise<{ data: Collection | undefined }> => {
  // Simulate API delay for more realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find the item by id from the 'all' category in collectionsData
  const item = collectionsData.all.find((collection) => collection.id === id);

  return {
    data: item,
  };
};

export const useFetchDetails = (
  id: string,
  queryOptions?: Omit<UseQueryOptions<
    { data: Collection | undefined },
    Error,
    { data: Collection | undefined },
    readonly ['details', string]
  >, 'queryKey' | 'queryFn' | 'enabled'>,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['details', id] as const,
    queryFn: () => fetchDetails(id),
    enabled: !!id,
  });
};
