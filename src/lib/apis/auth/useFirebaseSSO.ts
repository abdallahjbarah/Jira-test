import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { signInWithProvider } from '@/lib/firebase/auth';
import { SocialLoginType } from '@/utils/constants';

export interface FirebaseSSOData {
  idToken: string;
  provider: 'Apple' | 'Google' | 'Facebook';
  fcmToken?: string;
}

export interface FirebaseSSOResponse {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    providerId: string;
    emailVerified: boolean;
    status?: number;
  };
  token: string;
  isNewUser: boolean;
}

const firebaseSSO = async (
  data: FirebaseSSOData,
  userType: 'guest' | 'partner' = 'guest',
): Promise<FirebaseSSOResponse> => {
  console.log('Sending Firebase SSO request:', { data, userType });
  
  const response = await api
    .url(`/auth/firebase/sso?userType=${userType}`)
    .post(data)
    .json();
    
  console.log('Firebase SSO API response:', response);
  return response as FirebaseSSOResponse;
};

export const useFirebaseSSO = (
  userType: 'guest' | 'partner' = 'guest',
  mutationArgs?: UseMutationOptions<FirebaseSSOResponse, any, string, any>,
) => {
  return useMutation({
    mutationFn: async (provider: string) => {
      // Step 1: Authenticate with Firebase
      const firebaseResult = await signInWithProvider(provider);

      // Step 2: Send to backend for verification and user creation
      // Map frontend provider names to backend expected format
      const providerMapping: Record<string, 'Apple' | 'Google' | 'Facebook'> = {
        apple: 'Apple',
        google: 'Google',
        facebook: 'Facebook',
      };

      const ssoData: FirebaseSSOData = {
        idToken: firebaseResult.idToken,
        provider: providerMapping[firebaseResult.provider],
      };

      return await firebaseSSO(ssoData, userType);
    },
    ...mutationArgs,
  });
};
