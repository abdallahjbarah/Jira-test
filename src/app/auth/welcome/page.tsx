'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type GenderOption = 'She' | 'He' | 'Prefer not to say';

export default function WelcomePage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState<string>('');
  const [gender, setGender] = useState<GenderOption | ''>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setUserName(name);
    }
  }, [searchParams]);

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
      <div className='absolute right-0 top-0 '>
        <div className='h-[65px] w-[240px] overflow-hidden'>
          <div className='absolute right-0 top-0 h-[65px] w-[240px] rounded-bl-[100px] bg-[#FE360A] flex items-center justify-center'>
            <span className='text-lg font-medium text-white'>Welcome</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full max-w-md space-y-10 px-4 mt-46 sm:mt-48'>
        {/* Welcome Message */}
        <div className='text-center space-y-6'>
          <h1 className='text-4xl font-bold'>
            <span className='text-[#222222]'>Hello </span>
            <span className='text-[#47C409]'>{userName}!</span>
          </h1>
          <p className='text-xl text-gray-600'>Tell us more about you :)</p>
        </div>

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
        <div className='space-y-8'>
          {/* Birthday Section */}
          <div className='space-y-3'>
            <label className='block text-lg font-extrabold text-black'>
              Let's celebrate your birthday
            </label>
            <input
              type='date'
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder='dd/mm/yyyy'
              className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] text-gray-500 placeholder-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:saturate-[10000%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[85deg] [&::-webkit-calendar-picker-indicator]:brightness-[0.8]'
            />
          </div>

          {/* Gender Selection */}
          <div className='space-y-3'>
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
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      gender === option
                        ? 'bg-[#47C409]'
                        : 'bg-gray-100 border-2 border-gray-300'
                    }`}
                  >
                    {gender === option && (
                      <svg
                        className='w-3 h-3 text-white'
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

          {/* Start Exploring Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className='w-full mt-8 rounded-lg bg-[#47C409] py-4 text-white text-lg font-medium transition-colors hover:bg-[#3ba007] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
          >
            Let's Start Exploring
          </button>

          {/* Skip Option */}
          <div className='text-center mt-4'>
            <button
              onClick={() => router.push('/dashboard')}
              className='text-black underline hover:text-gray-800 transition-colors'
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
