'use client';

import Dropdown from '@/components/ui/Dropdown';
import React from 'react';
import ProfileTrigger from './ProfileTrigger';
import ProfileMenuContent from './ProfileMenuContent';
import useUser from '@/utils/hooks/useUser';
import CustomLink from '@/components/ui/CustomLink';

function ProfileDropdown(): React.ReactElement {
  // const { isLoggedIn } = useUser();

  // Always show the dropdown, regardless of login state
  return (
    <Dropdown
      trigger={<ProfileTrigger />}
      content={<ProfileMenuContent />}
      position='bottom-right'
      contentClassName='mt-3'
    />
  );
}

export default ProfileDropdown;
