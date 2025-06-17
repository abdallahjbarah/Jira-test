'use client';
import React from 'react';
import CustomSvg from '@/components/ui/CustomSvg';
import useUser from '@/utils/hooks/useUser';
import Image from 'next/image';

const ProfileTrigger: React.FC = () => {
  const { userData } = useUser();
  // console.log(userData?.user?.profileImageUrl);
  return (
    <div className='w-[50px] h-[50px] laptopM:w-[70px] laptopM:h-[70px] bg-primary_2 rounded-full p-1 laptopM:p-[11px]'>
      {userData?.user.profileImageUrl ? (
        <Image
          src={userData?.user.profileImageUrl}
          alt='profile'
          width={33}
          height={33}
          className='rounded-full w-full h-full object-cover'
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center bg-white rounded-full text-primary_2'>
          <CustomSvg
            src='/SVGs/shared/profile-2user.svg'
            width={33}
            height={33}
            alt='profile'
            className='ml-[9px]'
          />
        </div>
      )}
    </div>
  );
};

export default ProfileTrigger;
