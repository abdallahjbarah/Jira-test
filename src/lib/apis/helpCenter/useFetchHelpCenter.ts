// GET /help-center/guest/all

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
// import { HelpCenter } from '@/lib/types';

const fetchHelpCenter = async (): Promise<any[]> => {
  const response = await api.url('/help-center/guest/all').get().json();
  return response as any[];
};

export const useFetchHelpCenter = (
  queryOptions?: UseQueryOptions<any[], Error>,
) =>
  useQuery({
    queryKey: ['help-center'],
    queryFn: fetchHelpCenter,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
