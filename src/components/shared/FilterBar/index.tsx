'use client';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import LocationDropdown from '../LocationDropdown';
import GuestFilterItem from '../GuestFilterItem';
import DatePickerDropdown from '../DatePickerDropdown';
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
import SearchInput from './SearchInput';
import SearchDropdown from '../SearchDropdown';
import { useTranslation } from '@/contexts/TranslationContext';
import MobileSearchDropdown from '../SearchDropdown/MobileSearchDropDown';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import ExperienceIcon from 'public/images/shared/experience.png';

import Image from 'next/image';

const FilterBar = () => {
  const { collectionStatus } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const methods = useForm<FilterFormValues>({
    defaultValues: getFormDefaultsFromSearchParams(searchParams),
    mode: 'onChange',
  });

  const filtersValue = methods.watch('filters');

  const { data: searchDestinationData, isLoading: isSearchLoading } = useFetchSearchDestination(
    filtersValue?.destinationText || '',
  );

  const [showSearchResults, setShowSearchResults] = React.useState(false);

  useEffect(() => {
    console.log('searchDestinationData', searchDestinationData);
  }, [searchDestinationData]);

  const [isUrlSync, setIsUrlSync] = React.useState(false);
  const isInitialMount = React.useRef(true);

  const debouncedUpdateUrl = React.useMemo(
    () =>
      debounce((filters: CollectionFilter) => {
        const currentUrlFilters = buildFiltersFromSearchParams(searchParams);

        if (JSON.stringify(currentUrlFilters) !== JSON.stringify(filters)) {
          console.log('Updating URL from form state:', filters);
          const params = buildSearchParamsFromFilters(filters, searchParams);
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          router.push(newUrl, { scroll: false });
        }
      }, 300),
    [searchParams, router],
  );

  const debouncedFilterUpdate = React.useMemo(
    () =>
      debounce((updatedFilters: CollectionFilter) => {
        methods.setValue('filters', updatedFilters, { shouldValidate: true });
      }, 150),
    [methods],
  );

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
  };

  const handleCheckInChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      checkinTime: dateString,
    };

    if (currentFilters.checkoutTime && dates[0]) {
      const checkOut = new Date(currentFilters.checkoutTime);
      if (checkOut < dates[0]) {
        updatedFilters.checkoutTime = '';
      }
    }

    // Only update the form value, don't trigger URL update
    methods.setValue('filters', updatedFilters, { shouldValidate: false });
  };

  const handleCheckOutChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      checkoutTime: dateString,
    };
    // Only update the form value, don't trigger URL update
    methods.setValue('filters', updatedFilters, { shouldValidate: false });
  };

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

    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key] === undefined) {
        delete updatedFilters[key];
      }
    });

    debouncedFilterUpdate(updatedFilters);
  };

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

    // Only update the form value, don't trigger URL update
    methods.setValue('filters', updatedFilters, { shouldValidate: false });
  };

  const onFilterApply = (filters: any) => {
    const currentFilters = methods.getValues('filters') || {};
    const mergedFilters = {
      ...currentFilters,
      ...filters,
    };

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
  const handleClear = () => {
    methods.reset();
    router.push(`/${searchParams.get('lang') || 'en'}`);
  };

  const handleSearchDropdownSubmit = (data: any) => {
    const currentFilters = methods.getValues('filters') || {};
    const mergedFilters = {
      ...currentFilters,
      ...data,
    };

    // Update form state and immediately trigger URL update
    methods.setValue('filters', mergedFilters, { shouldValidate: true });
    
    // Directly trigger URL update for search button clicks
    setTimeout(() => {
      const params = buildSearchParamsFromFilters(mergedFilters, searchParams);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 100);
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

  // Removed automatic URL update on filter changes
  // Filters are now only applied when search button is clicked

  // Handle search result selection
  const handleSearchResultSelect = (result: any) => {
    const { searchType } = result;

    console.log('Search result selected:', result);
    console.log('Search type:', searchType);
    console.log('City data:', result.city);
    console.log('City type:', typeof result.city);

    if (searchType === 'site') {
      // For sites, always redirect to the experience page
      router.push(`/${searchParams.get('lang') || 'en'}/details/${result._id}`);
    } else if (collectionStatus === 'experiences') {
      // For experiences collection, redirect based on search type
      if (searchType === 'city') {
        router.push(`/${searchParams.get('lang') || 'en'}/experiences?city=${result.city}&country=${result.country}`);
      } else if (searchType === 'country') {
        router.push(`/${searchParams.get('lang') || 'en'}/experiences?country=${result.country}`);
      }
    } else {
      // For other collection types (stays, events, offers), apply filters
      const currentFilters = methods.getValues('filters') || {};
      let updatedFilters = { ...currentFilters };

      if (searchType === 'city') {
        // Use city name for filtering (API accepts city names)
        const cityValue = result.city;
        console.log('City value to be used:', cityValue);
        updatedFilters.city = cityValue;
        updatedFilters.country = result.countryId;
        delete updatedFilters.siteId;
      } else if (searchType === 'country') {
        // Use country ID for filtering
        updatedFilters.country = result._id; // Use the country ID
        delete updatedFilters.siteId;
        delete updatedFilters.city;
      }

      // Clear the search text - this won't be added to URL due to filterHelpers exclusion
      updatedFilters.destinationText = '';

      console.log('Updated filters:', updatedFilters);
      methods.setValue('filters', updatedFilters, { shouldValidate: true });
    }

    setShowSearchResults(false);
  };

  const handleSearchInputChange = (value: string) => {
    if (!value) {
      const currentFilters = methods.getValues('filters') || {};
      const updatedFilters = {
        ...currentFilters,
        country: undefined,
        city: undefined
      };
      methods.setValue('filters', updatedFilters, { shouldValidate: false });
      return;
    }

    try {
      const filterData = JSON.parse(value);
      const currentFilters = methods.getValues('filters') || {};
      const updatedFilters = {
        ...currentFilters,
        ...filterData
      };
      methods.setValue('filters', updatedFilters, { shouldValidate: false });
    } catch (e) {
      console.error('Error parsing filter data:', e);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='flex items-center gap-[10px] laptopM:gap-[25px] w-full tabletM:w-auto mt-12'
      >
        <div className='relative bg-primary_1 hidden flex-col tabletM:flex-row justify-center items-center gap-[10px] laptopM:gap-[20px] mx-auto tabletM:rounded-full w-full tabletM:flex'>
          <div className="relative flex-1 mx-6">
            <SearchInput
              value={filtersValue?.destinationText || ''}
              onChange={handleSearchInputChange}
            />
          </div>

          {/* <LocationDropdown
            onChange={handleLocationChange}
            defaultValues={{
              country: filtersValue?.country || undefined,
              city: filtersValue?.city || undefined,
            }}
          /> */}

          <DatePickerDropdown
            title={{ en: t('search.check-in'), ar: t('search.check-in') }}
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
            title={{ en: t('search.check-out'), ar: t('search.check-out') }}
            onChange={handleCheckOutChange}
            mode='single'
            isCheckout={true}
            checkInDate={getCheckInDate()}
            minDate={new Date()}
            value={filtersValue?.checkoutTime || ''}
          />

          <GuestFilterItem
            title={{ en: t('search.add-guests'), ar: t('search.add-guests') }}
            onChange={handleGuestChange}
            initialValues={{
              adults: filtersValue?.adults || 0,
              children: filtersValue?.children || 0,
              infants: filtersValue?.infants || 0,
            }}
          />

          <div className='p-[20px] absolute right-14 top-1/2 transform -translate-y-1/2'>
            <button
              type='button'
              onClick={handleClear}
              className='p-2 w-10 h-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <svg className='w-full h-full' stroke="currentColor" fill="currentColor" strokeWidth="0"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"></path></svg>
            </button>
          </div>
          <div className='p-[20px]'>
            <SearchDropdown
              onSubmit={handleSearchDropdownSubmit}
              initialValues={{
                country: filtersValue?.country || '',
                checkinTime: filtersValue?.checkinTime || '',
                checkoutTime: filtersValue?.checkoutTime || '',
                adults: filtersValue?.adults || 0,
                children: filtersValue?.children || 0,
                infants: filtersValue?.infants || 0,
              }}
            />
          </div>
        </div>
        <div className='block tabletM:hidden w-full'>
          <MobileSearchDropdown onSubmit={handleSearchDropdownSubmit} />
        </div>
        <AdvancedFilterDropDown
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
