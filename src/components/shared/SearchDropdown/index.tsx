'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DateRangePicker from '../DateRangePicker';
import GuestSelector from '../GuestSelector';
import RegionSelector, { Region, regions } from '../RegionSelector';
import Dropdown from '@/components/ui/Dropdown';
import Collapsible from '@/components/ui/Collapsible';
import Image from 'next/image';

interface SearchDropdownProps {
  onSubmit?: () => void;
  formMapping?: {
    region: string;
    location: string;
    type: string;
    dates: string;
    guests: string;
  };
  useDirectFields?: boolean; // New prop to use direct field names from FilterBar
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  onSubmit,
  formMapping,
  useDirectFields = false,
}) => {
  const methods = useFormContext();
  const [searchInput, setSearchInput] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const processingDate = useRef(false);

  // Get the field names based on mapping or direct fields
  const getFieldName = (
    field: 'region' | 'location' | 'type' | 'dates' | 'guests',
  ): string => {
    if (useDirectFields) {
      // Use direct field names from FilterBar
      switch (field) {
        case 'location':
          return 'location';
        case 'dates':
          return 'checkIn'; // Map dates to checkIn for single date mode
        case 'guests':
          return 'guests';
        default:
          return field;
      }
    }
    return formMapping ? formMapping[field] : field;
  };

  // Initialize state based on form values
  useEffect(() => {
    const regionField = getFieldName('region');
    const locationField = getFieldName('location');
    const datesField = getFieldName('dates');

    const region = methods.getValues(regionField);
    const location = methods.getValues(locationField);
    const dates = methods.getValues(datesField);

    if (region) setSelectedRegion(region as Region);
    if (location) setSearchInput(location);
    if (dates && dates.includes(',')) {
      try {
        const [start, end] = dates.split(',');
        setSelectedDates([new Date(start), new Date(end)]);
        console.log('[start, end]', [start, end]);
      } catch (e) {
        console.error('Error parsing dates:', e);
      }
    } else if (dates) {
      try {
        setSelectedDates([new Date(dates)]);
      } catch (e) {
        console.error('Error parsing date:', e);
      }
    }
  }, [methods, formMapping, useDirectFields]);

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    methods.setValue(getFieldName('location'), value, { shouldValidate: true });
  };

  // Handle region selection
  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    if (region) {
      methods.setValue(getFieldName('region'), region, {
        shouldValidate: true,
      });
    }
  };

  // Handle date selection
  const handleDateChange = (dates: Date[]) => {
    if (processingDate.current) return;
    processingDate.current = true;

    // Don't reset to a single date if we already have two dates and are receiving one date
    if (selectedDates.length === 2 && dates.length === 1) {
      // This is likely an intermediate state in date range selection
      // Don't update state here, let the component send the complete range
      processingDate.current = false;
      return;
    }

    setSelectedDates(dates);

    if (dates.length > 0) {
      if (useDirectFields) {
        // If using direct fields, set checkIn and checkOut separately
        methods.setValue('checkIn', dates[0].toISOString().split('T')[0], {
          shouldValidate: true,
        });
        if (dates.length > 1) {
          methods.setValue('checkOut', dates[1].toISOString().split('T')[0], {
            shouldValidate: true,
          });
        }
      } else {
        // Otherwise use the dates field with comma-separated format
        const formattedDates = dates
          .map((date) => date.toISOString().split('T')[0])
          .join(',');

        methods.setValue(getFieldName('dates'), formattedDates, {
          shouldValidate: true,
        });
      }
    } else {
      // Clear the date fields
      if (useDirectFields) {
        methods.setValue('checkIn', '', { shouldValidate: true });
        methods.setValue('checkOut', '', { shouldValidate: true });
      } else {
        methods.setValue(getFieldName('dates'), '', { shouldValidate: true });
      }
    }

    processingDate.current = false;
  };

  // Handle guest changes
  const handleGuestChange = (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => {
    methods.setValue(getFieldName('guests'), guests, { shouldValidate: true });
  };

  // Handle search submission
  const handleSearch = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      // Trigger form submission
      methods.handleSubmit((data) => {
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
            <input
              type='text'
              placeholder='Search...'
              className='pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg'
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <MagnifyingGlassIcon className='absolute left-2 top-2.5 h-5 w-5 text-gray-400' />
          </div>
        </div>

        {/* Region Selector */}
        <RegionSelector
          selectedRegion={selectedRegion}
          onSelectRegion={handleRegionSelect}
          className='mt-4'
        />
      </Collapsible>

      {/* When section */}
      <Collapsible title='When' defaultOpen={true}>
        <DateRangePicker
          selectedDates={selectedDates}
          onChange={handleDateChange}
          mode={'range'}
          className='max-w-full p-0 shadow-none'
        />
      </Collapsible>

      {/* Who section */}
      <Collapsible title='Who' defaultOpen={true}>
        <GuestSelector onGuestChange={handleGuestChange} />
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
