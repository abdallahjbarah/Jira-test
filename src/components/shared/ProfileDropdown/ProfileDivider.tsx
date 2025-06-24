import React from 'react';

interface ProfileDividerProps {
  title?: string;
}

const ProfileDivider: React.FC<ProfileDividerProps> = ({ title }) => {
  if (title) {
    return (
      <div className='py-4'>
        <h3 className='text-sm font-bold text-gray-700'>{title}</h3>
      </div>
    );
  }

  return <div className='h-px bg-gray-200 my-3' />;
};

export default ProfileDivider;
