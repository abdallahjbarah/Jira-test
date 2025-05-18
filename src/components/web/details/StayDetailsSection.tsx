import React from 'react';

interface StayDetailsSectionProps {
  details?: string;
}

const StayDetailsSection: React.FC<StayDetailsSectionProps> = ({ details = 'details' }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        Stay Details
      </p>
      <p>{details}</p>
    </div>
  );
};

export default StayDetailsSection; 