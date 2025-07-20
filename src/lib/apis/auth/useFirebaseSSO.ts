import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { signInWithProvider } from '@/lib/firebase/auth';
import { FirebaseSSOData, FirebaseSSOResponse } from '@/lib/types';

const firebaseSSO = async (
  data: FirebaseSSOData,
  userType: 'guest' | 'partner' = 'guest'
): Promise<FirebaseSSOResponse> => {
  const response = await api
    .url(`/auth/firebase/sso?userType=${userType}`)
    .post(data)
    .json();

  return response as FirebaseSSOResponse;
};

export const useFirebaseSSO = (
  userType: 'guest' | 'partner' = 'guest',
  mutationArgs?: UseMutationOptions<
    FirebaseSSOResponse,
    any,
    { provider: string; additionalData?: any },
    any
  >
) => {
  return useMutation({
    mutationFn: async ({
      provider,
      additionalData,
    }: {
      provider: string;
      additionalData?: any;
    }) => {
      const firebaseResult = await signInWithProvider(provider);

      const providerMapping: Record<string, 'Apple' | 'Google' | 'Facebook'> = {
        apple: 'Apple',
        google: 'Google',
        facebook: 'Facebook',
      };

      const ssoData: FirebaseSSOData = {
        idToken: firebaseResult.idToken,
        provider: providerMapping[firebaseResult.provider],
        ...additionalData,
      };

      return await firebaseSSO(ssoData, userType);
    },
    ...mutationArgs,
  });
};
