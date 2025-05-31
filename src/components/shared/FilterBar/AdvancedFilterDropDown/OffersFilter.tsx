'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FilterSection from './FilterSection';
import CommonFilters from './CommonFilters';
import { PACKAGE_DURATION_LIST, TIME_OF_DAY_LIST } from '@/utils/constants';
import CollectionTypeField from './CollectionTypeField';

const OffersFilter: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <CollectionTypeField />

      <Controller
        name='timeOfDay'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Time of Day'
            options={TIME_OF_DAY_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='packageDuration'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Package Duration'
            options={PACKAGE_DURATION_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <CommonFilters />
    </>
  );
};

export default OffersFilter;
