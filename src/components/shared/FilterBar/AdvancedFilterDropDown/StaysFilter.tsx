'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FilterSection from './FilterSection';
import Collapsible from '@/components/ui/Collapsible';
import RadioButton from '@/components/ui/RadioButton';
import CommonFilters from './CommonFilters';
import { EXPERIENCE_TYPES_LIST } from '@/utils/constants';

const StaysFilter: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name='eventType'
        control={control}
        render={({ field }) => (
          <FilterSection
            title='Event Type'
            options={EXPERIENCE_TYPES_LIST}
            selectedValues={field.value}
            onChange={field.onChange}
          />
        )}
      />

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
                value='yes'
                checked={field.value === 'yes'}
                onChange={field.onChange}
              />
              <RadioButton
                id='includes-experience-no'
                name='includesExperience'
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
        name='roomsAndBeds'
        control={control}
        render={({ field }) => (
          <div className='space-y-6'>
            <div>
              <h3 className='font-medium mb-3'>Bedrooms</h3>
              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${field.value.rooms === 'any' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => {
                    const newValue = { ...field.value, rooms: 'any' };
                    field.onChange(newValue);
                  }}
                >
                  Any
                </button>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type='button'
                    className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-medium
                      ${field.value.rooms === num ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => {
                      const newValue = { ...field.value, rooms: num };
                      field.onChange(newValue);
                    }}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type='button'
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${field.value.rooms === '8+' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => {
                    const newValue = { ...field.value, rooms: '8+' };
                    field.onChange(newValue);
                  }}
                >
                  +8
                </button>
              </div>
            </div>

            <div>
              <h3 className='font-medium mb-3'>Beds</h3>
              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${field.value.beds === 'any' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => {
                    const newValue = { ...field.value, beds: 'any' };
                    field.onChange(newValue);
                  }}
                >
                  Any
                </button>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type='button'
                    className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-medium
                      ${field.value.beds === num ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => {
                      const newValue = { ...field.value, beds: num };
                      field.onChange(newValue);
                    }}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type='button'
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${field.value.beds === '8+' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => {
                    const newValue = { ...field.value, beds: '8+' };
                    field.onChange(newValue);
                  }}
                >
                  +8
                </button>
              </div>
            </div>

            <div>
              <h3 className='font-medium mb-3'>Bathrooms</h3>
              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${field.value.bathrooms === 'any' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => {
                    const newValue = { ...field.value, bathrooms: 'any' };
                    field.onChange(newValue);
                  }}
                >
                  Any
                </button>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type='button'
                    className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-medium
                      ${field.value.bathrooms === num ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => {
                      const newValue = { ...field.value, bathrooms: num };
                      field.onChange(newValue);
                    }}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type='button'
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${field.value.bathrooms === '8+' ? 'bg-primary_2 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => {
                    const newValue = { ...field.value, bathrooms: '8+' };
                    field.onChange(newValue);
                  }}
                >
                  +8
                </button>
              </div>
            </div>
          </div>
        )}
      />

      <CommonFilters />
    </>
  );
};

export default StaysFilter;
