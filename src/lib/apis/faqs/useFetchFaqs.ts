// /faq

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export type Faq = {
  _id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const fetchFaqs = async (): Promise<Faq[]> => {
  const response = await api.url('/faq').get().json();
  return response as Faq[];
};

export const useFetchFaqs = (queryOptions?: UseQueryOptions<Faq[], Error>) =>
  useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
    ...queryOptions,
  });
