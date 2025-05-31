import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import DateRangePicker from '../DateRangePicker';
import GuestSelector from '../GuestSelector';
import RegionSelector from '../RegionSelector';
import CountrySelector from '../CountrySelector';
import Collapsible from '@/components/ui/Collapsible';

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
  const methods = useForm<SearchFormData>({
    defaultValues: {
      location: initialValues.country || null,
      country: initialValues.country || null,
      checkInAndOut: [
        initialValues.checkinTime ? new Date(initialValues.checkinTime) : null,
        initialValues.checkoutTime
          ? new Date(initialValues.checkoutTime)
          : null,
      ] as Date[] | null,
      checkinTime: initialValues.checkinTime || '',
      checkoutTime: initialValues.checkoutTime || '',
      guests: {
        adults: initialValues.adults || 0,
        children: initialValues.children || 0,
        infants: initialValues.infants || 0,
      },
    },
  });

  console.log('Initial values: ', initialValues);

  const processingDate = React.useRef(false);

  const selectedLocationCountry = methods.watch('location');

  const getSelectedDates = (): Date[] => {
    const values = methods.getValues();
    const checkinTime = values.checkinTime;
    const checkoutTime = values.checkoutTime;
    const dateArray: Date[] = [];

    if (checkinTime) {
      try {
        dateArray.push(new Date(checkinTime));
      } catch (e) {
        console.error('Error parsing checkinTime date:', e);
      }
    }

    if (checkoutTime) {
      try {
        dateArray.push(new Date(checkoutTime));
      } catch (e) {
        console.error('Error parsing checkoutTime date:', e);
      }
    }

    return dateArray;
  };

  const handleDateChange = (dates: Date[], onChange: (value: any) => void) => {
    if (processingDate.current) return;
    processingDate.current = true;

    const currentDates = getSelectedDates();
    if (currentDates.length === 2 && dates.length === 1) {
      processingDate.current = false;
      return;
    }

    if (dates.length > 0) {
      methods.setValue('checkinTime', dates[0].toISOString().split('T')[0]);
      if (dates.length > 1) {
        methods.setValue('checkoutTime', dates[1].toISOString().split('T')[0]);
      } else {
        methods.setValue('checkoutTime', '');
      }
      onChange(dates[0].toISOString().split('T')[0]);
    } else {
      methods.setValue('checkinTime', '');
      methods.setValue('checkoutTime', '');
      onChange('');
    }

    processingDate.current = false;
  };

  const onFormSubmit = (data: SearchFormData) => {
    console.log('Submit data: ', data);
    onSubmit({
      country: data.country,
      checkinTime: data.checkinTime,
      checkoutTime: data.checkoutTime,
      adults: data.guests.adults,
      children: data.guests.children,
      infants: data.guests.infants,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)}>
        <div className='bg-white rounded-xl shadow-lg w-[600px] p-6 space-y-2'>
          <Collapsible
            title='Where'
            defaultOpen={true}
            titleClassName='!text-custom-24'
            contentClassName='!mt-6'
          >
            <div className='mb-3'>
              <Controller
                name='location'
                control={methods.control}
                render={({ field }) => (
                  <CountrySelector
                    selectedCountry={field.value}
                    onSelectCountry={(country) => {
                      field.onChange(country);
                      methods.setValue('country', country);
                    }}
                    placeholder='Search for a country...'
                  />
                )}
              />
            </div>

            {/* Only show RegionSelector if no country is selected */}
            {!selectedLocationCountry && (
              <Controller
                name='country'
                control={methods.control}
                render={({ field }) => (
                  <RegionSelector
                    continents={continents}
                    selectedRegion={field.value}
                    onSelectRegion={(region) => field.onChange(region)}
                    className='mt-4'
                  />
                )}
              />
            )}
          </Collapsible>

          <Collapsible
            title='When'
            defaultOpen={true}
            titleClassName='!text-custom-24'
            contentClassName='!mt-6'
          >
            <Controller
              name='checkInAndOut'
              control={methods.control}
              render={({ field }) => (
                <DateRangePicker
                  selectedDates={getSelectedDates()}
                  onChange={(dates) => handleDateChange(dates, field.onChange)}
                  mode={'range'}
                  className='max-w-full p-0 shadow-none'
                />
              )}
            />
          </Collapsible>

          <Collapsible
            title='Who'
            defaultOpen={true}
            titleClassName='!text-custom-24'
            contentClassName='!mt-6'
          >
            <Controller
              name='guests'
              control={methods.control}
              render={({ field }) => (
                <GuestSelector
                  onGuestChange={(guests) => field.onChange(guests)}
                  initialValues={field.value}
                  className='shadow-none w-full p-0'
                />
              )}
            />
          </Collapsible>

          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors'
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SearchDropdownContent;
