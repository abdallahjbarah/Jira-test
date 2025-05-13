import React from 'react';

interface ProfileDividerProps {
  title?: string;
}

const ProfileDivider: React.FC<ProfileDividerProps> = ({ title }) => {
  if (title) {
    return (
      <div className='py-6'>
        <h3 className='text-sm font-bold text-gray-700'>{title}</h3>
      </div>
    );
  }

  return <div className='h-px bg-gray-200 my-2' />;
};

export default ProfileDivider;
