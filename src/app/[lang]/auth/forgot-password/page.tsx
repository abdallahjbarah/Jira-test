'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { ForgetPasswordEmailSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      toast.success('Verification code sent successfully!');
      router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message || 'Failed to send reset link. Please try again.',
        );
      } else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4'>
      {/* Forgot Password Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[327px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[327px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='w-[143px] h-[36px] font-medium text-[25px] text-white whitespace-nowrap'>{t('forget password')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-[296px]'>
        {/* Heading */}
        <div className='flex flex-col items-start justify-center mb-8'>
          <h1 className='text-[#222222] w-[296px] h-[32px] font-normal font-bold text-[25px] leading-[32px] whitespace-nowrap'>
            Forgot Your <span className="text-[#47C409]">Password?</span>
          </h1>
          {/* Description */}
          <p className='mt-10 text-left text-[#222222] w-[296px] h-[51px] font-normal text-[14px]'>
            Enter the email address associated with your account, we will send you
            a link to reset your password
          </p>
        </div>

        {/* Form */}
        <div className='w-full'>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={ForgetPasswordEmailSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className='mb-12'>
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-lg border ${touched.email && errors.email
                        ? 'border-red-500'
                        : 'border-gray-200'
                        } bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]`}
                    />
                    {touched.email && errors.email && (
                      <div className='absolute -bottom-6 left-0'>
                        <p className='text-sm text-red-500'>{errors.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors mb-2 ${isLoading
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                    }`}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Back to Login Link */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Remembered your password?{' '}
              <button
                type='button'
                onClick={() => router.push('/auth/login')}
                className='text-[#47C409] hover:text-[#3ba007]'
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
