import { api } from '@/lib/apis';
import { signInWithProvider } from '@/lib/firebase/auth';
import { SOCIAL_LOGIN_TYPES, SocialLoginType } from '@/utils/constants';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export interface SocialLoginData {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  socialMediaId: string;
  socialLoginType: SocialLoginType;
  tokens: string;
}

const socialLogin = async (data: SocialLoginData) => {
  const response = await api.url('/auth/socialMediaLogin').post(data).json();
  return response;
};

export const useSocialLogin = (
  userType: 'guest' | 'partner' = 'guest',
  mutationArgs?: UseMutationOptions<
    any,
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

      // Extract user data from Firebase
      const user = firebaseResult.user;
      const displayName = user.displayName || '';
      const [firstName = '', lastName = ''] = displayName.split(' ');

      // Map provider to SocialLoginType (the provider itself is the type)
      const providerMapping: Record<string, SocialLoginType> = {
        apple: SOCIAL_LOGIN_TYPES.APPLE,
        google: SOCIAL_LOGIN_TYPES.GOOGLE,
        facebook: SOCIAL_LOGIN_TYPES.FACEBOOK,
      };

      const socialLoginData: SocialLoginData = {
        firstName: firstName || user.email?.split('@')[0] || '',
        lastName: lastName || '',
        email: user.email || '',
        profileImageUrl: user.photoURL || '',
        socialMediaId: user.uid,
        socialLoginType: providerMapping[provider],
        tokens: firebaseResult.idToken,
        ...additionalData,
      };

      return await socialLogin(socialLoginData);
    },
    ...mutationArgs,
  });
};
