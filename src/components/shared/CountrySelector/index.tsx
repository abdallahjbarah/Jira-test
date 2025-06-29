import React from 'react';
import Select from 'react-select';
import { useFetchCountries } from '@/lib/apis/countries/useFetchCountries';
import { Country } from '@/lib/types';
import { useTranslation } from '@/contexts/TranslationContext';

interface CountrySelectorProps {
  selectedCountry?: string | null;
  onSelectCountry: (country: string | null) => void;
  className?: string;
  placeholder?: string;
}

interface CountryOption {
  value: string;
  label: string;
  country: Country;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
  className = '',
  placeholder,
}) => {
  const { t } = useTranslation();
  const { data: countries = [], isLoading } = useFetchCountries();
  const defaultPlaceholder = placeholder || t('form.searchForCountry');

  const countryOptions: CountryOption[] = countries.map((country) => ({
    value: country._id,
    label: country.name,
    country,
  }));

  const handleChange = (selectedOption: CountryOption | null) => {
    if (selectedOption) {
      onSelectCountry(selectedOption.value);
    } else {
      onSelectCountry(null);
    }
  };

  const currentValue = selectedCountry
    ? countryOptions.find((option) => option.value === selectedCountry)
    : null;

  return (
    <div className={className}>
      <Select
        options={countryOptions}
        value={currentValue}
        onChange={handleChange}
        placeholder={defaultPlaceholder}
        isClearable
        isSearchable
        getOptionValue={(option) => option?.value}
        getOptionLabel={(option) => option?.label}
        isLoading={isLoading}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `${t('form.noCountriesFound')} "${inputValue}"`
            : t('form.noCountriesAvailable')
        }
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '2px solid #10b981' : '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#10b981',
            },
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#9ca3af',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? '#10b981'
              : state.isFocused
                ? '#ecfdf5'
                : 'white',
            color: state.isSelected ? 'white' : '#374151',
            cursor: 'pointer',
          }),
        }}
      />
    </div>
  );
};

export default CountrySelector;
