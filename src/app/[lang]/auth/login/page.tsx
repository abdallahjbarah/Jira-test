'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { SignInSchema } from '@utils/formsSchemas';
import PasswordInput from '@components/ui/custom-inputs/PasswordInput';
import { toast } from 'react-toastify';
import useUser from '@utils/hooks/useUser';
import Image from 'next/image';
import { Locale } from '@utils/constants';
import { useTranslation } from '@/contexts/TranslationContext';

interface SignInFormValues {
  email: string;
  password: string;
}

export default function LoginPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams<{ lang: Locale }>();
  const lang = params.lang;
  const { setUserData } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSubmit = async (
    values: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUserData(data);
      toast.success('Login successful!');
      router.push(`/${lang}/dashboard`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Login failed. Please try again.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4'>
      {/* Login Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='w-[99px] h-[36px] font-medium text-[25px] text-white'>{t('login')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-[296px] space-y-8'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2'>
          <h1 className='text-[#222222] w-[143px] h-[32px] font-normal font-bold text-[25px] leading-[32px] whitespace-nowrap'>
            {t('welcome')} {t('to')}
          </h1>
          <Image
            src='/images/shared/bookagriCOM.png'
            alt='Bookagri Logo'
            width={128}
            height={32}
            priority
            className='h-[32.19px] w-[128px] mt-4'
          />
        </div>

        {/* Form */}
        <div className='w-full space-y-5 pb-16'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className='space-y-4'>
                <div>
                  <input
                    type='text'
                    name='email'
                    placeholder={t('email')}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-primary_1 focus:outline-none focus:ring-1 focus:ring-primary_1'
                  />
                  {touched.email && errors.email && (
                    <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                  )}
                </div>

                <div>
                  <PasswordInput
                    id='password'
                    name='password'
                    placeholder={t('password')}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    shape={1}
                    pattern='.*'
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-primary_1 focus:outline-none focus:ring-1 focus:ring-primary_1'
                  />
                  {touched.password && errors.password && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => router.push(`/${lang}/auth/forgot-password`)}
                    className='w-[88px] h-[14px] font-normal text-[12px] text-primary_1 whitespace-nowrap mb-6'
                  >
                    {t('forgot-password')}
                  </button> 
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors ${isLoading
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                    }`}
                >
                  {isLoading ? t('signing-in') : t('signin')}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign Up and Forgot Password Links */}
          <div className='space-y-4'>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                {t('dont-have-account')}{' '}
                <button
                  type='button'
                  onClick={() => router.push(`/${lang}/auth/signup`)}
                  className='text-[#47C409] hover:text-[#3ba007] '
                >
                  {t('signup')}
                </button>
              </p>
            </div>
          </div>
          {/* Or Divider */}
          <div className="relative mt-12 mb-8 flex items-center justify-center w-full max-w-[296px] mx-auto">
            <div className="w-[123px] border-t-[1px] border-solid border-[#EEEEEE]"></div>
            <div className="mx-[16.5px]">
              <span className="w-[17px] bg-white text-[14px] font-normal leading-[17px] text-[#222222]">Or</span>
            </div>
            <div className="w-[123px] border-t-[1px] border-solid border-[#EEEEEE]"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 flex flex-col items-center">
            <button
              type="button"
              className="box-border w-[296px] h-[50.77px] flex items-center justify-center gap-3 rounded-[8px] border border-solid border-[#CCCCCC] bg-white text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Apple</span>
            </button>
            <button
              type="button"
              className="box-border w-[296px] h-[50.77px] flex items-center justify-center gap-3 rounded-[8px] border border-solid border-[#CCCCCC] bg-white text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              className="box-border w-[296px] h-[50.77px] flex items-center justify-center gap-3 rounded-[8px] border border-solid border-[#CCCCCC] bg-white text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]"
            >
              <svg className="h-6 w-6" viewBox="0 0 320 512" fill="#1877F2">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
