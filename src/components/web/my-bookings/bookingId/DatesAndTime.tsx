import { formatTime } from '../../../../utils';
import CustomSvg from '../../../ui/CustomSvg';

function DatesAndTime({
  startDateTimeZoned,
  endDateTimeZoned,
}: {
  startDateTimeZoned: string;
  endDateTimeZoned: string;
}) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-1 items-center'>
        <CustomSvg
          src={'/SVGs/shared/details-icons/timeCircle.svg'}
          width={30}
          height={30}
          color='black'
        />
        <p className='font-custom-400 text-text_1 font-sans text-custom-15 mobileM:text-custom-18 laptopM:text-custom-20'>
          {formatTime(startDateTimeZoned)} - {formatTime(endDateTimeZoned)}
        </p>
      </div>
      <div className='flex gap-1 items-center'>
        <CustomSvg
          src={'/SVGs/shared/details-icons/calendar.svg'}
          width={30}
          height={30}
          color='black'
        />
        <p className='font-custom-400 text-text_1 font-sans text-custom-15 mobileM:text-custom-18 laptopM:text-custom-20'>
          {new Date(startDateTimeZoned).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

export default DatesAndTime;
