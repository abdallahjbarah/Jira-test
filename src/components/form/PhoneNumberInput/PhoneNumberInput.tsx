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

  const countries: Country[] = getCountries().map((code) => {
    const dialCode = getCountryCallingCode(code as CountryCode);
    return {
      code: code as CountryCode,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
      flag: getFlagEmoji(code),
      dialCode,
    };
  });

  countries.sort((a, b) => a.name.localeCompare(b.name));

  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const dialCode =
      typeof defaultCountry === 'string' && defaultCountry.startsWith('+')
        ? defaultCountry.substring(1)
        : defaultCountry;

    const foundCountry = countries.find(
      (c) => c.dialCode === dialCode || c.code === defaultCountry,
    );
    return foundCountry || countries[0];
  });

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
                className='w-full h-fullSpecial Instructions
The experience will be taken indoors in case of bad weather conditions at the same location.
Not suitable for Handicaps
sustainable, all year long experience
Clients should declare about any food allergies


Cancellation Policy'
                loading='lazy'
              />
            </span>
            <span className='inline-block w-[31px] h-[17px] text-base leading-[17px]'>
              +{selectedCountry.dialCode}
            </span>
            <svg width="12" height="12" viewBox="0 0 16 16" className='text-gray-400'>
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                fill="currentColor" />
            </svg>
          </div>
        </button>

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
