'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import PasswordInput from '@/components/form/PasswordInput';
import { useResetPassword } from '@/lib/apis/users/useResetPassword';
import { WretchError } from 'wretch';
import { useTranslation } from '@/contexts/TranslationContext';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: resetPassword, isPending: isResetPasswordLoading } =
    useResetPassword({
      onSuccess: () => {
        toast.success(t('auth.resetPassword.resetSuccess'));
        router.push('/auth/login');
      },
      onError: (error: WretchError) => {
        toast.error(
          error?.json?.message || t('auth.resetPassword.resetFailed')
        );
      },
    });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async data => {
    const { confirmPassword, ...rest } = data;
    resetPassword({
      email: email || '',
      ...rest,
    });
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 lg:px-8'>
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[200px] sm:w-[278px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[200px] sm:w-[278px] rounded-bl-[50px] bg-[#FE360A] flex items-center justify-center transform transition-transform hover:scale-[1.02]'>
            <span className='text-[20px] sm:text-[25px] font-semibold text-white h-[30px] whitespace-nowrap'>
              {t('auth.resetPassword.title')}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-24 sm:mt-32 md:mt-52 w-full max-w-[296px] space-y-6 sm:space-y-8 px-4'>
        <div className='flex flex-col items-center gap-2 sm:gap-3 animate-fadeIn'>
          <h1 className='w-[234px] h-[30px] text-[20px] xs:text-[22px] sm:text-[25px] font-bold whitespace-nowrap text-center'>
            <span className='text-[#222222]'>
              {t('auth.resetPassword.title')}
            </span>
          </h1>
          <p className='text-[12px] xs:text-[13px] sm:text-[14px] w-[260px] xs:w-[280px] font-normal leading-[15px] xs:leading-[16px] sm:leading-[17px] text-[#555555] mt-3 xs:mt-4 sm:mt-6'>
            Your new password must be different from previously used passwords
          </p>
        </div>

        <div className='w-full space-y-4 sm:space-y-5 pb-12 sm:pb-16'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col items-center w-full'>
              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={errors.password?.message}
                    className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                    label={t('auth.resetPassword.newPassword')}
                  />
                )}
              />
            </div>

            <div className='flex flex-col items-center w-full'>
              <Controller
                control={control}
                name='confirmPassword'
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    error={errors.confirmPassword?.message}
                    className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
                    label={t('auth.resetPassword.confirmPassword')}
                  />
                )}
              />
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={isResetPasswordLoading || isSubmitting}
                className={`w-[296px] h-[48px] rounded-[8px] bg-[#47C409] text-[13px] sm:text-[14px] font-bold leading-[16px] sm:leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isResetPasswordLoading || isSubmitting
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                }`}
              >
                {isResetPasswordLoading || isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <span className='mr-2 text-[13px] sm:text-[14px]'>
                      {t('auth.resetPassword.resetting')}
                    </span>
                    <div className='animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full'></div>
                  </div>
                ) : (
                  t('auth.resetPassword.resetButton')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
