import { useQueryClient } from '@tanstack/react-query';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserLoginResponse } from '@/lib/types';

export const useFetchUserQuery = (): UseQueryResult<UserLoginResponse> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['user'],
    queryFn: (): UserLoginResponse =>
      queryClient.getQueryData(['user']) as UserLoginResponse,
    staleTime: Infinity,
    enabled: false,
  });
};
