'use client';
import SearchInput from '@/components/ui/SearchInput';
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onChange,
  className,
  placeholder = 'Search',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleChange = (value: string) => {
    setSearchQuery(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      <SearchInput
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        className='w-full h-[48px] mobileM:h-full'
      />
    </div>
  );
};

export default SearchBar;
