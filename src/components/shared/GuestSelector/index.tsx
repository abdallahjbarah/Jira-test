'use client';
import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Counter from '@/components/ui/Counter';
import { useTranslation } from '@/contexts/TranslationContext';

type GuestCategory = 'adults' | 'children' | 'infants';

interface GuestSelectorProps {
  className?: string;
  onGuestChange?: (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
  initialValues?: {
    adults?: number;
    children?: number;
    infants?: number;
  };
  maxGuests?: number;
  allowedGuestsField?: string[];
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  onGuestChange,
  className,
  initialValues,
  maxGuests,
  allowedGuestsField = ['adults', 'children', 'infants'],
}) => {
  const { t } = useTranslation();
  const [guests, setGuests] = useState({
    adults: initialValues?.adults ?? 0,
    children: initialValues?.children ?? 0,
    infants: initialValues?.infants ?? 0,
  });

  const handleCountChange = (category: GuestCategory, increment: boolean) => {
    setGuests((prev) => {
      const newGuests = {
        ...prev,
        [category]: increment
          ? prev[category] + 1
          : Math.max(0, prev[category] - 1),
      };

      if (onGuestChange) {
        onGuestChange(newGuests);
      }

      return newGuests;
    });
  };

  return (
    <div
      className={cn('bg-white p-6 rounded-3xl shadow-lg w-[330px]', className)}
    >
      <div className='space-y-6'>
        {allowedGuestsField?.includes('adults') && (
          <Counter
            title={t('guests.adults')}
            description={t('guests.adultsDescription')}
            value={guests.adults}
            onIncrement={() => handleCountChange('adults', true)}
            onDecrement={() => handleCountChange('adults', false)}
            minValue={0}
            maxValue={maxGuests ? maxGuests - guests.children : undefined}
          />
        )}

        {allowedGuestsField?.includes('children') && (
          <Counter
            title={t('guests.children')}
            description={t('guests.childrenDescription')}
            value={guests.children}
            onIncrement={() => handleCountChange('children', true)}
            onDecrement={() => handleCountChange('children', false)}
            maxValue={maxGuests ? maxGuests - guests.adults : undefined}
          />
        )}

        {allowedGuestsField?.includes('infants') && (
          <Counter
            title={t('guests.infants')}
            description={t('guests.infantsDescription')}
            value={guests.infants}
            onIncrement={() => handleCountChange('infants', true)}
            onDecrement={() => handleCountChange('infants', false)}
          />
        )}
      </div>
    </div>
  );
};

export default GuestSelector;
