import React from 'react';

interface StayDetailsSectionProps {
  details?: string;
}

const StayDetailsSection: React.FC<StayDetailsSectionProps> = ({ details }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 text-text_1 text-custom-22 laptopM:text-custom-30'>
        Stay Details
      </p>
      <div
        className='font-custom-400 text-custom-16 laptopM:text-custom-20 text-text_2 max-w-[1000px]'
        dangerouslySetInnerHTML={{ __html: details || '' }}
      />
    </div>
  );
};

export default StayDetailsSection;
