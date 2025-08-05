import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Policies } from '@/lib/types';

export const fetchPolicies = async (): Promise<Policies> => {
  const response = await api.url('/policies').get().json();
  return response as Policies;
};

export const useFetchPolicies = (
  queryOptions?: UseQueryOptions<Policies, Error>,
) => {
  return useQuery({
    queryKey: ['policies'],
    queryFn: fetchPolicies,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
