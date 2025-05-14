'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { ResetPasswordSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { t } = useTranslation();

  const handleSubmit = async (
    values: ResetPasswordFormValues,
    { setSubmitting }: FormikHelpers<ResetPasswordFormValues>,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toast.success('Password reset successfully!');
      router.push('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message || 'Password reset failed. Please try again.',
        );
      } else {
        toast.error('Password reset failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4'>
      {/* Reset Password Button Top Right */}

      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[327px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[327px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='w-[175px] h-[36px] font-medium text-[25px] leading-[100%] text-white flex items-center justify-center whitespace-nowrap'>Reset Your Password</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-[296px] space-y-8'>
        {/* Heading */}
        <div className='flex items-center justify-center'>
          <h1 className='text-[#222222] font-normal font-bold text-[25px] leading-[32px]'>
            Reset Your&nbsp;
            <span className='text-[#47C409]'>Password</span>
          </h1>
        </div>


        {/* Description */}
        <p className='text-left text-[#222222] w-[296px] h-[34px] font-normal text-[14px] leading-[100%]'>
          Your new password must be different from previously used passwords
        </p>

        {/* Form */}
        <div className='w-full space-y-12'>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className='space-y-12' noValidate>
                {/* Password Field */}
                <div className='space-y-4'>
                  <div className='relative'>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='New Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-[296px] h-[48px] rounded-lg border ${touched.password && errors.password
                          ? 'border-red-500'
                          : 'border-gray-200'
                          } bg-white px-4 text-lg font-bold text-gray-900 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]`}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 top-1/2 -translate-y-1/2 text-[#47C409] z-10'
                      >
                        {showPassword ? (
                          <EyeIcon className='h-6 w-6' />
                        ) : (
                          <EyeSlashIcon className='h-6 w-6' />
                        )}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <div className='mt-1'>
                        <p className='text-sm text-red-500 font-medium'>
                          {errors.password}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className='relative'>
                    <div className='relative'>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='Confirm New Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-[296px] h-[48px] rounded-lg border ${touched.confirmPassword && errors.confirmPassword
                          ? 'border-red-500'
                          : 'border-gray-200'
                          } bg-white px-4 text-lg font-bold text-gray-900 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]`}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-4 top-1/2 -translate-y-1/2 text-[#47C409] z-10'
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className='h-6 w-6' />
                        ) : (
                          <EyeSlashIcon className='h-6 w-6' />
                        )}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className='mt-1'>
                        <p className='text-sm text-red-500 font-medium'>
                          {errors.confirmPassword}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white font-bold transition-colors ${isLoading
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                    }`}
                >
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
