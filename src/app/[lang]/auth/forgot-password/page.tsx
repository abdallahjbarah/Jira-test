'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';
import FormInput from '@/components/form/FormInput';
import { useForgetPassword } from '@/lib/apis/users/useForgetPassword';
import { useTranslation } from '@/contexts/TranslationContext';

interface ForgotPasswordFormValues {
  email: string;
}

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate: forgotPassword, isPending: isForgotPasswordLoading } =
    useForgetPassword({
      onSuccess: () => {
        toast.success(t('auth.forgotPassword.verificationSent'));
        router.push(
          `/auth/verify?email=${encodeURIComponent(watch('email'))}&type=forgot-password`,
        );
      },
      onError: (error) => {
        toast.error(error.message || t('auth.forgotPassword.sendFailed'));
      },
    });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    forgotPassword(data);
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 lg:px-8'>
      {/* Forgot Password Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[200px] sm:w-[278px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[200px] sm:w-[278px] rounded-bl-[50px] bg-[#FE360A] flex items-center justify-center transform transition-transform hover:scale-[1.02]'>
            <span className='text-[20px] sm:text-[25px] font-semibold text-white h-[30px] whitespace-nowrap'>
              {t('auth.forgotPassword.title')}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-24 sm:mt-32 md:mt-52 w-full max-w-sm space-y-6 sm:space-y-8 px-4 sm:max-w-md'>
        <div className='flex flex-col items-center gap-2 sm:gap-3 animate-fadeIn'>
          <h1 className='w-full sm:w-[290px] h-auto sm:h-[28px] text-[20px] xs:text-[22px] sm:text-[25px] font-bold whitespace-nowrap mb-4 sm:mb-6 md:mb-8 text-center'>
            <span className='text-[#222222]'>
              {t('auth.forgotPassword.title')}{' '}
            </span>
            <span className='text-[#47C409]'>
              {t('auth.forgotPassword.titleColored')}
            </span>
          </h1>
          <p className='text-[12px] xs:text-[13px] sm:text-[14px] font-normal leading-[16px] sm:leading-[17px] text-[#555555] max-w-[280px] xs:max-w-[296px] text-center px-2 sm:px-0'>
            {t('auth.forgotPassword.description')}
          </p>
        </div>

        <div className='w-full space-y-4 sm:space-y-5 pb-12 sm:pb-16'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col items-center w-full'>
              <div className='w-[296px]'>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      type='email'
                      label={t('auth.forgotPassword.email')}
                      error={errors.email?.message}
                      className='w-[296px] h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                    />
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={isForgotPasswordLoading || isSubmitting}
                className={`w-full max-w-[296px] h-[44px] sm:h-[48px] rounded-[8px] bg-[#47C409] text-[13px] sm:text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isForgotPasswordLoading || isSubmitting
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                }`}
              >
                {isForgotPasswordLoading || isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <span className='mr-2 text-[13px] sm:text-[14px]'>
                      {t('auth.forgotPassword.sendingCode')}
                    </span>
                    <div className='animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full'></div>
                  </div>
                ) : (
                  t('auth.forgotPassword.sendButton')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
