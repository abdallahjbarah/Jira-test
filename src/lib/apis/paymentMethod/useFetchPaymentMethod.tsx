import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../index'; // Assuming api is setup for potential future API calls
import { PaymentMethod } from '@/lib/types';
interface PaymentMethodResponse {
  data: PaymentMethod[];
}

const fetchPaymentMethods = async (): Promise<PaymentMethodResponse> => {
  const response = await api.url(`/payment-methods`).get().json<PaymentMethodResponse>();
  return response;
};

export const useFetchPaymentMethods = (
  queryOptions?: Omit<UseQueryOptions<
    PaymentMethodResponse,
    Error,
    PaymentMethodResponse,
    readonly ['paymentMethods']
  >, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['paymentMethods'] as const,
    queryFn: () => fetchPaymentMethods(),
  });
};