'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '@/utils/cn';

interface CheckboxProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  className = '',
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <label
      className={cn(
        'flex items-center justify-between cursor-pointer select-none',
        className,
      )}
      htmlFor={id}
      onClick={handleClick}
    >
      <div>
        <div className='text-sm text-text_2 '>{label}</div>
        {description && (
          <p className='text-xs text-gray_3 mt-1'>{description}</p>
        )}
      </div>
      <div
        onClick={handleClick}
        className={`flex items-center justify-center w-6 h-6 rounded-lg transition-colors cursor-pointer border-2 border-solid ${
          checked
            ? 'bg-primary_1 border-primary_1'
            : 'bg-white border-secondary_3'
        }`}
      >
        {checked && <CheckIcon className='w-4 h-4 text-white' />}
      </div>
    </label>
  );
};

export default Checkbox;
