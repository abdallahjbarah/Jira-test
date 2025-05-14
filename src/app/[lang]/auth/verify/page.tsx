'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { VerificationCodeSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface VerificationFormValues {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
}

export default function VerifyPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid verification code');
      }

      toast.success('Code verified successfully!');
      router.push('/auth/reset-password');
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
        <div className='h-[65px] w-[246px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[246px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='w-[175px] h-[36px] font-medium text-[25px] leading-[100%] text-white flex items-center justify-center'>Verify Code</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-[296px] space-y-12'>
        {/* Heading */}
        <div className='flex items-center justify-center'>
          <h1 className='text-[#222222] font-normal font-bold text-[25px] leading-[32px]'>
            Verify Your&nbsp;
            <span className='text-[#47C409]'>Code</span>
          </h1>
        </div>

        {/* Description */}
        <p className='text-left text-[#222222] w-[296px] h-[34px] font-normal text-[14px] leading-[100%]'>
          Enter the verification code we just sent you on your email address.
        </p>

        {/* Form */}
        <div className='w-full'>
          <Formik
            initialValues={{
              code0: '',
              code1: '',
              code2: '',
              code3: '',
            }}
            validationSchema={VerificationCodeSchema}
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
              <Form noValidate>
                <div className='mb-8'>
                  <div className='relative'>
                    <div className='flex justify-between'>
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="relative">
                          <input
                            type='text'
                            maxLength={1}
                            pattern='[0-9]'
                            inputMode='numeric'
                            autoComplete='off'
                            autoFocus={index === 0}
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
                                if (value) {
                                  const currentInput = e.target as HTMLInputElement;
                                  const currentDiv = currentInput.parentElement;
                                  const nextDiv = currentDiv?.nextElementSibling;
                                  const nextInput = nextDiv?.querySelector('input');
                                  if (nextInput) {
                                    nextInput.focus();
                                  }
                                }
                              }
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === 'Backspace' &&
                                !e.currentTarget.value
                              ) {
                                const currentInput = e.currentTarget as HTMLInputElement;
                                const currentDiv = currentInput.parentElement;
                                const prevDiv = currentDiv?.previousElementSibling;
                                const prevInput = prevDiv?.querySelector('input');
                                if (prevInput) {
                                  prevInput.focus();
                                  setFieldValue(`code${index - 1}`, '');
                                }
                              }
                            }}
                            onBlur={handleBlur}
                            className={`h-14 w-14 border-b border-gray-200 bg-white text-center mb-4 text-2xl font-medium text-[#47C409] placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-0`}
                            placeholder=" "
                          />
                          {!values[`code${index}` as keyof VerificationFormValues] && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <Image
                                src="/SVGs/shared/bullet.svg"
                                alt="bullet"
                                width={10}
                                height={10}
                                className="opacity-50"
                              />
                            </div>
                          )}
                        </div>
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
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors mb-2 ${isLoading || Object.values(values).some((v) => !v)
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
