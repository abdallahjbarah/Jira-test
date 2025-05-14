'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import DateRangePicker from '@/components/shared/DateRangePicker';
import ProfilePhotoUpload from '@/components/shared/ProfilePhotoUpload';
import { XMarkIcon } from '@heroicons/react/24/outline';

type GenderOption = 'She' | 'He' | 'Prefer not to say';

export default function WelcomePage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState<string>('');
  const [gender, setGender] = useState<GenderOption | ''>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Get first name from localStorage
    const firstName = localStorage.getItem('userFirstName');
    console.log('Retrieved firstName from localStorage:', firstName);

    if (firstName) {
      console.log('Setting userName to:', firstName);
      setUserName(firstName);
    } else {
      console.log('No firstName found in localStorage, redirecting to signup');
      router.push('/auth/signup');
    }
  }, [router]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-white px-4'>
      {/* Welcome Button Top Right */}
      <div className='absolute right-0 top-0'>
        <div className='h-[65px] w-[278px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[278px] rounded-bl-[50px] bg-[#FE360A] flex items-center justify-center'>
            <span className='w-[99px] h-[36px] font-medium text-[25px] text-white'>Signup</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-32 w-full max-w-[296px] space-y-8'>
        {/* Welcome Message */}
        <div className='text-center space-y-6'>
          <h1 className='text-[25px] font-bold leading-[32px] whitespace-nowrap'>
            <span className='text-[#222222]'>Hello </span>
            <span className='text-[#47C409]'>{userName || 'there'}!</span>
          </h1>
          <p className='text-xl text-gray-600'>Tell us more about you :)</p>
        </div>

        {/* Profile Photo Upload */}
        <ProfilePhotoUpload
          profileImage={profileImage}
          onImageUpload={handleImageUpload}
        />

        {/* Form Sections */}
        <div>
          {/* Birthday Section */}
          <div className='space-y-3'>
            <label className='block text-lg font-extrabold text-black'>
              Let's celebrate your birthday
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="DD-MM-YYYY"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-[48px] bg-white border border-[#EEEEEE] rounded-[8px] px-4 text-[14px] font-normal leading-[17px] text-[#555555] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409]"
              />
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform"
              >
                <Image
                  src="/SVGs/shared/calendar-2.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* Date Picker Modal */}
          {showDatePicker && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowDatePicker(false)}
              />
              {/* Modal Content */}
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                  <DateRangePicker
                    selectedDates={birthDate ? [new Date(birthDate)] : []}
                    onChange={(dates) => {
                      if (dates.length > 0) {
                        const date = dates[0];
                        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                        setBirthDate(formattedDate);
                        setShowDatePicker(false);
                      }
                    }}
                    mode="single"
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date()}
                  />
                </div>
              </div>
            </>
          )}

          {/* Gender Selection */}
          <div className='space-y-3 mb-20'>
            <label className='block text-lg font-extrabold text-black'>
              Are you
            </label>
            <div className='flex items-center justify-start gap-8'>
              {(['She', 'He', 'Prefer not to say'] as const).map((option) => (
                <label
                  key={option}
                  className='flex items-center gap-3 cursor-pointer'
                  onClick={() => setGender(option)}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${gender === option
                      ? 'bg-[#47C409]'
                      : 'bg-gray-100 border-2 border-gray-300'
                      }`}
                  >
                    {gender === option && (
                      <svg
                        className='w-4 h-4 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='3'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    )}
                  </div>
                  <span className='text-gray-700 whitespace-nowrap'>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Start Exploring Button */}
        <div className='mt-16'>
          <button
            onClick={() => router.push('/dashboard')}
            className='w-[296px] h-[48px] rounded-[8px] bg-[#47C409] text-white transition-colors hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2 flex items-center justify-center'
          >
            <span className='w-[128px] h-[17px] text-[14px] font-bold leading-[100%]'>
              Let's Start Exploring
            </span>
          </button>
        </div>

        {/* Skip Option */}
        <div className='text-center mt-4 mb-16'>
          <button
            onClick={() => router.push('/dashboard')}
            className='text-black underline hover:text-gray-800 transition-colors'
          >
            Skip
          </button>
        </div>
      </div>
    </main>
  );
}
