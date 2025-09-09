'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import { useSocialLogin } from '@/lib/apis/auth/useSocialLogin';
import { SSOProviderType } from '@/lib/enums';
import { useFirebase } from '@/providers/FirebaseProvider';
import { TOKEN_NAME } from '@/utils';
import { setCookie } from '@/utils/cookies';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { WretchError } from 'wretch';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook' | 'apple';
  userType?: 'guest' | 'partner';
  className?: string;
  disabled?: boolean;

  additionalProfileData?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: 'male' | 'female' | 'other';
    birthDate?: string;
    nationality?: string;
    countryId?: string;
    city?: string;
  };
}

const PROVIDER_CONFIG = {
  [SSOProviderType.GOOGLE]: {
    icon: '/SVGs/shared/google.svg',
    name: 'Google',
  },
  [SSOProviderType.FACEBOOK]: {
    icon: '/SVGs/shared/facebook.svg',
    name: 'Facebook',
  },
  [SSOProviderType.APPLE]: {
    icon: '/SVGs/shared/apple.svg',
    name: 'Apple',
  },
};

export default function SocialLoginButton({
  provider,
  userType = 'guest',
  className = '',
  disabled = false,
  additionalProfileData,
}: SocialLoginButtonProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isInitialized: isFirebaseInitialized, error: firebaseError } =
    useFirebase();

  const { mutate: socialLogin } = useSocialLogin(userType, {
    onSuccess: data => {
      try {
        queryClient.setQueryData(['user'], data);

        if (!data.profileCompletionRequired && data.token) {
          setCookie(TOKEN_NAME, data.token);
        }

        if (
          data.user &&
          data.user.status !== undefined &&
          data.user.status !== null
        ) {
          setCookie('userStatus', data.user.status.toString());
        }

        if (data.profileCompletionRequired) {
          toast.info(
            `${t('auth.profile.completionRequired')}. ${t('auth.profile.missingFields')}: ${data.missingFields?.join(', ')}`
          );

          router.push(
            `/auth/complete-profile?email=${encodeURIComponent(data.user.email)}&isNewUser=${data.isNewUser}`
          );
        } else {
          toast.success(
            data.isNewUser
              ? t('auth.login.accountCreatedSuccess')
              : t('auth.login.loggedInSuccess')
          );

          if (data.user && data.user.status === 3) {
            router.push(
              `/auth/verify?email=${encodeURIComponent(data.user.email)}`
            );
          } else {
            router.push('/');
          }
        }
      } catch (processingError) {
        toast.error(t('auth.login.loginFailed'));
        setIsLoading(false);
      }
    },
    onError: (error: WretchError | Error) => {
      console.error(`${provider} SSO error:`, error);

      if ('json' in error && error.json) {
        toast.error(error.json.message || t('auth.login.loginFailed'));
      } else {
        toast.error(error.message || t('auth.login.loginFailed'));
      }
      setIsLoading(false);
    },
  });

  const handleSocialLogin = async () => {
    if (disabled || isLoading || !isFirebaseInitialized) {
      if (!isFirebaseInitialized && firebaseError) {
        toast.error(`${t('auth.login.loginFailed')}: Firebase not initialized`);
      }
      return;
    }

    setIsLoading(true);

    try {
      await socialLogin({ provider, additionalData: additionalProfileData });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const config = PROVIDER_CONFIG[provider];
  const baseClassName = `
    bg-white box-border w-full max-w-[296px] h-[48px]
    flex items-center justify-center gap-3 rounded-[8px]
    text-[14px] font-bold leading-[17px] text-[#222222]
    transition-all hover:bg-gray-50 hover:scale-[1.02]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${className}
  `;

  return (
    <button
      type='button'
      onClick={handleSocialLogin}
      disabled={disabled || isLoading || !isFirebaseInitialized}
      style={{ border: '1px solid #EEEEEE' }}
      className={baseClassName}
    >
      {isLoading ? (
        <>
          <div className='animate-spin h-5 w-5 border-2 border-[#222222] border-t-transparent rounded-full'></div>
          <span>{t('auth.login.signingIn')}</span>
        </>
      ) : (
        <>
          <Image src={config.icon} alt={config.name} width={24} height={24} />
          <span>{config.name}</span>
        </>
      )}
    </button>
  );
}
