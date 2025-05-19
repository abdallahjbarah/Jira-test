// /users/{userId}/edit-guest

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface EditUserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  profileImageUrl: string;
}

const editUser = async (data: EditUserData) => {
  const { userId, ...rest } = data;
  const response = await api
    .url(`/users/${userId}/edit-guest`)
    .patch(rest)
    .json();
  return response;
};

export const useEditUser = (
  mutationArgs: UseMutationOptions<any, any, EditUserData, any>,
) => {
  return useMutation({
    mutationFn: (data: EditUserData) => editUser(data),
    ...mutationArgs,
  });
};
