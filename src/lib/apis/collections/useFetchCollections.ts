import { api } from '@/lib/apis';
import { SitesResponse } from '@/lib/types';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

const fetchCollections = async (filter: any): Promise<SitesResponse> => {
  const response = await api
    .url('/sites')
    .query(filter)
    .get()
    .json<SitesResponse>();
  return response;
};

export const useFetchCollections = (
  filter: any,
  queryOptions?: UseQueryOptions<SitesResponse, Error>
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['collections', filter],
    queryFn: () => fetchCollections(filter),
    enabled: !!filter,
  });
};

export const useFetchInfiniteCollections = (
  filter: any,
  queryOptions?: UseInfiniteQueryOptions<
    SitesResponse,
    Error,
    {
      pages: SitesResponse[];
    },
    any
  >
) => {
  return useInfiniteQuery({
    queryKey: ['collections-infinite', filter],
    queryFn: async ({ pageParam = 1 }) =>
      fetchCollections({
        ...filter,
        skip: Number(pageParam),
        limit: filter?.limit || 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const limit = filter?.limit || 10;
      return lastPage.sites.data.length >= limit ? pages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};
