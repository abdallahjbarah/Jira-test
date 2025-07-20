import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface ForgetPasswordData {
  email: string;
}

const forgetPassword = async (data: ForgetPasswordData) => {
  const response = await api.url('/users/forget').post(data).text();
  return response;
};

export const useForgetPassword = (
  mutationArgs?: UseMutationOptions<any, any, ForgetPasswordData, any>
) => {
  return useMutation({
    mutationFn: (data: ForgetPasswordData) => forgetPassword(data),
    ...mutationArgs,
  });
};
