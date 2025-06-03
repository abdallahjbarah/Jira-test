import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const MobileSearchTrigger: React.FC = () => {
  return (
    <div className='flex items-center w-full rounded-full bg-white border border-solid border-gray-300 transition-shadow p-5'>
      <MagnifyingGlassIcon className='h-8 w-8 text-gray-600' />
      <p className='text-gray-600'>Search</p>
    </div>
  );
};

export default MobileSearchTrigger;
