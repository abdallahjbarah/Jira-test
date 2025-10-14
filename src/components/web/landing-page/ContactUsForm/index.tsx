'use client';

import ErrorFormik from '@components/ui/ErrorFormik';
import FilledButton from '@components/ui/buttons/FilledButton';
import CustomInput from '@components/ui/custom-inputs/CustomInput';
import CustomTextarea from '@components/ui/custom-inputs/CustomTextarea';
import { useTranslation } from '@contexts/TranslationContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePublicContext } from '@providers/ReactPublicContextProvider';
import { usePostContactUs } from '@queries/mutations/postMutations';
import { contactUsSchema } from '@utils/formsSchemas';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ContactUsFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export default function ContactUsForm(): React.ReactElement {
  const { setIsLoading } = usePublicContext();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm<ContactUsFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    resolver: yupResolver(contactUsSchema),
    mode: 'onBlur',
  });

  const {
    mutate,
    isPending: isLoadingMutate,
    isError: isErrorMutate,
  } = usePostContactUs({
    onSuccess(data) {
      toast.success(t('contactUsForm.successMessage'));
      reset();
    },
    onError(error) {
      toast.error(t('contactUsForm.errorMessage'));
    },
  });

  useEffect(() => {
    setIsLoading(isLoadingMutate);
  }, [isLoadingMutate, setIsLoading]);

  const onSubmit = (data: ContactUsFormValues): void => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber?.toString(),
      message: data.message,
    });
  };

  return (
    <div id='ContactUsForm' className='bg-secondary_2'>
      <div className='container mx-auto py-[15.125rem] flex flex-col laptopS:flex-row w-full justify-center items-center gap-[5rem] px-4 laptopS:px-[8.75rem]'>
        <div className='flex flex-col justify-center max-w-[35.875rem] mt-16 laptopS:mt-0'>
          <h1 className='text-custom-30 font-custom-700 text-primary_5 font-gellix-Bold mobileM:text-custom-70'>
            {t('contactUsForm.title')}
          </h1>
          <p className='mt-6 text-custom-20 font-custom-400 text-primary_5 mobileM:text-custom-32'>
            {t('contactUsForm.subtitle')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full max-w-[61.6875rem] flex-col gap-6'
        >
          <div className='w-full flex flex-col laptopS:flex-row gap-8'>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[3.5rem] w-full px-6 placeholder:text-custom-17 mobileM:h-[5rem] mobileM:placeholder:text-custom-24'
                placeholder={t('contactUsForm.firstName')}
                type='text'
                id='firstName'
                {...register('firstName')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.firstName}
                isTouched={!!touchedFields.firstName}
                error={errors.firstName?.message || ''}
              />
            </div>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[3.5rem] w-full px-6 placeholder:text-custom-17 mobileM:h-[5rem] mobileM:placeholder:text-custom-24'
                placeholder={t('contactUsForm.lastName')}
                type='text'
                id='lastName'
                {...register('lastName')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.lastName}
                isTouched={!!touchedFields.lastName}
                error={errors.lastName?.message || ''}
              />
            </div>
          </div>
          <div className='w-full flex flex-col laptopS:flex-row gap-8'>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[3.5rem] w-full px-6 placeholder:text-custom-17 mobileM:h-[5rem] mobileM:placeholder:text-custom-24'
                placeholder={t('contactUsForm.email')}
                type='email'
                id='email'
                {...register('email')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.email}
                isTouched={!!touchedFields.email}
                error={errors.email?.message || ''}
              />
            </div>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[3.5rem] w-full px-6 placeholder:text-custom-17 mobileM:h-[5rem] mobileM:placeholder:text-custom-24'
                placeholder={t('contactUsForm.phoneNumber')}
                type='text'
                id='phoneNumber'
                {...register('phoneNumber')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.phoneNumber}
                isTouched={!!touchedFields.phoneNumber}
                error={errors.phoneNumber?.message || ''}
              />
            </div>
          </div>

          <div className='w-full'>
            <CustomTextarea
              shape={1}
              className='h-[11rem] w-full px-4 pt-5 placeholder:text-custom-17 mobileM:h-[15rem] mobileM:placeholder:text-custom-24'
              placeholder={t('contactUsForm.message')}
              id='message'
              {...register('message')}
            />
            <ErrorFormik
              isError={!!errors.message}
              isTouched={!!touchedFields.message}
              error={errors.message?.message || ''}
            />
          </div>
          <div className='self-start mb-16 laptopS:mb-0'>
            <FilledButton
              path='#'
              width='w-[9rem] mt-[1.5rem] mobileM:w-[14rem] mobileM:mt-[2.5rem]'
              height='h-[2.8125rem] mobileM:h-[4.8125rem]'
              text={t('contactUsForm.submit')}
              isButton
              buttonType='submit'
              icon={null}
              onClick={() => {}}
              isDisable={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
