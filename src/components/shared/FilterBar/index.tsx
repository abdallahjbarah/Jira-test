'use client';

import CustomSvg from '@/components/ui/CustomSvg';
import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import debounce from '@/utils/helpers/debounce';
import {
  buildFiltersFromSearchParams,
  buildSearchParamsFromFilters,
  convertToBackendFilters,
  FrontendFilter,
  FilterFormValues,
  getFormDefaultsFromSearchParams,
  getDefaultFilterValues,
} from '@/utils/helpers/filterHelpers';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DatePickerDropdown from '../DatePickerDropdown';
import GuestFilterItem from '../GuestFilterItem';
import MobileSearchDropdown from '../SearchDropdown/MobileSearchDropDown';
import AdvancedFilterDropDown from './AdvancedFilterDropDown';
import FilterBarItem from './FilterBarItem';
import WherePopup from './WherePopup';

const FilterBar = () => {
  const { collectionStatus } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useTranslation();

  // Add state for SearchPopup
  const [showSearchPopup, setShowSearchPopup] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedFilter, setSelectedFilter] = React.useState(
    collectionStatus || 'all'
  );

  // Add state to track active filter buttons
  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  const methods = useForm<FilterFormValues>({
    defaultValues: getFormDefaultsFromSearchParams(searchParams),
    mode: 'onChange',
  });

  const filtersValue = methods.watch('filters');

  const { data: searchDestinationData, isLoading: isSearchLoading } =
    useFetchSearchDestination(filtersValue?.destinationText || '');

  const [showSearchResults, setShowSearchResults] = React.useState(false);

  useEffect(() => {}, [searchDestinationData]);

  const [isUrlSync, setIsUrlSync] = React.useState(false);
  const isInitialMount = React.useRef(true);

  const debouncedUpdateUrl = React.useMemo(
    () =>
      debounce((filters: FrontendFilter) => {
        const currentUrlFilters = buildFiltersFromSearchParams(
          searchParams,
          collectionStatus as string
        );

        if (JSON.stringify(currentUrlFilters) !== JSON.stringify(filters)) {
          const params = buildSearchParamsFromFilters(filters, searchParams);
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          router.push(newUrl, { scroll: false });
        }
      }, 300),
    [searchParams, router, collectionStatus]
  );

  const debouncedFilterUpdate = React.useMemo(
    () =>
      debounce((updatedFilters: FrontendFilter) => {
        methods.setValue('filters', updatedFilters, { shouldValidate: true });
      }, 150),
    [methods]
  );

  const getCheckInDate = (): Date | undefined => {
    if (!filtersValue?.checkinTime) return undefined;
    try {
      return new Date(filtersValue.checkinTime);
    } catch (e) {
      return undefined;
    }
  };

  const onSubmit = (data: FilterFormValues) => {};

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

    methods.setValue('filters', updatedFilters, { shouldValidate: false });
    // Only set active button to checkout if not in experiences section
    if (collectionStatus !== 'experiences') {
      setActiveButton('checkout');
    } else {
      setActiveButton(null);
    }
  };

  const handleCheckOutChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      checkoutTime: dateString,
    };

    methods.setValue('filters', updatedFilters, { shouldValidate: false });
    setActiveButton(null); // Clear active button after selecting checkout
  };

  const handleLocationSelect = (location: {
    type: string;
    id?: string;
    name: string;
    searchType: string;
  }) => {
    setSelectedLocation(location.name);

    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = { ...currentFilters };

    if (location.searchType === 'city') {
      updatedFilters.city = location.name; // Use city name for API
      // You might need to add country ID here if available in the location object
    } else if (location.searchType === 'country') {
      updatedFilters.country = location.id;
      delete updatedFilters.city;
    }

    methods.setValue('filters', updatedFilters, { shouldValidate: true });
    setActiveButton('date'); // Move to date selection
  };

  const handleMainSearch = () => {
    const filters = methods.getValues('filters') || {};
    const params = buildSearchParamsFromFilters(filters, searchParams);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const handleLocationClear = () => {
    // Reset the selected location text
    setSelectedLocation('');

    // Clear location-related filters
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = { ...currentFilters };

    // Remove all location-related fields
    delete updatedFilters.city;
    delete updatedFilters.country;
    delete updatedFilters.destinationText;

    // Update the form
    methods.setValue('filters', updatedFilters, { shouldValidate: true });
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

    methods.setValue('filters', updatedFilters, { shouldValidate: false });
  };

  const onFilterApply = (filters: Record<string, unknown>) => {
    const currentFilters = methods.getValues('filters') || {};
    const mergedFilters = {
      ...currentFilters,
      ...filters,
    };

    methods.setValue('filters', mergedFilters, { shouldValidate: true });

    // Immediately trigger the main search with all filters
    const params = buildSearchParamsFromFilters(mergedFilters, searchParams);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const onFilterClear = () => {
    const currentFilters = methods.getValues('filters') || {};
    const preservedFilters: Record<string, unknown> = {
      checkinTime: currentFilters.checkinTime,
      checkoutTime: currentFilters.checkoutTime,
      adults: currentFilters.adults,
      children: currentFilters.children,
      infants: currentFilters.infants,
      country: currentFilters.country,
      city: currentFilters.city,
    };

    Object.keys(preservedFilters).forEach(key => {
      if (preservedFilters[key] === undefined) {
        delete preservedFilters[key];
      }
    });

    // Update form with preserved filters
    methods.setValue('filters', preservedFilters, { shouldValidate: true });

    // Update URL to reflect cleared advanced filters
    const params = buildSearchParamsFromFilters(
      preservedFilters as FrontendFilter,
      searchParams
    );
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const handleClear = () => {
    // Get default filter values based on collection status
    const defaultFilters = getDefaultFilterValues(collectionStatus as string);

    // Reset form with default values
    methods.reset({
      filters: defaultFilters,
    });

    // Reset all state
    setSelectedLocation('');
    setShowSearchPopup(false);
    setActiveButton(null);
    setShowSearchResults(false);

    // Update URL to reflect cleared filters
    const params = buildSearchParamsFromFilters(defaultFilters, searchParams);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const handleSearchDropdownSubmit = (data: any) => {
    const currentFilters = methods.getValues('filters') || {};
    const mergedFilters = {
      ...currentFilters,
      ...data,
    };

    methods.setValue('filters', mergedFilters, { shouldValidate: true });

    setTimeout(() => {
      const params = buildSearchParamsFromFilters(mergedFilters, searchParams);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 100);
  };

  React.useEffect(() => {
    const urlFilters = buildFiltersFromSearchParams(
      searchParams,
      collectionStatus as string
    );
    const currentFilters = methods.getValues('filters') || {};

    const filtersChanged =
      JSON.stringify(urlFilters) !== JSON.stringify(currentFilters);

    if (filtersChanged && !isUrlSync) {
      setIsUrlSync(true);
      methods.setValue('filters', urlFilters, { shouldValidate: false });

      setTimeout(() => setIsUrlSync(false), 100);
    }
  }, [searchParams, methods, isUrlSync, collectionStatus]);

  const handleSearchResultSelect = (result: Record<string, unknown>) => {
    const { searchType } = result;

    if (searchType === 'site') {
      router.push(`/${searchParams.get('lang') || 'en'}/details/${result._id}`);
    } else if (collectionStatus === 'experiences') {
      if (searchType === 'city') {
        router.push(
          `/${searchParams.get('lang') || 'en'}/experiences?city=${result.city}&country=${result.country}`
        );
      } else if (searchType === 'country') {
        router.push(
          `/${searchParams.get('lang') || 'en'}/experiences?country=${result.country}`
        );
      }
    } else {
      const currentFilters = methods.getValues('filters') || {};
      const updatedFilters = { ...currentFilters };

      if (searchType === 'city') {
        updatedFilters.city = result.city as string; // Use city name for API
        updatedFilters.country = result.countryId as string;
      } else if (searchType === 'country') {
        updatedFilters.country = result._id as string;
        delete updatedFilters.city;
      }

      updatedFilters.destinationText = '';

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
        city: undefined,
      };
      methods.setValue('filters', updatedFilters, { shouldValidate: false });
      return;
    }

    try {
      const filterData = JSON.parse(value);
      const currentFilters = methods.getValues('filters') || {};
      const updatedFilters = {
        ...currentFilters,
        ...filterData,
      };
      methods.setValue('filters', updatedFilters, { shouldValidate: false });
    } catch (e) {
      // Silent fail for invalid JSON
    }
  };

  const handleFilterSelect = (filterKey: string) => {
    setSelectedFilter(filterKey);
    // Clear checkout time if switching to experiences
    if (filterKey === 'experiences') {
      const currentFilters = methods.getValues('filters') || {};
      const updatedFilters = {
        ...currentFilters,
        checkoutTime: '',
      };
      methods.setValue('filters', updatedFilters, { shouldValidate: false });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`flex items-center gap-[2px] laptopM:gap-[5px] w-full tabletM:w-auto mt-4 ${locale === 'ar' ? 'rtl' : 'ltr'}`}
      >
        <div
          className={`relative bg-primary_1 hidden flex-col tabletM:flex-row justify-center items-center gap-[2px] laptopM:gap-[5px] mx-auto tabletM:rounded-full w-full tabletM:flex ${locale === 'ar' ? 'rtl' : 'ltr'}`}
        >
          {/* Where/Search destinations button */}
          <FilterBarItem
            title={{ en: 'Where', ar: 'أين' }}
            value={selectedLocation || 'Search Destinations'}
            onClick={() => setShowSearchPopup(true)}
            className={
              showSearchPopup
                ? 'bg-white rounded-full [&_span]:!text-green-600'
                : ''
            }
          />

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
            className={
              activeButton === 'date'
                ? 'bg-white rounded-full [&_span]:!text-green-600'
                : ''
            }
          />

          {selectedFilter !== 'experiences' && (
            <DatePickerDropdown
              title={{ en: t('search.check-out'), ar: t('search.check-out') }}
              onChange={handleCheckOutChange}
              mode='single'
              isCheckout={true}
              checkInDate={getCheckInDate()}
              minDate={new Date()}
              value={filtersValue?.checkoutTime || ''}
              className={
                activeButton === 'checkout'
                  ? 'bg-white rounded-full [&_span]:!text-green-600'
                  : ''
              }
            />
          )}

          <GuestFilterItem
            title={{ en: t('search.who'), ar: t('search.who') }}
            onChange={handleGuestChange}
            initialValues={{
              adults: filtersValue?.adults || 0,
              children: filtersValue?.children || 0,
              infants: filtersValue?.infants || 0,
            }}
          />

          <div
            className={`relative flex-1 flex items-center justify-end gap-4 ${locale === 'ar' ? 'ml-6' : 'mr-6'}`}
          >
            <button
              type='button'
              onClick={handleMainSearch}
              className='flex items-center justify-center p-3 bg-transparent rounded-full border-transparent transition-colors group'
            >
              <CustomSvg
                src='/SVGs/home/search-bar-logo.svg'
                width={33}
                height={33}
                className='opacity-100 group-hover:text-black'
                color='white'
              />
            </button>
            {!showSearchPopup && (
              <button
                type='button'
                onClick={handleClear}
                className='flex items-center justify-center p-3 bg-transparent rounded-full border-transparent transition-colors group'
                aria-label='Clear filters'
              >
                <svg
                  className='w-[35px] h-[35px] text-white'
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <defs></defs>
                  <path d='M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0-14.4 11.6-26 26-26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z'></path>
                </svg>
              </button>
            )}
            {/* Render WherePopup */}
            <WherePopup
              isOpen={showSearchPopup}
              onClose={() => setShowSearchPopup(false)}
              currentCollectionStatus={collectionStatus as string}
              onNext={handleLocationSelect}
              onClear={handleLocationClear}
              onFilterSelect={handleFilterSelect}
              filtersValue={filtersValue}
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
