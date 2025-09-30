'use client';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import CustomSvg from '../CustomSvg';

interface SearchInputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  value?: string;
  autoFocus?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search',
  onChange,
  onSearch,
  className,
  value: externalValue,
  autoFocus = false,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = externalValue !== undefined;
  const currentValue = isControlled ? externalValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(currentValue);
    }
  };

  return (
    <label
      className={clsx(
        'flex items-center bg-primary_4 rounded-full shadow-customShadow_1 px-6 py-4 cursor-pointer',
        className
      )}
    >
      <CustomSvg src='/SVGs/shared/search-normal.svg' className='text-gray_3' />

      <input
        type='text'
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='bg-transparent outline-none w-full text-custom-12 font-custom-500 text-text_1 placeholder:text-gray_5 ml-4'
        autoFocus={autoFocus}
      />
    </label>
  );
};

export default SearchInput;
