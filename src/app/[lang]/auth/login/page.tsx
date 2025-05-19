"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setIsLoading(true);
      // Your API call here
      // Example:
      // const response = await api.post('/auth/login', data);

      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 md:px-8'>
      {/* Login Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-[25px] font-semibold text-white'>Log in</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4 sm:px-0">
        {/* Heading */}
        <div className="flex flex-row items-center justify-center gap-2 animate-fadeIn">
          <h1 className="w-[143px] h-[32px] text-[25px] font-bold leading-[100%] text-center">
            <span className="text-[#222222]">Welcome to </span>
          </h1>
          <img
            src="/images/shared/bookagriCOM.png"
            alt="BookAgri"
            className="w-[128px] h-[32.19px] object-contain"
          />
        </div>

        {/* Form */}
        <div className='w-full space-y-5 pb-16'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 flex flex-col items-center w-full'>
            {/* Email Field */}
            <div className='flex flex-col items-center w-full'>
              <input
                type='email'
                {...register('email')}
                placeholder='Email / Phone Number'
                className='w-full h-[48px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600 text-center'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className='flex flex-col items-center w-full'>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder='Password'
                  className='w-full h-[48px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="h-6 w-6 text-[#47C409]" />
                  ) : (
                    <EyeSlashIcon className="h-6 w-6 text-[#47C409]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 w-full text-left">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between w-full'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='rememberMe'
                  name='rememberMe'
                  className='h-[20px] w-[20px] rounded border-gray-300 text-[#47C409] focus:ring-[#47C409] appearance-none bg-white border checked:bg-[#47C409] checked:border-[#47C409] relative transition-all after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100'
                />
                <span className='text-[12px] font-semibold leading-[14px] text-gray-600'>
                  Remember me
                </span>
              </label>
              <button
                type='button'
                onClick={() => router.push('/auth/forgot-password')}
                className='text-[12px] font-semibold leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors'
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <div className='w-full pt-6'>
              <button
                type='submit'
                disabled={isLoading || isSubmitting}
                className={`w-full h-[48px] rounded-[8px] bg-[#47C409] text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isLoading || isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {isLoading || isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Logging in...</span>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className='text-center transform transition-all hover:scale-105'>
            <p className='text-[12px] font-normal leading-[14px] text-[#222222] mx-auto pb-2'>
              Don't have an account?{' '}
              <button
                type='button'
                onClick={() => router.push('/auth/signup')}
                className='text-[12px] font-normal leading-[14px] text-[#47C409] hover:text-[#3ba007] transition-colors'
              >
                Sign Up
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