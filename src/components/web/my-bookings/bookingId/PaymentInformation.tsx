import { useTranslation } from '../../../../contexts/TranslationContext';
import { BookingDetails } from '../../../../lib/types';

function PaymentInformation({
  currency,
  detailsData,
}: {
  currency: string;
  detailsData: BookingDetails;
}) {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
        {t('booking.paymentInformation')}
      </h1>
      <div className='flex flex-col gap-2'>
        <p className='font-custom-400 font-sans text-text_1 text-custom-15 mobileM:text-custom-20 laptopM:text-custom-24'>
          {t('booking.paymentDetails')}
        </p>
        <p className='font-custom-300 font-sans text-text_3 text-custom-12 mobileM:text-custom-17 laptopM:text-custom-21'>
          {t('booking.totalCost')}: {currency} {detailsData.booking.totalPrice}
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-custom-400 font-sans text-text_1 text-custom-15 mobileM:text-custom-20 laptopM:text-custom-24'>
          {t('booking.paymentMethods')}
        </p>
        <p className='font-custom-300 font-sans text-text_3 text-custom-12 mobileM:text-custom-17 laptopM:text-custom-21'>
          {detailsData.booking.paymentMethod.name}
        </p>
      </div>
    </div>
  );
}

export default PaymentInformation;
