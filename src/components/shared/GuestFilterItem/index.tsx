'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import GuestSelector from '../GuestSelector';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';

interface GuestFilterItemProps {
  title: {
    en: string;
    ar: string;
  };
  onChange?: (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
}

const GuestFilterItem: React.FC<GuestFilterItemProps> = ({
  title,
  onChange,
}) => {
  const { locale } = useTranslation();
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  // Format the guest count display text
  const getGuestDisplayText = () => {
    const total = guests.adults + guests.children + guests.infants;
    if (total === 0) return 'Add guests';

    const guestParts = [];
    if (guests.adults > 0) {
      guestParts.push(
        `${guests.adults} adult${guests.adults !== 1 ? 's' : ''}`,
      );
    }
    if (guests.children > 0) {
      guestParts.push(
        `${guests.children} child${guests.children !== 1 ? 'ren' : ''}`,
      );
    }
    if (guests.infants > 0) {
      guestParts.push(
        `${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`,
      );
    }

    return guestParts.join(', ');
  };

  const handleGuestChange = (newGuests: {
    adults: number;
    children: number;
    infants: number;
  }) => {
    setGuests(newGuests);
    if (onChange) {
      onChange(newGuests);
    }
  };

  const dropdownContent = (
    <div className='bg-white p-0 rounded-3xl shadow-lg'>
      <GuestSelector onGuestChange={handleGuestChange} />
    </div>
  );

  return (
    <Dropdown
      trigger={
        <FilterBarItem
          title={title}
          value={getGuestDisplayText()}
          onClick={() => {}}
        />
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
    />
  );
};

export default GuestFilterItem;
