import React from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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
        <Image
          src='/SVGs/shared/eye.svg'
          alt='Show password'
          width={24}
          height={24}
          className='[&>path]:fill-[#47C409]'
        />
      ) : (
        <Image
          src='/SVGs/shared/eye-slash.svg'
          alt='Hide password'
          width={24}
          height={24}
          className='[&>path]:fill-[#47C409]'
        />
      )}
    </button>
  );
};

export default EyeToggle;
