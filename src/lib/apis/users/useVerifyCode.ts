// /users/verifyCode

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface VerifyCodeData {
  code: string;
}

const verifyCode = async (data: VerifyCodeData) => {
  const response = await api.url('/users/verifyCode').post(data).json();
  return response;
};

export const useVerifyCode = (
  mutationArgs: UseMutationOptions<any, any, VerifyCodeData, any>,
) => {
  return useMutation({
    mutationFn: (data: VerifyCodeData) => verifyCode(data),
    ...mutationArgs,
  });
};
