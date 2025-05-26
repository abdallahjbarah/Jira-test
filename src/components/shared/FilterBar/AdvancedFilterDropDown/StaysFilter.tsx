'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Collapsible from '@/components/ui/Collapsible';
import RadioButton from '@/components/ui/RadioButton';
import CommonFilters from './CommonFilters';
import NumberSelector from './NumberSelector';
import CollectionTypeField from './CollectionTypeField';

const StaysFilter: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <CollectionTypeField />

      <Controller
        name='includesExperience'
        control={control}
        render={({ field }) => (
          <Collapsible title='Includes Experience' defaultOpen={true}>
            <div className='space-y-3'>
              <RadioButton
                id='includes-experience-yes'
                name='includesExperience'
                label='Yes'
                value={true}
                checked={field.value === true}
                onChange={field.onChange}
              />
              <RadioButton
                id='includes-experience-no'
                name='includesExperience'
                label='No'
                value={false}
                checked={field.value === false}
                onChange={field.onChange}
              />
            </div>
          </Collapsible>
        )}
      />

      <Controller
        name='numberOfBedrooms'
        control={control}
        render={({ field }) => (
          <NumberSelector
            title='Bedrooms'
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='numberOfBeds'
        control={control}
        render={({ field }) => (
          <NumberSelector
            title='Beds'
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='numberOfBathrooms'
        control={control}
        render={({ field }) => (
          <NumberSelector
            title='Bathrooms'
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <CommonFilters />
    </>
  );
};

export default StaysFilter;
