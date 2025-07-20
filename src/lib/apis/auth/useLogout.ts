import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface LogoutData {
  token: string;
}

const logout = async (data: LogoutData) => {
  const response = await api
    .url('/auth/userSignOut')
    .patch({ ...data, fcmToken: '' })
    .text();
  return response;
};

export const useLogout = (
  mutationArgs?: UseMutationOptions<any, any, LogoutData, any>
) => {
  return useMutation({
    mutationFn: (data: LogoutData) => logout(data),
    ...mutationArgs,
  });
};
