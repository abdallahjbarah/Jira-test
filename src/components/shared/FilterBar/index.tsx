'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import LocationDropdown from '../LocationDropdown';
import GuestFilterItem from '../GuestFilterItem';
import DatePickerDropdown from '../DatePickerDropdown';
import SearchContainer from '../SearchContainer';
import AdvancedFilterDropDown from './AdvancedFilterDropDown';
import { useParams } from 'next/navigation';
interface FilterFormValues {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  region: string; // Region for the search
  type: string; // Type for the search
}

const FilterBar = () => {
  const { collectionStatus } = useParams();

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: {
        adults: 0,
        children: 0,
        infants: 0,
      },
      region: '',
      type: 'all',
    },
  });

  // Watch form values
  const checkInValue = methods.watch('checkIn');
  const checkOutValue = methods.watch('checkOut');

  // Get check-in date as Date object when needed
  const getCheckInDate = (): Date | undefined => {
    if (!checkInValue) return undefined;
    try {
      return new Date(checkInValue);
    } catch (e) {
      console.error('Failed to parse check-in date:', checkInValue);
      return undefined;
    }
  };

  const onSubmit = (data: FilterFormValues) => {
    console.log('Form data submitted:', data);
    // Handle form submission - e.g., redirect to search results page
  };

  // Handle check-in date change
  const handleCheckInChange = (dateString: string, dates: Date[]) => {
    methods.setValue('checkIn', dateString, { shouldValidate: true });

    // Clear checkout if it's before the new check-in date
    const checkOutDate = methods.getValues('checkOut');
    if (checkOutDate && dates[0]) {
      const checkOut = new Date(checkOutDate);
      if (checkOut < dates[0]) {
        methods.setValue('checkOut', '', { shouldValidate: true });
      }
    }
  };

  // Handle check-out date change
  const handleCheckOutChange = (dateString: string, dates: Date[]) => {
    methods.setValue('checkOut', dateString, { shouldValidate: true });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='flex items-center gap-[25px]'
      >
        <div className='bg-primary_1 flex justify-center items-center gap-[20px] mx-auto rounded-full'>
          <LocationDropdown
            onChange={(value) =>
              methods.setValue('location', value, { shouldValidate: true })
            }
          />

          <DatePickerDropdown
            title={{ en: 'Check-in', ar: 'الوجهة' }}
            onChange={handleCheckInChange}
            mode='single'
            minDate={new Date()} // Can't select dates in the past
            value={checkInValue}
            // max date is the chosen check-out date
            maxDate={
              checkOutValue
                ? new Date(checkOutValue)
                : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }
          />

          <DatePickerDropdown
            title={{ en: 'Check-out', ar: 'الوجهة' }}
            onChange={handleCheckOutChange}
            mode='single'
            isCheckout={true}
            checkInDate={getCheckInDate()}
            minDate={new Date()} // Can't select dates in the past
            value={checkOutValue}
          />

          <GuestFilterItem
            title={{ en: 'Guests', ar: 'الضيوف' }}
            onChange={(guests) =>
              methods.setValue('guests', guests, { shouldValidate: true })
            }
          />

          {/* Search dropdown integrated with the form */}
          <div className='p-[20px]'>
            <SearchContainer
              useExternalForm={true}
              useDirectFields={true} // Use the same fields from the FilterBar form
              onSubmit={() => methods.handleSubmit(onSubmit)()}
            />
          </div>
        </div>
        <AdvancedFilterDropDown
          className='max-h-screen overflow-y-auto'
          filterType={
            collectionStatus as 'experiences' | 'events' | 'stays' | 'offers'
          }
        />
      </form>
    </FormProvider>
  );
};

export default FilterBar;
