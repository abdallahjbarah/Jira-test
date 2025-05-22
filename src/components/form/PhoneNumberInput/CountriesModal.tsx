import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Country } from './types';

interface CountriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: Country) => void;
  countries: Country[];
  selectedCountry: Country;
  modalTitle: string;
  modalSearchPlaceholder: string;
  countryCodeFieldName: string;
  setValue: (name: string, value: any) => void;
}

const CountriesModal: React.FC<CountriesModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  countries,
  selectedCountry,
  modalTitle,
  modalSearchPlaceholder,
  countryCodeFieldName,
  setValue,
}) => {
  const [countriesData] = useState<Country[]>(countries);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = React.useMemo(() => {
    return countriesData.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery),
    );
  }, [countriesData, searchQuery]);

  console.log(filteredCountries, 'filteredCountries');

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-md rounded-2xl bg-white p-6 animate-fadeIn'>
        {/* Modal Header */}
        <div className='mb-6 flex flex-col items-center'>
          <div className='flex w-full justify-center'>
            <h2 className='w-[114px] h-[24px] text-center font-bold text-[#222222] leading-[24px]'>
              {modalTitle}
            </h2>
          </div>
          <button
            onClick={() => {
              onClose();
              setSearchQuery('');
            }}
            className='absolute right-6 rounded-full p-1 hover:bg-gray-100 transition-colors'
          >
            <XMarkIcon className='h-6 w-6 text-gray-500' />
          </button>
        </div>

        {/* Search Input */}
        <div className='mb-6 flex flex-col items-center'>
          <input
            type='text'
            placeholder={modalSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-[312px] h-[48px] rounded-[24px] border-none bg-white px-4 text-gray-700 shadow-[0px_3px_20px_rgba(0,0,0,0.08)] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[17px] placeholder:text-[#555555] focus:border-[#47C409] focus:outline-none focus:ring-1 focus:ring-[#47C409] transform transition-all hover:shadow-lg'
          />
          <div className='mt-6 h-[1px] w-[312px] bg-[#EEEEEE]'></div>
        </div>

        {/* Countries List */}
        <div className='max-h-[400px] overflow-y-auto'>
          {filteredCountries.map((country, key) => (
            <button
              key={key}
              type='button'
              onClick={() => {
                onSelectCountry(country);
                onClose();
                setSearchQuery('');
                setValue(countryCodeFieldName, country.dialCode);
              }}
              className='flex w-full items-center justify-between px-2 py-3 hover:bg-gray-50 transition-colors'
            >
              <div className='flex items-center gap-3'>
                <span className='inline-block w-5 h-[13px]'>
                  <img
                    src={country.flag}
                    alt={country.code}
                    className='w-5 h-auto'
                    loading='lazy'
                  />
                </span>
                <span className='text-gray-900'>{country.name}</span>
              </div>
              <span className='text-gray-500'>+{country.dialCode}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountriesModal;
