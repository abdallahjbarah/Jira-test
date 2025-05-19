import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationSectionProps {
  location: string;
  latitude: number;
  longitude: number;
}

const LocationSection: React.FC<LocationSectionProps> = ({ location, latitude, longitude }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "16px"
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude
  };

  const handleMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
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
      <div onClick={handleMapClick} style={{ cursor: 'pointer' }}>
        <LoadScript googleMapsApiKey={"AIzaSyAO52U3bOXqyLz1xuVr7-czZqRyYiKe1uE"}>
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