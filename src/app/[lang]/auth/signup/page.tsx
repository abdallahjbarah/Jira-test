'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { SignUpSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneNumberLocal: string;
  countryCode: string;
  password: string;
  agreeToTerms: boolean;
}

export default function SignUpPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (values: SignUpFormValues): Promise<void> => {
    console.log('Starting form submission...', values);
    try {
      setIsLoading(true);

      // For testing, let's skip the API call temporarily
      console.log('Simulating successful signup');

      // Show success message
      toast.success('Account created successfully!');

      // Construct the redirect URL
      const redirectUrl = `/auth/welcome?name=${encodeURIComponent(values.firstName)}`;
      console.log('Attempting to redirect to:', redirectUrl);

      // Force a client-side navigation
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error during signup:', error);
      if (error instanceof Error) {
        toast.error(
          error.message || 'Failed to create account. Please try again.',
        );
      } else {
        toast.error('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Add a submit handler for the form
  const onFormSubmit = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>,
  ): Promise<void> => {
    console.log('Form submitted with values:', values);

    try {
      // Show loading state
      setIsLoading(true);
      setSubmitting(true);

      // For testing, skip the API call
      console.log('Simulating successful signup');

      // Show success message
      toast.success('Account created successfully!');

      // Use window.location for a hard redirect
      window.location.replace(
        `/auth/welcome?name=${encodeURIComponent(values.firstName)}`,
      );
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        toast.error(
          error.message || 'Failed to create account. Please try again.',
        );
      } else {
        toast.error('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 '>
      {/* Sign Up Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-lg font-medium text-white'>Sign Up</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-sm space-y-8 px-4 sm:max-w-md'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2'>
          <h1 className='text-[#222222] text-[32px] leading-[32px] font-bold'>
            Create Your
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
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              phoneNumberLocal: '',
              countryCode: '',
              password: '',
              agreeToTerms: false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={onFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
            }) => {
              console.log('Form state:', {
                values,
                errors,
                touched,
                isSubmitting,
              });
              return (
                <Form className='space-y-4'>
                  {/* Name Fields */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        autoComplete='given-name'
                        placeholder='First Name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                      />
                      {touched.firstName && errors.firstName && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        autoComplete='family-name'
                        placeholder='Last Name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                      />
                      {touched.lastName && errors.lastName && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      autoComplete='email'
                      placeholder='Email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    {touched.email && errors.email && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div className='flex gap-2'>
                    <div className='w-1/3'>
                      <PhoneInput
                        country={'jo'}
                        value={values.phoneNumber}
                        onChange={(phone: string) => {
                          setFieldValue('phoneNumber', phone);
                          const countryCode = phone.slice(
                            0,
                            phone.length -
                              (values.phoneNumberLocal?.length || 0),
                          );
                          setFieldValue('countryCode', countryCode);
                        }}
                        onBlur={handleBlur}
                        inputProps={{
                          id: 'phoneNumber',
                          name: 'phoneNumber',
                          autoComplete: 'tel-country-code',
                        }}
                        inputClass='!w-full !h-[50px] !rounded-lg !border !border-gray-200 !bg-white !pl-[48px] !text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:!border-[#47C409] focus:!outline-none focus:!ring-1 focus:!ring-[#47C409]'
                        containerClass='!w-full'
                        buttonClass='!border-gray-200 !bg-white focus:!border-[#47C409] !h-[50px] !rounded-lg !border-r-0'
                        buttonStyle={{ backgroundColor: 'white' }}
                        dropdownClass='!bg-white'
                        searchClass='!bg-white'
                        enableSearch
                        excludeCountries={['il']}
                        disableSearchIcon
                        placeholder=''
                        inputStyle={{
                          borderLeft: 'none',
                        }}
                      />
                    </div>
                    <div className='w-2/3'>
                      <input
                        type='tel'
                        id='phoneNumberLocal'
                        name='phoneNumberLocal'
                        autoComplete='tel-local'
                        placeholder='Phone Number'
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFieldValue('phoneNumberLocal', value);
                          setFieldValue(
                            'phoneNumber',
                            `${values.countryCode}${value}`,
                          );
                        }}
                        onBlur={handleBlur}
                        className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                      />
                    </div>
                  </div>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.phoneNumber}
                    </p>
                  )}

                  {/* Password Field */}
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      autoComplete='new-password'
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:font-light placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 transform'
                    >
                      {showPassword ? (
                        <EyeSlashIcon className='h-5 w-5 text-gray-400' />
                      ) : (
                        <EyeIcon className='h-5 w-5 text-gray-400' />
                      )}
                    </button>
                    {touched.password && errors.password && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id='agreeToTerms'
                      name='agreeToTerms'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='h-4 w-4 rounded border-gray-300 text-[#47C409] focus:ring-[#47C409]'
                    />
                    <label
                      htmlFor='agreeToTerms'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      I agree to the{' '}
                      <a href='#' className='text-[#47C409]'>
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.agreeToTerms}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type='submit'
                    disabled={isLoading || isSubmitting || !values.agreeToTerms}
                    className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors ${
                      isLoading || isSubmitting || !values.agreeToTerms
                        ? 'cursor-not-allowed opacity-70'
                        : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                    }`}
                  >
                    {isLoading || isSubmitting ? (
                      <div className='flex items-center justify-center'>
                        <span className='mr-2'>Creating Account...</span>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                      </div>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>

          {/* Sign In Link */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <button
                type='button'
                onClick={() => router.push('/auth/login')}
                className='text-[#47C409]'
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Social Sign Up */}
          <div className='space-y-4'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-gray-500'>
                  Or sign up with
                </span>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <button
                type='button'
                className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50'
              >
                <svg className='h-5 w-5' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                <span>Google</span>
              </button>
              <button
                type='button'
                className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50'
              >
                <svg className='h-5 w-5' viewBox='0 0 320 512' fill='#1877F2'>
                  <path d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
