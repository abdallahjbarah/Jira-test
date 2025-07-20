import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Ticket } from '@/lib/types';

const fetchTickets = async (): Promise<Ticket[]> => {
  const response = await api.url('/help-center/guest/all').get().json();
  return response as Ticket[];
};

export const useFetchTickets = (
  queryOptions?: Partial<UseQueryOptions<Ticket[], Error>>
) =>
  useQuery({
    queryKey: ['help-center'],
    queryFn: fetchTickets,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
