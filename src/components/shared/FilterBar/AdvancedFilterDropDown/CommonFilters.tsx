'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Collapsible from '@/components/ui/Collapsible';
import RangeSlider from '@/components/ui/RangeSlider';
import RadioButton from '@/components/ui/RadioButton';
import FilterSection from './FilterSection';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import {
  LANGUAGE_PREFERENCES_LIST,
  AMENITIES_LIST,
  ACCESSIBILITY_FEATURES_LIST,
  BOOKING_OPTIONS_LIST,
} from '@/utils/constants';
import CustomSvg from '@/components/ui/CustomSvg';

const CommonFilters: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name='priceRange'
        control={control}
        render={({ field }) => (
          <Collapsible title='Price Range' defaultOpen={true}>
            <RangeSlider
              min={0}
              max={100}
              value={field.value}
              onChange={field.onChange}
              currency='$'
            />
          </Collapsible>
        )}
      />

      <Controller
        name='language'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Language Preference'
            options={LANGUAGE_PREFERENCES_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='bookingVerified'
        control={control}
        render={({ field }) => (
          <Collapsible
            title='Booking! Verified'
            defaultOpen={true}
            titleClassName='text-text_2 !font-custom-700'
          >
            <div className='flex items-center justify-between'>
              <div>
                <CustomSvg
                  src='/SVGs/shared/bookagri-gold.svg'
                  className='w-[10px] h-[10px] text-gold_1'
                  width={85}
                  height={38}
                />
              </div>
              <ToggleSwitch checked={field.value} onChange={field.onChange} />
            </div>
          </Collapsible>
        )}
      />

      <Controller
        name='amenities'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Available Amenities'
            options={AMENITIES_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='specialOffers'
        control={control}
        render={({ field }) => (
          <Collapsible title='Special Offers' defaultOpen={true}>
            <div className='space-y-3'>
              <RadioButton
                id='special-offers-yes'
                name='specialOffers'
                label='Yes'
                value='yes'
                checked={field.value === 'yes'}
                onChange={field.onChange}
              />
              <RadioButton
                id='special-offers-no'
                name='specialOffers'
                label='No'
                value='no'
                checked={field.value === 'no'}
                onChange={field.onChange}
              />
            </div>
          </Collapsible>
        )}
      />

      <Controller
        name='bookingOptions'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Booking Options'
            options={BOOKING_OPTIONS_LIST}
            selectedValues={[field.value]}
            onChange={(value) => field.onChange(value[0])}
          />
        )}
      />

      <Controller
        name='accessibility'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Accessibility Features'
            options={ACCESSIBILITY_FEATURES_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
};

export default CommonFilters;
