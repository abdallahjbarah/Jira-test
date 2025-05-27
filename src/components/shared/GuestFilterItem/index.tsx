'use client';
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/contexts/TranslationContext';
import GuestSelector from '../GuestSelector';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';

interface GuestFilterItemProps {
  title?: {
    en: string;
    ar: string;
  };
  onChange?: (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
  triggerComponent?: React.ReactNode;
  initialValues?: {
    adults: number;
    children: number;
    infants: number;
  };
}

const GuestFilterItem: React.FC<GuestFilterItemProps> = ({
  title,
  onChange,
  triggerComponent,
  initialValues,
}) => {
  const { locale } = useTranslation();
  const formContext = useFormContext();

  // Get initial values from form context if available, otherwise use prop or default
  const getInitialGuests = () => {
    if (formContext) {
      const formGuests = formContext.watch('guests');
      if (
        formGuests &&
        (formGuests.adults > 0 ||
          formGuests.children > 0 ||
          formGuests.infants > 0)
      ) {
        return formGuests;
      }
    }
    return initialValues || { adults: 0, children: 0, infants: 0 };
  };

  const [guests, setGuests] = useState(getInitialGuests());

  // Update local state when form context changes
  useEffect(() => {
    if (formContext) {
      const formGuests = formContext.watch('guests');
      if (formGuests) {
        setGuests(formGuests);
      }
    }
  }, [formContext]);

  // Update local state when initialValues prop changes
  useEffect(() => {
    if (initialValues) {
      setGuests(initialValues);
    }
  }, [initialValues]);

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
      <GuestSelector onGuestChange={handleGuestChange} initialValues={guests} />
    </div>
  );

  return (
    <Dropdown
      trigger={
        triggerComponent || (
          <FilterBarItem
            title={title || { en: '', ar: '' }}
            value={getGuestDisplayText()}
            onClick={() => {}}
          />
        )
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
    />
  );
};

export default GuestFilterItem;
