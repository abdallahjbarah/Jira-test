"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { SignUpSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getCountries, getCountryCallingCode, CountryCode } from 'libphonenumber-js';
import { useMutation } from "@tanstack/react-query";
import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';
import { ONE_MINUTE_IN_MILLI } from "@utils/constants";

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

interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  dialCode: string;
}

export default function SignUpPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get all countries and format them
  const countries: Country[] = getCountries().map((code) => {
    const dialCode = getCountryCallingCode(code as CountryCode);
    return {
      code: code as CountryCode,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
      flag: getFlagEmoji(code),
      dialCode,
    };
  });

  // Sort countries by name
  countries.sort((a, b) => a.name.localeCompare(b.name));

  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  // Get flag emoji from country code
  function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  // Set default country (Jordan)
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === 'JO') || countries[0]
  );

  const handleSubmit = async (values: SignUpFormValues): Promise<void> => {
    console.log('Starting form submission...', values);
    try {
      setIsLoading(true);

      // Save first name to local storage
      localStorage.setItem('userFirstName', values.firstName);

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
      <div className='mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2'>
          <h1 className="w-[264px] h-[30px] text-[25px] font-bold whitespace-nowrap text-center">
            <span className="text-[#222222]">Create Your </span>
            <span className="text-[#47C409]">Account</span>
          </h1>
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
              countryCode: selectedCountry.dialCode,
              password: '',
              agreeToTerms: false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form className='space-y-4 flex flex-col items-center'>
                {/* Name Fields */}
                <div className='grid grid-cols-2 gap-4 w-full'>
                  <div>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      autoComplete='given-name'
                      placeholder='First Name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    {touched.firstName && errors.firstName && (
                      <p className='mt-1 text-sm text-red-600 text-center'>
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
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    {touched.lastName && errors.lastName && (
                      <p className='mt-1 text-sm text-red-600 text-center'>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className='w-full'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    autoComplete='email'
                    placeholder='Email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                  />
                  {touched.email && errors.email && (
                    <p className='mt-1 text-sm text-red-600 text-center'>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="flex gap-2 justify-center w-full">
                  <div className="relative w-[98px]">
                    <button
                      type="button"
                      onClick={() => setShowCountryModal(true)}
                      className="flex h-[48px] w-full items-center justify-between rounded-[8px] border-[1px] border-solid border-[#EEEEEE] bg-white pl-2 pr-4 text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-5 h-[13px] text-[20px] leading-[13px]">
                          {selectedCountry.flag}
                        </span>
                        <span className="inline-block w-[31px] h-[17px] text-base leading-[17px]">
                          +{selectedCountry.dialCode}
                        </span>
                      </div>
                    </button>

                    {/* Country Selection Modal */}
                    {showCountryModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 animate-fadeIn">
                          {/* Modal Header */}
                          <div className="mb-6 flex flex-col items-center">
                            <div className="flex w-full justify-center">
                              <h2 className="w-[114px] h-[24px] text-center font-bold text-[#222222] leading-[24px]">
                                Country Key
                              </h2>
                            </div>
                            <button
                              onClick={() => {
                                setShowCountryModal(false);
                                setSearchQuery('');
                              }}
                              className="absolute right-6 rounded-full p-1 hover:bg-gray-100 transition-colors"
                            >
                              <XMarkIcon className="h-6 w-6 text-gray-500" />
                            </button>
                          </div>

                          {/* Search Input */}
                          <div className="mb-6 flex flex-col items-center">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-[312px] h-[48px] rounded-[24px] border-none bg-white px-4 text-gray-700 shadow-[0px_3px_20px_rgba(0,0,0,0.08)] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-lg"
                            />
                            <div className="mt-6 h-[1px] w-[312px] bg-[#EEEEEE]"></div>
                          </div>

                          {/* Countries List */}
                          <div className="max-h-[400px] overflow-y-auto">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setShowCountryModal(false);
                                  setSearchQuery('');
                                  setFieldValue('countryCode', country.dialCode);
                                  const fullNumber = `+${country.dialCode}${values.phoneNumberLocal || ''}`;
                                  setFieldValue('phoneNumber', fullNumber);
                                }}
                                className="flex w-full items-center justify-between px-2 py-3 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="inline-block w-5 h-[13px] text-[20px] leading-[13px]">
                                    {country.flag}
                                  </span>
                                  <span className="text-gray-900">{country.name}</span>
                                </div>
                                <span className="text-gray-500">+{country.dialCode}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-[190px]">
                    <input
                      type="tel"
                      name="phoneNumberLocal"
                      value={values.phoneNumberLocal}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFieldValue('phoneNumberLocal', value);
                        const fullNumber = `+${selectedCountry.dialCode}${value}`;
                        setFieldValue('phoneNumber', fullNumber);
                      }}
                      onBlur={handleBlur}
                      placeholder="Phone Number"
                      className="box-border w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md"
                    />
                  </div>
                </div>
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 text-center">{errors.phoneNumber}</p>
                )}

                {/* Password Field */}
                <div className='w-full'>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      autoComplete='new-password'
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-[#47C409] z-10'
                    >
                      {showPassword ? (
                        <EyeIcon className='h-6 w-6' />
                      ) : (
                        <EyeSlashIcon className='h-6 w-6' />
                      )}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <p className='mt-1 text-sm text-red-600 text-center'>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className='w-full'>
                  <label className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='agreeToTerms'
                      name='agreeToTerms'
                      checked={values.agreeToTerms}
                      onChange={handleChange}
                      className='h-[20px] w-[20px] rounded border-gray-300 text-[#47C409] focus:ring-[#47C409] appearance-none bg-white border checked:bg-[#47C409] checked:border-[#47C409] relative transition-all after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100'
                    />
                    <span className='w-[208px] h-[28px] text-[12px] font-semibold leading-[14px] text-gray-600'>
                      Agree to our{' '}
                      <a href='#' className='text-[#233785] underline hover:text-[#2f49a3]'>
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href='#' className='text-[#233785] underline hover:text-[#2f49a3]'>
                        Usage Agreement
                      </a>
                    </span>
                  </label>
                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <p className='mt-1 text-sm text-red-600 text-center'>
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className='w-full pt-6'>
                  <button
                    type='submit'
                    disabled={isLoading || isSubmitting}
                    className={`w-full h-[48px] rounded-[8px] bg-[#47C409] text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isLoading || isSubmitting
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                      }`}
                  >
                    {isLoading || isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">Creating account...</span>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <div className='text-center transform transition-all hover:scale-105'>
            <p className='text-[12px] font-normal leading-[14px] text-[#222222] mx-auto pb-2'>
              Already have an account?{' '}
              <button
                type='button'
                onClick={() => router.push('/auth/login')}
                className='text-[12px] font-normal leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors'
              >
                Login
              </button>
            </p>
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
              style={{ border: '1px solid #EEEEEE' }}
              className="bg-white box-border w-full max-w-[296px] h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Apple</span>
            </button>
            <button
              type="button"
              style={{ border: '1px solid #EEEEEE' }}
              className="bg-white box-border w-full max-w-[296px] h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]"
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
              style={{ border: '1px solid #EEEEEE' }}
              className="bg-white box-border w-full max-w-[296px] h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]"
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