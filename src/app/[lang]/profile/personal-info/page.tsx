'use client';

import React from 'react';
import { useForm, Controller, useWatch, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '@/utils/formsSchemas';
import FormInput from '@/components/form/FormInput';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import FloatingLabelSelect from '@/components/form/FloatingLabelSelect';
import ImageUploader from '@/components/form/ImageUploader';
import useUser from '@/utils/hooks/useUser';
import { GENDER_OPTIONS } from '@/utils/constants';
import { useFetchCountries } from '@/lib/apis/countries/useFetchCountries';
import { Country, City } from '@/lib/types';
import { useFetchCities } from '@/lib/apis/countries/useFetchCountriesCities';
import DatePickerInput from '@/components/form/DatePickerInput';
import { useEditUser } from '@/lib/apis/users/useEditUser';
import { toast } from 'react-toastify';
import PhoneNumberInput from '@/components/form/PhoneNumberInput';
import { CountryCode } from 'libphonenumber-js';
import { useQueryClient } from '@tanstack/react-query';
import { useUploadFile } from '@/lib/apis/files/useUploadFile';
import { FileFolder } from '@/lib/enums';

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
  profileImage?: File | null;
};

export default function PersonalInfoPage() {
  const { t, locale } = useTranslation();
  const queryClient = useQueryClient();
  const { userData } = useUser();
  const { data: countries } = useFetchCountries();
  const { mutate: editUser, isPending: isEditUserLoading } = useEditUser({
    onSuccess: data => {
      queryClient.setQueryData(['user'], (oldData: any) => {
        return {
          ...oldData,
          user: { ...oldData.user, ...data },
        };
      });
      toast.success(t('profile.updateUser.personalInfoUpdated'));
    },
    onError: error => {
      toast.error(t('profile.updateUser.personalInfoUpdateFailed'));
    },
  });

  const nationalityObject = React.useMemo(() => {
    return countries?.find(
      (country: Country) => country._id === userData?.user.nationality
    );
  }, [countries, userData?.user.nationality]);

  const countryValue = userData?.user.country?._id || '';
  const { data: cities } = useFetchCities(countryValue);

  const cityObject = React.useMemo(() => {
    return cities?.find(
      (city: City) => city.id === Number(userData?.user.city)
    );
  }, [cities, userData?.user.city]);

  const personalInfoForm = useForm<PersonalInfoFormData>({
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
        value: nationalityObject?._id,
        label: nationalityObject?.nationality,
      },
      country: {
        value: userData?.user.country?._id,
        label: userData?.user.country?.name,
      },
      city: {
        value: cityObject?.id?.toString(),
        label: cityObject?.name,
      },
    },
  });

  const selectedCountry = useWatch({
    control: personalInfoForm.control,
    name: 'country',
  });

  const { data: citiesForSelectedCountry } = useFetchCities(
    selectedCountry?.value || ''
  );

  const uploadFileMutation = useUploadFile({
    onSuccess: data => {
      updateUserWithImage(data);
    },
    onError: error => {
      toast.error(t('auth.welcome.profileImageUploadFailed'));
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    if (data.profileImage) {
      uploadFileMutation.mutate({
        file: data.profileImage,
        folderName: FileFolder.PROFILE,
      });
    } else {
      const { profileImage, ...rest } = data;
      editUser({
        userId: userData?.user._id,
        ...rest,
        gender: data.gender.value,
        nationality: data.nationality.value,
        country: data.country.value,
        city: data.city.value,
        birthdate: new Date(data.birthdate).toISOString(),
      });
    }
  };

  const updateUserWithImage = (imageUrl: string) => {
    const { profileImage, ...rest } = personalInfoForm.getValues();
    editUser({
      userId: userData?.user._id,
      profileImageUrl: imageUrl,
      ...rest,
      gender: rest.gender.value,
      nationality: rest.nationality.value,
      country: rest.country.value,
      city: rest.city.value.toString(),
      birthdate: new Date(rest.birthdate).toISOString(),
    });
  };

  const handleImageChange = (file: File) => {
    personalInfoForm.setValue('profileImage', file);
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>
        {t('profile.personalInfo')}
      </h2>
      <FormProvider {...personalInfoForm}>
        <form
          onSubmit={personalInfoForm.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div className='flex items-center justify-center mb-8'>
            <ImageUploader
              initialImage={userData?.user.profileImageUrl}
              onImageChange={handleImageChange}
              size='md'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Controller
                name='firstName'
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    id='firstName'
                    label={t('profile.firstName')}
                    error={personalInfoForm.formState.errors.firstName?.message}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name='lastName'
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    id='lastName'
                    label={t('profile.lastName')}
                    error={personalInfoForm.formState.errors.lastName?.message}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name='email'
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    id='email'
                    label={t('email')}
                    error={personalInfoForm.formState.errors.email?.message}
                  />
                )}
              />
            </div>

            <div>
              <PhoneNumberInput
                phoneFieldName='phoneNumber'
                phoneLocalFieldName='phoneNumber'
                countryCodeFieldName='countryCode'
                error={personalInfoForm.formState.errors.phoneNumber?.message}
                defaultCountry={userData?.user.countryCode as CountryCode}
              />
            </div>

            <div>
              <Controller
                name='birthdate'
                control={personalInfoForm.control}
                render={({ field }) => (
                  <DatePickerInput
                    id='birthdate'
                    label={t('profile.birthdate')}
                    error={personalInfoForm.formState.errors.birthdate?.message}
                    value={field.value}
                    onChange={field.onChange}
                    isBirthdate={true}
                    minDate={new Date('1900-01-01')}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name='gender'
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FloatingLabelSelect
                    {...field}
                    id='gender'
                    options={GENDER_OPTIONS.map(option => ({
                      ...option,
                      label: option.label[locale],
                    }))}
                    label={t('profile.gender')}
                    error={personalInfoForm.formState.errors.gender?.message}
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
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FloatingLabelSelect
                    {...field}
                    id='nationality'
                    options={countries?.map((country: Country) => ({
                      value: country._id,
                      label: country.nationality,
                    }))}
                    label={t('profile.nationality')}
                    error={
                      personalInfoForm.formState.errors.nationality?.message
                    }
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
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FloatingLabelSelect
                    {...field}
                    id='country'
                    options={countries?.map((country: Country) => ({
                      value: country._id,
                      label: country.name,
                    }))}
                    label={t('profile.country')}
                    error={personalInfoForm.formState.errors.country?.message}
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
                control={personalInfoForm.control}
                render={({ field }) => (
                  <FloatingLabelSelect
                    {...field}
                    id='city'
                    options={citiesForSelectedCountry?.map((city: City) => ({
                      value: city.id,
                      label: city.name,
                    }))}
                    label={t('profile.city')}
                    error={personalInfoForm.formState.errors.city?.message}
                    classNamePrefix='react-select'
                    isFilled={!!field.value}
                    onChange={(option: any) =>
                      field.onChange(option ? option : '')
                    }
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
              isDisable={
                personalInfoForm.formState.isSubmitting || isEditUserLoading
              }
              className='w-[146px] px-6 py-3 rounded-lg text-xl'
              isButton
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
