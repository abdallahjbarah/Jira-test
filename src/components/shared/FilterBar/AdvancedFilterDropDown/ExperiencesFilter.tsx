'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FilterSection from './FilterSection';
import CommonFilters from './CommonFilters';
import {
  EXPERIENCE_TYPES_LIST,
  TIME_OF_DAY_LIST,
  DURATION_TYPES_LIST,
  AGE_SUITABILITY_LIST,
  EXPERIENCE_LEVEL_LIST,
} from '@/utils/constants';
import { useFetchExperienceType } from '@/lib/apis/shared/useFetchExperienceType';
import CollectionTypeField from './CollectionTypeField';

const ExperiencesFilter: React.FC = () => {
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
        name='duration'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Experience Duration'
            options={DURATION_TYPES_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='ageSuitability'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Age Suitability'
            options={AGE_SUITABILITY_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='levelOfDifficulty'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Experience Level'
            options={EXPERIENCE_LEVEL_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <CommonFilters />
    </>
  );
};

export default ExperiencesFilter;
