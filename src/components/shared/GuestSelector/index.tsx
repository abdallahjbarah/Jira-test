'use client';
import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Counter from '@/components/ui/Counter';

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
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  onGuestChange,
  className,
  initialValues,
  maxGuests,
}) => {
  const [guests, setGuests] = useState({
    adults: initialValues?.adults ?? 1,
    children: initialValues?.children ?? 0,
    infants: initialValues?.infants ?? 0,
  });

  const totalGuests = guests.adults + guests.children;

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
        <Counter
          title='Adults'
          description='Ages 12 or above'
          value={guests.adults}
          onIncrement={() => handleCountChange('adults', true)}
          onDecrement={() => handleCountChange('adults', false)}
          minValue={1}
          maxValue={maxGuests ? maxGuests - guests.children : undefined}
        />

        <Counter
          title='Children'
          description='Ages 3 - 11'
          value={guests.children}
          onIncrement={() => handleCountChange('children', true)}
          onDecrement={() => handleCountChange('children', false)}
          maxValue={maxGuests ? maxGuests - guests.adults : undefined}
        />

        <Counter
          title='Infants'
          description='Under 3'
          value={guests.infants}
          onIncrement={() => handleCountChange('infants', true)}
          onDecrement={() => handleCountChange('infants', false)}
        />
      </div>
    </div>
  );
};

export default GuestSelector;
