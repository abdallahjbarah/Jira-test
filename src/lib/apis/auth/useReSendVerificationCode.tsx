import { api } from '@/lib/apis';
import { ReSendVerificationCodeResponse } from '@/lib/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export interface UserReSendVerificationCodeData {
  email: string;
}

const userReSendVerificationCode = async (
  data: UserReSendVerificationCodeData
): Promise<ReSendVerificationCodeResponse> => {
  const response = await api
    .url('/auth/resend-verification-code')
    .post(data)
    .json();
  return response as ReSendVerificationCodeResponse;
};

export const useReSendVerificationCode = (
  mutationArgs?: UseMutationOptions<
    any,
    any,
    UserReSendVerificationCodeData,
    any
  >
) => {
  return useMutation({
    mutationFn: (data: UserReSendVerificationCodeData) =>
      userReSendVerificationCode(data),
    ...mutationArgs,
  });
};
