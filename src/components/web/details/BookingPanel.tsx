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
import TimeSlotCard from './TimeSlotCard';

interface BookingPanelProps {
  params: {
    lang: Locale;
    id: string;
  };
  price: number;
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
    }>;
  };
}

const BookingPanel: React.FC<BookingPanelProps> = ({
  price,
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
            ? availabilityStaySlots?.data?.availabilitiesIds
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
          price,
          allowedGuests: response.data,
          availability:
            type === 'Stay'
              ? availabilityStaySlots?.data
              : {
                slotIds,
                startDateTime: selectedSlot?.startDateTime || searchDates.startDateTime,
                endDateTime: selectedSlot?.endDateTime || searchDates.endDateTime,
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
      const date = new Date(slot.startDateTime);
      const dateKey = date.toDateString();

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: date,
          slots: [],
        };
      }

      acc[dateKey].slots.push(slot);
      return acc;
    }, {});
  }, [availabilitySlots]);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const handleDateChange = (dateString: string, dates: Date[]) => {
    if (type != 'Stay') {
      setSelectedDates(dates);
      if (dates.length === 1) {
        const startDateTime = dates[0].getTime();
        const endDateTime = dates[0].getTime() + 24 * 60 * 60 * 1000;
        setSearchDates({ startDateTime, endDateTime });
      } else if (dates.length === 2) {
        const startDateTime = dates[0].getTime();
        const endDateTime = dates[1].getTime();
        setSearchDates({ startDateTime, endDateTime });
      }
    } else {
      setSelectedDates(dates);
      if (dates.length === 2) {
        const startDateTime = dates[0].getTime();
        const endDateTime = dates[1].getTime() + 24 * 60 * 60 * 1000;
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

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const allowedGuestsField = React.useMemo(() => {
    return pricingInformation.map((info) => info.personType);
  }, [pricingInformation]);

  const getGuestDisplay = () => {
    const totalGuests = guests.adults + guests.children + guests.infants;
    if (totalGuests === 0) return 'Select guests';

    const guestParts = [];
    if (guests.adults > 0) guestParts.push(`${guests.adults} adult${guests.adults > 1 ? 's' : ''}`);
    if (guests.children > 0) guestParts.push(`${guests.children} child${guests.children > 1 ? 'ren' : ''}`);
    if (guests.infants > 0) guestParts.push(`${guests.infants} infant${guests.infants > 1 ? 's' : ''}`);

    return guestParts.join(', ');
  };

  return (
    <div className='w-full max-w-[30.563rem] bg-white border border-[#F2F2F2] rounded-[1.5rem] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-[1.5rem] flex flex-col space-y-[1.25rem] flex-[0.3]'>
      <h2 className='text-xl font-custom-700 text-text_1 pt-2 font-gellix-Bold'>
        {t('booking.startFrom')} JOD {price}{' '}
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
            onChange={(guests) => {
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
        <h1 className='text-xl font-custom-700 text-text_1 font-gellix-Bold'>
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
                    availabilityStaySlots.data.startDate,
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  -{' '}
                  {new Date(
                    availabilityStaySlots.data.endDate,
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <TimeSlotCard
                  timeRange={`${new Date(
                    availabilityStaySlots.data.startDate,
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })} - ${new Date(
                    availabilityStaySlots.data.endDate,
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}`}
                  adultPrice={price}
                  childrenPrice={10}
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
                {slots.map((slot) => (
                  <TimeSlotCard
                    key={slot._id}
                    timeRange={`${formatTime(slot.startDateTime)} - ${formatTime(slot.endDateTime)}`}
                    adultPrice={price}
                    childrenPrice={10}
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
