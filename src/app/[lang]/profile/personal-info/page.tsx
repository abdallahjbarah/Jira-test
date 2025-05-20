'use client';

import React, { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '@/utils/formsSchemas';
import FormInput from '@/components/form/FormInput';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import FloatingLabelSelect from '@/components/form/FloatingLabelSelect';
import ImageUploader from '@/components/form/ImageUploader';
import useUser from '@/utils/hooks/useUser';
import { GENDER_OPTIONS } from '@/utils/constants';
import { useGetCountries } from '@/lib/apis/countries/useFetchCountries';
import { Country } from '@/lib/types';
import {
  City,
  useFetchCities,
} from '@/lib/apis/countries/useFetchCountriesCities';

type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  gender: { value: string; label: string };
  country: { value: string; label: string };
  nationality: { value: string; label: string };
  city: { value: string; label: string };
};

export default function PersonalInfoPage() {
  const { t, locale } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { userData } = useUser();
  const { data: countries } = useGetCountries();

  console.log(userData, 'userData');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(personalInfoSchema) as any,
    defaultValues: {
      firstName: userData?.user.firstName,
      lastName: userData?.user.lastName,
      email: userData?.user.email,
      phoneNumber: userData?.user.phoneNumber,
      birthdate: userData?.user.birthdate,
      gender: {
        value: userData?.user.gender,
        label: userData?.user.gender,
      },
      nationality: {
        value: userData?.user.nationality,
        label: userData?.user.nationality,
      },
      country: {
        value: userData?.user.country,
        label: userData?.user.country,
      },
      city: {
        value: userData?.user.city,
        label: userData?.user.city,
      },
    },
  });

  const countryValue = useWatch({ control, name: 'country' });

  const { data: cities } = useFetchCities(countryValue?.value || '');

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
                  options={GENDER_OPTIONS.map((option) => ({
                    ...option,
                    label: option.label[locale],
                  }))}
                  label={t('profile.gender')}
                  error={errors.gender?.message}
                  classNamePrefix='react-select'
                  isFilled={!!field.value}
                  onChange={(option: any) =>
                    field.onChange(option ? option : '')
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
                  options={countries?.map((country: Country) => ({
                    value: country._id,
                    label: country.nationality,
                  }))}
                  label={t('profile.nationality')}
                  error={errors.nationality?.message}
                  classNamePrefix='react-select'
                  isFilled={!!field.value}
                  onChange={(option: any) =>
                    field.onChange(option ? option : '')
                  }
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <FloatingLabelSelect
                  {...field}
                  id='country'
                  options={countries?.map((country: Country) => ({
                    value: country._id,
                    label: country.name,
                  }))}
                  label={t('profile.country')}
                  error={errors.country?.message}
                  classNamePrefix='react-select'
                  isFilled={!!field.value}
                  onChange={(option: any) => {
                    field.onChange(option ? option : '');
                  }}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <FloatingLabelSelect
                  {...field}
                  id='city'
                  options={cities?.map((city: City) => ({
                    value: city._id,
                    label: city.name,
                  }))}
                  label={t('profile.city')}
                  error={errors.city?.message}
                  classNamePrefix='react-select'
                  isFilled={!!field.value}
                  onChange={(option: any) =>
                    field.onChange(option ? option._id : '')
                  }
                />
              )}
            />
          </div>

          {/* <div>
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
          </div> */}
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
