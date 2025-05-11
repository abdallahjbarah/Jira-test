'use client';
import React, { useState } from 'react';

type GuestCategory = 'adults' | 'children' | 'infants';

interface GuestSelectorProps {
  onGuestChange?: (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ onGuestChange }) => {
  const [guests, setGuests] = useState({
    adults: 3,
    children: 2,
    infants: 0,
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
    <div className='bg-white p-6 rounded-3xl shadow-lg w-[330px]'>
      <div className='space-y-6'>
        {/* Adults */}
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-lg font-semibold'>Adults</h3>
            <p className='text-gray-500 text-sm'>Ages 12 or above</p>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => handleCountChange('adults', false)}
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400'
              disabled={guests.adults === 0}
            >
              <span className='text-xl'>-</span>
            </button>
            <span className='w-6 text-center'>{guests.adults}</span>
            <button
              onClick={() => handleCountChange('adults', true)}
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400'
            >
              <span className='text-xl'>+</span>
            </button>
          </div>
        </div>

        {/* Children */}
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-lg font-semibold'>Children</h3>
            <p className='text-gray-500 text-sm'>Ages 3 - 11</p>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => handleCountChange('children', false)}
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400'
              disabled={guests.children === 0}
            >
              <span className='text-xl'>-</span>
            </button>
            <span className='w-6 text-center'>{guests.children}</span>
            <button
              onClick={() => handleCountChange('children', true)}
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400'
            >
              <span className='text-xl'>+</span>
            </button>
          </div>
        </div>

        {/* Infants */}
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-lg font-semibold'>Infants</h3>
            <p className='text-gray-500 text-sm'>Under 3</p>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => handleCountChange('infants', false)}
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400'
              disabled={guests.infants === 0}
            >
              <span className='text-xl'>-</span>
            </button>
            <span className='w-6 text-center'>{guests.infants}</span>
            <button
              onClick={() => handleCountChange('infants', true)}
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400'
            >
              <span className='text-xl'>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;
