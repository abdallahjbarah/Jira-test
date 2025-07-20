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

interface LocationFormData {
  country: Continent | null;
  city: City | null;
}

interface LocationSelectionIds {
  country: string | undefined;
  city: number | undefined;
}

interface LocationDropdownProps {
  onChange?: (selection: LocationSelectionIds) => void;
  defaultValues?: LocationSelectionIds;
}

const JORDAN_COUNTRY_ID = '65ed90ca0a83c3332cc3277a';

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  onChange,
  defaultValues,
}) => {
  const { t } = useTranslation();
  const { data: continents } = useFetchContinent();

  const defaultCountry = useMemo(() => {
    if (!defaultValues?.country || !continents) return null;
    return (
      continents.find(continent => continent._id === defaultValues.country) ||
      null
    );
  }, [defaultValues?.country, continents]);

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

  const { data: cities } = useFetchCities(
    selectedCountry?._id === JORDAN_COUNTRY_ID
      ? selectedCountry?.countries[0]._id || ''
      : ''
  );

  const isJordanSelected = useMemo(
    () => selectedCountry?._id === JORDAN_COUNTRY_ID,
    [selectedCountry]
  );

  useEffect(() => {
    if (cities && defaultValues?.city && !selectedCity) {
      const defaultCity = cities.find(city => city.id === defaultValues.city);
      if (defaultCity) {
        setValue('city', defaultCity);
      }
    }
  }, [cities, defaultValues?.city, selectedCity, setValue]);

  useEffect(() => {
    if (defaultCountry && !selectedCountry) {
      setValue('country', defaultCountry);
    }
  }, [defaultCountry, selectedCountry, setValue]);

  const notifyParent = useCallback(
    (country: Continent | null, city: City | null) => {
      onChange?.({
        country: country?._id,
        city: city?.id,
      });
    },
    [onChange]
  );

  const handleCountrySelect = useCallback(
    (continent: Continent) => {
      setValue('country', continent);

      const shouldKeepCity = continent._id === JORDAN_COUNTRY_ID;
      const newCity = shouldKeepCity ? selectedCity : null;

      if (!shouldKeepCity) {
        setValue('city', null);
      }

      notifyParent(continent, newCity);
    },
    [setValue, selectedCity, notifyParent]
  );

  const handleCitySelect = useCallback(
    (city: City) => {
      setValue('city', city);
      notifyParent(selectedCountry, city);
    },
    [setValue, selectedCountry, notifyParent]
  );

  const handleRegionSelect = useCallback(
    (region: Region) => {
      if (!continents) return;

      const continent = continents.find(c => c._id === region);
      if (continent) {
        handleCountrySelect(continent);
      }
    },
    [continents, handleCountrySelect]
  );

  const onSubmit = useCallback(() => {}, []);

  const displayValue = useMemo(() => {
    if (selectedCountry && selectedCity) {
      return `${selectedCountry.nameEn}, ${selectedCity.name}`;
    }
    if (selectedCountry) {
      return selectedCountry.nameEn;
    }
    return t('search.search');
  }, [selectedCountry, selectedCity, t]);

  const dropdownContent = (
    <FormProvider {...locationForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white rounded-xl shadow-lg w-[460px] p-6'>
          <Controller
            name='country'
            control={control}
            rules={{ required: t('validation.pleaseSelectCountry') }}
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

          {isJordanSelected && (
            <Controller
              name='city'
              control={control}
              rules={{
                required: isJordanSelected
                  ? t('validation.pleaseSelectCity')
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
          title={{ en: t('search.where'), ar: t('search.where') }}
          value={displayValue}
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
