import React from 'react';

interface SpecialInstructionsAndCancellationSectionProps {
  specialInstructions?: {
    foodAllergies?: string;
    medication?: string;
    attire?: string;
  };
  cancellationPolicy?: string;
}

const SpecialInstructionsAndCancellationSection: React.FC<SpecialInstructionsAndCancellationSectionProps> = ({
  specialInstructions = {
    foodAllergies: 'Declare any food allergies in advance.',
    medication: 'Bring personal medication.',
    attire: 'Wear comfortable walking shoes and clothes.',
  },
  cancellationPolicy = 'Cancel up to 24 hours before the start time for a full refund',
}) => {
  return (
    <div className='flex justify-between items-start w-full'>
      <div className='flex-1'>
        <h2 className='font-custom-700 font-gellix-Bold text-custom-30 text-text_1 mb-4'>
          Special Instructions
        </h2>
        <div className='mb-2'>
          <span className='font-custom-700'>Food Allergies:</span>
          <span className='font-custom-400 ml-2'>{specialInstructions.foodAllergies}</span>
        </div>
        <div className='mb-2'>
          <span className='font-custom-700'>Medication:</span>
          <span className='font-custom-400 ml-2'>{specialInstructions.medication}</span>
        </div>
        <div>
          <span className='font-custom-700'>Attire:</span>
          <span className='font-custom-400 ml-2'>{specialInstructions.attire}</span>
        </div>
      </div>
      <div className='flex-1'>
        <h2 className='font-custom-700 font-gellix-Bold text-custom-30 text-text_1 mb-4'>
          Cancellation Policy
        </h2>
        <p className='font-custom-400 font-sans text-custom-22 text-text_2'>
          {cancellationPolicy}
        </p>
      </div>
    </div>
  );
};

export default SpecialInstructionsAndCancellationSection; 