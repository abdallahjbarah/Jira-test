'use client';
import React, { useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DateRangePicker from '../DateRangePicker';
import GuestSelector from '../GuestSelector';
import RegionSelector, { Region, regions } from '../RegionSelector';
import Dropdown from '@/components/ui/Dropdown';
import Collapsible from '@/components/ui/Collapsible';
import Image from 'next/image';
import { useFetchContinent } from '@/lib/apis/shared/useFetchContinent';

interface SearchDropdownProps {
  onSubmit?: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onSubmit }) => {
  const { data: continents } = useFetchContinent();
  const { control, setValue, getValues, handleSubmit } = useFormContext();
  const processingDate = useRef(false);

  // Convert form date values to Date array for DateRangePicker
  const getSelectedDates = (): Date[] => {
    const values = getValues();
    const checkIn = values.checkIn;
    const checkOut = values.checkOut;
    const dateArray: Date[] = [];

    if (checkIn) {
      try {
        dateArray.push(new Date(checkIn));
      } catch (e) {
        console.error('Error parsing checkIn date:', e);
      }
    }

    if (checkOut) {
      try {
        dateArray.push(new Date(checkOut));
      } catch (e) {
        console.error('Error parsing checkOut date:', e);
      }
    }

    return dateArray;
  };

  // Handle date selection for Controller
  const handleDateChange = (dates: Date[], onChange: (value: any) => void) => {
    if (processingDate.current) return;
    processingDate.current = true;

    // Don't reset to a single date if we already have two dates and are receiving one date
    const currentDates = getSelectedDates();
    if (currentDates.length === 2 && dates.length === 1) {
      // This is likely an intermediate state in date range selection
      // Don't update state here, let the component send the complete range
      processingDate.current = false;
      return;
    }

    if (dates.length > 0) {
      // Set checkIn and checkOut separately
      setValue('checkIn', dates[0].toISOString().split('T')[0], {
        shouldValidate: true,
      });
      if (dates.length > 1) {
        setValue('checkOut', dates[1].toISOString().split('T')[0], {
          shouldValidate: true,
        });
      } else {
        // Clear checkOut if only one date is selected
        setValue('checkOut', '', { shouldValidate: true });
      }
      // Call onChange for the primary field (checkIn)
      onChange(dates[0].toISOString().split('T')[0]);
    } else {
      // Clear the date fields
      setValue('checkIn', '', { shouldValidate: true });
      setValue('checkOut', '', { shouldValidate: true });
      onChange('');
    }

    processingDate.current = false;
  };

  // Handle search submission
  const handleSearch = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      // Trigger form submission
      handleSubmit((data) => {
        console.log('Search form submitted:', data);
      })();
    }
  };

  const searchDropdownContent = (
    <div className='bg-white rounded-xl shadow-lg w-[600px] p-6 space-y-2'>
      {/* Where section */}
      <Collapsible title='Where' defaultOpen={true}>
        <div className='mb-3'>
          <div className='relative'>
            <Controller
              name='location'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <input
                  type='text'
                  placeholder='Search...'
                  className='pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg'
                  value={field.value || ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              )}
            />
            <MagnifyingGlassIcon className='absolute left-2 top-2.5 h-5 w-5 text-gray-400' />
          </div>
        </div>

        {/* Region Selector */}
        <Controller
          name='country'
          control={control}
          render={({ field }) => (
            <RegionSelector
              continents={continents}
              selectedRegion={field.value}
              onSelectRegion={(region) => field.onChange(region)}
              className='mt-4'
            />
          )}
        />
      </Collapsible>

      {/* When section */}
      <Collapsible title='When' defaultOpen={true}>
        <Controller
          name='checkIn'
          control={control}
          render={({ field }) => (
            <DateRangePicker
              selectedDates={getSelectedDates()}
              onChange={(dates) => handleDateChange(dates, field.onChange)}
              mode={'range'}
              className='max-w-full p-0 shadow-none'
            />
          )}
        />
      </Collapsible>

      {/* Who section */}
      <Collapsible title='Who' defaultOpen={true}>
        <Controller
          name='guests'
          control={control}
          render={({ field }) => (
            <GuestSelector
              onGuestChange={(guests) => field.onChange(guests)}
              initialValues={field.value}
              className='shadow-none w-full p-0'
            />
          )}
        />
      </Collapsible>

      {/* Search button */}
      <div className='pt-4'>
        <button
          type='button'
          onClick={handleSearch}
          className='w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors'
        >
          Search
        </button>
      </div>
    </div>
  );

  // The search icon trigger button
  const searchTrigger = (
    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md transition-shadow'>
      <MagnifyingGlassIcon className='h-5 w-5 text-gray-600' />
    </div>
  );

  return (
    <Dropdown
      trigger={searchTrigger}
      content={searchDropdownContent}
      position='bottom-right'
      contentClassName='mt-2'
    />
  );
};

export default SearchDropdown;
