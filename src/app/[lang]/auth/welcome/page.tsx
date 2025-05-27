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
      toast.error('Failed to upload profile image');
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

      toast.success('Profile updated successfully');
      router.push('/all');
    },
    onError: () => {
      toast.error('Failed to update profile');
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
              Sign Up
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-32 sm:mt-52 w-full max-w-[296px] space-y-8 px-4 sm:px-0'>
        {/* Heading */}
        <div className='flex flex-col items-center gap-2 animate-fadeIn'>
          <h1 className='w-[178px] h-[38px] text-[32px] font-bold whitespace-nowrap mb-4 text-center'>
            <span className='text-[#222222]'>Hello </span>
          </h1>
          <p className='text-[14px] font-normal leading-[17px] text-[#555555] text-center'>
            Tell us more about you :)
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
                className='hidden'
                accept='image/*'
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Form Sections */}
          <div className='space-y-4 flex flex-col items-center w-full'>
            {/* Birthday Section */}
            <div className='space-y-3 flex flex-col items-center w-full mt-4'>
              <label className='w-[296px] h-[17px] text-[14px] font-bold text-black'>
                Let's celebrate your birthday
              </label>
              <div className='relative w-[296px]'>
                <Controller
                  name='birthDate'
                  control={control}
                  rules={{ required: 'Birth date is required' }}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type='date'
                        {...field}
                        placeholder='DD/MM/YYYY'
                        className={`w-[296px] h-[48px] rounded-lg border ${
                          fieldState.error
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } px-4 py-3 focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] text-gray-500 placeholder-gray-400 [&::-webkit-calendar-picker-indicator]:hidden`}
                      />
                      {fieldState.error && (
                        <p className='text-red-500 text-xs mt-1'>
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <div
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10'
                >
                  <Image
                    src='/SVGs/shared/calendar-2.svg'
                    alt='Calendar'
                    width={24}
                    height={24}
                    className='pointer-events-none'
                  />
                </div>
                {isDatePickerOpen && (
                  <div className='absolute top-full left-0 mt-2 z-50'>
                    <DateRangePicker
                      selectedDates={[]}
                      onChange={(dates) => {
                        if (dates.length > 0) {
                          setValue(
                            'birthDate',
                            dates[0].toISOString().split('T')[0],
                          );
                          setIsDatePickerOpen(false);
                        }
                      }}
                      mode='single'
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Gender Selection */}
            <div className='space-y-3 flex flex-col items-start w-full'>
              <label className='w-[296px] h-[17px] text-[14px] font-bold text-black'>
                Are you
              </label>
              <Controller
                name='gender'
                control={control}
                rules={{ required: 'Please select your gender' }}
                render={({ field, fieldState }) => (
                  <div className='flex items-center gap-4 w-[296px]'>
                    {GENDER_OPTIONS.map((option) => (
                      <div key={option.value} className='flex items-center'>
                        <RadioButton
                          id={option.value}
                          name='gender'
                          value={option.value}
                          label={option.label[locale]}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className='flex-row-reverse gap-[8px]'
                        />
                      </div>
                    ))}
                    {fieldState.error && (
                      <p className='text-red-500 text-xs mt-1'>
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Start Exploring Button */}
            <div className='pt-12 w-full'>
              <button
                type='submit'
                disabled={loading}
                className='w-[296px] h-[48px] rounded-lg bg-[#47C409] text-white transition-colors hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                <span className='w-[128px] h-[17px] text-[14px] font-bold leading-[17px] text-center'>
                  {loading ? 'Processing...' : "Let's Start Exploring"}
                </span>
              </button>
            </div>

            {/* Skip Option */}
            <div className='text-center pt-1 pb-16 w-full'>
              <button
                type='button'
                onClick={() => router.push('/dashboard')}
                disabled={loading}
                className='text-black underline hover:text-gray-800 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                Skip
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
