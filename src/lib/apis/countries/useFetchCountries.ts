// GET /countries

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Country } from '@/lib/types';

const fetchCountries = async (): Promise<Country[]> => {
  const response = await api.url('/countries').get().json();
  return response as Country[];
};

export const useFetchCountries = (
  queryOptions?: UseQueryOptions<Country[], Error>,
) => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
