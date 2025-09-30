import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';

interface LocationSectionProps {
  location: string;
  latitude: number;
  longitude: number;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  location,
  latitude,
  longitude,
}) => {
  const mapStyles = {
    height: '550px',
    width: '100%',
    // borderRadius: '16px',
    opacity: 1,
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

  const handleMapDoubleClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-custom-700 text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
        Location
      </h1>
      <p className='font-custom-400 font-sans text-text_1 text-custom-15 mobileM:text-custom-20 laptopM:text-custom-24'>
        {location}
      </p>
      <p className='font-custom-400 font-sans text-text_3 text-custom-13 mobileM:text-custom-16 laptopM:text-custom-20'>
        Exact location will be available prior to one day
      </p>
      <div onDoubleClick={handleMapDoubleClick} style={{ cursor: 'pointer' }}>
        <LoadScript
          googleMapsApiKey={'AIzaSyAO52U3bOXqyLz1xuVr7-czZqRyYiKe1uE'}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocationSection;
