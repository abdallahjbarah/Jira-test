import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from 'libphonenumber-js';
import FormInput from '../FormInput';
import CountriesModal from './CountriesModal';
import { Country, PhoneNumberInputProps } from './types';
import { getFlagEmoji } from './utils';

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneFieldName,
  phoneLocalFieldName,
  countryCodeFieldName,
  label = 'Phone Number',
  required = false,
  defaultCountry = 'JO',
  modalTitle = 'Country Key',
  modalSearchPlaceholder = 'Search...',
  error,
}) => {
  const [showCountryModal, setShowCountryModal] = useState(false);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Get all countries and format them
  const countries: Country[] = getCountries().map((code) => {
    const dialCode = getCountryCallingCode(code as CountryCode);
    return {
      code: code as CountryCode,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
      flag: getFlagEmoji(code),
      dialCode,
    };
  });

  // Sort countries by name
  countries.sort((a, b) => a.name.localeCompare(b.name));

  // Set default country
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    // Handle case when defaultCountry is a dial code (e.g. "962" or "+962")
    const dialCode =
      typeof defaultCountry === 'string' && defaultCountry.startsWith('+')
        ? defaultCountry.substring(1)
        : defaultCountry;

    const foundCountry = countries.find(
      (c) => c.dialCode === dialCode || c.code === defaultCountry,
    );
    return foundCountry || countries[0];
  });

  // Initialize the country code field on mount
  useEffect(() => {
    setValue(countryCodeFieldName, selectedCountry.dialCode);
  }, [countryCodeFieldName, selectedCountry.dialCode, setValue]);

  return (
    <div className='flex gap-2 justify-center w-full'>
      <div className='relative w-[98px]'>
        <button
          type='button'
          onClick={() => setShowCountryModal(true)}
          className='flex h-[48px] w-full items-center justify-between rounded-[8px] border-[2px] border-solid border-[#EEEEEE] bg-white pl-2 pr-4 text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-md hover:border-[#47C409]'
        >
          <div className='flex items-center gap-2'>
            <span className='inline-block w-5 h-[13px]'>
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.code}
                className='w-5 h-auto'
                loading='lazy'
              />
            </span>
            <span className='inline-block w-[31px] h-[17px] text-base leading-[17px]'>
              +{selectedCountry.dialCode}
            </span>
          </div>
        </button>

        {/* Use the CountriesModal component */}
        <CountriesModal
          isOpen={showCountryModal}
          onClose={() => setShowCountryModal(false)}
          onSelectCountry={setSelectedCountry}
          countries={countries}
          selectedCountry={selectedCountry}
          modalTitle={modalTitle}
          modalSearchPlaceholder={modalSearchPlaceholder}
          countryCodeFieldName={countryCodeFieldName}
          setValue={setValue}
        />
      </div>
      <div className='flex-1'>
        <Controller
          control={control}
          name={phoneLocalFieldName}
          render={({ field }) => (
            <FormInput
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setValue(phoneLocalFieldName, value);
              }}
              id={phoneLocalFieldName}
              label={label}
              error={error || (errors[phoneFieldName]?.message as string)}
              className='w-full h-[48px] bg-white px-4 py-3 text-gray-700 placeholder:h-[17px] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#47C409] border-[1px] border-[#EEEEEE] hover:border-[#47C409]'
            />
          )}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
