import { useTranslation } from '../../../contexts/TranslationContext';

const SpecialInstructionsAndCancellationSection = ({
  specialInstructions,
  cancellationPolicy,
  isBooking = false,
}: {
  specialInstructions?: string;
  cancellationPolicy?: string;
  isBooking?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col laptopM:flex-row justify-between items-start w-full gap-10'>
      {!isBooking && (
        <div className='flex-1'>
          <h2 className='font-custom-700 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30 text-text_1 mb-10'>
            {t('specialInstructions.specialInstructions')}
          </h2>
          <div
            // className='font-custom-400 text-custom-16 laptopM:text-custom-16  text-text_2'
            dangerouslySetInnerHTML={{ __html: specialInstructions || '' }}
          />
        </div>
      )}
      <div className='flex-1'>
        <h2 className='font-custom-700 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30 text-text_1 mb-10'>
          {t('specialInstructions.cancellationPolicy')}
        </h2>
        <div
          // className='font-custom-400 text-custom-22 laptopM:text-custom-26 text-text_2'
          dangerouslySetInnerHTML={{ __html: cancellationPolicy || '' }}
        />
      </div>
    </div>
  );
};

export default SpecialInstructionsAndCancellationSection;
