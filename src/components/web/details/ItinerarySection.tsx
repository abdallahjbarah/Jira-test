import CustomSvg from '@/components/ui/CustomSvg';
import Image from 'next/image';
import React from 'react';

export interface ItineraryStop {
  title: string;
  locationURL: string;

  details: string;
  duration: number;
}

interface ItinerarySectionProps {
  stops: ItineraryStop[];
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ stops }) => {
  const handleMapClick = (locationUrl: string) => {
    const googleMapsUrl = locationUrl;
    window.open(googleMapsUrl, '_blank');
  };
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        Itinerary
      </h1>
      <p className='font-custom-400 font-sans text-text_2 text-custom-20'>
        This is a typical itinerary for this package
      </p>
      <div className='grid grid-cols-2 gap-8'>
        {stops.map((stop, index) => (
          <div
            key={index}
            className='flex gap-4 cursor-pointer mt-5'
            onClick={() => handleMapClick(stop.locationURL)}
          >
            <div className='w-[50px] h-[50px] relative flex-shrink-0'>
              <Image
                src='/SVGs/shared/details-icons/itineraryStopIcon.svg'
                alt='Stop Icon'
                fill
                className='object-contain'
              />
            </div>
            <div className='flex-1 flex flex-col'>
              <h3 className='font-custom-600 text-custom-22 text-text_1 mb-2 '>
                Stop At: {stop.title}
              </h3>
              <p className='font-custom-400 text-custom-16 text-text_3 mb-4'>
                {stop.details}
              </p>
              <div className='flex items-center gap-2 mt-auto'>
                <CustomSvg
                  src='/SVGs/shared/details-icons/timeCircle.svg'
                  width={20}
                  height={20}
                />
                <span className='text-custom-16 text-text_3'>
                  {stop.duration} {stop.duration === 1 ? 'hour' : 'hours'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItinerarySection;
