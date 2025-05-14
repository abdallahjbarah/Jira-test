import React from 'react';
import CustomSvg from '@/components/ui/CustomSvg';

interface Amenity {
  icon: string;
  title: string;
}

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => (
  <div className='flex flex-col gap-11'>
    <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
      Available Amenities
    </p>
    <div className='flex gap-24'>
      {amenities.map((amenity, index) => (
        <div
          className='flex flex-col gap-3 items-center'
          key={index}
        >
          <CustomSvg
            src={amenity.icon}
            width={24}
            height={24}
            color='black'
          />
          <p className='font-custom-400 font-sans text-text_1 text-custom-20'>
            {amenity.title}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default AmenitiesSection; 