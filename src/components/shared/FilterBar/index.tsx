'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import LocationDropdown from '../LocationDropdown';
import GuestFilterItem from '../GuestFilterItem';
import DatePickerDropdown from '@components/shared/DatePickerDropdown';
import CombinedDatePickerDropdown from '@components/shared/CombinedDatePickerDropdown';
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
import SearchDropdown from '../SearchDropdown';
import { useTranslation } from '@/contexts/TranslationContext';
import MobileSearchDropdown from '../SearchDropdown/MobileSearchDropDown';

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

    methods.setValue('filters', updatedFilters, { shouldValidate: true });
  };

  const handleCheckOutChange = (dateString: string, dates: Date[]) => {
    const currentFilters = methods.getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      checkoutTime: dateString,
    };
    methods.setValue('filters', updatedFilters, { shouldValidate: true });
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

    debouncedFilterUpdate(updatedFilters);
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

  const handleSearchDropdownSubmit = (data: any) => {
    const currentFilters = methods.getValues('filters') || {};
    const mergedFilters = {
      ...currentFilters,
      ...data,
    };

    debouncedFilterUpdate(mergedFilters);
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
        className='flex items-center gap-[10px] laptopM:gap-[25px] w-full tabletM:w-auto'
      >
        <div className='bg-primary_1 hidden flex-col tabletM:flex-row justify-center items-center gap-[10px] laptopM:gap-[20px] mx-auto tabletM:rounded-full w-full tabletM:flex'>
          <LocationDropdown
            onChange={handleLocationChange}
            defaultValues={{
              country: filtersValue?.country || undefined,
              city: filtersValue?.city || undefined,
            }}
          />

          <CombinedDatePickerDropdown
            checkInTitle={{ en: t('search.check-in'), ar: t('search.check-in') }}
            checkOutTitle={{ en: t('search.check-out'), ar: t('search.check-out') }}
            onCheckInChange={handleCheckInChange}
            onCheckOutChange={handleCheckOutChange}
            minDate={new Date()}
            checkInValue={filtersValue?.checkinTime || ''}
            checkOutValue={filtersValue?.checkoutTime || ''}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
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
