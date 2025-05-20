// GET /countries/cities

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export type City = {
  _id: string;
  name: string;
  countryId: string;
  createdAt: string;
  updatedAt: string;
};

const fetchCities = async (countryId: string): Promise<City[]> => {
  const response = await api.url(`/countries/cities`).get().json();
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
