import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
}

const signup = async (data: SignupData) => {
  const response = await api.url('/users/guestSignUp').post(data).json();
  return response;
};

export const useSignup = (
  mutationArgs: UseMutationOptions<any, any, SignupData, any>
) => {
  return useMutation({
    mutationFn: (data: SignupData) => signup(data),
    ...mutationArgs,
  });
};
