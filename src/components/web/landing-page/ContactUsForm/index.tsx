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
  phone: string;
  message: string;
}

export default function ContactUsForm(): React.ReactElement {
  const { setIsLoading } = usePublicContext();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ContactUsFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    resolver: yupResolver(contactUsSchema),
    mode: 'onBlur',
  });

  const values = watch();

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
      phone: data.phone?.toString(),
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
                value={values.firstName}
                {...register('firstName')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.firstName}
                isTouched={true}
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
                value={values.lastName}
                {...register('lastName')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.lastName}
                isTouched={true}
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
                value={values.email}
                {...register('email')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.email}
                isTouched={true}
                error={errors.email?.message || ''}
              />
            </div>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[3.5rem] w-full px-6 placeholder:text-custom-17 mobileM:h-[5rem] mobileM:placeholder:text-custom-24'
                placeholder={t('contactUsForm.phone')}
                type='text'
                id='phone'
                value={values.phone}
                {...register('phone')}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors.phone}
                isTouched={true}
                error={errors.phone?.message || ''}
              />
            </div>
          </div>

          <div className='w-full'>
            <CustomTextarea
              shape={1}
              className='h-[11rem] w-full px-4 pt-5 placeholder:text-custom-17 mobileM:h-[15rem] mobileM:placeholder:text-custom-24'
              placeholder={t('contactUsForm.message')}
              id='message'
              value={values.message}
              {...register('message')}
            />
            <ErrorFormik
              isError={!!errors.message}
              isTouched={true}
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
