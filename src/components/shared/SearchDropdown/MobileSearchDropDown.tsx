'use client';
import React from 'react';
import Dropdown from '@/components/ui/Dropdown';
import { useFetchContinent } from '@/lib/apis/shared/useFetchContinent';
import SearchDropdownContent from './SearchDropdownContent';
import MobileSearchTrigger from './MobileSearchTrigger';

interface SearchFormData {
  country: any;
  checkinTime: string;
  checkoutTime: string;
  adults: number;
  children: number;
  infants: number;
}

interface MobileSearchDropdownProps {
  onSubmit: (data: SearchFormData) => void;
  initialValues?: Partial<SearchFormData>;
}

const MobileSearchDropdown: React.FC<MobileSearchDropdownProps> = ({
  onSubmit,
  initialValues,
}) => {
  const { data: continents } = useFetchContinent();

  return (
    <Dropdown
      trigger={<MobileSearchTrigger />}
      content={
        <SearchDropdownContent
          continents={continents}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      }
      position='bottom-right'
      contentClassName='mt-2 w-full tabletM:w-auto'
    />
  );
};

export default MobileSearchDropdown;
