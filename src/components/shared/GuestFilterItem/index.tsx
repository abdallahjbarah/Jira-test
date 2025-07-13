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
  allowedGuestsField?: string[];
}

const GuestFilterItem: React.FC<GuestFilterItemProps> = ({
  title,
  onChange,
  triggerComponent,
  initialValues,
  allowedGuestsField = ['adults', 'children', 'infants'],
}) => {
  const { t, locale } = useTranslation();
  const formContext = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const getInitialGuests = () => {
    if (formContext) {
      const formFilters = formContext.watch('filters');
      if (
        formFilters &&
        (formFilters.adults > 0 ||
          formFilters.children > 0 ||
          formFilters.infants > 0)
      ) {
        return {
          adults: formFilters.adults || 0,
          children: formFilters.children || 0,
          infants: formFilters.infants || 0,
        };
      }
    }
    return initialValues || { adults: 0, children: 0, infants: 0 };
  };

  const [guests, setGuests] = useState(getInitialGuests());

  useEffect(() => {
    if (formContext) {
      const formFilters = formContext.watch('filters');
      if (formFilters) {
        setGuests({
          adults: formFilters.adults || 0,
          children: formFilters.children || 0,
          infants: formFilters.infants || 0,
        });
      }
    }
  }, [formContext]);

  useEffect(() => {
    if (initialValues) {
      setGuests(initialValues);
    }
  }, [initialValues]);

  const getGuestDisplayText = () => {
    const total = guests.adults + guests.children + guests.infants;
    if (total === 0) return t('search.add-guests');

    const guestParts = [];
    if (guests.adults > 0) {
      guestParts.push(`${guests.adults} ${t('guests.adults')}`);
    }
    if (guests.children > 0) {
      guestParts.push(`${guests.children} ${t('guests.children')}`);
    }
    if (guests.infants > 0) {
      guestParts.push(`${guests.infants} ${t('guests.infants')}`);
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
      <GuestSelector
        onGuestChange={handleGuestChange}
        initialValues={guests}
        allowedGuestsField={allowedGuestsField}
      />
    </div>
  );

  return (
    <Dropdown
      trigger={
        triggerComponent || (
          <FilterBarItem
            title={title || { en: '', ar: '' }}
            value={getGuestDisplayText()}
            onClick={() => { }}
            className={`${isOpen || (guests.adults > 0 || guests.children > 0 || guests.infants > 0) ? 'bg-white rounded-full [&_span]:!text-green-600' : ''}`}
          />
        )
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
      onOpenChange={setIsOpen}
    />
  );
};

export default GuestFilterItem;
