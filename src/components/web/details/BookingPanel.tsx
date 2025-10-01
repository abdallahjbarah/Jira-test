import { Input } from '@/components/form/Input';
import DatePickerDropdown from '@/components/shared/DatePickerDropdown';
import GuestFilterItem from '@/components/shared/GuestFilterItem';
import CircularLoader from '@/components/ui/CircularLoader';
import { useTranslation } from '@/contexts/TranslationContext';
import { useBookingData } from '@/hooks/useBookingData';
import { useFetchAvailabilitySlots } from '@/lib/apis/availabilitiesSlots/useFetchAvailabilitiesSlots';
import { useFetchAvailabilityStaySlots } from '@/lib/apis/availabilitiesSlots/useFetchAvailabilitiesStay';
import { fetchAllowedGuests } from '@/lib/apis/details/useFetchAllowedGuests';
import { PricingInformation } from '@/lib/types';
import { useQueryClient } from '@tanstack/react-query';
import { Locale } from '@utils/constants';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { WretchError } from 'wretch';
import useCurrency from '../../../utils/hooks/useCurrency';
import TimeSlotCard from './TimeSlotCard';

interface BookingPanelProps {
  params: {
    lang: Locale;
    id: string;
  };
  bookabl?: boolean;
  type?: string;
  name?: string;
  schedule?: {
    startDateTime: number;
    endDateTime: number;
    days: {
      name: string;
      slots?: {
        startTime: string;
        id: string;
      }[];
    }[];
    unavailbleDates?: number[];
  };
  pricingInformation: PricingInformation[];
}

interface GroupedSlots {
  [key: string]: {
    date: Date;
    slots: Array<{
      startDateTime: number;
      endDateTime: number;
      slotId: string;
      isFullyBooked: boolean;
      _id: string;
      startDateTimeZoned?: string;
      endDateTimeZoned?: string;
    }>;
  };
}

const BookingPanel: React.FC<BookingPanelProps> = ({
  schedule,
  params,
  type,
  name,
  pricingInformation,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setBookingData } = useBookingData();
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [searchDates, setSearchDates] = useState<{
    startDateTime?: number;
    endDateTime?: number;
  }>({});
  const [guests, setGuests] = useState<{
    adults: number;
    children: number;
    infants: number;
  }>({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const availabilitySlotsQuery = useFetchAvailabilitySlots({
    siteId: params.id,
    ...searchDates,
  });

  const availabilityStaySlotsQuery = useFetchAvailabilityStaySlots({
    siteId: params.id,
    ...searchDates,
  });

  const { data: availabilitySlots, isLoading: isLoadingAvailabilitySlots } =
    type === 'Stay'
      ? { data: undefined, isLoading: false }
      : availabilitySlotsQuery;

  const {
    data: availabilityStaySlots,
    isLoading: isLoadingAvailabilityStaySlots,
  } =
    type === 'Stay'
      ? availabilityStaySlotsQuery
      : { data: undefined, isLoading: false };

  const getAllowedGuests = async (slotIds?: string[], selectedSlot?: any) => {
    try {
      const response = await fetchAllowedGuests({
        siteId: params.id,
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        availabilityIds:
          type === 'Stay'
            ? availabilityStaySlots?.data?.availabilitiesIds?.slice(0, -1)
            : slotIds,
      });

      if (response.data > 0) {
        const bookingData = {
          siteId: params.id,
          guests: {
            adults: guests.adults,
            children: guests.children,
            infants: guests.infants,
          },
          dates: selectedDates,
          price: priceAdultString,
          allowedGuests: response.data,
          availability:
            type === 'Stay'
              ? {
                  ...availabilityStaySlots?.data,
                  availabilitiesIds:
                    availabilityStaySlots?.data?.availabilitiesIds?.slice(
                      0,
                      -1
                    ),
                }
              : {
                  slotIds,
                  startDateTime:
                    selectedSlot?.startDateTimeZoned ||
                    searchDates.startDateTime,
                  endDateTime:
                    selectedSlot?.endDateTimeZoned || searchDates.endDateTime,
                },
          type,
          name,
        };

        setBookingData(params.id, bookingData);

        router.push(`/${params.lang}/details/${params.id}/completeYourBooking`);
      } else {
        toast.error(t('booking.guests.exceedsLimit'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error: unknown) {
      const wretchError = error as WretchError;
      toast.error(wretchError.json.message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  };

  const groupedSlots = useMemo(() => {
    if (!availabilitySlots?.data) return {};

    return availabilitySlots.data.reduce((acc: GroupedSlots, slot) => {
      // Extract date part from "2025-10-04 16:00 GMT+3"
      const datePart = slot.startDateTimeZoned.split(' ')[0]; // "2025-10-04"
      const date = new Date(datePart);
      const dateKey = date.toDateString();

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date,
          slots: [],
        };
      }

      acc[dateKey].slots.push(slot);
      return acc;
    }, {});
  }, [availabilitySlots]);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const handleDateChange = (dateString: string, dates: Date[]) => {
    const toLocalMidnightTimestamp = (d: Date) =>
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    if (type != 'Stay') {
      setSelectedDates(dates);
      if (dates.length === 1) {
        const startDateTime = toLocalMidnightTimestamp(dates[0]);
        const endDateTime =
          toLocalMidnightTimestamp(dates[0]) + 2 * 24 * 60 * 60 * 1000;
        setSearchDates({ startDateTime, endDateTime });
      } else if (dates.length === 2) {
        const startDateTime = toLocalMidnightTimestamp(dates[0]);
        const endDateTime =
          toLocalMidnightTimestamp(dates[1]) + 24 * 60 * 60 * 1000;
        setSearchDates({ startDateTime, endDateTime });
      }
    } else {
      setSelectedDates(dates);
      if (dates.length === 2) {
        const startDateTime = toLocalMidnightTimestamp(dates[0]);
        const endDateTime =
          toLocalMidnightTimestamp(dates[1]) + 24 * 60 * 60 * 1000;
        setSearchDates({ startDateTime, endDateTime });
      }
    }
  };

  const getDateDisplay = () => {
    if (selectedDates.length === 0) return t('datePicker.selectDate');
    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return `${selectedDates[0].toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })} - ${selectedDates[1].toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`;
  };

  const formatTime = (zonedTimeString: string) => {
    // Extract time part from "2025-10-04 16:00 GMT+3"
    const timePart = zonedTimeString.split(' ')[1]; // "16:00"
    const [hours, minutes] = timePart.split(':').map(Number);

    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const allowedGuestsField = React.useMemo(() => {
    return pricingInformation.map(info => info.personType);
  }, [pricingInformation]);

  const getGuestDisplay = () => {
    const totalGuests = guests.adults + guests.children + guests.infants;
    if (totalGuests === 0) return 'Select guests';

    const guestParts = [];
    if (guests.adults > 0)
      guestParts.push(`${guests.adults} adult${guests.adults > 1 ? 's' : ''}`);
    if (guests.children > 0)
      guestParts.push(
        `${guests.children} child${guests.children > 1 ? 'ren' : ''}`
      );
    if (guests.infants > 0)
      guestParts.push(
        `${guests.infants} infant${guests.infants > 1 ? 's' : ''}`
      );

    return guestParts.join(', ');
  };

  const priceAdultString = React.useMemo(() => {
    const priceString =
      pricingInformation.find(info => info.personType === 'adults')?.price ??
      null;
    const discountString =
      pricingInformation.find(info => info.personType === 'adults')?.discount ??
      null;

    if (discountString != null && priceString) {
      return (
        <span>
          <span className='line-through text-gray-500'>
            {priceString} {currency}
          </span>
          <span className='ml-2'>
            {discountString} {currency}
          </span>
        </span>
      );
    }

    return priceString ? `${priceString} ${currency}` : null;
  }, [pricingInformation, currency]);

  const priceChildrenString = React.useMemo(() => {
    const priceString =
      pricingInformation.find(info => info.personType === 'children')?.price ??
      null;
    const discountString =
      pricingInformation.find(info => info.personType === 'children')
        ?.discount ?? null;

    if (discountString != null && priceString) {
      return (
        <span>
          <span className='line-through text-gray-500'>
            {priceString} {currency}
          </span>
          <span className='ml-2'>
            {discountString} {currency}
          </span>
        </span>
      );
    }

    return priceString ? `${priceString} ${currency}` : null;
  }, [pricingInformation, currency]);

  const priceInfantsString = React.useMemo(() => {
    const priceString =
      pricingInformation.find(info => info.personType === 'infants')?.price ??
      null;
    const discountString =
      pricingInformation.find(info => info.personType === 'infants')
        ?.discount ?? null;

    if (discountString != null && priceString) {
      return (
        <span>
          <span className='line-through text-gray-500'>
            {priceString} {currency}
          </span>
          <span className='ml-2'>
            {discountString} {currency}
          </span>
        </span>
      );
    }

    return priceString
      ? priceString === 0
        ? 'Free'
        : `${priceString} ${currency}`
      : null;
  }, [pricingInformation, currency]);

  return (
    <div className='w-full laptopM:max-w-[30.563rem] bg-white border border-[#F2F2F2] rounded-[1.5rem] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-[1.5rem] flex flex-col space-y-[1.25rem] flex-[0.3]'>
      <h2 className='text-custom-16 mobileM:text-custom-18 laptopM:text-custom-20 font-custom-700 text-text_1 pt-2 font-gellix-Bold'>
        {t('booking.startFrom')} {priceAdultString}{' '}
        <span className='font-custom-400 font-sans text-text_2'>
          {t('booking.perPerson')}
        </span>
      </h2>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <DatePickerDropdown
            triggerComponent={
              <Input
                type='text'
                className='border border-secondary_3 rounded-custom-10 p-3 w-full'
                label={t('form.date')}
                value={getDateDisplay()}
                readOnly
              />
            }
            mode={type === 'stay' ? 'range' : 'both'}
            schedule={schedule}
            onChange={handleDateChange}
            minDate={minDate}
            type={type}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <GuestFilterItem
            triggerComponent={
              <Input
                type='text'
                className='border border-secondary_3 rounded-custom-10 p-3'
                label={t('form.guests')}
                value={getGuestDisplay()}
                readOnly
              />
            }
            onChange={guests => {
              setGuests({
                adults: guests.adults,
                children: guests.children,
                infants: guests.infants,
              });
            }}
            allowedGuestsField={allowedGuestsField}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-custom-16 mobileM:text-custom-18 laptopM:text-custom-20 font-custom-700 text-text_1 font-gellix-Bold'>
          {type === 'Stay'
            ? t('booking.availableStaySlots')
            : t('booking.availableTimeSlots')}
        </h1>
        {(
          type === 'Stay'
            ? isLoadingAvailabilityStaySlots
            : isLoadingAvailabilitySlots
        ) ? (
          <div className='flex justify-center items-center h-[550px]'>
            <CircularLoader size={50} />
          </div>
        ) : type === 'Stay' ? (
          <div className='flex flex-col max-h-[400px] overflow-y-auto gap-5'>
            {selectedDates.length === 2 && availabilityStaySlots?.data && (
              <>
                <p className='text-sm font-custom-400 text-text_1 font-sans'>
                  {new Date(
                    availabilityStaySlots.data.startDate
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'GMT',
                  })}{' '}
                  -{' '}
                  {new Date(
                    availabilityStaySlots.data.endDate
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'GMT',
                  })}
                </p>
                <TimeSlotCard
                  timeRange={`${new Date(
                    availabilityStaySlots.data.startDate
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })} - ${new Date(
                    availabilityStaySlots.data.endDate
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}`}
                  adultPrice={priceAdultString}
                  childrenPrice={priceChildrenString}
                  infantsPrice={priceInfantsString}
                  type={type}
                  title={name}
                  onChoose={() => {
                    if (guests.adults + guests.children + guests.infants > 0) {
                      getAllowedGuests();
                    } else {
                      toast.error(t('booking.guests.selectGuests'), {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }
                  }}
                />
              </>
            )}
          </div>
        ) : (
          <div className='flex flex-col max-h-[400px] overflow-y-auto gap-5'>
            {Object.entries(groupedSlots).map(([dateKey, { date, slots }]) => (
              <div key={dateKey} className='flex flex-col gap-2'>
                <p className='text-sm font-custom-400 text-text_1 font-sans'>
                  {date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
                {slots.map(slot => (
                  <TimeSlotCard
                    key={slot._id}
                    timeRange={`${formatTime(slot.startDateTimeZoned!)} - ${formatTime(slot.endDateTimeZoned!)}`}
                    adultPrice={priceAdultString}
                    childrenPrice={priceChildrenString}
                    infantsPrice={priceInfantsString}
                    onChoose={() => {
                      if (
                        guests.adults + guests.children + guests.infants >
                        0
                      ) {
                        getAllowedGuests([slot._id], slot);
                      } else {
                        toast.error(t('booking.guests.selectGuests'), {
                          position: 'top-right',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                        });
                      }
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPanel;
