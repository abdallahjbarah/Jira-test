import React from 'react';
import Image from 'next/image';

interface LocationSectionProps {
  location: string;
  mapImage: string;
  mapAlt: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({ location, mapImage, mapAlt }) => (
  <div className='flex flex-col gap-4'>
    <h1 className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
      Location
    </h1>
    <p className='font-custom-400 font-sans text-text_1 text-custom-30'>
      {location}
    </p>
    <p className='font-custom-400 font-sans text-text_3 text-custom-25'>
      Exact location will be available prior to one day
    </p>
    <Image
      src={mapImage}
      alt={mapAlt}
      width={1009}
      height={716}
    />
  </div>
);

export default LocationSection; 