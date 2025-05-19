// /auth/socialMediaLogin

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { SocialLoginType } from '@/utils/constants';

export interface SocialLoginData {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  socialMediaId: string;
  socialLoginType: {
    type: SocialLoginType;
  };
  tokens: string;
}

const socialLogin = async (data: SocialLoginData) => {
  const response = await api.url('/auth/socialMediaLogin').post(data).json();
  return response;
};

export const useSocialLogin = (
  mutationArgs: UseMutationOptions<any, any, SocialLoginData, any>,
) => {
  return useMutation({
    mutationFn: (data: SocialLoginData) => socialLogin(data),
    ...mutationArgs,
  });
};
