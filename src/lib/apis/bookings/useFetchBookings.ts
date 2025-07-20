import {
  UseInfiniteQueryOptions,
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Booking } from '@/lib/types';
import { BookingStatus } from '@/lib/enums';
import { deepClearObject } from '@/utils/helpers/clearObject';

interface UseFetchBookingsFilters {
  skip: number;
  limit: number;
  status: BookingStatus;
  search: string;
}

interface BookingResponse {
  bookings: Booking[];
  totalCount: number;
}

const fetchBookings = async (
  filters: UseFetchBookingsFilters
): Promise<BookingResponse> => {
  const response = await api
    .url(`/booking/user`)
    .query(deepClearObject(filters))
    .get();
  return response.json();
};

export const useFetchBookings = (filters: UseFetchBookingsFilters) => {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => fetchBookings(filters),
  });
};

export const useFetchInfiniteBookings = (
  filter?: UseFetchBookingsFilters,
  queryOptions?: UseInfiniteQueryOptions<any, Error>
) =>
  useInfiniteQuery({
    queryKey: ['bookings', filter],
    queryFn: async ({ pageParam = 0 }) =>
      fetchBookings({
        status: BookingStatus.PENDING,
        search: filter?.search || '',
        ...filter,
        skip: Number(pageParam),
        limit: filter?.limit || 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const limit = filter?.limit || 10;
      return lastPage?.bookings?.length >= limit ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
