import CustomSvg from '@/components/ui/CustomSvg';
import React from 'react';

function ProfileDropdown(): React.ReactElement {
  return (
    <div className='relative'>
      <div className='w-[70px] h-[70px] bg-primary_2 rounded-full p-[11px]'>
        <div className='w-full h-full flex items-center justify-center bg-white rounded-full text-primary_2'>
          <CustomSvg
            src='/SVGs/shared/profile-2user.svg'
            width={33}
            height={33}
            alt='profile'
            className='ml-[9px]'
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
