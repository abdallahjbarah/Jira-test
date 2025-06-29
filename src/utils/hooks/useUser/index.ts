'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TOKEN_NAME } from '@utils/constants';
import { useQueryClient } from '@tanstack/react-query';
import { UserLoginResponse } from '@/lib/types';
import { useLogout } from '@/lib/apis/auth/useLogout';
import { getCookie, removeCookie } from '@/utils/cookies';
import { useFetchUserQuery } from '@/lib/apis/users/useFetchUser';

interface UseUserReturn {
  userData: UserLoginResponse | undefined;
  logout: () => void;
  redirectTo: (path: string) => void;
  isLoggedIn: boolean | undefined;
}

export default function useUser(): UseUserReturn {
  const queryClient = useQueryClient();

  const { data: userData } = useFetchUserQuery();

  const isLoggedIn = React.useMemo(() => {
    return !!userData?.token;
  }, [userData]);

  const { mutate: logoutMutate } = useLogout({
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });

      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.removeQueries({ queryKey: ['notifications'] });
      queryClient.removeQueries({
        queryKey: ['userFavoriteCollections'],
      });
      queryClient.removeQueries({ queryKey: ['bookingData'] });

      router.push('/auth/login');

      removeCookie(TOKEN_NAME);
      removeCookie('userStatus');
    },
  });

  const router = useRouter();

  function logout(): void {
    logoutMutate({ token: userData?.token || getCookie(TOKEN_NAME) || '' });
  }

  function redirectTo(path: string): void {
    router.push(path);
  }

  return {
    userData,
    logout,
    redirectTo,
    isLoggedIn,
  };
}
