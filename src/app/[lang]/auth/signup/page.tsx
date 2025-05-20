'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import {
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from 'libphonenumber-js';
import { useMutation } from '@tanstack/react-query';
import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';
import { ONE_MINUTE_IN_MILLI } from '@utils/constants';
import Link from 'next/link';
import FormInput from '@/components/form/FormInput';
import Checkbox from '@/components/ui/Checkbox';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery),
  );

  // Get flag emoji from country code
  function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  // Set default country (Jordan)
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === 'JO') || countries[0],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(SignUpSchema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      phoneNumberLocal: '',
      countryCode: selectedCountry.dialCode,
      password: '',
      agreeToTerms: false,
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      // Your API call here
      // Example:
      // return await api.post('/auth/signup', data);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: (data) => {
      // Save first name to local storage
      localStorage.setItem('userFirstName', watch('firstName'));
      toast.success('Account created successfully!');
      router.push(
        `/auth/welcome?name=${encodeURIComponent(watch('firstName'))}`,
      );
    },
    onError: (error) => {
      toast.error(
        error.message || 'Failed to create account. Please try again.',
      );
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await signUpMutation.mutateAsync(data);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 md:px-8'>
      {/* Sign Up Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-[25px] font-semibold text-white'>
              Sign Up
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4 sm:px-0'>
        {/* Heading */}
        <div className='flex flex-col items-center gap-2 animate-fadeIn'>
          <h1 className='w-[264px] h-[30px] text-[25px] font-bold whitespace-nowrap text-center'>
            <span className='text-[#222222]'>Create Your </span>
            <span className='text-[#47C409]'>Account</span>
          </h1>
        </div>

        {/* Form */}
        <div className='w-full space-y-5 pb-16'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 flex flex-col items-center w-full'
          >
            {/* Name Fields */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex flex-col items-center w-full'>
                <FormInput
                  {...register('firstName')}
                  type='text'
                  label='First Name'
                  error={errors.firstName?.message}
                  className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                  placeholder=''
                />
              </div>

              <div className='flex flex-col items-center w-full'>
                <FormInput
                  {...register('lastName')}
                  type='text'
                  label='Last Name'
                  error={errors.lastName?.message}
                  className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                  placeholder=''
                />
              </div>
            </div>

            {/* Email Field */}
            <div className='flex flex-col items-center w-full'>
              <FormInput
                {...register('email')}
                type='email'
                label='Email'
                error={errors.email?.message}
                className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                placeholder=''
              />
            </div>

            {/* Phone Number Field */}
            <div className='flex gap-2 justify-center w-full'>
              <div className='relative w-[98px]'>
                <button
                  type='button'
                  onClick={() => setShowCountryModal(true)}
                  className='flex h-[48px] w-full items-center justify-between rounded-[8px] border-[1px] border-[#EEEEEE] bg-white pl-2 pr-4 text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md hover:border-[#47C409]'
                >
                  <div className='flex items-center gap-2'>
                    <span className='inline-block w-5 h-[13px] text-[20px] leading-[13px]'>
                      {selectedCountry.flag}
                    </span>
                    <span className='inline-block w-[31px] h-[17px] text-base leading-[17px]'>
                      +{selectedCountry.dialCode}
                    </span>
                  </div>
                </button>

                {/* Country Selection Modal */}
                {showCountryModal && (
                  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='relative w-full max-w-md rounded-2xl bg-white p-6 animate-fadeIn'>
                      {/* Modal Header */}
                      <div className='mb-6 flex flex-col items-center'>
                        <div className='flex w-full justify-center'>
                          <h2 className='w-[114px] h-[24px] text-center font-bold text-[#222222] leading-[24px]'>
                            Country Key
                          </h2>
                        </div>
                        <button
                          onClick={() => {
                            setShowCountryModal(false);
                            setSearchQuery('');
                          }}
                          className='absolute right-6 rounded-full p-1 hover:bg-gray-100 transition-colors'
                        >
                          <XMarkIcon className='h-6 w-6 text-gray-500' />
                        </button>
                      </div>

                      {/* Search Input */}
                      <div className='mb-6 flex flex-col items-center'>
                        <input
                          type='text'
                          placeholder='Search...'
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className='w-[312px] h-[48px] rounded-[24px] border-none bg-white px-4 text-gray-700 shadow-[0px_3px_20px_rgba(0,0,0,0.08)] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-lg'
                        />
                        <div className='mt-6 h-[1px] w-[312px] bg-[#EEEEEE]'></div>
                      </div>

                      {/* Countries List */}
                      <div className='max-h-[400px] overflow-y-auto'>
                        {filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type='button'
                            onClick={() => {
                              setSelectedCountry(country);
                              setShowCountryModal(false);
                              setSearchQuery('');
                              setValue('countryCode', country.dialCode);
                              const fullNumber = `+${country.dialCode}${watch('phoneNumberLocal') || ''}`;
                              setValue('phoneNumber', fullNumber);
                            }}
                            className='flex w-full items-center justify-between px-2 py-3 hover:bg-gray-50 transition-colors'
                          >
                            <div className='flex items-center gap-3'>
                              <span className='inline-block w-5 h-[13px] text-[20px] leading-[13px]'>
                                {country.flag}
                              </span>
                              <span className='text-gray-900'>
                                {country.name}
                              </span>
                            </div>
                            <span className='text-gray-500'>
                              +{country.dialCode}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='w-[190px]'>
                <FormInput
                  {...register('phoneNumberLocal')}
                  type='tel'
                  label='Phone Number'
                  error={errors.phoneNumber?.message}
                  className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                  placeholder=''
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setValue('phoneNumberLocal', value);
                    const fullNumber = `+${selectedCountry.dialCode}${value}`;
                    setValue('phoneNumber', fullNumber);
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='flex flex-col items-center w-full'>
              <div className='w-full relative'>
                <FormInput
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  label='Password'
                  error={errors.password?.message}
                  className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                  placeholder=''
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-[#47C409] transform transition-transform hover:scale-110'
                >
                  {showPassword ? (
                    <Image
                      src='/SVGs/shared/eye.svg'
                      alt='Show password'
                      width={24}
                      height={24}
                      className='[&>path]:fill-[#47C409]'
                    />
                  ) : (
                    <Image
                      src='/SVGs/shared/eye-slash.svg'
                      alt='Hide password'
                      width={24}
                      height={24}
                      className='[&>path]:fill-[#47C409]'
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='w-full'>
              <Checkbox
                id='agreeToTerms'
                label={
                  <span className='text-[12px] font-semibold leading-[14px] text-gray-600'>
                    Agree to our{' '}
                    <a
                      href='#'
                      className='text-[#233785] underline hover:text-[#2f49a3]'
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href='#'
                      className='text-[#233785] underline hover:text-[#2f49a3]'
                    >
                      Usage Agreement
                    </a>
                  </span>
                }
                checked={watch('agreeToTerms')}
                onChange={(checked) => setValue('agreeToTerms', checked)}
              />
            </div>
            {errors.agreeToTerms && (
              <p className='mt-1 text-sm text-red-600 text-center'>
                {errors.agreeToTerms.message}
              </p>
            )}

            {/* Submit Button */}
            <div className='w-full pt-6'>
              <button
                type='submit'
                disabled={isLoading || isSubmitting}
                className={`w-full h-[48px] rounded-[8px] bg-[#47C409] text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isLoading || isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {isLoading || isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <span className='mr-2'>Creating account...</span>
                    <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

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
            <div className='relative mt-12 mb-8 flex items-center justify-center w-full max-w-[296px] mx-auto'>
              <div className='w-[123px] border-t-[1px] border-solid border-[#EEEEEE]'></div>
              <div className='mx-[16.5px]'>
                <span className='w-[17px] bg-white text-[14px] font-normal leading-[17px] text-[#222222]'>
                  Or
                </span>
              </div>
              <div className='w-[123px] border-t-[1px] border-solid border-[#EEEEEE]'></div>
            </div>

            {/* Social Login Buttons */}
            <div className='space-y-3 flex flex-col items-center w-full'>
              <button
                type='button'
                style={{ border: '1px solid #EEEEEE' }}
                className='bg-white box-border w-full h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]'
              >
                <Image
                  src='/SVGs/shared/apple.svg'
                  alt='Apple'
                  width={24}
                  height={24}
                />
                <span>Apple</span>
              </button>
              <button
                type='button'
                style={{ border: '1px solid #EEEEEE' }}
                className='bg-white box-border w-full h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]'
              >
                <Image
                  src='/SVGs/shared/google.svg'
                  alt='Google'
                  width={24}
                  height={24}
                />
                <span>Google</span>
              </button>
              <button
                type='button'
                style={{ border: '1px solid #EEEEEE' }}
                className='bg-white box-border w-full h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]'
              >
                <Image
                  src='/SVGs/shared/facebook.svg'
                  alt='Facebook'
                  width={24}
                  height={24}
                />
                <span>Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
