import React, { useState } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext';
import ImageGallery from './ImageGallery';

interface WhatToExpectSectionProps {
  description: string;
  images: string[];
}

const WhatToExpectSection: React.FC<WhatToExpectSectionProps> = ({
  description,
  images,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = description && description.length > 223;
  const displayText =
    shouldTruncate && !isExpanded ? description.substring(0, 223) : description;

  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-6 mobileM:gap-8 laptopM:gap-11'>
      <p className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
        {t('whatToExpect.whatToExpect')}
      </p>
      <div className='flex flex-col laptopM:flex-row justify-between items-start gap-16'>
        <p className='font-custom-400 text-custom-14 mobileM:text-custom-16 laptopM:text-custom-20 text-text_2 max-w-[650px]'>
          {displayText}
          {shouldTruncate && !isExpanded && '.....'}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='font-custom-500 underline text-black ml-1 hover:text-primary_2 transition-colors'
            >
              {isExpanded
                ? t('whatToExpect.readLess')
                : t('whatToExpect.readMore')}
            </button>
          )}
        </p>
        <ImageGallery images={images} />
      </div>
    </div>
  );
};

export default WhatToExpectSection;
