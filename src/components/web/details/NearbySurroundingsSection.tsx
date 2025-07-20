import React from 'react';

interface NearbySurroundingsSectionProps {
  details?: string;
}

const NearbySurroundingsSection: React.FC<NearbySurroundingsSectionProps> = ({
  details,
}) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 text-text_1 text-custom-22 laptopM:text-custom-30'>
        Nearby & Surroundings
      </p>
      <div
        className='font-custom-400 text-custom-16 laptopM:text-custom-20 text-text_2 max-w-[1000px]'
        dangerouslySetInnerHTML={{ __html: details || '' }}
      />
    </div>
  );
};

export default NearbySurroundingsSection;
