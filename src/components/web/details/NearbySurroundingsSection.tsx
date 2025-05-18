import React from 'react';

interface NearbySurroundingsSectionProps {
  details?: string;
}

const NearbySurroundingsSection: React.FC<NearbySurroundingsSectionProps> = ({ details = 'details' }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        Nearby & Surroundings
      </p>
      <p>{details}</p>
    </div>
  );
};

export default NearbySurroundingsSection; 