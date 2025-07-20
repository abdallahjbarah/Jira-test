import React from 'react';
import { useFormContext } from 'react-hook-form';
import DateRangePicker from '../DateRangePicker';
import GuestSelector from '../GuestSelector';
import Collapsible from '@/components/ui/Collapsible';
import { useTranslation } from '@/contexts/TranslationContext';
import { FilterFormValues } from '@/utils/helpers/filterHelpers';
import { useFetchSearchDestination } from '@/lib/apis/shared/useFetchSearchDestination';
import SearchInput from '../FilterBar/SearchInput';

interface SearchFormData {
  location: string | null;
  country: any;
  checkInAndOut: any;
  checkinTime: string;
  checkoutTime: string;
  guests: any;
}

interface SubmitData
  extends Omit<SearchFormData, 'location' | 'checkInAndOut' | 'guests'> {
  adults: number;
  children: number;
  infants: number;
  city?: number | string;
}

interface SearchDropdownContentProps {
  continents: any;
  onSubmit: (data: SubmitData) => void;
  initialValues?: Partial<SubmitData>;
}

const SearchDropdownContent: React.FC<SearchDropdownContentProps> = ({
  continents,
  onSubmit,
  initialValues = {},
}) => {
  const { t } = useTranslation();

  const { watch, setValue, getValues } = useFormContext<FilterFormValues>();
  const filtersValue = watch('filters');

  const processingDate = React.useRef(false);
  const [searchText, setSearchText] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);

  const { data: searchDestinationData, isLoading: isSearchLoading } =
    useFetchSearchDestination(searchText || '');

  const [showSearchResults, setShowSearchResults] = React.useState(false);

  const handleSearchDestinationTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearchResultSelect = (result: any) => {
    const { searchType } = result;

    if (searchType === 'site') {
      window.location.href = `/${window.location.pathname.split('/')[1] || 'en'}/details/${result._id}`;
    } else {
      const currentFilters = getValues('filters') || {};
      const updatedFilters = { ...currentFilters };

      if (searchType === 'city') {
        const cityValue = result.city;
        updatedFilters.city = cityValue;
        updatedFilters.country = result.countryId;
      } else if (searchType === 'country') {
        updatedFilters.country = result._id;
        delete updatedFilters.city;
      }

      setValue('filters', updatedFilters, { shouldValidate: true });
    }

    setShowSearchResults(false);
    setSearchText('');
  };

  const getSelectedDates = (): Date[] => {
    const checkinTime = filtersValue?.checkinTime;
    const checkoutTime = filtersValue?.checkoutTime;
    const dateArray: Date[] = [];

    if (checkinTime) {
      try {
        dateArray.push(new Date(checkinTime));
      } catch (e) {}
    }

    if (checkoutTime) {
      try {
        dateArray.push(new Date(checkoutTime));
      } catch (e) {}
    }

    return dateArray;
  };

  const handleDateChange = (dates: Date[]) => {
    if (processingDate.current) return;
    processingDate.current = true;

    const currentDates = getSelectedDates();
    if (currentDates.length === 2 && dates.length === 1) {
      processingDate.current = false;
      return;
    }

    const currentFilters = getValues('filters') || {};
    const updatedFilters = { ...currentFilters };

    if (dates.length > 0) {
      updatedFilters.checkinTime = dates[0].toISOString().split('T')[0];
      if (dates.length > 1) {
        updatedFilters.checkoutTime = dates[1].toISOString().split('T')[0];
      } else {
        updatedFilters.checkoutTime = '';
      }
    } else {
      updatedFilters.checkinTime = '';
      updatedFilters.checkoutTime = '';
    }

    setValue('filters', updatedFilters, { shouldValidate: false });
    processingDate.current = false;
  };

  const onFormSubmit = () => {
    const currentFilters = getValues('filters') || {};
    setIsSearching(true);

    onSubmit({
      country: currentFilters.country,
      city: currentFilters.city,
      checkinTime: currentFilters.checkinTime || '',
      checkoutTime: currentFilters.checkoutTime || '',
      adults: currentFilters.adults || 0,
      children: currentFilters.children || 0,
      infants: currentFilters.infants || 0,
    });

    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleGuestChange = (guests: any) => {
    const currentFilters = getValues('filters') || {};
    const updatedFilters = {
      ...currentFilters,
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
    };

    setValue('filters', updatedFilters, { shouldValidate: false });
  };

  return (
    <div className='bg-white rounded-xl shadow-lg w-full tabletM:w-[600px] p-6 space-y-2 max-h-[400px] overflow-y-auto'>
      <div className='block tabletM:hidden mb-4'>
        <SearchInput
          value={filtersValue?.destinationText || ''}
          onChange={value => {
            if (!value) {
              const currentFilters = getValues('filters') || {};
              const updatedFilters = {
                ...currentFilters,
                country: undefined,
                city: undefined,
              };
              setValue('filters', updatedFilters, { shouldValidate: false });
              return;
            }

            try {
              const filterData = JSON.parse(value);
              const currentFilters = getValues('filters') || {};
              const updatedFilters = {
                ...currentFilters,
                ...filterData,
              };
              setValue('filters', updatedFilters, { shouldValidate: false });
            } catch (e) {}
          }}
        />
      </div>

      {(!filtersValue?.checkinTime || !filtersValue?.checkoutTime) && (
        <Collapsible
          title={t('search.when')}
          defaultOpen={true}
          titleClassName='!text-custom-24'
          contentClassName='!mt-6'
        >
          <DateRangePicker
            selectedDates={getSelectedDates()}
            onChange={handleDateChange}
            mode={'range'}
            className='max-w-full p-0 shadow-none'
          />
        </Collapsible>
      )}

      {(!filtersValue?.adults || filtersValue?.adults === 0) &&
        (!filtersValue?.children || filtersValue?.children === 0) &&
        (!filtersValue?.infants || filtersValue?.infants === 0) && (
          <Collapsible
            title={t('search.who')}
            defaultOpen={true}
            titleClassName='!text-custom-24'
            contentClassName='!mt-6'
          >
            <GuestSelector
              onGuestChange={handleGuestChange}
              initialValues={{
                adults: filtersValue?.adults || 0,
                children: filtersValue?.children || 0,
                infants: filtersValue?.infants || 0,
              }}
              className='shadow-none w-full p-0'
            />
          </Collapsible>
        )}

      <div className='pt-4'>
        <button
          type='button'
          onClick={onFormSubmit}
          className='w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isSearching}
        >
          {isSearching ? t('searchResults.searching') : t('search.search')}
        </button>
      </div>
    </div>
  );
};

export default SearchDropdownContent;
