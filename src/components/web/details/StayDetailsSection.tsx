import React from 'react';
import { useTranslation } from '../../../contexts/TranslationContext';

interface StayDetailsSectionProps {
  details?: string;
}

const StayDetailsSection: React.FC<StayDetailsSectionProps> = ({ details }) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
        {t('stayDetails.stayDetails')}
      </p>
      <div
        // className='font-custom-400 text-custom-16 laptopM:text-custom-20 text-text_2 max-w-[1000px]'
        dangerouslySetInnerHTML={{ __html: details || '' }}
      />
    </div>
  );
};

export default StayDetailsSection;
