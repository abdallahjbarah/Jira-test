import CustomSvg from '@/components/ui/CustomSvg';
import useUser from '@/utils/hooks/useUser';
import Image from 'next/image';
import React from 'react';

const ProfileDropDownHeader = () => {
  const { userData } = useUser();

  return (
    <div className='flex flex-col items-center justify-center mb-6'>
      <div className='w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100 flex items-center justify-center'>
        {userData?.user.profileImageUrl ? (
          <Image
            src={userData?.user.profileImageUrl}
            alt='profile'
            width={40}
            height={40}
            className='rounded-full w-full h-full'
          />
        ) : (
          <CustomSvg
            src='/SVGs/shared/profile-2user.svg'
            width={40}
            height={40}
            alt='Profile'
            className='text-primary_2 ml-[9px]'
          />
        )}
      </div>
      <h3 className='text-base font-semibold'>
        {userData?.user.firstName} {userData?.user.lastName}
      </h3>
      <p className='text-sm text-gray-500'>{userData?.user.email}</p>
    </div>
  );
};

export default ProfileDropDownHeader;
