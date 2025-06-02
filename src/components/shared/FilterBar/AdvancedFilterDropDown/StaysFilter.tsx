'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Collapsible from '@/components/ui/Collapsible';
import RadioButton from '@/components/ui/RadioButton';
import CommonFilters from './CommonFilters';
import NumberSelector from './NumberSelector';
import { useTranslation } from '@/contexts/TranslationContext';
import CollectionTypeField from './CollectionTypeField';

const StaysFilter: React.FC = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <>
      <CollectionTypeField />

      <Controller
        name='includesExperience'
        control={control}
        render={({ field }) => (
          <Collapsible title={t('filter.includes-experience')} defaultOpen={true}>
            <div className='space-y-3'>
              <RadioButton
                id='includes-experience-yes'
                name='includesExperience'
                label={t('filter.yes')}
                value={true}
                checked={field.value === true}
                onChange={field.onChange}
              />
              <RadioButton
                id='includes-experience-no'
                name='includesExperience'
                label={t('filter.no')}
                value={false}
                checked={field.value === false}
                onChange={field.onChange}
              />
            </div>
          </Collapsible>
        )}
      />

      <Controller
        name='bedrooms'
        control={control}
        render={({ field }) => (
          <NumberSelector
            title={t('filter.bedrooms')}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='beds'
        control={control}
        render={({ field }) => (
          <NumberSelector
            title={t('filter.beds')}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='bathrooms'
        control={control}
        render={({ field }) => (
          <NumberSelector
            title={t('filter.bathrooms')}
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
