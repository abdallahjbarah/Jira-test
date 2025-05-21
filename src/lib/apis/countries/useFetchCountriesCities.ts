// GET /countries/cities

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { City } from '@/lib/types';

const fetchCities = async (countryId: string): Promise<City[]> => {
  const response = await api
    .url(`/countries/cities`)
    .query({ countryIds: [countryId] })
    .get()
    .json();
  return response as City[];
};
export const useFetchCities = (
  countryId: string,
  queryOptions?: UseQueryOptions<City[], Error>,
) =>
  useQuery({
    queryKey: ['cities', countryId],
    queryFn: () => fetchCities(countryId),
    ...queryOptions,
    enabled: !!countryId,
    refetchOnWindowFocus: false,
  });
