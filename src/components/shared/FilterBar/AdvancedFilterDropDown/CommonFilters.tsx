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
import { useFetchPricesRange } from '@/lib/apis/shared/useFetchPricesRange';
import { useFetchLanguages } from '@/lib/apis/shared/useFetchLanguages';
import { useFetchAmenities } from '@/lib/apis/shared/useFetchAmenities';
import { useFetchBookOptions } from '@/lib/apis/shared/useFetchBookOptions';
import { useFetchAccessibilityFeatures } from '@/lib/apis/shared/useFetchAccessibilityFeatures';

const CommonFilters: React.FC = () => {
  const { control } = useFormContext();

  const { data: pricesRange } = useFetchPricesRange();
  const { data: languages } = useFetchLanguages();
  const { data: amenities } = useFetchAmenities();
  const { data: bookOptions } = useFetchBookOptions({
    isStayType: false,
  });
  const { data: accessibilityFeatures } = useFetchAccessibilityFeatures();

  const accessibilityFeaturesList = React.useMemo(() => {
    return (
      accessibilityFeatures?.map((accessibilityFeature) => ({
        value: accessibilityFeature._id,
        label: {
          en: accessibilityFeature.nameEn,
          ar: accessibilityFeature.nameAr,
        },
      })) ?? []
    );
  }, [accessibilityFeatures]);

  const bookOptionsList = React.useMemo(() => {
    return (
      bookOptions?.map((bookOption) => ({
        value: bookOption._id,
        label: { en: bookOption.nameEn, ar: bookOption.nameAr },
      })) ?? []
    );
  }, [bookOptions]);

  const languagesList = React.useMemo(() => {
    return (
      languages?.map((language) => ({
        value: language._id,
        label: { en: language.nameEn, ar: language.nameAr },
      })) ?? []
    );
  }, [languages]);

  const amenitiesList = React.useMemo(() => {
    return (
      amenities?.map((amenity) => ({
        value: amenity._id,
        label: { en: amenity.nameEn, ar: amenity.nameAr },
      })) ?? []
    );
  }, [amenities]);

  return (
    <>
      <Controller
        name='priceRange'
        control={control}
        render={({ field }) => (
          <Collapsible title='Price Range' defaultOpen={true}>
            <RangeSlider
              min={pricesRange?.minPrice ?? 0}
              max={pricesRange?.maxPrice ?? 100}
              value={field.value || [0, 100]}
              onChange={field.onChange}
              currency='$'
            />
          </Collapsible>
        )}
      />

      <Controller
        name='languages'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Language Preference'
            options={languagesList}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='bookagriBadge'
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
            options={amenitiesList}
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
                value={true}
                checked={field.value === true}
                onChange={field.onChange}
              />
              <RadioButton
                id='special-offers-no'
                name='specialOffers'
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
        name='bookOptions'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Booking Options'
            options={bookOptionsList}
            selectedValues={[field.value]}
            onChange={(value) => field.onChange(value[0])}
          />
        )}
      />

      <Controller
        name='accessibilityFeatures'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Accessibility Features'
            options={accessibilityFeaturesList}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
};

export default CommonFilters;
