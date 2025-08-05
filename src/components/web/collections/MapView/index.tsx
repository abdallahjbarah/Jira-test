'use client';
import React, { useState, useCallback, useMemo } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  OverlayView,
} from '@react-google-maps/api';
import Image from 'next/image';
import Styled from 'styled-components';
import { Site } from '@/lib/types';
import useCurrency from '@/utils/hooks/useCurrency';
import { useTranslation } from '@/contexts/TranslationContext';

interface MapViewProps {
  collections: Site[];
  isLoading?: boolean;
  onBackToList: () => void;
}

const MapContainer = Styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const BackToListButton = Styled.button`
  position: absolute;
  top: -55px;
  right: 20px;
  z-index: 1001;
  background: white;
  border: none;
  border-radius: 8px;
  padding-block: 12px;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    // box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
`;

const CustomMarker = Styled.div`
  position: relative;
  background: white;
  border: 1px solid #222222;
  border-radius: 999px;
  padding: 8px 16px;
  font-weight: 700;
  font-size: 14px;
  color: #222222;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transform: translate(-50%, -100%);
  transition: all 0.2s ease;
  white-space: nowrap;
  width: 124px;
  height: 72px;
  min-width: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #222222;
    z-index: 1001;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid white;
    z-index: 1001;
  }

  &:hover {
    transform: translate(-50%, -100%) scale(1.1);
    // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
`;

const InfoWindowContent = Styled.div`
  cursor: pointer;
  max-width: 320px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 0;

  .image-container {
    position: relative;
    width: 100%;
    height: 180px;
    overflow: hidden;
    border-radius: 16px;
  }

  .content {
    padding: 16px;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .location {
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
    display: flex;
    align-items: center;

  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  .price-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .price-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 2px;
  }

  .price {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .book-button {
    background: #FFA500;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 80px;

    &:hover {
      background: #FF8C00;
      transform: translateY(-1px);
    }
  }
`;

const mapStyles = {
  height: '100%',
  width: '100%',
};

const defaultCenter = {
  lat: 31.4293,
  lng: 35.7914,
};

function MapView({ collections, isLoading, onBackToList }: MapViewProps) {
  const [selectedMarker, setSelectedMarker] = useState<Site | null>(null);
  const { currency } = useCurrency();
  const { t } = useTranslation();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAO52U3bOXqyLz1xuVr7-czZqRyYiKe1uE',
  });

  const markers = useMemo(() => {
    return collections
      .filter((site) => site.location?.coordinates?.length === 2)
      .map((site, index) => ({
        id: site._id,
        position: {
          lat: site.location.coordinates[0],
          lng: site.location.coordinates[1],
        },
        site,
        label: site.pricingInformation?.[0]?.price
          ? `${site.pricingInformation[0].price} ${currency}`
          : `${index + 1} ${currency}`,
      }));
  }, [collections, currency]);

  const mapCenter = useMemo(() => {
    if (markers.length === 0) return defaultCenter;

    if (markers.length === 1) return markers[0].position;

    const bounds = markers.reduce(
      (acc, marker) => ({
        north: Math.max(acc.north, marker.position.lat),
        south: Math.min(acc.south, marker.position.lat),
        east: Math.max(acc.east, marker.position.lng),
        west: Math.min(acc.west, marker.position.lng),
      }),
      {
        north: markers[0].position.lat,
        south: markers[0].position.lat,
        east: markers[0].position.lng,
        west: markers[0].position.lng,
      },
    );

    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;

    return { lat: centerLat, lng: centerLng };
  }, [markers]);

  const mapZoom = useMemo(() => {
    if (markers.length === 0) return 8;
    if (markers.length === 1) return 15;

    const bounds = markers.reduce(
      (acc, marker) => ({
        north: Math.max(acc.north, marker.position.lat),
        south: Math.min(acc.south, marker.position.lat),
        east: Math.max(acc.east, marker.position.lng),
        west: Math.min(acc.west, marker.position.lng),
      }),
      {
        north: markers[0].position.lat,
        south: markers[0].position.lat,
        east: markers[0].position.lng,
        west: markers[0].position.lng,
      },
    );

    const latSpan = bounds.north - bounds.south;
    const lngSpan = bounds.east - bounds.west;
    const maxSpan = Math.max(latSpan, lngSpan);

    if (maxSpan > 10) return 5;
    if (maxSpan > 5) return 6;
    if (maxSpan > 2) return 7;
    if (maxSpan > 1) return 8;
    if (maxSpan > 0.5) return 9;
    if (maxSpan > 0.1) return 11;
    return 13;
  }, [markers]);

  const handleMarkerClick = useCallback((site: Site) => {
    setSelectedMarker(site);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const handleViewDetails = useCallback((siteId: string) => {
    window.open(`/details/${siteId}`, '_blank');
  }, []);

  const renderInfoWindowContent = useCallback(
    (site: Site) => (
      <InfoWindowContent onClick={() => handleViewDetails(site._id)}>
        <div className='image-container'>
          <Image
            src={
              site.mainImage || site.images?.[0] || '/images/placeholder.jpg'
            }
            alt={site.name}
            fill
            className='object-cover'
            sizes='320px'
          />
        </div>
        <div className='content'>
          <h3 className='title'>{site.name}</h3>
          <p className='location'>
            {site.city}, {site.country?.name}
          </p>
          <div className='footer'>
            <div className='price-section'>
              <span className='price font-semibold'>
                From {`${site.pricingInformation[0].price} ${currency} /`}
                <span className='font-normal'>{t('person')}</span>
              </span>
            </div>
            {site?.bookagriBadge && (
              <div className='flex items-center gap-1'>
                <Image
                  src='/SVGs/shared/bookagri-gold.svg'
                  alt='Bookagri Badge'
                  width={96}
                  height={24}
                />
              </div>
            )}
          </div>
        </div>
      </InfoWindowContent>
    ),
    [handleViewDetails, currency],
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <div className='text-lg text-gray-600'>Loading map...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className='flex justify-center items-center h-96'>
        <div className='text-lg text-red-600'>Error loading Google Maps</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className='flex justify-center items-center h-96'>
        <div className='text-lg text-gray-600'>Loading Google Maps...</div>
      </div>
    );
  }

  return (
    <div className='relative'>
      <BackToListButton onClick={onBackToList}>
        <div className='w-5 h-0.5 bg-[#5B5B5B]' />
      </BackToListButton>
      <MapContainer>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={mapZoom}
          center={mapCenter}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            mapTypeControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          }}
        >
          {markers.map((marker) => (
            <OverlayView
              key={marker.id}
              position={marker.position}
              mapPaneName='overlayMouseTarget'
            >
              <CustomMarker onClick={() => handleMarkerClick(marker.site)}>
                <span>{marker.label}</span>
              </CustomMarker>
            </OverlayView>
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.location.coordinates[0],
                lng: selectedMarker.location.coordinates[1],
              }}
              onCloseClick={handleInfoWindowClose}
            >
              {renderInfoWindowContent(selectedMarker)}
            </InfoWindow>
          )}
        </GoogleMap>
      </MapContainer>
    </div>
  );
}

export default React.memo(MapView);
