'use client';
import React, { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput';

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
        className='w-full'
      />
    </div>
  );
};

export default SearchBar;
