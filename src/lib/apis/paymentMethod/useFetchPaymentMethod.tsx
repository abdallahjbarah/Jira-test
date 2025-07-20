import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index';
import { PaymentMethod } from '@/lib/types';

const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await api
    .url(`/payment-methods`)
    .get()
    .json<PaymentMethod[]>();
  return response;
};

export const useFetchPaymentMethods = (
  queryOptions?: Omit<
    UseQueryOptions<
      PaymentMethod[],
      Error,
      PaymentMethod[],
      readonly ['paymentMethods']
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['paymentMethods'] as const,
    queryFn: () => fetchPaymentMethods(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
