import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export const fetchSearchDestination = async (
  searchText: string
): Promise<any> => {
  if (!searchText || searchText.trim().length === 0) {
    return { results: [] };
  }

  const response = await api
    .url('/sites/search-destinations')
    .query({ destination: searchText.trim() })
    .get()
    .json();
  return response as any;
};

export const useFetchSearchDestination = (
  searchText: string,
  queryOptions?: UseQueryOptions<any, Error>
) => {
  return useQuery({
    queryKey: ['search-destination', searchText],
    queryFn: () => fetchSearchDestination(searchText),
    enabled: !!searchText && searchText.trim().length > 0,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
