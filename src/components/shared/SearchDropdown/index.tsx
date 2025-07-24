'use client';
import React from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { useFetchContinent } from '@/lib/apis/shared/useFetchContinent';
import SearchDropdownContent from './SearchDropdownContent';
import SearchTrigger from './SearchTrigger';

interface SearchFormData {
  country: any;
  startDateTime: number;
  endDateTime: number;
  adults: number;
  children: number;
  infants: number;
}

interface SearchDropdownProps {
  onSubmit: (data: SearchFormData) => void;
  initialValues?: Partial<SearchFormData>;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  onSubmit,
  initialValues,
}) => {
  const { data: continents } = useFetchContinent();

  return (
    <Dropdown
      trigger={<SearchTrigger />}
      content={
        <SearchDropdownContent
          continents={continents}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      }
      position='bottom-right'
      contentClassName='mt-2'
    />
  );
};

export default SearchDropdown;
