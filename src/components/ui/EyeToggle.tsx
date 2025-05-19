import React from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface EyeToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const EyeToggle: React.FC<EyeToggleProps> = ({
  isOpen,
  onClick,
  className = 'h-5 w-5',
}) => {
  return (
    <button
      type='button'
      className={`text-gray-500 ${className}`}
      onClick={onClick}
      aria-label={isOpen ? 'Hide password' : 'Show password'}
    >
      {isOpen ? (
        <EyeIcon className='h-full w-full text-[#47C409]' />
      ) : (
        <EyeSlashIcon className='h-full w-full text-[#47C409]' />
      )}
    </button>
  );
};

export default EyeToggle;
