import React from 'react';

interface StayDetailsSectionProps {
  details?: string;
}

const StayDetailsSection: React.FC<StayDetailsSectionProps> = ({ details }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        Stay Details
      </p>
      <div 
          className='font-custom-400 font-sans text-custom-22 text-text_2'
          dangerouslySetInnerHTML={{ __html: details || '' }}
        />
    </div>
  );
};

export default StayDetailsSection; 