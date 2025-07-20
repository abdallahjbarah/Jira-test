import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { BookOption } from '@/lib/types';

export const fetchBookOptions = async (filter: {
  isStayType: boolean;
}): Promise<BookOption[]> => {
  const response = await api.url('/book-options').query(filter).get().json();
  return response as BookOption[];
};

export const useFetchBookOptions = (
  filter: {
    isStayType: boolean;
  },
  queryOptions?: UseQueryOptions<BookOption[], Error>
) => {
  return useQuery({
    queryKey: ['book-options', filter],
    queryFn: () => fetchBookOptions(filter),
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
