'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';
import RegionSelector, { Region } from '../RegionSelector';
import { useFetchContinent } from '@/lib/apis/shared/useFetchContinent';
import { useFetchCities } from '@/lib/apis/countries/useFetchCountriesCities';
import { Continent, City } from '@/lib/types';
import { useTranslation } from '@/contexts/TranslationContext';

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

// Constants
const JORDAN_COUNTRY_ID = '65ed90ca0a83c3332cc3277a';

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  onChange,
  defaultValues,
}) => {
  const { t } = useTranslation();
  const { data: continents } = useFetchContinent();

  // Memoized default country lookup
  const defaultCountry = useMemo(() => {
    if (!defaultValues?.country || !continents) return null;
    return (
      continents.find((continent) => continent._id === defaultValues.country) ||
      null
    );
  }, [defaultValues?.country, continents]);

  // Initialize React Hook Form
  const locationForm = useForm<LocationFormData>({
    defaultValues: {
      country: defaultCountry,
      city: null,
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

  // Fetch cities only for Jordan continent
  const { data: cities } = useFetchCities(
    selectedCountry?._id === JORDAN_COUNTRY_ID
      ? selectedCountry?.countries[0]._id || ''
      : '',
  );

  // Check if the selected continent is Jordan
  const isJordanSelected = useMemo(
    () => selectedCountry?._id === JORDAN_COUNTRY_ID,
    [selectedCountry],
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

  // Update default country when continents are loaded
  useEffect(() => {
    if (defaultCountry && !selectedCountry) {
      setValue('country', defaultCountry);
    }
  }, [defaultCountry, selectedCountry, setValue]);

  // Notify parent component of changes
  const notifyParent = useCallback(
    (country: Continent | null, city: City | null) => {
      onChange?.({
        country: country?._id,
        city: city?.id,
      });
    },
    [onChange],
  );

  // Handle country selection
  const handleCountrySelect = useCallback(
    (continent: Continent) => {
      setValue('country', continent);

      // Clear city if not Jordan, keep city if Jordan
      const shouldKeepCity = continent._id === JORDAN_COUNTRY_ID;
      const newCity = shouldKeepCity ? selectedCity : null;

      if (!shouldKeepCity) {
        setValue('city', null);
      }

      notifyParent(continent, newCity);
    },
    [setValue, selectedCity, notifyParent],
  );

  // Handle city selection
  const handleCitySelect = useCallback(
    (city: City) => {
      setValue('city', city);
      notifyParent(selectedCountry, city);
    },
    [setValue, selectedCountry, notifyParent],
  );

  // Handle region selection (for RegionSelector compatibility)
  const handleRegionSelect = useCallback(
    (region: Region) => {
      if (!continents) return;

      const continent = continents.find((c) => c._id === region);
      if (continent) {
        handleCountrySelect(continent);
      }
    },
    [continents, handleCountrySelect],
  );

  // Form submission handler (currently not used)
  const onSubmit = useCallback(() => {
    // Form submission is handled by individual field changes
  }, []);

  // Generate display value for the trigger
  const displayValue = useMemo(() => {
    if (selectedCountry && selectedCity) {
      return `${selectedCountry.nameEn}, ${selectedCity.name}`;
    }
    if (selectedCountry) {
      return selectedCountry.nameEn;
    }
    return t('search-destinations');
  }, [selectedCountry, selectedCity, t]);

  // Dropdown content
  const dropdownContent = (
    <FormProvider {...locationForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white rounded-xl shadow-lg w-[460px] p-6'>
          {/* Country Selection */}
          <Controller
            name='country'
            control={control}
            rules={{ required: 'Please select a country' }}
            render={({ field }) => (
              <div className='mb-6'>
                <RegionSelector
                  selectedRegion={field.value?._id as Region}
                  onSelectRegion={handleRegionSelect}
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

          {/* City Selection - Only show for Jordan */}
          {isJordanSelected && (
            <Controller
              name='city'
              control={control}
              rules={{
                required: isJordanSelected ? 'Please select a city' : false,
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
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${field.value?.id === city.id
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
          title={{ en: t('where'), ar: t('where') }}
          value={displayValue}
          onClick={() => { }}
        />
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
    />
  );
};

export default LocationDropdown;
