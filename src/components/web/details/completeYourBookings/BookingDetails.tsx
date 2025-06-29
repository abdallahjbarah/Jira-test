import CustomSvg from '@/components/ui/CustomSvg';
import React, { useState } from 'react';

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

  React.useEffect(() => {
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
      </div>
    </div>
  );
};

export default BookingDetails;
