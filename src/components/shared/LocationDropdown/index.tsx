'use client';

import React, { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';
import RegionSelector from '../RegionSelector';
import { useFetchContinent } from '@/lib/apis/shared/useFetchContinent';
import { useFetchCities } from '@/lib/apis/countries/useFetchCountriesCities';
import { Continent, City } from '@/lib/types';

// Form data interface
interface LocationFormData {
  country: Continent | null;
  city: City | null;
}

// Interface for the data passed to/from parent (only IDs)
interface LocationSelectionIds {
  country: string | undefined;
  city: number | undefined;
}

interface LocationDropdownProps {
  onChange?: (selection: LocationSelectionIds) => void;
  defaultValues?: LocationSelectionIds;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  onChange,
  defaultValues,
}) => {
  const { data: continents } = useFetchContinent();

  // Find default continent and city objects from IDs
  const defaultCountry = defaultValues?.country
    ? continents?.find((continent) => continent._id === defaultValues.country)
    : null;

  // Initialize React Hook Form
  const locationForm = useForm<LocationFormData>({
    defaultValues: {
      country: defaultCountry || null,
      city: null, // Will be set after cities are fetched
    },
    mode: 'onChange',
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = locationForm;

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const { data: cities } = useFetchCities(
    selectedCountry?.countries[0]._id || '',
  );

  // Set default city when cities are loaded and we have a default city ID
  useEffect(() => {
    if (cities && defaultValues?.city && !selectedCity) {
      const defaultCity = cities.find((city) => city.id === defaultValues.city);
      if (defaultCity) {
        setValue('city', defaultCity);
      }
    }
  }, [cities, defaultValues?.city, selectedCity, setValue]);

  const onSubmit = () => {
    // Form submission is handled by individual field changes
  };

  const notifyParent = (country: Continent | null, city: City | null) => {
    if (onChange) {
      onChange({
        country: country?._id,
        city: city?.id,
      });
    }
  };

  const handleCountrySelect = (continent: Continent) => {
    setValue('country', continent);
    const newCity =
      continent?.countries[0]._id !== '65ed90ca0a83c3332cc3277a'
        ? null
        : selectedCity;
    if (continent?.countries[0]._id !== '65ed90ca0a83c3332cc3277a') {
      setValue('city', null);
    }
    notifyParent(continent, newCity);
  };

  const handleCitySelect = (city: City) => {
    setValue('city', city);
    notifyParent(selectedCountry, city);
  };

  const dropdownContent = (
    <FormProvider {...locationForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white rounded-xl shadow-lg w-[460px] p-6'>
          <Controller
            name='country'
            control={control}
            rules={{ required: 'Please select a country' }}
            render={({ field }) => (
              <div className='mb-6'>
                <RegionSelector
                  selectedContinent={field.value}
                  onSelectContinent={(continent) => {
                    field.onChange(continent);
                    handleCountrySelect(continent);
                  }}
                  continents={continents}
                  className='mb-2'
                />
                {errors.country && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.country.message}
                  </p>
                )}
              </div>
            )}
          />

          {selectedCountry?.countries[0]._id === '65ed90ca0a83c3332cc3277a' && (
            <Controller
              name='city'
              control={control}
              rules={{
                required:
                  selectedCountry?.countries[0]._id ===
                  '65ed90ca0a83c3332cc3277a'
                    ? 'Please select a city'
                    : false,
              }}
              render={({ field }) => (
                <div className='mb-6'>
                  <div className='flex flex-wrap gap-2'>
                    {cities?.map((city: City) => (
                      <button
                        key={city.id}
                        type='button'
                        onClick={() => {
                          field.onChange(city);
                          handleCitySelect(city);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          field.value?.id === city.id
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                  {errors.city && (
                    <p className='text-red-500 text-sm mt-2'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );

  return (
    <Dropdown
      trigger={
        <FilterBarItem
          title={{ en: 'Where', ar: 'الوجهة' }}
          value={
            selectedCountry && selectedCity
              ? `${selectedCountry.nameEn}, ${selectedCity.name}`
              : selectedCountry
                ? selectedCountry.nameEn
                : 'Search destinations'
          }
          onClick={() => {}}
        />
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
    />
  );
};

export default LocationDropdown;
