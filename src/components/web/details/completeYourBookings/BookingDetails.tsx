import CustomSvg from '@/components/ui/CustomSvg';
import Image from 'next/image';

interface BookingDetailsProps {
  time: string;
  date: string;
  people: string;
  onEdit?: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  time,
  date,
  people,
  onEdit,
}) => {
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
        {/* <Image
          src={'/SVGs/shared/editIcon.svg'}
          alt='edit'
          width={30}
          height={30}
          onClick={onEdit}
          className='cursor-pointer'
        /> */}
      </div>
    </div>
  );
};

export default BookingDetails;
