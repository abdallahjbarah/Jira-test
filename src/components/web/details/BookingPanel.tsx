import React, { useState, useMemo } from 'react';
import DatePickerDropdown from '@/components/shared/DatePickerDropdown';
import { Input } from '@/components/form/Input';
import GuestFilterItem from '@/components/shared/GuestFilterItem';
import TimeSlotCard from './TimeSlotCard';
import { useRouter } from 'next/navigation';
import { Locale } from '@utils/constants';

interface BookingPanelProps {
  params: {
    lang: Locale;
    id: string;
  };
  price: number;
  bookabl?: boolean;
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
}

const BookingPanel: React.FC<BookingPanelProps> = ({ price, schedule, params }) => {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ startTime: string; id: string }[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>();

  // Calculate minimum date (2 days from now)
  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const handleDateChange = (dateString: string, dates: Date[]) => {
    setSelectedDates(dates);
  };

  // Format the selected dates for display
  const getDateDisplay = () => {
    if (selectedDates.length === 0) return 'Select date';
    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return `${selectedDates[0].toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })} - ${selectedDates[1].toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  return (
    <div className='w-full max-w-[30.563rem] h-[55.938rem] bg-white border border-[#F2F2F2] rounded-[1.5rem] shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] p-[1.5rem] flex flex-col space-y-[1.25rem] overflow-y-auto flex-[0.3]'>
      <h2 className='text-xl font-custom-700 text-text_1 pt-2 font-gellix-Bold'>
        Start from JOD {price}{' '}
        <span className='font-custom-400 font-sans text-text_2'>/person</span>
      </h2>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <DatePickerDropdown
            triggerComponent={
              <Input
                type='text'
                className='border border-secondary_3 rounded-custom-10 p-3 w-full'
                label='Date'
                value={getDateDisplay()}
                readOnly
              />
            }
            mode= "range"
            schedule={schedule}
            onChange={handleDateChange}
            minDate={minDate}
          />
        </div>

        {/* Time Slots - Only show for single date selection */}
        {selectedDates.length === 1 && availableSlots.length > 0 && (
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Available Times</label>
            <div className='grid grid-cols-3 gap-2'>
              {availableSlots.map((slot) => {
                const slotTime = new Date(parseInt(slot.startTime));
                return (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-2 text-sm rounded-lg border ${
                      selectedSlotId === slot.id
                        ? 'bg-primary_1 text-white border-primary_1'
                        : 'border-gray-300 hover:border-primary_1'
                    }`}
                  >
                    {slotTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className='flex flex-col gap-2'>
          <GuestFilterItem
            triggerComponent={
              <Input
                type='text'
                className='border border-secondary_3 rounded-custom-10 p-3'
                label='Guests'
                defaultValue={1}
              />
            }
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-custom-700 text-text_1 font-gellix-Bold'>Available Time Slots</h1>
        <div className='flex flex-col max-h-[550px] overflow-y-auto gap-5'>
          <p className='text-sm font-custom-400 text-text_1 font-sans'>Thursday, 10 Sep</p>
          <TimeSlotCard
            timeRange="09:00 - 11:30 AM"
            adultPrice={20}
            childrenPrice={10}
            onChoose={() => {
              router.push(`/${params.lang}/details/${params.id}/completeYourBooking`);
            }}
          />
           <TimeSlotCard
            timeRange="09:00 - 11:30 AM"
            adultPrice={20}
            childrenPrice={10}
            onChoose={() => {
              // Handle choose action
              console.log('Time slot chosen');
            }}
          />
           <TimeSlotCard
            timeRange="09:00 - 11:30 AM"
            adultPrice={20}
            childrenPrice={10}
            onChoose={() => {
              // Handle choose action
              console.log('Time slot chosen');
            }}
          />
           <TimeSlotCard
            timeRange="09:00 - 11:30 AM"
            adultPrice={20}
            childrenPrice={10}
            onChoose={() => {
              // Handle choose action
              console.log('Time slot chosen');
            }}
          />
           <TimeSlotCard
            timeRange="09:00 - 11:30 AM"
            adultPrice={20}
            childrenPrice={10}
            onChoose={() => {
              // Handle choose action
              console.log('Time slot chosen');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPanel; 