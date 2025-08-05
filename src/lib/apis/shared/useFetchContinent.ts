import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Continent } from '@/lib/types';

export const fetchContinent = async (): Promise<Continent[]> => {
  const response = await api.url('/continent').get().json();
  return response as Continent[];
};

export const useFetchContinent = (
  queryOptions?: UseQueryOptions<Continent[], Error>,
) => {
  return useQuery({
    queryKey: ['continent'],
    queryFn: fetchContinent,
    ...queryOptions,
  });
};
