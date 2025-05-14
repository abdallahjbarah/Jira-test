'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { SignUpSchema } from '@utils/formsSchemas';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { countries as countriesData } from 'countries-list';
import 'flag-icons/css/flag-icons.min.css';
import { CountrySelectionModal } from '@/components/shared/CountriesSelectionModal/CountrySelectionModal';

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
  code: string;
  name: string;
  dialCode: string;
}

export default function SignUpPage(): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation();
  const { register, handleSubmit: handleFormSubmit, setValue, watch, control, formState: { errors } } = useForm<SignUpFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'jo',
    name: 'Jordan',
    dialCode: '962'
  });

  const countries = useMemo(() => {
    return Object.entries(countriesData)
      .map(([code, data]) => ({
        code: code.toLowerCase(),
        name: data.name,
        dialCode: data.phone.toString(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
    );
  }, [countries, searchQuery]);

  const onSubmit = async (values: SignUpFormValues): Promise<void> => {
    console.log('Starting form submission...', values);
    try {
      setIsLoading(true);

      // Store first name in localStorage before any other operations
      if (values.firstName) {
        localStorage.setItem('userFirstName', values.firstName.trim());
        console.log('Stored firstName in localStorage:', values.firstName.trim());
      }

      // For testing, let's skip the API call temporarily
      console.log('Simulating successful signup');

      // Show success message
      toast.success('Account created successfully!');

      // Small delay to ensure localStorage is set before redirect
      setTimeout(() => {
        router.push('/auth/welcome');
      }, 100);

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
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4'>
      {/* Sign Up Button Top Right */}
      <div className="absolute right-0 top-0">
        <div className="h-[65px] w-[278px] overflow-hidden">
          <div className="absolute right-0 top-0 h-[65px] w-[278px] rounded-bl-[50px] bg-[#FE360A] flex items-center justify-center transform transition-transform hover:scale-[1.02]">
            <span className="text-[25px] font-semibold text-white h-[30px] whitespace-nowrap">
              Sign Up
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-52 w-full max-w-[296px] space-y-8'>
        {/* Heading */}
        <div className='flex items-center justify-center'>
          <h1 className='text-[#222222] font-normal font-bold text-[25px] leading-[32px]'>
            Create Your&nbsp;
            <span className='text-[#47C409]'>Account</span>
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
              countryCode: '',
              password: '',
              agreeToTerms: false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
              handleSubmit,
            }) => (
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
                      value={values.firstName}
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    {touched.firstName && errors.firstName && isSubmitting && (
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
                      value={values.lastName}
                      className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                    />
                    {touched.lastName && errors.lastName && isSubmitting && (
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
                    value={values.email}
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                  />
                  {touched.email && errors.email && isSubmitting && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="flex gap-2">
                  <div className="w-[111px]">
                    <button
                      type="button"
                      onClick={() => setShowCountryModal(true)}
                      style={{ border: '1px solid #EEEEEE' }}
                      className="flex w-[111px] h-[48px] items-center justify-between bg-white rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] hover:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] focus:border-[#47C409] transform transition-all hover:shadow-md"
                    >
                      <div className="country-select flex items-center gap-2">
                        <div className="flag">
                          <span className={`fi fi-${selectedCountry.code} w-[20px] h-[13px]`}></span>
                        </div>
                        <div className="phone-code w-[31px] h-[17px] text-gray-900">
                          +{selectedCountry.dialCode}
                        </div>
                      </div>
                      <div className="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
                          <path fill="none" stroke="#555555" strokeWidth="1.5" d="M1 1l4 4 4-4"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[190px]">
                    <input
                      type="tel"
                      {...register('phoneNumberLocal', {
                        onChange: (e) => {
                          const local = e.target.value;
                          const full = `+${selectedCountry.dialCode}${local}`;
                          setValue('phoneNumber', full);
                          setFieldValue('phoneNumberLocal', local);
                          setFieldValue('phoneNumber', full);
                        }
                      })}
                      placeholder="Phone Number"
                      className="box-border w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md"
                    />
                  </div>
                </div>
                {touched.phoneNumber && errors.phoneNumber && isSubmitting && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber?.toString()}
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
                    value={values.password}
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:w-[144px] placeholder:h-[17.98px] placeholder:font-normal placeholder:font-[400] placeholder:text-[14px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 transform'
                  >
                    {showPassword ? (
                      <EyeIcon className='h-5 w-5 text-[#47C409]' />
                    ) : (
                      <EyeSlashIcon className='h-5 w-5 text-[#47C409]' />
                    )}
                  </button>
                  {touched.password && errors.password && isSubmitting && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className='flex items-center gap-2'>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      id='agreeToTerms'
                      name='agreeToTerms'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.agreeToTerms}
                      className={`
                        w-[19.99px] h-[20px] appearance-none rounded border border-gray-300 bg-white 
                        checked:bg-[#47C409] 
                        checked:border-[#47C409]
                        focus:ring-2 focus:ring-[#47C409]
                      `}
                    />
                    <div className={`
                      absolute inset-0 pointer-events-none
                      flex items-center justify-center
                      opacity-0 transition-opacity
                      ${values.agreeToTerms ? 'opacity-100' : ''}
                    `}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <label className="text-[12px] font-normal leading-[14px] text-[#222222]">
                    Agree to our{" "}
                    <a href="/privacy-policy" className="text-[#233785] underline hover:text-[#1a2a6d] transition-colors">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/usage-agreement" className="text-[#233785] underline hover:text-[#1a2a6d] transition-colors">
                      Usage Agreement
                    </a>
                  </label>
                </div>
                {touched.agreeToTerms && errors.agreeToTerms && isSubmitting && (
                  <p className="mt-1 text-sm text-red-600 text-center">{errors.agreeToTerms.toString()}</p>
                )}

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading || isSubmitting || !values.agreeToTerms}
                  className={`w-full rounded-lg bg-[#47C409] py-3 text-white transition-colors ${isLoading || isSubmitting || !values.agreeToTerms
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
            )}
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

      <CountrySelectionModal
        isOpen={showCountryModal}
        onClose={() => {
          setShowCountryModal(false);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCountrySelect={(country) => {
          setSelectedCountry(country);
          setShowCountryModal(false);
          setSearchQuery('');
          setValue('countryCode', `+${country.dialCode}`);
          const fullNumber = `+${country.dialCode}${watch('phoneNumberLocal') || ''}`;
          setValue('phoneNumber', fullNumber);
        }}
      />
    </main>
  );
}