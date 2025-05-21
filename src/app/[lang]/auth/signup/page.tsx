'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import Image from 'next/image';
import FormInput from '@/components/form/FormInput';
import Checkbox from '@/components/ui/Checkbox';
import PasswordInput from '@/components/form/PasswordInput';
import { useSignup } from '@/lib/apis/auth/useSignup';
import PhoneNumberInput from '@/components/form/PhoneNumberInput';
import { setCookie } from '@/utils/cookies';
import { TOKEN_NAME } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { WretchError } from 'wretch';
import { useTranslation } from '@/contexts/TranslationContext';
import CustomLink from '@/components/ui/CustomLink';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  agreeToTerms: boolean;
}

export default function SignUpPage(): React.ReactElement {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const signUpForm = useForm<SignUpFormValues>({
    resolver: yupResolver(SignUpSchema) as any,
    defaultValues: {
      countryCode: '962', // Default Jordan country code
      agreeToTerms: false,
    },
  });

  const { mutate: signUpMutate, isPending: isSignUpLoading } = useSignup({
    onSuccess: (data) => {
      setCookie(TOKEN_NAME, data.token);
      setCookie('userStatus', data.user.status);
      queryClient.setQueryData(['user'], data);

      toast.success(t('auth.signup.accountCreatedSuccess'));
      router.push(
        `/auth/verify?email=${encodeURIComponent(data?.user?.email)}`,
      );
    },
    onError: (error: WretchError) => {
      const errorMessage = error.json?.message;
      toast.error(errorMessage || t('auth.signup.creationFailed'));
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    signUpMutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      countryCode: data.countryCode,
    });
  };

  console.log(signUpForm.formState.errors);

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 md:px-8'>
      {/* Sign Up Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-[25px] font-semibold text-white'>
              {t('auth.signup.title')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4 sm:px-0'>
        {/* Heading */}
        <div className='flex flex-col items-center gap-2 animate-fadeIn'>
          <h1 className='w-[264px] h-[30px] text-[25px] font-bold whitespace-nowrap text-center'>
            <span className='text-[#222222]'>
              {t('auth.signup.createAccount')}{' '}
            </span>
          </h1>
        </div>

        {/* Form */}
        <div className='w-full space-y-5 pb-16'>
          <FormProvider {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className='space-y-4 flex flex-col items-center w-full'
            >
              {/* Name Fields */}
              <div className='flex flex-col sm:flex-row gap-4 w-full'>
                <div className='flex flex-col items-center w-full'>
                  <Controller
                    control={signUpForm.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        type='text'
                        label={t('auth.signup.firstName')}
                        error={signUpForm.formState.errors.firstName?.message}
                        className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                      />
                    )}
                  />
                </div>

                <div className='flex flex-col items-center w-full'>
                  <Controller
                    control={signUpForm.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        type='text'
                        label={t('auth.signup.lastName')}
                        error={signUpForm.formState.errors.lastName?.message}
                        className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                      />
                    )}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className='flex flex-col items-center w-full'>
                <Controller
                  control={signUpForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      type='email'
                      label={t('auth.signup.email')}
                      error={signUpForm.formState.errors.email?.message}
                      className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                    />
                  )}
                />
              </div>

              {/* Phone Number Field */}
              <PhoneNumberInput
                phoneFieldName='phoneNumber'
                phoneLocalFieldName='phoneNumber'
                countryCodeFieldName='countryCode'
                error={signUpForm.formState.errors.phoneNumber?.message}
                defaultCountry='JO'
                label={t('auth.signup.phoneNumber')}
              />

              {/* Password Field */}
              <div className='flex flex-col items-center w-full'>
                <div className='w-full relative'>
                  <Controller
                    control={signUpForm.control}
                    name='password'
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        error={signUpForm.formState.errors.password?.message}
                        className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                        label={t('auth.signup.password')}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className='w-full'>
                <Checkbox
                  id='agreeToTerms'
                  label={
                    <span className='text-[12px] font-semibold leading-[14px] text-gray-600'>
                      {t('auth.signup.agreeToTerms')}{' '}
                      <CustomLink
                        path='/privacy-policy'
                        className='text-[#233785] underline hover:text-[#2f49a3]'
                      >
                        {t('auth.signup.privacyPolicy')}
                      </CustomLink>{' '}
                      {t('auth.signup.and')}{' '}
                      <CustomLink
                        path='/terms-and-conditions'
                        className='text-[#233785] underline hover:text-[#2f49a3]'
                      >
                        {t('auth.signup.termsConditions')}
                      </CustomLink>
                    </span>
                  }
                  checked={signUpForm.watch('agreeToTerms')}
                  onChange={(checked) =>
                    signUpForm.setValue('agreeToTerms', checked)
                  }
                />
                {signUpForm.formState.errors.agreeToTerms && (
                  <p className='mt-1 text-sm text-red-600 text-center'>
                    {signUpForm.formState.errors.agreeToTerms.message as string}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className='w-full pt-6'>
                <button
                  type='submit'
                  disabled={
                    isSignUpLoading || signUpForm.formState.isSubmitting
                  }
                  className={`w-full h-[48px] rounded-[8px] bg-[#47C409] text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isSignUpLoading || signUpForm.formState.isSubmitting
                      ? 'cursor-not-allowed opacity-70'
                      : ''
                  }`}
                >
                  {isSignUpLoading || signUpForm.formState.isSubmitting ? (
                    <div className='flex items-center justify-center'>
                      <span className='mr-2'>
                        {t('auth.signup.creatingAccount')}
                      </span>
                      <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                    </div>
                  ) : (
                    t('auth.signup.createButton')
                  )}
                </button>
              </div>

              {/* Already have an account */}
              <div className='text-center transform transition-all hover:scale-105'>
                <p className='text-[12px] font-normal leading-[14px] text-[#222222] mx-auto pb-2'>
                  {t('auth.signup.alreadyHaveAccount')}{' '}
                  <CustomLink path='/auth/login'>
                    <button
                      type='button'
                      className='text-[12px] font-normal leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors'
                    >
                      {t('auth.signup.login')}
                    </button>
                  </CustomLink>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
