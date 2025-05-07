'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { VerificationCodeSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';

interface VerificationFormValues {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
}

export default function VerifyPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleSubmit = async (
    values: VerificationFormValues,
    { setSubmitting }: FormikHelpers<VerificationFormValues>,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const code = Object.keys(values)
        .filter((key) => key.startsWith('code'))
        .sort()
        .map((key) => values[key as keyof VerificationFormValues])
        .join('');

      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid verification code');
      }

      toast.success('Code verified successfully!');
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Verification failed. Please try again.');
      } else {
        toast.error('Verification failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4'>
      {/* Verify Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-lg font-medium text-white'>Verify Code</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-sm space-y-12 px-4 sm:max-w-md'>
        {/* Heading */}
        <div className='flex items-center justify-center whitespace-nowrap'>
          <h1 className='text-[#222222] text-[32px] leading-[32px] font-bold'>
            Enter&nbsp;
          </h1>
          <span className='text-[#47C409] text-[32px] leading-[32px] font-bold'>
            Verification Code
          </span>
        </div>

        {/* Description */}
        <p className='text-left text-gray-600 mb-8'>
          Enter the verification code we just sent you on your email address.
        </p>

        {/* Form */}
        <div className='w-full space-y-12'>
          <Formik
            initialValues={{
              code0: '',
              code1: '',
              code2: '',
              code3: '',
            }}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form className='space-y-12' noValidate>
                <div className='space-y-8'>
                  <div className='relative'>
                    <div className='flex justify-between'>
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          type='text'
                          maxLength={1}
                          pattern='[0-9]'
                          inputMode='numeric'
                          autoComplete='off'
                          name={`code${index}`}
                          value={
                            values[
                              `code${index}` as keyof VerificationFormValues
                            ]
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]?$/.test(value)) {
                              handleChange(e);
                              if (value && e.target.nextElementSibling) {
                                (
                                  e.target
                                    .nextElementSibling as HTMLInputElement
                                ).focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === 'Backspace' &&
                              !e.currentTarget.value &&
                              e.currentTarget.previousElementSibling
                            ) {
                              (
                                e.currentTarget
                                  .previousElementSibling as HTMLInputElement
                              ).focus();
                              setFieldValue(`code${index - 1}`, '');
                            }
                          }}
                          onBlur={handleBlur}
                          className={`h-14 w-14 rounded-lg border border-gray-200 bg-white text-center mb-4 text-2xl font-medium text-[#47C409] placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]`}
                        />
                      ))}
                    </div>
                    {touched.code0 && errors.code0 && (
                      <div className='absolute -bottom-6 left-0'>
                        <p className='text-sm text-red-500'>{errors.code0}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading || Object.values(values).some((v) => !v)}
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors ${
                    isLoading || Object.values(values).some((v) => !v)
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                  }`}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Resend Code Link */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Didn't receive the code?{' '}
              <button
                type='button'
                onClick={() => router.push('/auth/forgot-password')}
                className='text-[#47C409]'
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
