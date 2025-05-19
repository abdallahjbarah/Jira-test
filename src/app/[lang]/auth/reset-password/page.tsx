"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { reactQueryClientOptions } from '@configs/reactQueryClientOptions';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const resetPasswordSchema = yup.object().shape({
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordFormValues) => {
      // Your API call here
      // Example:
      // return await api.post('/auth/reset-password', { ...data, email });
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: (data) => {
      toast.success("Password reset successfully!");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password. Please try again.");
    }
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 lg:px-8">
      {/* Reset Password Button Top Right */}
      <div className="absolute right-0 top-0">
        <div className="h-[65px] w-[200px] sm:w-[278px] overflow-hidden">
          <div className="absolute right-0 top-0 h-[65px] w-[200px] sm:w-[278px] rounded-bl-[50px] bg-[#FE360A] flex items-center justify-center transform transition-transform hover:scale-[1.02]">
            <span className="text-[20px] sm:text-[25px] font-semibold text-white h-[30px] whitespace-nowrap">
              Reset Password
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-24 sm:mt-32 md:mt-52 w-full max-w-[296px] space-y-6 sm:space-y-8 px-4">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 animate-fadeIn">
          <h1 className="w-[234px] h-[30px] text-[20px] xs:text-[22px] sm:text-[25px] font-bold whitespace-nowrap text-center">
            <span className="text-[#222222]">Reset Your</span>
            <span className="text-[#47C409]">Password</span>
          </h1>
          <p className="text-[12px] xs:text-[13px] sm:text-[14px] w-[260px] xs:w-[280px] font-normal leading-[15px] xs:leading-[16px] sm:leading-[17px] text-[#555555] mt-3 xs:mt-4 sm:mt-6">
            Your new password must be different from
            previously used passwords</p>
        </div>

        {/* Form */}
        <div className="w-full space-y-4 sm:space-y-5 pb-12 sm:pb-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password Field */}
            <div className="flex justify-center">
              <div className="w-[296px] relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  placeholder="New Password"
                  className="box-border w-[296px] h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[13px] sm:text-[14px] font-normal leading-[16px] sm:leading-[17px] text-[#555555] placeholder:text-[13px] sm:placeholder:text-[14px] placeholder:font-normal placeholder:leading-[16px] sm:placeholder:leading-[17px] placeholder:text-[#555555] placeholder:h-[17px] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[24px] top-1/2 -translate-y-1/2 text-[#47C409] transform transition-transform hover:scale-110"
                >
                  {showPassword ? (
                    <EyeIcon className="h-6 w-6" />
                  ) : (
                    <EyeSlashIcon className="h-6 w-6" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600 text-center">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex justify-center">
              <div className="w-[296px] relative mb-12">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword')}
                  placeholder="Confirm New Password"
                  className="box-border w-[296px] h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[13px] sm:text-[14px] font-normal leading-[16px] sm:leading-[17px] text-[#555555] placeholder:text-[13px] sm:placeholder:text-[14px] placeholder:font-normal placeholder:leading-[16px] sm:placeholder:leading-[17px] placeholder:text-[#555555] placeholder:h-[17px] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-[24px] top-1/2 -translate-y-1/2 text-[#47C409] transform transition-transform hover:scale-110"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-6 w-6" />
                  ) : (
                    <EyeSlashIcon className="h-6 w-6" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600 text-center">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className={`w-[296px] h-[48px] rounded-[8px] bg-[#47C409] text-[13px] sm:text-[14px] font-bold leading-[16px] sm:leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isLoading || isSubmitting
                  ? 'cursor-not-allowed opacity-70'
                  : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                  }`}
              >
                {isLoading || isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2 text-[13px] sm:text-[14px]">Resetting Password...</span>
                    <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 