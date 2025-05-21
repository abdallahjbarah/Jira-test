import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index'; // Assuming api is setup for potential future API calls
import { Site, SiteByIdResponse } from '@/lib/types';

const fetchDetails = async (
  id: string,
): Promise<{ data: Site | undefined }> => {
  const response = await api.url(`/sites/${id}`).get().json<SiteByIdResponse>();
  return { data: response.site };
};

export const useFetchDetails = (
  id: string,
  queryOptions?: Omit<UseQueryOptions<
    { data: Site | undefined },
    Error,
    { data: Site | undefined },
    readonly ['details', string]
  >, 'queryKey' | 'queryFn' | 'enabled'>,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['details', id] as const,
    queryFn: () => fetchDetails(id),
    enabled: !!id,
  });
};
