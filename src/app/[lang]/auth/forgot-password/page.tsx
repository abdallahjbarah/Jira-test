'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { ForgetPasswordEmailSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      {/* Forget Password Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-lg font-medium text-white'>
              Forget Password
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-sm space-y-8 px-4 sm:max-w-md'>
        {/* Heading */}
        <div className='flex items-center justify-center whitespace-nowrap'>
          <h1 className='text-[#222222] text-[32px] leading-[32px] font-bold'>
            Forgot Your&nbsp;
          </h1>
          <span className='text-[#47C409] text-[32px] leading-[32px] font-bold'>
            Password?
          </span>
        </div>

        {/* Description */}
        <p className='text-left text-gray-600'>
          Enter the email address associated with your account, we will send you
          a link to reset your password
        </p>

        {/* Form */}
        <div className='w-full space-y-6'>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={ForgetPasswordEmailSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className='space-y-8'>
                <div className='space-y-1'>
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-lg border ${
                        touched.email && errors.email
                          ? 'border-red-500'
                          : 'border-gray-200'
                      } bg-white px-4 py-3 text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]`}
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
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors ${
                    isLoading
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
