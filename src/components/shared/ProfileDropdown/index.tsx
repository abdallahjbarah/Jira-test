'use client';

import Dropdown from '@/components/ui/Dropdown';
import React from 'react';
import ProfileTrigger from './ProfileTrigger';
import ProfileMenuContent from './ProfileMenuContent';

function ProfileDropdown(): React.ReactElement {
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
