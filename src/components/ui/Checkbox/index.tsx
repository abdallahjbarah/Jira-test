'use client';

import React, { ReactNode } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '@/utils/cn';

interface CheckboxProps {
  id: string;
  label: ReactNode;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  checkBoxPosition?: 'left' | 'right';
  checkBoxClassName?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  className = '',
  checkBoxPosition = 'left',
  checkBoxClassName = '',
  disabled = false,
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <label
      className={cn(
        'flex items-start gap-2 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      htmlFor={id}
      onClick={handleClick}
    >
      {checkBoxPosition === 'left' && (
        <div
          onClick={handleClick}
          className={cn(
            'flex items-center justify-center w-6 h-6 rounded-lg transition-colors cursor-pointer border-2 border-solid shrink-0',
            checkBoxClassName,
            checked
              ? 'bg-primary_1 border-primary_1'
              : 'bg-white border-secondary_3'
          )}
        >
          {checked && <CheckIcon className='w-4 h-4 text-white' />}
        </div>
      )}
      <div>
        <div className='text-sm text-text_2'>{label}</div>
        {description && (
          <p className='text-xs text-gray_3 mt-1'>{description}</p>
        )}
      </div>
      {checkBoxPosition === 'right' && (
        <div
          onClick={handleClick}
          className={cn(
            'flex items-center justify-center w-6 h-6 rounded-lg transition-colors cursor-pointer border-2 border-solid shrink-0',
            checkBoxClassName,
            checked
              ? 'bg-primary_1 border-primary_1'
              : 'bg-white border-secondary_3'
          )}
        >
          {checked && <CheckIcon className='w-4 h-4 text-white' />}
        </div>
      )}
    </label>
  );
};

export default Checkbox;
