import React from 'react';
import DatePickerDropdown from '@/components/shared/DatePickerDropdown';
import { Input } from '@/components/form/Input';
import GuestFilterItem from '@/components/shared/GuestFilterItem';

interface BookingPanelProps {
  price: number;
  bookable: boolean;
}

const BookingPanel: React.FC<BookingPanelProps> = ({ price, bookable }) => (
  <div className='w-full max-w-[30.563rem] h-[55.938rem] bg-white border border-[#F2F2F2] rounded-[1.5rem] shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] p-[1.5rem] flex flex-col space-y-[1.25rem] overflow-y-auto flex-[0.3]'>
    <h2 className='text-xl font-custom-700 text-text_1 pt-2 font-gellix-Bold'>
      Start from JOD {price}{' '}
      <span className='font-custom-400 font-sans text-text_2'>/person</span>
    </h2>
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <DatePickerDropdown
          triggerComponent={
            <Input
              type='date'
              className='border border-secondary_3 rounded-custom-10 p-3 w-full'
              label='Date'
              defaultValue='2025-01-01'
            />
          }
          mode='range'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <GuestFilterItem
          triggerComponent={
            <Input
              type='text'
              className='border border-secondary_3 rounded-custom-10 p-3'
              label='Guests'
              defaultValue={1}
            />
          }
        />
      </div>
    </div>
    <button className='w-full bg-primary_1 text-primary_4 py-3 rounded-custom-10 mt-2' disabled={!bookable}>
      Book Now
    </button>
  </div>
);

export default BookingPanel; 