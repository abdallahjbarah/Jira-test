'use client';

import CustomSvg from '@/components/ui/CustomSvg';
import Dropdown from '@/components/ui/Dropdown';
import FilledButton from '@/components/ui/buttons/FilledButton';
import { useTranslation } from '@/contexts/TranslationContext';
import React, { useRef } from 'react';
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

  const { handleSubmit, reset } = methods;

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: any) => {
    onFilterApply?.(data);
  };

  const clearAllFilters = () => {
    reset();
    onFilterClear?.();
    // Scroll to top of the dropdown content
    if (dropdownContentRef.current) {
      dropdownContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const filterTrigger = (
    <CustomSvg
      src='/SVGs/shared/filter-icon.svg'
      className='!w-[57px] !h-[57px] text-text_2 block'
      width='100%'
      height='100%'
    />
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
      <div ref={dropdownContentRef} className='p-6 max-h-[calc(80vh-80px)] tabletM:max-h-[calc(500px-80px)] overflow-y-auto'>
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
            onClick={handleSubmit(onSubmit)}
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
