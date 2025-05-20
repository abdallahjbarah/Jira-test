import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { UserLoginResponse } from '@/lib/types';

export interface UserLoginData {
  email: string;
  password: string;
}

const userLogin = async (data: UserLoginData): Promise<UserLoginResponse> => {
  const response = await api.url('/auth/login').post(data).json();
  return response as UserLoginResponse;
};

export const useUserLogin = (
  mutationArgs?: UseMutationOptions<any, any, UserLoginData, any>,
) => {
  return useMutation({
    mutationFn: (data: UserLoginData) => userLogin(data),
    ...mutationArgs,
  });
};
