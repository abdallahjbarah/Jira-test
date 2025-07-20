import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export const fetchSiteSuggestions = async (
  searchText: string
): Promise<any> => {
  // Always fetch, even if searchText is empty (to show default suggestions)
  const response = await api
    .url('/sites/suggestions')
    .query({ search: searchText || '' })
    .get()
    .json();
  return response as any;
};

export const useFetchSiteSuggestions = (
  searchText: string,
  queryOptions?: UseQueryOptions<any, Error>
) => {
  return useQuery({
    queryKey: ['site-suggestions', searchText],
    queryFn: () => fetchSiteSuggestions(searchText),
    enabled: true, // Always enabled to allow fetching on popup open
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
