import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchTrigger: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md transition-shadow'>
      <MagnifyingGlassIcon className='h-5 w-5 text-gray-600' />
    </div>
  );
};

export default SearchTrigger;
