import { SiteByIdResponse } from '@/lib/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index';

const fetchDetails = async (
  id: string
): Promise<{ data: SiteByIdResponse | undefined }> => {
  const response = await api.url(`/sites/${id}`).get().json<SiteByIdResponse>();
  return { data: response };
};

export const useFetchDetails = (
  id: string,
  queryOptions?: Omit<
    UseQueryOptions<
      { data: SiteByIdResponse | undefined },
      Error,
      { data: SiteByIdResponse | undefined },
      readonly ['details', string]
    >,
    'queryKey' | 'queryFn' | 'enabled'
  >
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['details', id] as const,
    queryFn: () => fetchDetails(id),
    enabled: !!id,
  });
};
