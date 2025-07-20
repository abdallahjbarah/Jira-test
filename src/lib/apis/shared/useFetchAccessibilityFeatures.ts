import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { AccessibilityFeature } from '@/lib/types';

export const fetchAccessibilityFeatures = async (): Promise<
  AccessibilityFeature[]
> => {
  const response = await api.url('/accessibility-features').get().json();
  return response as AccessibilityFeature[];
};

export const useFetchAccessibilityFeatures = (
  queryOptions?: UseQueryOptions<AccessibilityFeature[], Error>
) => {
  return useQuery({
    queryKey: ['accessibility-features'],
    queryFn: fetchAccessibilityFeatures,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};
