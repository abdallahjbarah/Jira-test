'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import { useVerifyCode } from '@/lib/apis/users/useVerifyCode';
import { ApprovalStatus } from '@/lib/enums';
import { TOKEN_NAME } from '@/utils';
import { setCookie } from '@/utils/cookies';
import useUser from '@/utils/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { WretchError } from 'wretch';
import { useReSendVerificationCode } from '../../../../lib/apis/auth/useReSendVerificationCode';

interface VerificationFormValues {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
}

export default function VerifyPage(): React.ReactElement {
  const router = useRouter();
  const { userData } = useUser();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { t } = useTranslation();
  const {
    mutate: reSendVerificationCode,
    isPending: isReSendVerificationCodeLoading,
  } = useReSendVerificationCode({
    onSuccess: data => {
      toast.success(data.message);
      setTimeLeft(60);
      setIsTimerActive(true);
      setCanResend(false);
    },
    onError: (error: WretchError) => {
      toast.error(error.json.message);
    },
  });

  // Timer state
  const [timeLeft, setTimeLeft] = React.useState(60); // 60 seconds = 1 minute
  const [isTimerActive, setIsTimerActive] = React.useState(true);
  const [canResend, setCanResend] = React.useState(false);

  // Timer countdown effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsTimerActive(false);
            setCanResend(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle resend code
  const handleResendCode = () => {
    reSendVerificationCode({ email: userEmail });
  };

  const { mutate: verifyCode, isPending: isVerifyCodeLoading } = useVerifyCode({
    onSuccess: () => {
      toast.success(t('auth.verify.verifySuccess'));

      if (type === 'forgot-password') {
        router.push(`/auth/reset-password?email=${userEmail}`);
      } else {
        // Retrieve temporary auth data and save it permanently
        const tempAuthData = sessionStorage.getItem('tempAuthData');
        if (tempAuthData) {
          try {
            const { token, user } = JSON.parse(tempAuthData);

            // Update user status to active
            const updatedUser = { ...user, status: ApprovalStatus.ACTIVE };
            const updatedData = { token, user: updatedUser };

            // Save to persistent storage
            setCookie(TOKEN_NAME, token);
            setCookie('userStatus', ApprovalStatus.ACTIVE.toString());
            queryClient.setQueryData(['user'], updatedData);

            // Clear temporary data
            sessionStorage.removeItem('tempAuthData');

            // Check for return URL
            const returnUrl = sessionStorage.getItem('returnUrl');
            if (returnUrl) {
              sessionStorage.removeItem('returnUrl');
              router.push(returnUrl);
            } else {
              router.push('/auth/welcome');
            }
          } catch (error) {
            console.error('Error processing verification data:', error);
            toast.error(t('auth.verify.dataProcessingError'));
          }
        } else {
          // Fallback if no temp data found
          setCookie('userStatus', ApprovalStatus.ACTIVE.toString());
          queryClient.setQueryData(['user'], (oldData: any) => {
            return {
              ...oldData,
              user: { ...oldData.user, status: ApprovalStatus.ACTIVE },
            };
          });

          // Check for return URL
          const returnUrl = sessionStorage.getItem('returnUrl');
          if (returnUrl) {
            sessionStorage.removeItem('returnUrl');
            router.push(returnUrl);
          } else {
            router.push('/auth/welcome');
          }
        }
      }
    },
    onError: () => {
      toast.error(t('auth.verify.verifyFailed'));
    },
  });

  const userEmail = React.useMemo(() => {
    return searchParams.get('email') || userData?.user?.email || '';
  }, [searchParams, userData]);

  const handleSubmit = async (
    values: VerificationFormValues,
    { setSubmitting }: FormikHelpers<VerificationFormValues>
  ): Promise<void> => {
    const code = Object.keys(values)
      .filter(key => key.startsWith('code'))
      .sort()
      .map(key => values[key as keyof VerificationFormValues])
      .join('');

    verifyCode({
      email: userEmail,
      otp: code,
    });
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 lg:px-8'>
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[200px] sm:w-[278px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[200px] sm:w-[278px] rounded-bl-[50px] bg-[#FE360A] flex items-center justify-center transform transition-transform hover:scale-[1.02]'>
            <span className='text-[20px] sm:text-[25px] font-semibold text-white h-[30px] whitespace-nowrap'>
              {t('auth.verify.title')}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-24 sm:mt-32 md:mt-52 w-full max-w-[296px] space-y-6 sm:space-y-8 px-4'>
        <div className='flex flex-col items-center gap-2 sm:gap-3 animate-fadeIn'>
          <h1 className='w-full sm:w-[191px] h-auto sm:h-[27px] text-[20px] xs:text-[22px] sm:text-[25px] font-bold whitespace-nowrap text-center'>
            <span className='text-[#222222]'>{t('auth.verify.title')}</span>
          </h1>
          <p className='text-[12px] xs:text-[13px] sm:text-[14px] mt-3 xs:mt-4 sm:mt-6 font-normal leading-[15px] xs:leading-[16px] sm:leading-[17px] text-[#555555] max-w-[260px] xs:max-w-[280px] sm:max-w-[296px] text-center'>
            {t('auth.verify.description')} {userEmail}
          </p>
        </div>

        <div className='w-full space-y-4 sm:space-y-5 pb-12 sm:pb-16'>
          <Formik
            initialValues={{
              code0: '',
              code1: '',
              code2: '',
              code3: '',
            }}
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
              <Form
                className='space-y-12 flex flex-col items-center'
                noValidate
              >
                <div className='space-y-4 w-full' dir='ltr'>
                  <div className='relative'>
                    <div className='flex justify-center gap-3 sm:gap-4'>
                      {[0, 1, 2, 3].map(index => (
                        <input
                          key={index}
                          type='text'
                          maxLength={1}
                          pattern='[0-9]'
                          inputMode='numeric'
                          autoComplete='off'
                          name={`code${index}`}
                          value={
                            values[
                              `code${index}` as keyof VerificationFormValues
                            ]
                          }
                          onChange={e => {
                            const value = e.target.value;
                            if (/^[0-9]?$/.test(value)) {
                              handleChange(e);
                              if (value && e.target.nextElementSibling) {
                                (
                                  e.target
                                    .nextElementSibling as HTMLInputElement
                                ).focus();
                              }
                            }
                          }}
                          onKeyDown={e => {
                            if (
                              e.key === 'Backspace' &&
                              !e.currentTarget.value &&
                              e.currentTarget.previousElementSibling
                            ) {
                              (
                                e.currentTarget
                                  .previousElementSibling as HTMLInputElement
                              ).focus();
                              setFieldValue(`code${index - 1}`, '');
                            }
                          }}
                          onBlur={handleBlur}
                          className='h-[44px] sm:h-[48px] w-[45px] sm:w-[50px] border-0 border-b-[1px] border-[#EEEEEE] bg-white text-center text-[26px] sm:text-[30px] font-bold text-[#47C409] placeholder:text-[13px] sm:placeholder:text-[14px] placeholder:font-normal placeholder:text-[#555555] focus:border-0 focus:border-b-[1px] focus:border-[#47C409] focus:outline-none focus:ring-0 transform transition-all hover:shadow-md'
                          placeholder=''
                          style={{
                            backgroundImage: values[
                              `code${index}` as keyof VerificationFormValues
                            ]
                              ? 'none'
                              : `url('/SVGs/shared/bullet.svg')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: '10px 10px',
                          }}
                        />
                      ))}
                    </div>
                    {touched.code0 && errors.code0 && (
                      <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 w-full'>
                        <p className='text-xs sm:text-sm text-red-600 text-center'>
                          {errors.code0}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={
                    isVerifyCodeLoading || Object.values(values).some(v => !v)
                  }
                  className={`w-full h-[44px] sm:h-[48px] rounded-[8px] bg-[#47C409] text-[13px] sm:text-[14px] font-bold leading-[17px] text-white text-center shadow-[0px_3px_20px_rgba(0,0,0,0.08)] transition-all hover:bg-[#3ba007] hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isVerifyCodeLoading || Object.values(values).some(v => !v)
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
                  }`}
                >
                  {isVerifyCodeLoading ? (
                    <div className='flex items-center justify-center'>
                      <span className='mr-2 text-[13px] sm:text-[14px]'>
                        {t('auth.verify.verifying')}
                      </span>
                      <div className='animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full'></div>
                    </div>
                  ) : (
                    t('auth.verify.verifyButton')
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className='text-center space-y-2 pt-6'>
            <p className='text-[12px] sm:text-[13px] font-normal leading-[15px] sm:leading-[16px] text-[#555555]'>
              {t('auth.verify.didntReceiveCode')}
            </p>

            {isTimerActive && timeLeft > 0 ? (
              <div className='flex flex-col items-center space-y-2'>
                <div className='text-[16px] sm:text-[18px] font-bold text-[#47C409]'>
                  {formatTime(timeLeft)}
                </div>
              </div>
            ) : (
              <button
                type='button'
                className='text-[12px] sm:text-[13px] font-bold leading-[15px] sm:leading-[16px] text-[#47C409] hover:text-[#3ba007] transition-colors'
                onClick={handleResendCode}
              >
                {t('auth.verify.resendCode')}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
