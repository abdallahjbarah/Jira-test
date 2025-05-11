'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import SearchDropdown from '../SearchDropdown';

interface SearchFormValues {
  region: string;
  location: string;
  type: string;
  dates: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
}

interface SearchContainerProps {
  onSubmit?: (data: SearchFormValues) => void;
  className?: string;
  useExternalForm?: boolean;
  formMapping?: {
    region: string;
    location: string;
    type: string;
    dates: string;
    guests: string;
  };
  useDirectFields?: boolean;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  onSubmit,
  className = '',
  useExternalForm = false,
  formMapping,
  useDirectFields = false,
}) => {
  const methods = useForm<SearchFormValues>({
    defaultValues: {
      region: '',
      location: '',
      type: 'all',
      dates: '',
      guests: {
        adults: 0,
        children: 0,
        infants: 0,
      },
    },
  });

  const handleSubmit = (data: SearchFormValues) => {
    console.log('Search submitted:', data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  // If using external form (e.g. in FilterBar), just render the dropdown
  if (useExternalForm) {
    return (
      <div className={className}>
        <SearchDropdown
          onSubmit={
            onSubmit ? () => onSubmit({} as SearchFormValues) : undefined
          }
          formMapping={formMapping}
          useDirectFields={useDirectFields}
        />
      </div>
    );
  }

  // Otherwise, provide a form context for standalone use
  return (
    <div className={className}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <SearchDropdown
            onSubmit={() => methods.handleSubmit(handleSubmit)()}
            useDirectFields={useDirectFields}
          />
          <button type='submit' className='hidden'>
            Search
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SearchContainer;
