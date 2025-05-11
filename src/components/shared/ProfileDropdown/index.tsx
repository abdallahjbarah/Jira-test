'use client';

import CustomSvg from '@/components/ui/CustomSvg';
import Dropdown from '@/components/ui/Dropdown';
import Link from 'next/link';
import React from 'react';

function ProfileDropdown(): React.ReactElement {
  const profileTrigger = (
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
  );

  const profileMenuContent = (
    <div className='bg-white rounded-lg shadow-lg w-56 py-2 border border-gray-100'>
      <div className='px-4 py-2 border-b border-gray-100'>
        <p className='text-sm font-medium'>John Doe</p>
        <p className='text-xs text-gray-500'>john.doe@example.com</p>
      </div>
      <ul className='py-1'>
        <li>
          <Link
            href='/profile'
            className='block px-4 py-2 text-sm hover:bg-gray-100'
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href='/settings'
            className='block px-4 py-2 text-sm hover:bg-gray-100'
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            href='/help'
            className='block px-4 py-2 text-sm hover:bg-gray-100'
          >
            Help & Support
          </Link>
        </li>
        <li className='border-t border-gray-100'>
          <Link
            href='/logout'
            className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
          >
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Dropdown
      trigger={profileTrigger}
      content={profileMenuContent}
      position='bottom-right'
      contentClassName='mt-3'
    />
  );
}

export default ProfileDropdown;
