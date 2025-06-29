'use client';

import React from 'react';

interface ToggleSwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  labelPosition?: 'left' | 'right';
  activeColor?: string;
  inactiveColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  className = '',
  labelPosition = 'left',
  activeColor = 'bg-primary_1',
  inactiveColor = 'bg-secondary_4 border border-secondary_4',
  size = 'md',
}) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  const sizeClasses = {
    sm: {
      container: 'w-10 h-5',
      thumb: 'w-4 h-4',
      thumbPosition: checked ? 'left-5' : 'left-0.5',
    },
    md: {
      container: 'w-12 h-6',
      thumb: 'w-5 h-5',
      thumbPosition: checked ? 'left-6' : 'left-0.5',
    },
    lg: {
      container: 'w-14 h-7',
      thumb: 'w-6 h-6',
      thumbPosition: checked ? 'left-7' : 'left-0.5',
    },
  };

  const toggleContainer = (
    <div
      className={`relative rounded-full cursor-pointer transition-colors ${sizeClasses[size].container} ${
        checked ? activeColor : inactiveColor
      }`}
      onClick={handleToggle}
    >
      <input
        type='checkbox'
        id={id}
        className='sr-only'
        checked={checked}
        onChange={handleToggle}
      />
      <span
        className={`absolute top-0.5 ${sizeClasses[size].thumbPosition} ${sizeClasses[size].thumb} bg-white rounded-full shadow transition-all`}
      ></span>
    </div>
  );

  if (!label) {
    return toggleContainer;
  }

  return (
    <div
      className={`flex items-center ${labelPosition === 'left' ? 'justify-between' : 'gap-2'} ${className}`}
    >
      {labelPosition === 'left' && (
        <label
          htmlFor={id}
          className='text-sm text-text_2 cursor-pointer select-none'
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
      {toggleContainer}
      {labelPosition === 'right' && (
        <label
          htmlFor={id}
          className='text-sm text-text_2 cursor-pointer select-none'
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default ToggleSwitch;
