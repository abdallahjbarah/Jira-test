import { api } from '@/lib/apis';
import { SitesResponse } from '@/lib/types';
import { BackendFilterParams } from '@/utils/helpers/filterHelpers';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

const fetchCollections = async (
  filter: BackendFilterParams
): Promise<SitesResponse> => {
  const response = await api
    .url('/sites')
    .query(filter)
    .get()
    .json<SitesResponse>();
  return response;
};

export const useFetchCollections = (
  filter: BackendFilterParams,
  queryOptions?: UseQueryOptions<SitesResponse, Error>
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['collections', filter],
    queryFn: () => fetchCollections(filter),
    enabled: !!filter && Object.keys(filter).length > 0,
  });
};

export const useFetchInfiniteCollections = (
  filter: BackendFilterParams,
  queryOptions?: UseInfiniteQueryOptions<
    SitesResponse,
    Error,
    {
      pages: SitesResponse[];
    },
    SitesResponse,
    readonly unknown[],
    unknown
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
