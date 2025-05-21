/// GET  /booking/user

import {
  UseInfiniteQueryOptions,
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { api } from '@/lib/apis';

interface Booking {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalPrice: number;
}

interface UseFetchBookingsProps {
  skip: number;
  limit: number;
}

const fetchBookings = async ({
  skip,
  limit,
}: UseFetchBookingsProps): Promise<Booking[]> => {
  const response = await api.url(`/booking/user`).query({ skip, limit }).get();
  return response.json();
};

export const useFetchBookings = ({ skip, limit }: UseFetchBookingsProps) => {
  return useQuery({
    queryKey: ['bookings', skip, limit],
    queryFn: () => fetchBookings({ skip, limit }),
  });
};

export const useFetchInfiniteBookings = (
  filter?: {
    limit: number;
  },
  queryOptions?: UseInfiniteQueryOptions<any, Error>,
) =>
  useInfiniteQuery({
    queryKey: ['bookings', filter],
    queryFn: async ({ pageParam = 1 }) =>
      fetchBookings({
        skip: Number(pageParam),
        limit: filter?.limit || 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const limit = filter?.limit || 10;
      return lastPage?.bookings?.length >= limit ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
