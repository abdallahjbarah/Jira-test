'use client';

import CustomSvg from '@/components/ui/CustomSvg';
import Dropdown from '@/components/ui/Dropdown';
import FilledButton from '@/components/ui/buttons/FilledButton';
import { useTranslation } from '@/contexts/TranslationContext';
import { getDefaultFilterValues } from '@/utils/helpers/filterHelpers';
import React, { useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EventsFilter from './EventsFilter';
import ExperiencesFilter from './ExperiencesFilter';
import OffersFilter from './OffersFilter';
import StaysFilter from './StaysFilter';

interface AdvancedFilterDropDownProps {
  filterType?: 'experiences' | 'events' | 'stays' | 'offers';
  onFilterApply?: (filters: any) => void;
  onFilterClear?: () => void;
  className?: string;
  defaultValues?: any;
}

const AdvancedFilterDropDown: React.FC<AdvancedFilterDropDownProps> = ({
  filterType = 'experiences',
  onFilterApply,
  onFilterClear,
  className = '',
  defaultValues = {},
}) => {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues,
  });
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, reset, watch } = methods;
  const formValues = watch();

  // Calculate number of active filters
  const activeFiltersCount = useMemo(() => {
    if (!formValues) return 0;

    const countActiveFilters = (obj: any): number => {
      if (!obj || typeof obj !== 'object') return 0;

      return Object.entries(obj).reduce((count, [key, value]) => {
        // Skip null/undefined
        if (value === null || value === undefined) return count;

        // Handle arrays (like amenities, languages, etc.)
        if (Array.isArray(value)) {
          // For price range, count as 1 if modified
          if (key === 'priceRange') {
            const [min, max] = value;
            return count + (min > 0 || max < 100 ? 1 : 0);
          }
          // For other arrays, count each item
          return count + value.length;
        }

        // Handle boolean values (like radio buttons and checkboxes)
        if (typeof value === 'boolean') {
          return count + (value ? 1 : 0);
        }

        // Handle numbers (like bedrooms, beds, bathrooms)
        if (typeof value === 'number') {
          return count + (value > 0 ? 1 : 0);
        }

        // Handle strings
        if (typeof value === 'string') {
          return count + (value.trim() !== '' ? 1 : 0);
        }

        // Handle nested objects
        if (typeof value === 'object') {
          return count + countActiveFilters(value);
        }

        return count;
      }, 0);
    };

    return countActiveFilters(formValues);
  }, [formValues]);

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: any) => {
    onFilterApply?.(data);
  };

  const clearAllFilters = () => {
    // Get default filter values for advanced filters only
    const defaultFilters = getDefaultFilterValues(filterType);

    // Extract only the advanced filter properties
    const emptyValues = {
      priceRange: defaultFilters.priceRange,
      languages: defaultFilters.languages,
      amenities: defaultFilters.amenities,
      bookOptions: defaultFilters.bookOptions,
      accessibilityFeatures: defaultFilters.accessibilityFeatures,
      bookagriBadge: defaultFilters.bookagriBadge,
      specialOffers: defaultFilters.specialOffers,
      numberOfBedrooms: defaultFilters.numberOfBedrooms,
      numberOfBeds: defaultFilters.numberOfBeds,
      numberOfBathrooms: defaultFilters.numberOfBathrooms,
      includesExperience: defaultFilters.includesExperience,
      experienceTypes: defaultFilters.experienceTypes,
      levelOfDifficulty: defaultFilters.levelOfDifficulty,
      ageSuitability: defaultFilters.ageSuitability,
      timeOfDay: defaultFilters.timeOfDay,
      duration: defaultFilters.duration,
      accessProvider: defaultFilters.accessProvider,
    };

    reset(emptyValues);
    onFilterClear?.();

    // Scroll to top of the dropdown content
    if (dropdownContentRef.current) {
      dropdownContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const filterTrigger = (
    <div className='relative'>
      <CustomSvg
        src='/SVGs/shared/filter-icon.svg'
        className='!w-[57px] !h-[57px] text-text_2 block'
        width='100%'
        height='100%'
      />
      {activeFiltersCount > 0 && (
        <div
          className='
    absolute -top-2 -right-2
    bg-[#FF3A1E] text-white rounded-full
    min-w-[24px] h-[24px]
    flex items-center justify-center
    text-sm font-semibold
    px-1
    shadow-lg
  '
        >
          {activeFiltersCount}
        </div>
      )}
    </div>
  );

  const getFilterContent = () => {
    switch (filterType) {
      case 'experiences':
        return <ExperiencesFilter />;
      case 'events':
        return <EventsFilter />;
      case 'stays':
        return <StaysFilter />;
      case 'offers':
        return <OffersFilter />;
      default:
        return <ExperiencesFilter />;
    }
  };

  const filterContent = (
    <div className='bg-white rounded-xl shadow-2xl w-full relative'>
      <div
        ref={dropdownContentRef}
        className='p-6 max-h-[calc(80vh-80px)] tabletM:max-h-[calc(500px-80px)] overflow-y-auto'
      >
        <h3 className='text-lg text-center font-semibold'>
          {t('filter.filter')}
        </h3>
        <hr className='my-4' />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {getFilterContent()}
          </form>
        </FormProvider>
      </div>

      <div className='sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 rounded-b-xl'>
        <div className='flex justify-center gap-4'>
          <button
            type='button'
            onClick={clearAllFilters}
            className='px-6 py-2 underline text-text_2 font-medium rounded-lg transition-colors text-sm'
          >
            {t('filter.clear-all')}
          </button>

          <FilledButton
            text={t('filter.show-results')}
            buttonType='submit'
            isButton
            onClick={() => handleSubmit(onSubmit)()}
            className='px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors text-sm'
          />
        </div>
      </div>
    </div>
  );

  return (
    <Dropdown
      trigger={filterTrigger}
      content={filterContent}
      position='bottom-right'
      className={className}
      contentClassName='mt-2 shadow-2xl tabletM:max-w-[500px] w-full'
      closeOnSelect={false}
    />
  );
};

export default AdvancedFilterDropDown;
