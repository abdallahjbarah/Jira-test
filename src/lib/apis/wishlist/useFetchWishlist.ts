// get /users/favCollections
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Collection } from '../collections/data';
import { wishlistData } from '../collections/data';

// fake api call that fetch fake wishlist data and return it after 1 second
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
