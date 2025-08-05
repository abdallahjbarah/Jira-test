import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Collection, wishlistData } from '../collections/data';

const fetchWishlist = async (): Promise<{ data: Collection[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: wishlistData });
    }, 1000);
  });
};

export const useFetchWishlist = (
  queryOptions: UseQueryOptions<
    { data: Collection[] },
    Error,
    { data: Collection[] },
    any
  >,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });
};
