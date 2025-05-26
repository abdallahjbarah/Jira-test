// GET /language

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Language } from '@/lib/types';

export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await api.url('/language').get().json();
  return response as Language[];
};

export const useFetchLanguages = (
  queryOptions?: UseQueryOptions<Language[], Error>,
) => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
