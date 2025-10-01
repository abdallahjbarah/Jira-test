'use client';

import FormInput from '@/components/form/FormInput';
import PasswordInput from '@/components/form/PasswordInput';
import SocialLoginButton from '@/components/shared/SocialLoginButton';
import CustomLink from '@/components/ui/CustomLink';
import { useTranslation } from '@/contexts/TranslationContext';
import { useUserLogin } from '@/lib/apis/auth/useLogin';
import { TOKEN_NAME } from '@/utils';
import { setCookie } from '@/utils/cookies';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { WretchError } from 'wretch';
import * as yup from 'yup';

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useUserLogin({
    onSuccess: data => {
      if (data.user.status === 3) {
        // User needs verification - store data temporarily
        sessionStorage.setItem(
          'tempAuthData',
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );

        toast.success(t('auth.login.verificationRequired'));
        router.push(
          `/auth/verify?email=${encodeURIComponent(data.user.email)}`
        );
      } else if (data.user.status === 1) {
        // User is active - save data immediately and navigate to home
        queryClient.setQueryData(['user'], data);
        setCookie(TOKEN_NAME, data.token);
        setCookie('userStatus', data.user.status);
        toast.success(t('auth.login.loggedInSuccess'));
        router.push('/');
      } else {
        // Handle other statuses
        toast.error(t('auth.login.accountNotActive'));
      }
    },
    onError: (error: WretchError) => {
      toast.error(error.json.message);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async data => {
    login(data);
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 md:px-8'>
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-[25px] font-semibold text-white'>
              {t('auth.login.title')}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4 sm:px-0'>
        <div className='flex flex-row items-center justify-center gap-2 animate-fadeIn'>
          <h1 className='w-[143px] h-[32px] text-custom-22 tabletS:text-custom-25 font-bold leading-[100%] text-center'>
            <span className='text-[#222222]'>{t('auth.login.welcomeTo')} </span>
          </h1>
          <img
            src='/images/shared/bookagriCOM.png'
            alt='BookAgri'
            className='w-[128px] h-[32.19px] object-contain'
          />
        </div>

        <div className='w-full space-y-5 pb-16'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 flex flex-col items-center w-full'
          >
            <div className='flex flex-col items-center w-full'>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    type='email'
                    label={t('auth.login.emailPhone')}
                    error={errors.email?.message}
                    className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                  />
                )}
              />
            </div>

            <div className='flex justify-center w-full'>
              <div className='w-[296px] relative'>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      id='password'
                      error={errors.password?.message}
                      label={t('auth.login.password')}
                    />
                  )}
                />
              </div>
            </div>

            <div className='flex items-center justify-between w-full'>
              <CustomLink
                path='/auth/forgot-password'
                className='text-[12px] font-semibold leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors ml-auto'
              >
                <button
                  type='button'
                  className='text-[12px] font-semibold leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors ml-auto'
                >
                  {t('auth.login.forgotPassword')}
                </button>
              </CustomLink>
            </div>

            <div className='w-full pt-6'>
              <button
                type='submit'
                disabled={isPending || isSubmitting}
                className={`w-full h-[48px] rounded-[8px] bg-[#47C409] text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isPending || isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {isPending || isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <span className='mr-2'>{t('auth.login.loggingIn')}</span>
                    <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                  </div>
                ) : (
                  t('auth.login.loginButton')
                )}
              </button>
            </div>
          </form>

          <div className='text-center transform transition-all hover:scale-105'>
            <p className='text-[12px] font-normal leading-[14px] text-[#222222] mx-auto pb-2'>
              {t('auth.login.noAccount')}{' '}
              <CustomLink path='/auth/signup'>
                <button
                  type='button'
                  className='text-[12px] font-normal leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors'
                >
                  {t('auth.login.signUp')}
                </button>
              </CustomLink>
            </p>
          </div>

          <div className='relative mt-12 mb-8 flex items-center justify-center w-full max-w-[296px] mx-auto'>
            <div className='w-[123px] border-t-[1px] border-solid border-[#EEEEEE]'></div>
            <div className='mx-[16.5px]'>
              <p className='text-[12px] font-normal leading-[14px] text-[#222222]'>
                {t('auth.login.or')}
              </p>
            </div>
            <div className='w-[123px] border-t-[1px] border-solid border-[#EEEEEE]'></div>
          </div>

          <div className='space-y-3 flex flex-col items-center'>
            <SocialLoginButton provider='apple' />
            <SocialLoginButton provider='google' />
            {/* <SocialLoginButton provider='facebook' /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
