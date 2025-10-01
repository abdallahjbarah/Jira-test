'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import debounce from '@/utils/helpers/debounce';
import {
  buildFiltersFromSearchParams,
  buildSearchParamsFromFilters,
  FilterFormValues,
  FrontendFilter,
  getDefaultFilterValues,
  getFormDefaultsFromSearchParams,
} from '@/utils/helpers/filterHelpers';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomSvg from '../../ui/CustomSvg';
import DatePickerDropdown from '../DatePickerDropdown';
import GuestFilterItem from '../GuestFilterItem';
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
    if (!filtersValue?.startDateTime) return undefined;
    try {
      return new Date(filtersValue.startDateTime);
    } catch (e) {
      return undefined;
    }
  };

  const onSubmit = (data: FilterFormValues) => {};

  const handleCheckInChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      startDateTime: dates[0] ? dates[0].getTime() : undefined,
    };

    if (currentFilters.endDateTime && dates[0]) {
      const checkOut = new Date(currentFilters.endDateTime);
      if (checkOut < dates[0]) {
        updatedFilters.endDateTime = undefined;
      }
    }

    methods.setValue('filters', updatedFilters, { shouldValidate: false });
    // Clear active button after check-in selection
    setActiveButton(null);
  };

  const handleCheckOutChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      endDateTime: dates[1] ? dates[1].getTime() : undefined,
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
    setActiveButton(null); // Clear active button after location selection
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
      startDateTime: currentFilters.startDateTime,
      endDateTime: currentFilters.endDateTime,
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
          `/${searchParams.get('lang') || 'en'}/experiences?city=${
            result.city
          }&country=${result.country}`
        );
      } else if (searchType === 'country') {
        router.push(
          `/${searchParams.get('lang') || 'en'}/experiences?country=${
            result.country
          }`
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
    // Clear end date time if switching to experiences
    if (filterKey === 'experiences') {
      const currentFilters = methods.getValues('filters') || {};
      const updatedFilters = {
        ...currentFilters,
        endDateTime: undefined,
      };
      methods.setValue('filters', updatedFilters, { shouldValidate: false });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`w-full tabletM:w-auto mt-4 ${
          locale === 'ar' ? 'rtl' : 'ltr'
        }`}
        style={{ width: '100%' }}
      >
        <div className='filterbar-bar-adv-outer'>
          <div className='filterbar-bar-adv-inner'>
            <div
              className={`filterbar-layout bg-primary_1 mx-auto w-full`}
              style={{ position: 'relative' }}
            >
              {/* Where/Search destinations button */}
              <div className='filterbar-grid-item filterbar-where'>
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
              </div>
              <div className='filterbar-grid-item filterbar-checkin'>
                <DatePickerDropdown
                  title={{ en: t('search.check-in'), ar: t('search.check-in') }}
                  onChange={handleCheckInChange}
                  mode='single'
                  minDate={new Date()}
                  value={filtersValue?.startDateTime || ''}
                  maxDate={
                    filtersValue?.endDateTime
                      ? new Date(filtersValue.endDateTime)
                      : new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                  }
                  className={
                    activeButton === 'date'
                      ? 'bg-white rounded-full [&_span]:!text-green-600'
                      : ''
                  }
                />
              </div>
              {selectedFilter !== 'experiences' && (
                <div className='filterbar-grid-item filterbar-checkout'>
                  <DatePickerDropdown
                    title={{
                      en: t('search.check-out'),
                      ar: t('search.check-out'),
                    }}
                    onChange={handleCheckOutChange}
                    mode='single'
                    isCheckout={true}
                    checkInDate={getCheckInDate()}
                    minDate={new Date()}
                    value={filtersValue?.endDateTime || ''}
                    className={`${
                      activeButton === 'checkout'
                        ? 'bg-white rounded-full [&_span]:!text-green-600'
                        : ''
                    } ${
                      !filtersValue?.startDateTime
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={!filtersValue?.startDateTime}
                  />
                </div>
              )}
              <div className='filterbar-grid-item filterbar-guests'>
                <GuestFilterItem
                  title={{ en: t('search.who'), ar: t('search.who') }}
                  onChange={handleGuestChange}
                  initialValues={{
                    adults: filtersValue?.adults || 0,
                    children: filtersValue?.children || 0,
                    infants: filtersValue?.infants || 0,
                  }}
                />
              </div>
              <div
                className='filterbar-grid-item filterbar-actions'
                style={{ gridColumn: '1 / span 2' }}
              >
                <div
                  className={`relative flex items-center justify-center gap-4 w-full`}
                >
                  <button
                    type='button'
                    onClick={handleMainSearch}
                    className='flex items-center justify-center p-3 bg-transparent rounded-full border-transparent transition-colors group'
                  >
                    <CustomSvg
                      src='/SVGs/home/search-bar-logo.svg'
                      className='opacity-100 group-hover:text-black w-[24px] h-[24px] laptopS:w-[33px] laptopS:h-[33px]'
                      color='white'
                      width='100%'
                      height='100%'
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
                        className='w-[26px] h-[26px] laptopS:w-[35px] laptopS:h-[35px] text-white'
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
            </div>
          </div>
          <div className='filterbar-advanced-desktop'>
            <AdvancedFilterDropDown
              filterType={
                collectionStatus as
                  | 'experiences'
                  | 'events'
                  | 'stays'
                  | 'offers'
              }
              onFilterApply={onFilterApply}
              onFilterClear={onFilterClear}
              defaultValues={filtersValue}
            />
          </div>
          {/* Advanced filter for grid layout (small screen) */}
          <div className='filterbar-advanced-mobile'>
            <AdvancedFilterDropDown
              filterType={
                collectionStatus as
                  | 'experiences'
                  | 'events'
                  | 'stays'
                  | 'offers'
              }
              onFilterApply={onFilterApply}
              onFilterClear={onFilterClear}
              defaultValues={filtersValue}
            />
          </div>
        </div>
      </form>
      <style>{`
        .filterbar-bar-adv-outer {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .filterbar-bar-adv-inner {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .filterbar-layout {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 2px;
          width: 100%;
          max-width: 1100px;
          border-radius: 9999px;
          position: relative;
          min-height: 70px;
        }
        .filterbar-grid-item { flex: 1 1 0; min-width: 0; }
        .filterbar-advanced-desktop {
          display: flex;
          align-items: center;
          margin-left: 8px;
          margin-top: 0;
          max-width: 1200px;
          margin-right: auto;
        }
        .filterbar-advanced-mobile {
          display: none;
        }
        @media (max-width: 1100px) {
          .filterbar-bar-adv-outer {
            flex-direction: column;
            align-items: stretch;
          }
          .filterbar-bar-adv-inner {
            width: 100%;
          }
          .filterbar-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
            gap: 2px;
            align-items: stretch;
            width: 100%;
            max-width: 700px;
            border-radius: 45px;
          }
          .filterbar-where { grid-row: 1; grid-column: 1; }
          .filterbar-checkin { grid-row: 1; grid-column: 2; }
          .filterbar-checkout { grid-row: 2; grid-column: 1; }
          .filterbar-guests { grid-row: 2; grid-column: 2; }
          .filterbar-actions { grid-row: 3; grid-column: 1 / span 2; }
          .filterbar-advanced-desktop {
            display: none;
          }
          .filterbar-advanced-mobile {
            display: flex;
            justify-content: center;
            margin-top: 16px;
            width: 100%;
          }
        }
      `}</style>
    </FormProvider>
  );
};

export default FilterBar;
