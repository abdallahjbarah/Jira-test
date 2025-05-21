import React from 'react';

interface NearbySurroundingsSectionProps {
  details?: string;
}

const NearbySurroundingsSection: React.FC<NearbySurroundingsSectionProps> = ({ details }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        Nearby & Surroundings
      </p>
      <div 
          className='font-custom-400 font-sans text-custom-22 text-text_2'
          dangerouslySetInnerHTML={{ __html: details || '' }}
        />
    </div>
  );
};

export default NearbySurroundingsSection; 