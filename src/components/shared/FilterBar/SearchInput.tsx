import Select from 'react-select';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ExperienceIcon from 'public/images/shared/experience.png';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import debounce from '@/utils/helpers/debounce';
import { useTranslation } from '@/contexts/TranslationContext';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState(value);
  const [debouncedInput, setDebouncedInput] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<{
    label: string;
    value: string;
    data?: any;
  } | null>(value ? { label: value, value } : null);

  const debouncedSetInput = React.useCallback(
    debounce((value: string) => {
      setDebouncedInput(value);
    }, 300),
    []
  );

  React.useEffect(() => {
    debouncedSetInput(inputValue);
  }, [inputValue, debouncedSetInput]);

  const { data: searchData, isLoading } =
    useFetchSearchDestination(debouncedInput);

  const options = React.useMemo(() => {
    if (!searchData?.results) return [];

    return searchData.results.map((item: any) => {
      let label = '';
      if (item.searchType === 'site') {
        label = item.name;
      } else if (item.searchType === 'city') {
        label = item.city;
      } else if (item.searchType === 'country') {
        label = item.country;
      }

      return {
        label,
        value: label,
        data: item,
      };
    });
  }, [searchData?.results]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setIsMenuOpen(newValue.length > 0);
  };

  const handleChange = (option: any) => {
    if (option) {
      if (option.data.searchType === 'site') {
        router.push(`/details/${option.data._id}`);
        setIsMenuOpen(false);
        return;
      }

      setInputValue(option.label);
      setSelectedOption(option);

      if (option.data.searchType === 'country') {
        onChange(
          JSON.stringify({
            country: option.data._id,
            startDateTime: undefined,
            endDateTime: undefined,
            adults: 0,
            children: 0,
            infants: 0,
          })
        );
      } else if (option.data.searchType === 'city') {
        onChange(
          JSON.stringify({
            city: option.data.city,
            country: option.data.countryId,
            startDateTime: undefined,
            endDateTime: undefined,
            adults: 0,
            children: 0,
            infants: 0,
          })
        );
      }

      setIsMenuOpen(false);
    } else {
      setInputValue('');
      setSelectedOption(null);
      onChange('');
      setIsMenuOpen(false);
    }
  };

  const handleFocus = () => {
    if (inputValue.length > 0 && options.length > 0) {
      setIsMenuOpen(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  const customOption = ({ innerProps, data, innerRef }: any) => (
    <div
      ref={innerRef}
      {...innerProps}
      className={`w-full text-left px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-100 ${
        locale === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      <div
        className={`flex items-center ${
          locale === 'ar' ? 'justify-end' : 'justify-between'
        }`}
      >
        <div className='flex flex-col items-center gap-2'>
          <div
            className={`flex items-center gap-2 ${
              locale === 'ar' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Image
              src={ExperienceIcon}
              alt='Experience'
              width={24}
              height={24}
              className='min-w-6 min-h-6'
            />
            <div className='text-sm text-gray-500 flex flex-col gap-1'>
              <div className='font-medium text-gray-900'>
                {data.data.searchType === 'site' && data.data.name}
                {data.data.searchType === 'city' && data.data.city}
                {data.data.searchType === 'country' && data.data.country}
              </div>
              {data.data.searchType === 'site' && (
                <>
                  {data.data.type} - {data.data.city}
                </>
              )}
              {data.data.searchType === 'city' && (
                <>
                  {t('regions.city')} - {data.data.country}
                </>
              )}
            </div>
          </div>
        </div>
        <div className='text-xs text-gray-400 capitalize'>
          {data.data.searchType}
        </div>
      </div>
    </div>
  );

  const noOptionsMessage = ({ inputValue }: { inputValue: string }) => {
    if (isLoading) return t('searchResults.searching') || 'Searching...';
    if (inputValue.length === 0) return t('searchResults.startTypingToSearch');
    return t('searchResults.noResults');
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isLoading={isLoading}
      isClearable
      placeholder={t('search.search')}
      components={{ Option: customOption }}
      className='w-full'
      classNamePrefix='search-select'
      noOptionsMessage={noOptionsMessage}
      menuIsOpen={isMenuOpen}
      openMenuOnFocus={false}
      openMenuOnClick={false}
      styles={{
        control: base => ({
          ...base,
          minHeight: '48px',
          width: '200px',
          borderRadius: '9999px',
          borderColor: '#D1D5DB',
          direction: locale === 'ar' ? 'rtl' : 'ltr',
          '&:hover': {
            borderColor: '#9CA3AF',
          },
        }),
        menu: base => ({
          ...base,
          width: '300px',
          zIndex: 50,
          direction: locale === 'ar' ? 'rtl' : 'ltr',
        }),
        dropdownIndicator: base => ({
          ...base,
          display: 'none',
        }),
        indicatorSeparator: base => ({
          ...base,
          display: 'none',
        }),
      }}
    />
  );
};

export default SearchInput;
