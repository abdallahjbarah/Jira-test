import { api } from '@/lib/apis';
import { BookingDetails } from '@/lib/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchBookingDetails = async (id: string): Promise<BookingDetails> => {
  const response = await api.get(`/booking/details/${id}`);
  return response.json();
};

export const useFetchBookingDetails = (
  id: string,
  queryOptions?: UseQueryOptions<BookingDetails, Error>,
) => {
  return useQuery({
    queryKey: ['bookingDetails', id],
    queryFn: () => fetchBookingDetails(id),
    ...queryOptions,
  });
};
