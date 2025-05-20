'use client';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NotificationBell from '@/components/shared/NotificationBell';
import ProfileDropdown from '@/components/shared/ProfileDropdown';
import CustomSvg from '@/components/ui/CustomSvg';
import useUser from '@/utils/hooks/useUser';
import Link from 'next/link';
import React, { memo } from 'react';

function HeaderActions(): React.ReactElement {
  const { isLoggedIn } = useUser();

  return (
    <div className='flex items-center gap-[22px]'>
      {isLoggedIn && (
        <>
          <Link
            href='/wishlist'
            className='flex items-center gap-2 text-secondary_6 hover:text-primary_2'
          >
            <CustomSvg
              src='/SVGs/shared/heart-icon.svg'
              width={33}
              height={33}
              alt='heart'
            />
          </Link>
          <NotificationBell />
        </>
      )}
      <div className='!text-secondary_6 hover:!text-primary_2 cursor-pointer'>
        <LanguageSwitcher />
      </div>
      <ProfileDropdown />
    </div>
  );
}

export default memo(HeaderActions);
