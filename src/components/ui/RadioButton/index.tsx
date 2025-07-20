'use client';

import { cn } from '@/utils/cn';
import React from 'react';

interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  value: string | boolean;
  checked: boolean;
  onChange: (value: string | boolean) => void;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  label,
  description,
  value,
  checked,
  onChange,
  className = '',
}) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <label
      className={cn(
        'flex items-center justify-between cursor-pointer',
        className
      )}
      htmlFor={id}
      onClick={handleChange}
    >
      <div>
        <span className='text-sm text-text_2 select-none'>{label}</span>
        {description && (
          <p className='text-xs text-gray_3 mt-1'>{description}</p>
        )}
      </div>
      <div
        onClick={handleChange}
        className={`relative flex items-center justify-center w-5 h-5 rounded-full outline outline-2 transition-colors cursor-pointer ${
          checked ? 'outline-primary_1' : 'outline-secondary_3'
        }`}
      >
        {checked ? (
          <div className='absolute w-3 h-3 rounded-full bg-primary_1'></div>
        ) : (
          <div className='absolute w-3 h-3 rounded-full bg-transparent border border-secondary_3'></div>
        )}
      </div>
    </label>
  );
};

export default RadioButton;
