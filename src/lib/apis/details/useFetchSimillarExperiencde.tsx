import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index';
import { SimilarExperiencesResponse } from '@/lib/types';

const fetchSimilar = async (id: string): Promise<SimilarExperiencesResponse> => {
    const response = await api
      .url(`/sites/${id}/similar`)
      .query({
        limit: 10,
      })    
      .get()
      .json<SimilarExperiencesResponse>();
    return response;
  };

export const useFetchSimilar = (
  id: string,
  queryOptions?: UseQueryOptions<SimilarExperiencesResponse, Error>,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['similar', id] as const,
    queryFn: () => fetchSimilar(id),
    enabled: !!id,
  });
};
