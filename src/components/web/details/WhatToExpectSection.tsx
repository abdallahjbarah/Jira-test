import React from 'react';
import ImageGallery from './ImageGallery';

interface WhatToExpectSectionProps {
  description: string;
  images: string[];
}

const WhatToExpectSection: React.FC<WhatToExpectSectionProps> = ({
  description,
  images,
}) => (
  <div className='flex flex-col gap-11'>
    <p className='font-custom-700 text-text_1 text-custom-22 laptopM:text-custom-30'>
      What to Expect
    </p>
    <div className='flex flex-col laptopM:flex-row justify-between items-start gap-16'>
      <p className='font-custom-400 text-custom-20 laptopM:text-custom-28 text-text_2'>
        {description}{' '}
        <span className='font-custom-500 underline'>Read more</span>
      </p>
      <ImageGallery images={images} />
    </div>
  </div>
);

export default WhatToExpectSection;
