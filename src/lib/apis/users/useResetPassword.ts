// /users/resetPassword

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface ResetPasswordData {
  email: string;
  password: string;
}

const resetPassword = async (data: ResetPasswordData) => {
  const response = await api.url('/users/resetPassword').post(data).json();
  return response;
};

export const useResetPassword = (
  mutationArgs?: UseMutationOptions<any, any, ResetPasswordData, any>,
) => {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => resetPassword(data),
    ...mutationArgs,
  });
};
