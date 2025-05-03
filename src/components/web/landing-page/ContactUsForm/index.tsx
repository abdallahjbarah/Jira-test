'use client';

import React, { useEffect } from 'react';
import ErrorFormik from '@components/ui/ErrorFormik';
import FilledButton from '@components/ui/buttons/FilledButton';
import CustomInput from '@components/ui/custom-inputs/CustomInput';
import CustomTextarea from '@components/ui/custom-inputs/CustomTextarea';
import { usePublicContext } from '@providers/ReactPublicContextProvider';
import { usePostContactUs } from '@queries/mutations/postMutations';
import { contactUsSchema } from '@utils/formsSchemas';
import { useFormik } from 'formik';
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

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isValid,
    resetForm,
    setValues,
  } = useFormik<ContactUsFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: contactUsSchema,
    onSubmit: onSubmit,
  });

  const {
    mutate,
    isPending: isLoadingMutate,
    isError: isErrorMutate,
  } = usePostContactUs({
    onSuccess(data) {
      toast.success(
        'Your message has been sent successfully. We will contact you as soon as possible',
      );
      resetForm();
    },
    onError(error) {
      toast.error('Something went wrong, please try later!');
    },
  });

  useEffect(() => {
    setIsLoading(isLoadingMutate);
  }, [isLoadingMutate, setIsLoading]);

  function onSubmit(): void {
    mutate({
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phone: values?.phone?.toString(),
      message: values?.message,
    });
  }

  return (
    <div id='ContactUsForm' className='bg-secondary_2'>
      <div className='container mx-auto py-[15.125rem] flex flex-col laptopS:flex-row w-full justify-center items-center gap-[5rem] px-4 laptopS:px-[8.75rem]'>
        <div className='flex flex-col justify-center max-w-[35.875rem] mt-16 laptopS:mt-0'>
          <h1 className='text-custom-70 font-custom-700 text-primary_5 font-gellix-Bold'>
            Fill The Form
          </h1>
          <p className='mt-6 text-custom-32 font-custom-400 text-primary_5'>
            We listen carefully to your opinions and suggestions
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex w-full max-w-[61.6875rem] flex-col gap-6'
        >
          <div className='w-full flex flex-col laptopS:flex-row gap-8'>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[5rem] w-full px-6'
                placeholder='First Name'
                type='text'
                id='firstName'
                name='firstName'
                value={values?.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors?.firstName}
                isTouched={!!touched?.firstName}
                error={errors?.firstName || ''}
              />
            </div>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[5rem] w-full px-6'
                placeholder='Last Name'
                type='text'
                id='lastName'
                name='lastName'
                value={values?.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors?.lastName}
                isTouched={!!touched?.lastName}
                error={errors?.lastName || ''}
              />
            </div>
          </div>
          <div className='w-full flex flex-col laptopS:flex-row gap-8'>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[5rem] w-full px-6'
                placeholder='Email'
                type='email'
                id='email'
                name='email'
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors?.email}
                isTouched={!!touched?.email}
                error={errors?.email || ''}
              />
            </div>
            <div className='w-full'>
              <CustomInput
                shape={1}
                className='h-[5rem] w-full px-6'
                placeholder='Phone Number'
                type='text'
                id='phone'
                name='phone'
                value={values?.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern='.*'
              />
              <ErrorFormik
                isError={!!errors?.phone}
                isTouched={!!touched?.phone}
                error={errors?.phone || ''}
              />
            </div>
          </div>

          <div className='w-full'>
            <CustomTextarea
              shape={1}
              className='h-[15rem] w-full px-4 pt-5'
              placeholder='Type your message here'
              id='message'
              name='message'
              value={values?.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorFormik
              isError={!!errors?.message}
              isTouched={!!touched?.message}
              error={errors?.message || ''}
            />
          </div>
          <div className='self-start mb-16 laptopS:mb-0'>
            <FilledButton
              path='#'
              width='w-[14rem] mt-[2.5rem]'
              height='h-[4.8125rem]'
              text='Send Message'
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
