import { useTranslation } from '../../../../contexts/TranslationContext';
import { formatTime } from '../../../../utils';

function ReservationDetails({
  displayGuests,
  startDateTimeZoned,
  endDateTimeZoned,
}: {
  displayGuests: string;
  startDateTimeZoned: string;
  endDateTimeZoned: string;
}) {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
        {t('booking.reservationDetails')}
      </h1>
      <div className='flex flex-col gap-2'>
        <p className='font-custom-400 font-sans text-text_1 text-custom-15 mobileM:text-custom-20 laptopM:text-custom-24'>
          {t('booking.whoIsComing')}
        </p>
        <p className='font-custom-300 font-sans text-text_3 text-custom-12 mobileM:text-custom-17 laptopM:text-custom-21'>
          {displayGuests}
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-custom-400 font-sans text-text_1 text-custom-15 mobileM:text-custom-20 laptopM:text-custom-24'>
          {t('booking.datesAndTime')}
        </p>
        <p className='font-custom-300 font-sans text-text_3 text-custom-12 mobileM:text-custom-17 laptopM:text-custom-21'>
          {new Date(startDateTimeZoned).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
          {' - '}
          {formatTime(startDateTimeZoned)} - {formatTime(endDateTimeZoned)}
        </p>
      </div>
    </div>
  );
}

export default ReservationDetails;
