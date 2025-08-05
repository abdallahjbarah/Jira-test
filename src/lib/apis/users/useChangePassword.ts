import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

interface ChangePasswordData {
  userId: string | undefined;
  oldPassword: string;
  newPassword: string;
}

const changePassword = async (data: ChangePasswordData): Promise<any> => {
  const { userId, ...rest } = data;
  const response = await api
    .url(`/users/${userId}/change-password`)
    .patch(rest)
    .json();
  return response;
};

export const useChangePassword = (
  mutationArgs?: UseMutationOptions<any, any, any, any>,
) => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(data),
    ...mutationArgs,
  });
};
