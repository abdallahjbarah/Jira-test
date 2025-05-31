// GET /help-center/guest/details/{id}

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Ticket } from '@/lib/types';

const fetchTicketDetails = async (id: string): Promise<Ticket> => {
  const response = await api
    .url(`/help-center/guest/details/${id}`)
    .get()
    .json();
  return response as Ticket;
};

export const useFetchTicketDetails = (
  id: string,
  queryOptions?: UseQueryOptions<Ticket, Error>,
) =>
  useQuery({
    queryKey: ['help-center-details', id],
    queryFn: () => fetchTicketDetails(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
    ...queryOptions,
  });
