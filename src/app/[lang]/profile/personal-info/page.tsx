'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '@/utils/formsSchemas';
import FormInput from '@/components/form/FormInput';
import { useTranslation } from '@/contexts/TranslationContext';
import Select from 'react-select';
import FilledButton from '@/components/ui/buttons/FilledButton';
import FloatingLabelSelect from '@/components/form/FloatingLabelSelect';
import ImageUploader from '@/components/form/ImageUploader';

type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  gender: string;
  nationality: string;
  location: string;
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const nationalityOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  // Add more as needed
];

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: 'var(--secondary-color-2)',
    borderRadius: '8px',
    padding: '6px 8px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--primary-color)',
    },
    '&:focus': {
      borderColor: 'var(--primary-color)',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'var(--primary-color)'
      : state.isFocused
        ? 'rgba(var(--primary-color), 0.1)'
        : null,
    color: state.isSelected
      ? 'var(--quaternary-color)'
      : 'var(--quinary-color)',
    '&:hover': {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--quaternary-color)',
    },
  }),
};

export default function PersonalInfoPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(personalInfoSchema) as any,
    defaultValues: {
      firstName: 'Abeer',
      lastName: 'Alkilany',
      email: 'a.kilon79@gmail.com',
      phoneNumber: '+962 79000000',
      birthdate: '1994-03-14',
      gender: 'female',
      nationality: 'us',
      location: 'Amman, Jordan',
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Form data:', data);
      console.log('Profile image:', profileImage);
      // Show success message
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleImageChange = (file: File) => {
    setProfileImage(file);
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>
        {t('profile.personalInfo')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex items-center justify-center mb-8'>
          <ImageUploader
            initialImage='/avatar-placeholder.png'
            onImageChange={handleImageChange}
            size='md'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* First Name */}
          <div>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id='firstName'
                  label={t('profile.firstName')}
                  error={errors.firstName?.message}
                />
              )}
            />
          </div>

          {/* Last Name */}
          <div>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id='lastName'
                  label={t('profile.lastName')}
                  error={errors.lastName?.message}
                />
              )}
            />
          </div>

          {/* Email */}
          <div>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id='email'
                  label={t('email')}
                  error={errors.email?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id='phoneNumber'
                  label={t('profile.phoneNumber')}
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='birthdate'
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id='birthdate'
                  type='date'
                  label={t('profile.birthdate')}
                  error={errors.birthdate?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <FloatingLabelSelect
                  {...field}
                  id='gender'
                  options={genderOptions}
                  label={t('profile.gender')}
                  error={errors.gender?.message}
                  classNamePrefix='react-select'
                  isFilled={!!field.value}
                  value={genderOptions.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(option: any) =>
                    field.onChange(option ? option.value : '')
                  }
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='nationality'
              control={control}
              render={({ field }) => (
                <FloatingLabelSelect
                  {...field}
                  id='nationality'
                  options={nationalityOptions}
                  label={t('profile.nationality')}
                  error={errors.nationality?.message}
                  classNamePrefix='react-select'
                  isFilled={!!field.value}
                  value={nationalityOptions.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(option: any) =>
                    field.onChange(option ? option.value : '')
                  }
                />
              )}
            />
          </div>

          {/* Location */}
          <div>
            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id='location'
                  label={t('profile.location')}
                  error={errors.location?.message}
                />
              )}
            />
          </div>
        </div>

        <div className='flex justify-end space-x-4 pt-6'>
          <button
            type='button'
            className='px-6 py-2 border border-gray-300 rounded-full text-sm font-medium transition-colors hover:bg-gray-50'
          >
            {t('profile.cancel')}
          </button>
          <FilledButton
            text={t('profile.save')}
            buttonType='submit'
            isDisable={isLoading}
            className='w-[146px] px-6 py-3 rounded-lg text-xl'
            isButton
          />
        </div>
      </form>
    </div>
  );
}
