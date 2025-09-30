import Image from 'next/image';
import React, { useState } from 'react';
import AmenitiesPopup from './AmenitiesPopup';

interface Amenity {
  _id: string;
  nameEn: string;
  nameAr: string;
  category: {
    _id: string;
    nameEn: string;
    nameAr: string;
  }[];
  iconPath: string;
}

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className='flex flex-col gap-11'>
      <div className='flex justify-between items-center w-full'>
        <p className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
          Available Amenities
        </p>
        <button
          className='font-custom-400 font-sans text-text_1 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-20'
          onClick={() => setIsPopupOpen(true)}
        >
          See All
        </button>
      </div>
      <div className='flex laptopM:flex-row flex-col gap-20'>
        {amenities.slice(0, 4).map((amenity, index) => (
          <div className='flex flex-col gap-3 items-center' key={index}>
            <Image
              src={amenity?.iconPath}
              alt={amenity?.nameEn}
              width={87}
              height={87}
              className='w-[57px] h-[57px] mobileM:w-[77px] mobileM:h-[77px] laptopM:w-[87px] laptopM:h-[87px]'
            />
            <p className='font-custom-400 font-sans text-text_1 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-20 line-clamp-1'>
              {amenity?.nameEn}
            </p>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <AmenitiesPopup
          amenities={amenities}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default AmenitiesSection;
