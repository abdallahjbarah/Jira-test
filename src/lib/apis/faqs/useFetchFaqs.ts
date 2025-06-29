import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { Faq } from '@/lib/types';

const fetchFaqs = async (): Promise<Faq[]> => {
  const response = await api.url('/faq').get().json();
  return response as Faq[];
};

export const useFetchFaqs = (queryOptions?: UseQueryOptions<Faq[], Error>) =>
  useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000,
    ...queryOptions,
  });
