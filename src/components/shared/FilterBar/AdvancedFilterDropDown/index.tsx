'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Dropdown from '@/components/ui/Dropdown';
import CustomSvg from '@/components/ui/CustomSvg';
import FilledButton from '@/components/ui/buttons/FilledButton';
import ExperiencesFilter from './ExperiencesFilter';
import EventsFilter from './EventsFilter';
import StaysFilter from './StaysFilter';
import OffersFilter from './OffersFilter';
import { useTranslation } from '@/contexts/TranslationContext';

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

  const { handleSubmit, reset } = methods;

  // Update form values when defaultValues change
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
  };

  const filterTrigger = (
    <CustomSvg
      src='/SVGs/shared/filter-icon.svg'
      className='!w-[57px] !h-[57px] text-text_2 block'
      width='100%'
      height='100%'
    />
  );

  // Filter content based on filter type
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
    <div className='bg-white rounded-xl shadow-2xl w-full p-6 max-h-[500px] overflow-y-auto'>
      <h3 className='text-lg text-center font-semibold'>
        {t('filter.filter')}
      </h3>
      <hr className='my-4' />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {getFilterContent()}
          <hr className='my-4' />
          <div className='pt-4 flex justify-center gap-4'>
            <button
              type='button'
              onClick={clearAllFilters}
              className='px-6 py-2 underline text-text_2 font-medium rounded-lg  transition-colors text-sm'
            >
              {t('filter.clear-all')}
            </button>

            <FilledButton
              text={t('filter.show-results')}
              buttonType='submit'
              isButton
              className='px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors text-sm '
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );

  return (
    <Dropdown
      trigger={filterTrigger}
      content={filterContent}
      position='bottom-right'
      className={className}
      contentClassName='mt-2 shadow-2xl max-w-[500px] w-full'
    />
  );
};

export default AdvancedFilterDropDown;
