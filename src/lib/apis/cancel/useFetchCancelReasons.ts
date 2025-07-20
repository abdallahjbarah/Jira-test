import { api } from '@/lib/apis';
import { CancelReason } from '@/lib/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchCancelReasons = async (): Promise<CancelReason[]> => {
  const response = await api.get('/cancel-reason');
  return response.json();
};

export const useFetchCancelReasons = (
  queryOptions?: UseQueryOptions<CancelReason[], Error>
) => {
  return useQuery({
    queryKey: ['cancel-reason'],
    queryFn: fetchCancelReasons,
    ...queryOptions,
  });
};
