'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DateRangePicker from '@/components/shared/DateRangePicker';
import RadioButton from '@/components/ui/RadioButton';
import { GENDER_OPTIONS } from '@/utils/constants';
import { useTranslation } from '@/contexts/TranslationContext';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Gender, FileFolder } from '@/lib/enums';
import { useUploadFile } from '@/lib/apis/files/useUploadFile';
import { useEditUser } from '@/lib/apis/users/useEditUser';
import { toast } from 'react-toastify';
import useUser from '@/utils/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';

type FormValues = {
  gender: Gender;
  birthDate: string;
  profileImage: string | null;
};

export default function WelcomePage(): React.ReactElement {
  const { t, locale } = useTranslation();
  const { userData } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Upload file mutation
  const uploadFileMutation = useUploadFile({
    onSuccess: (data) => {
      // Once file is uploaded, the response contains the image URL
      updateUserWithImage(data);
    },
    onError: (error) => {
      console.log(error, 'error');
      toast.error(t('auth.welcome.profileSetupFailed'));
      setLoading(false);
    },
  });

  // Edit user mutation
  const editUserMutation = useEditUser({
    onSuccess: (data) => {
      setLoading(false);
      queryClient.setQueryData(['user'], (oldData: any) => {
        console.log(oldData, 'oldData');
        return {
          ...oldData,
          user: { ...oldData.user, ...data },
        };
      });

      toast.success(t('auth.welcome.profileSetupSuccess'));
      router.push('/all');
    },
    onError: () => {
      toast.error(t('auth.welcome.profileSetupFailed'));
      setLoading(false);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      gender: Gender.MALE,
      birthDate: '',
      profileImage: null,
    },
  });

  const profileImage = watch('profileImage');

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('profileImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update user with the image URL returned from upload
  const updateUserWithImage = (imageUrl: string) => {
    const formData = watch();

    editUserMutation.mutate({
      userId: userData?.user._id,
      gender: formData.gender,
      birthdate: formData.birthDate,
      profileImageUrl: imageUrl,
    });
  };

  // Update user without image
  const updateUserWithoutImage = (formData: FormValues) => {
    editUserMutation.mutate({
      userId: userData?.user._id,
      gender: formData.gender,
      birthdate: formData.birthDate,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);

    // If there's an image file, upload it first
    if (imageFile) {
      uploadFileMutation.mutate({
        file: imageFile,
        folderName: FileFolder.PROFILE,
      });
    } else {
      // If no image, just update user data
      updateUserWithoutImage(data);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4 sm:px-6 md:px-8'>
      {/* Welcome Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-[25px] font-semibold text-white whitespace-nowrap'>
              {t('auth.welcome.title')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4 sm:px-0'>
        {/* Heading */}
        <div className='flex flex-col items-center gap-2 animate-fadeIn'>
          <h1 className='w-[178px] h-[38px] text-[32px] font-bold whitespace-nowrap mb-4 text-center'>
            <span className='text-[#222222]'>
              {t('auth.welcome.welcomeToBookagri')}{' '}
            </span>
          </h1>
          <p className='text-[14px] font-normal leading-[17px] text-[#555555] text-center'>
            {t('auth.welcome.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Photo Upload */}
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative group'>
              <div className='relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full'>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <svg
                    className='absolute w-44 h-44 text-gray-400 -left-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {/* Camera Icon Overlay */}
                <div
                  className='absolute bottom-0 left-0 right-0 h-12 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer'
                  onClick={() =>
                    document.getElementById('profile-upload')?.click()
                  }
                >
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
              </div>
              <input
                type='file'
                id='profile-upload'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
              />
            </div>
            <span className='text-sm text-gray-500'>
              {t('profile.profileImage')}
            </span>
          </div>

          {/* Gender Selection */}
          <div className='mt-8 mb-4'>
            <div className='flex items-center justify-center'>
              <div className='w-full px-4 space-y-2'>
                <p className='text-[12px] font-semibold text-[#555555]'>
                  {t('profile.gender')}
                </p>
                <div className='flex flex-col xs:flex-row gap-6 justify-center mt-1'>
                  <Controller
                    control={control}
                    name='gender'
                    render={({ field: { onChange, value } }) => (
                      <>
                        <RadioButton
                          id='male'
                          name='gender'
                          value={Gender.MALE.toString()}
                          label={t('profile.male')}
                          checked={value === Gender.MALE}
                          onChange={() => onChange(Gender.MALE)}
                        />
                        <RadioButton
                          id='female'
                          name='gender'
                          value={Gender.FEMALE.toString()}
                          label={t('profile.female')}
                          checked={value === Gender.FEMALE}
                          onChange={() => onChange(Gender.FEMALE)}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Birthdate Picker */}
          <div className='mt-8'>
            <div className='flex flex-col'>
              <p className='text-[12px] font-semibold text-[#555555] mb-2'>
                {t('profile.birthdate')}
              </p>
              <Controller
                control={control}
                name='birthDate'
                render={({ field: { onChange, value } }) => (
                  <DateRangePicker
                    selectedDates={value ? [new Date(value)] : []}
                    onChange={(dates) => {
                      if (dates && dates.length > 0) {
                        onChange(dates[0].toISOString());
                        setIsDatePickerOpen(false);
                      }
                    }}
                    mode='single'
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    renderInput={(inputProps: Record<string, any>) => (
                      <div
                        onClick={() => setIsDatePickerOpen(true)}
                        className='relative w-full cursor-pointer'
                      >
                        <input
                          {...inputProps}
                          placeholder='YYYY-MM-DD'
                          className='border rounded-lg px-4 py-2 w-full cursor-pointer bg-white'
                          value={
                            value
                              ? new Date(value).toLocaleDateString(
                                  locale === 'ar' ? 'ar-EG' : 'en-US',
                                  {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                  },
                                )
                              : ''
                          }
                          readOnly
                        />
                        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.6666 3.33337H14.1666V2.50004C14.1666 2.27903 14.0788 2.06707 13.9225 1.91079C13.7662 1.75451 13.5543 1.66671 13.3333 1.66671C13.1123 1.66671 12.9003 1.75451 12.744 1.91079C12.5878 2.06707 12.5 2.27903 12.5 2.50004V3.33337H7.49998V2.50004C7.49998 2.27903 7.41218 2.06707 7.2559 1.91079C7.09962 1.75451 6.88766 1.66671 6.66665 1.66671C6.44563 1.66671 6.23368 1.75451 6.0774 1.91079C5.92112 2.06707 5.83331 2.27903 5.83331 2.50004V3.33337H3.33331C2.89129 3.33337 2.46736 3.5089 2.15479 3.82146C1.84222 4.13403 1.66669 4.55795 1.66669 5.00004V16.6667C1.66669 17.1087 1.84222 17.5327 2.15479 17.8453C2.46736 18.1578 2.89129 18.3334 3.33331 18.3334H16.6666C17.1087 18.3334 17.5326 18.1578 17.8452 17.8453C18.1577 17.5327 18.3333 17.1087 18.3333 16.6667V5.00004C18.3333 4.55801 18.1577 4.13409 17.8452 3.82152C17.5326 3.50895 17.1087 3.33342 16.6666 3.33337ZM16.6666 16.6667H3.33331V8.33337H16.6666V16.6667ZM16.6666 6.66671H3.33331V5.00004H16.6666V6.66671Z'
                              fill='#555555'
                            />
                            <path
                              d='M8.33333 10.8334H5.83333V13.3334H8.33333V10.8334ZM14.1667 10.8334H11.6667V13.3334H14.1667V10.8334Z'
                              fill='#555555'
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  />
                )}
              />
              {errors.birthDate && (
                <span className='text-red-500 text-xs mt-1'>
                  {errors.birthDate.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-10'>
            <button
              type='submit'
              disabled={loading}
              className={`w-full bg-[#47C409] text-white font-bold py-3 rounded-lg transition-all hover:bg-[#3ba007] hover:shadow-lg ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <span className='mr-2'>{t('common.loading')}</span>
                  <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                </div>
              ) : (
                t('profile.save')
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
