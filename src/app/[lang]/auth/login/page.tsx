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
import Image from "next/image";
import FormInput from '@/components/form/FormInput';
import Checkbox from '@/components/ui/Checkbox';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean().default(false),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
              <FormInput
                {...register('email')}
                type="email"
                label="Email / Phone Number"
                error={errors.email?.message}
                className="w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]"
                placeholder=""
              />
            </div>

            {/* Password Field */}
            <div className='flex justify-center w-full'>
              <div className='w-[296px] relative'>
                <FormInput
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  error={errors.password?.message}
                  className="w-[296px] h-[50.77px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#47C409] transform transition-transform hover:scale-110"
                >
                  {showPassword ? (
                    <Image
                      src="/SVGs/shared/eye.svg"
                      alt="Show password"
                      width={24}
                      height={24}
                      className="[&>path]:fill-[#47C409]"
                    />
                  ) : (
                    <Image
                      src="/SVGs/shared/eye-slash.svg"
                      alt="Hide password"
                      width={24}
                      height={24}
                      className="[&>path]:fill-[#47C409]"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between w-full'>
              <Checkbox
                id="rememberMe"
                label="Remember me"
                checked={watch('rememberMe')}
                onChange={(checked) => setValue('rememberMe', checked)}
              />
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
              <Image
                src="/SVGs/shared/apple.svg"
                alt="Apple"
                width={24}
                height={24}
              />
              <span>Apple</span>
            </button>
            <button
              type="button"
              style={{ border: '1px solid #EEEEEE' }}
              className="bg-white box-border w-full max-w-[296px] h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]"
            >
              <Image
                src="/SVGs/shared/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span>Google</span>
            </button>
            <button
              type="button"
              style={{ border: '1px solid #EEEEEE' }}
              className="bg-white box-border w-full max-w-[296px] h-[48px] flex items-center justify-center gap-3 rounded-[8px] text-[14px] font-bold leading-[17px] text-[#222222] transition-all hover:bg-gray-50 hover:scale-[1.02]"
            >
              <Image
                src="/SVGs/shared/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 