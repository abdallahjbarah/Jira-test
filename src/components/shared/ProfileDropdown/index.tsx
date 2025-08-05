'use client';

import Dropdown from '@/components/ui/Dropdown';
import React from 'react';
import ProfileTrigger from './ProfileTrigger';
import ProfileMenuContent from './ProfileMenuContent';
import useUser from '@/utils/hooks/useUser';
import CustomLink from '@/components/ui/CustomLink';
import { useTranslation } from '@/contexts/TranslationContext';

function ProfileDropdown(): React.ReactElement {
  const { isLoggedIn } = useUser();
  const { t } = useTranslation();

  // Create login/signup content component
  const LoginSignupContent = () => (
    <div className='bg-white rounded-lg shadow-lg w-[22.5rem] sm:w-[20rem] border border-solid border-secondary_3 p-6'>
      <div className='text-center mb-6'>
        <h3 className='text-lg font-semibold text-text_1 mb-2'>
          {t('welcome')} {t('to')} Bookagri
        </h3>
        <p className='text-sm text-text_3'>
          {t('dont-have-account')}
        </p>
      </div>

      <div className='space-y-3'>
        <CustomLink path='/auth/login' className='block'>
          <button
            type='button'
            className='w-full h-[48px] rounded-[8px] bg-transparent border border-[#47C409] text-[#47C409] text-[14px] font-bold leading-[17px] text-center transition-all hover:bg-[#47C409] hover:text-white hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
          >
            {t('login')}
          </button>
        </CustomLink>

        <CustomLink path='/auth/signup' className='block'>
          <button
            type='button'
            className='w-full h-[48px] rounded-[8px] bg-transparent border border-[#47C409] text-[#47C409] text-[14px] font-bold leading-[17px] text-center transition-all hover:bg-[#47C409] hover:text-white hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#47C409] focus:ring-offset-2'
          >
            {t('signup')}
          </button>
        </CustomLink>
      </div>
    </div>
  );

  return (
    <Dropdown
      trigger={<ProfileTrigger />}
      content={isLoggedIn ? <ProfileMenuContent /> : <LoginSignupContent />}
      position='bottom-right'
      contentClassName='mt-3'
    />
  );
}

export default ProfileDropdown;
