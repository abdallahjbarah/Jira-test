import React from 'react';

const SpecialInstructionsAndCancellationSection = ({
  specialInstructions,
  cancellationPolicy
}: {
  specialInstructions: string;
  cancellationPolicy: string;
}) => {
  return (
    <div className='flex justify-between items-start w-full gap-10'>
      <div className='flex-1'>
        <h2 className='font-custom-700 font-gellix-Bold text-custom-30 text-text_1 mb-4'>
          Special Instructions
        </h2>
        <div 
          className='font-custom-400 font-sans text-custom-22 text-text_2'
          dangerouslySetInnerHTML={{ __html: specialInstructions }}
        />
      </div>
      <div className='flex-1'>
        <h2 className='font-custom-700 font-gellix-Bold text-custom-30 text-text_1 mb-4'>
          Cancellation Policy
        </h2>
        <div 
          className='font-custom-400 font-sans text-custom-22 text-text_2'
          dangerouslySetInnerHTML={{ __html: cancellationPolicy }}
        />
      </div>
    </div>
  );
};

export default SpecialInstructionsAndCancellationSection; 