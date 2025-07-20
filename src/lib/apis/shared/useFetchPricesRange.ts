import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { PricesRange } from '@/lib/types';

export const fetchPricesRange = async (): Promise<PricesRange> => {
  const response = await api.url('/sites/prices/all').get().json();
  return response as PricesRange;
};

export const useFetchPricesRange = (
  queryOptions?: UseQueryOptions<PricesRange, Error>
) => {
  return useQuery({
    queryKey: ['prices-range'],
    queryFn: fetchPricesRange,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
