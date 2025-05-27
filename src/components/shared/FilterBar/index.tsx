'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import LocationDropdown from '../LocationDropdown';
import GuestFilterItem from '../GuestFilterItem';
import DatePickerDropdown from '../DatePickerDropdown';
import SearchContainer from '../SearchContainer';
import AdvancedFilterDropDown from './AdvancedFilterDropDown';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  buildSearchParamsFromFilters,
  buildFiltersFromSearchParams,
  CollectionFilter,
  FilterFormValues,
  getFormDefaultsFromSearchParams,
} from '@/utils/helpers/filterHelpers';
import debounce from '@/utils/helpers/debounce';

const FilterBar = () => {
  const { collectionStatus } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const methods = useForm<FilterFormValues>({
    defaultValues: getFormDefaultsFromSearchParams(searchParams),
    mode: 'onChange',
  });

  // Watch form values
  const filtersValue = methods.watch('filters');

  // Track if we're currently syncing from URL to prevent infinite loops
  const [isUrlSync, setIsUrlSync] = React.useState(false);
  const isInitialMount = React.useRef(true);

  // Create debounced function for URL updates
  const debouncedUpdateUrl = React.useMemo(
    () =>
      debounce((filters: CollectionFilter) => {
        const currentUrlFilters = buildFiltersFromSearchParams(searchParams);

        // Only update URL if form state is different from URL state
        if (JSON.stringify(currentUrlFilters) !== JSON.stringify(filters)) {
          console.log('Updating URL from form state:', filters);
          const params = buildSearchParamsFromFilters(filters, searchParams);
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          router.push(newUrl, { scroll: false });
        }
      }, 300),
    [searchParams, router],
  );

  // Create debounced function for filter updates
  const debouncedFilterUpdate = React.useMemo(
    () =>
      debounce((updatedFilters: CollectionFilter) => {
        methods.setValue('filters', updatedFilters, { shouldValidate: true });
      }, 150),
    [methods],
  );

  // Get check-in date as Date object when needed
  const getCheckInDate = (): Date | undefined => {
    if (!filtersValue?.checkinTime) return undefined;
    try {
      return new Date(filtersValue.checkinTime);
    } catch (e) {
      console.error('Failed to parse check-in date:', filtersValue.checkinTime);
      return undefined;
    }
  };

  const onSubmit = (data: FilterFormValues) => {
    console.log('Form data submitted:', data);
    // Handle form submission - e.g., redirect to search results page
  };

  // Handle check-in date change
  const handleCheckInChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      checkinTime: dateString,
    };

    // Clear checkout if it's before the new check-in date
    if (currentFilters.checkoutTime && dates[0]) {
      const checkOut = new Date(currentFilters.checkoutTime);
      if (checkOut < dates[0]) {
        updatedFilters.checkoutTime = '';
      }
    }

    methods.setValue('filters', updatedFilters, { shouldValidate: true });
  };

  // Handle check-out date change
  const handleCheckOutChange = (dateString: string, dates: Date[]) => {
    console.log('dateString', dateString);
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      checkoutTime: dateString,
    };
    methods.setValue('filters', updatedFilters, { shouldValidate: true });
  };

  // Handle location filter changes
  const handleLocationChange = (locationData: {
    country?: string;
    city?: number;
  }) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters: Record<string, any> = {
      ...currentFilters,
      country: locationData.country || undefined,
      city: locationData.city || undefined,
    };

    // Remove undefined values to keep the filter object clean
    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key] === undefined) {
        delete updatedFilters[key];
      }
    });

    // Use debounced update for smoother performance
    debouncedFilterUpdate(updatedFilters);
  };

  // Handle guest count changes
  const handleGuestChange = (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
    };
    // Use debounced update for smoother performance
    debouncedFilterUpdate(updatedFilters);
  };

  // Handle advanced filter changes
  const onFilterApply = (filters: any) => {
    // Merge new filters with existing ones
    const currentFilters = methods.getValues('filters') || {};
    const mergedFilters = {
      ...currentFilters,
      ...filters,
    };

    // Use debounced update for smoother performance
    debouncedFilterUpdate(mergedFilters);
  };

  const onFilterClear = () => {
    // Only clear advanced filters, preserve basic filters
    const currentFilters = methods.getValues('filters') || {};
    const preservedFilters: Record<string, any> = {
      checkinTime: currentFilters.checkinTime,
      checkoutTime: currentFilters.checkoutTime,
      adults: currentFilters.adults,
      children: currentFilters.children,
      infants: currentFilters.infants,
      country: currentFilters.country,
      city: currentFilters.city,
    };

    // Remove undefined values
    Object.keys(preservedFilters).forEach((key) => {
      if (preservedFilters[key] === undefined) {
        delete preservedFilters[key];
      }
    });

    // Use debounced update for smoother performance
    debouncedFilterUpdate(preservedFilters);
  };

  // Sync form state with URL parameters when URL changes (browser navigation)
  React.useEffect(() => {
    const urlFilters = buildFiltersFromSearchParams(searchParams);
    const currentFilters = methods.getValues('filters') || {};

    // Check if URL filters are different from current form state
    const filtersChanged =
      JSON.stringify(urlFilters) !== JSON.stringify(currentFilters);

    if (filtersChanged && !isUrlSync) {
      console.log('Syncing form state from URL:', urlFilters);
      setIsUrlSync(true);
      methods.setValue('filters', urlFilters, { shouldValidate: false });
      // Reset the sync flag after a short delay
      setTimeout(() => setIsUrlSync(false), 100);
    }
  }, [searchParams, methods, isUrlSync]);

  // Update URL search params when form state changes (user interaction)
  React.useEffect(() => {
    // Don't update URL if we're currently syncing from URL or on initial mount
    if (isUrlSync || isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Use debounced function to update URL
    debouncedUpdateUrl(filtersValue || {});
  }, [filtersValue, debouncedUpdateUrl, isUrlSync]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='flex items-center gap-[25px]'
      >
        <div className='bg-primary_1 flex justify-center items-center gap-[20px] mx-auto rounded-full'>
          <LocationDropdown
            onChange={handleLocationChange}
            defaultValues={{
              country: filtersValue?.country || undefined,
              city: filtersValue?.city || undefined,
            }}
          />

          <DatePickerDropdown
            title={{ en: 'Check-in', ar: 'الوجهة' }}
            onChange={handleCheckInChange}
            mode='single'
            minDate={new Date()}
            value={filtersValue?.checkinTime || ''}
            maxDate={
              filtersValue?.checkoutTime
                ? new Date(filtersValue.checkoutTime)
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
            value={filtersValue?.checkoutTime || ''}
          />

          <GuestFilterItem
            title={{ en: 'Guests', ar: 'الضيوف' }}
            onChange={handleGuestChange}
            initialValues={{
              adults: filtersValue?.adults || 0,
              children: filtersValue?.children || 0,
              infants: filtersValue?.infants || 0,
            }}
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
          onFilterApply={onFilterApply}
          onFilterClear={onFilterClear}
          defaultValues={filtersValue}
        />
      </form>
    </FormProvider>
  );
};

export default FilterBar;
