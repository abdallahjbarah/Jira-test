import CustomSvg from '@/components/ui/CustomSvg';
import Image from 'next/image';
import React, { useState } from 'react';
import GuestFilterItem from '@/components/shared/GuestFilterItem';

interface BookingDetailsProps {
  time: string;
  date: string;
  people: string;
  onEdit?: () => void;
  onGuestUpdate?: (guests: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
  allowedGuestsField?: string[];
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  time,
  date,
  people,
  onGuestUpdate,
  allowedGuestsField = ['adults', 'children', 'infants'],
}) => {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  // Parse the people string to extract guest numbers (assuming format like "2 adults, 1 child")
  React.useEffect(() => {
    // Basic parsing - you might need to adjust this based on your actual people string format
    const totalGuests = parseInt(people) || 0;
    setGuests({
      adults: totalGuests,
      children: 0,
      infants: 0,
    });
  }, [people]);

  const handleGuestChange = (newGuests: {
    adults: number;
    children: number;
    infants: number;
  }) => {
    console.log('newGuests', newGuests);
    setGuests(newGuests);
    if (onGuestUpdate) {
      onGuestUpdate(newGuests);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-1 items-center'>
        <CustomSvg
          src={'/SVGs/shared/details-icons/timeCircle.svg'}
          width={30}
          height={30}
          color='black'
        />
        <p className='font-custom-400 text-text_1 font-sans text-3xl'>{time}</p>
      </div>
      <div className='flex gap-1 items-center'>
        <CustomSvg
          src={'/SVGs/shared/details-icons/calendar.svg'}
          width={30}
          height={30}
          color='black'
        />
        <p className='font-custom-400 text-text_1 font-sans text-3xl'>{date}</p>
      </div>
      <div className='flex gap-1 items-center'>
        <CustomSvg
          src={'/SVGs/shared/details-icons/adultsIcon.svg'}
          width={30}
          height={30}
          color='black'
        />
        <p className='font-custom-400 text-text_1 font-sans text-3xl'>
          {people}
        </p>
        {/* <GuestFilterItem
          triggerComponent={
            <Image
              src={'/SVGs/shared/editIcon.svg'}
              alt='edit'
              width={30}
              height={30}
              className='cursor-pointer'
            />
          }
          onChange={handleGuestChange}
          initialValues={guests}
          allowedGuestsField={allowedGuestsField}
        /> */}
      </div>
    </div>
  );
};

export default BookingDetails;
