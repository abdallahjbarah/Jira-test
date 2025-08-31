'use client';

import ExpandableTextSection from '@/components/shared/ExpandableTextSection';
import CircularLoader from '@/components/ui/CircularLoader';
import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import AmenitiesSection from '@/components/web/details/AmenitiesSection';
import BookingStatusSection from '@/components/web/details/BookingStatusSection';
import FeaturesSection from '@/components/web/details/FeaturesSection';
import HostInfoSection from '@/components/web/details/HostInfoSection';
import HouseRulesSection from '@/components/web/details/HouseRulesSection';
import ItinerarySection from '@/components/web/details/ItinerarySection';
import LocationSection from '@/components/web/details/LocationSection';
import NearbySurroundingsSection from '@/components/web/details/NearbySurroundingsSection';
import SpecialInstructionsAndCancellationSection from '@/components/web/details/SpecialInstructionsAndCancellationSection';
import StayDetailsSection from '@/components/web/details/StayDetailsSection';
import StaysFeature from '@/components/web/details/StaysFeature';
import WhatToExpectSection from '@/components/web/details/WhatToExpectSection';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { useFetchBookingDetails } from '@/lib/apis/bookings/useFetchBookingDetails';
import withFavourites from '@/lib/hocs/withFavourites';
import { Site } from '@/lib/types';
import useFavorite from '@/utils/hooks/useFavorite';
import { Locale } from '@utils/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface MyBookingsPageProps {
  params: { lang: Locale; bookingId: string };
  openFavouritesModal: (detailsData: Site) => void;
}

const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  params,
  openFavouritesModal,
}) => {
  const features: {
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      icon: '/SVGs/shared/details-icons/timeCircle.svg',
      title: 'Duration',
      description: '2hrs 30m',
    },
    {
      icon: '/SVGs/shared/details-icons/sun.svg',
      title: 'Time of Day',
      description: 'Morning (before 12 pm) - Evening (after 5 pm)',
    },
    {
      icon: '/SVGs/shared/details-icons/guideIcon.svg',
      title: 'Guide (Upon Request)',
      description: 'Extra fees applied',
    },
    {
      icon: '/SVGs/shared/details-icons/levelOfDiffIcon.svg',
      title: 'Level of Difficulty',
      description: 'Easy (relaxed tour, easy walk)',
    },
    {
      icon: '/SVGs/shared/details-icons/ageSuitabilityIcon.svg',
      title: 'Age Suitability',
      description: '3+',
    },
    {
      icon: '/SVGs/shared/details-icons/transportationIcon.svg',
      title: 'Transportation (Upon Request)',
      description: 'Extra fees applied',
    },
    {
      icon: '/SVGs/shared/details-icons/spokenLanguageIcon.svg',
      title: 'Spoken Language',
      description:
        'Arabic, English (Download a language translator app to communicate with host!)',
    },
    {
      icon: '/SVGs/shared/details-icons/wheelchairAccessibleIcon.svg',
      title: 'Wheelchair Accessible',
      description: '',
    },
  ];

  const {
    data: detailsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchBookingDetails(params.bookingId);

  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(params.bookingId);
  }, [isFavorite, params.bookingId]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageClick = React.useCallback(
    (index: number) => {
      const images = detailsData?.booking?.siteId?.images;
      if (!images || index < 0 || index >= images.length) {
        return;
      }
      setCurrentImageIndex(index);
      setIsLightboxOpen(true);
    },
    [detailsData?.booking?.siteId?.images]
  );

  const handleCloseLightbox = React.useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handleMovePrev = React.useCallback(() => {
    const images = detailsData?.booking?.siteId?.images;
    if (!images) return;
    setCurrentImageIndex(
      current => (current + images.length - 1) % images.length
    );
  }, [detailsData?.booking?.siteId?.images]);

  const handleMoveNext = React.useCallback(() => {
    const images = detailsData?.booking?.siteId?.images;
    if (!images) return;
    setCurrentImageIndex(current => (current + 1) % images.length);
  }, [detailsData?.booking?.siteId?.images]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCollectionFavorite) {
      removeFavorite(params.bookingId);
    } else {
      openFavouritesModal(detailsData?.booking?.siteId as Site);
    }
  };

  const heartIconSrc = React.useMemo(() => {
    return isCollectionFavorite
      ? '/SVGs/shared/heart-filled.svg'
      : '/SVGs/shared/heart-icon.svg';
  }, [isCollectionFavorite]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularLoader size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: true }}>
        <main className='container py-[6.25rem]'>
          <div>Error fetching booking details: {error?.message}</div>
        </main>
      </InnerPagesLayout>
    );
  }

  if (!detailsData?.booking) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: true }}>
        <main className='container py-[6.25rem]'>
          <div>Booking details not found.</div>
        </main>
      </InnerPagesLayout>
    );
  }

  const {
    name,
    location,
    country,
    city,
    longDescription,
    images,
    bookagriBadge,
    type,
    startDateTime,
    endDateTime,
    languages,
    host,
    coHost,
    itineraryStops,
    amenities,
    whatToExpect,
    specialInstructions,
    cancellationPolicy,
    stayDetails,
    stayNearby,
    stayHouseRules,
  } = detailsData.booking.siteId;

  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main className='container'>
        <div className='flex flex-col'>
          {/* Responsive Image Grid replacing Swiper */}
          <div className='relative w-full'>
            {/* Heart Favorite Button */}
            <button
              className='absolute top-[1.875rem] right-[1.875rem] z-20 p-1 hover:!text-primary_2'
              onClick={handleFavoriteToggle}
            >
              <CustomSvg
                src={heartIconSrc}
                width={44}
                height={44}
                className='transition-colors duration-200 text-white'
              />
            </button>

            {/* Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-9 gap-[16px] lg:h-[600px] w-full'>
              {/* Main Image */}
              {images?.[0] && (
                <div className='rounded-lg h-[320px] relative lg:col-span-5 w-full lg:h-[600px] shadow-md'>
                  <Image
                    onClick={() => handleImageClick(0)}
                    width={600}
                    height={600}
                    src={images[0]}
                    alt='Main property image'
                    className='rounded-[6px] h-full cursor-pointer w-full object-cover hover:brightness-75 transition-all duration-200'
                    unoptimized
                  />
                </div>
              )}

              {/* Gallery Images */}
              <div className='hidden lg:grid lg:grid-cols-2 lg:col-span-4 lg:gap-[16px]'>
                {images?.slice(1, 5).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleImageClick(idx + 1)}
                    className='max-h-[292px] shadow-md relative border-0 p-0 bg-transparent'
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleImageClick(idx + 1);
                      }
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Property image ${idx + 1}`}
                      width={292}
                      height={292}
                      className='h-full w-full rounded-[6px] cursor-pointer bg-propy-overlay object-cover hover:brightness-75 transition-all duration-200'
                      unoptimized
                    />
                    {idx === 3 && images.length > 5 && (
                      <div className='bg-propy-overlay rounded-[6px] w-full h-full text-center absolute inset-0 flex items-center justify-center cursor-pointer'>
                        <span className='text-[24px] text-white font-semibold'>
                          +{images.length - 5}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='flex  items-start mt-20'>
            <div className='flex flex-col gap-2 max-w-[60rem] w-full'>
              <div className='flex flex-col'>
                <p className='text-text_1 text-custom-22 laptopM:text-custom-30 font-custom-500 font-sans text-ellipsis min-w-[12.5rem] break-words line-clamp-2'>
                  {name}
                </p>
                <div className='flex justify-between items-center mt-2'>
                  <p className='font-custom-400 font-sans text-custom-20 laptopM:text-custom-25 text-gray_3'>
                    {`${country?.name}, ${city}`}
                  </p>
                  <div className='text-custom-14 text-right'>
                    {bookagriBadge && (
                      <CustomSvg
                        src='/SVGs/shared/bookagri-gold.svg'
                        className='text-gold_1'
                        width={96}
                        height={24}
                      />
                    )}
                  </div>
                </div>
                <BookingStatusSection
                  detailsData={detailsData}
                  refetch={refetch}
                />
              </div>
              <Divider className='w-full my-8' />
              <ExpandableTextSection
                title='Overview'
                content={longDescription}
              />
              {type != 'Offers & Packages' && (
                <>
                  <Divider className='w-full my-8' />
                  <LocationSection
                    location={`${name} in ${country?.name}, ${city}`}
                    latitude={location.coordinates[0]}
                    longitude={location.coordinates[1]}
                  />
                </>
              )}
              {type === 'Offers & Packages' && (
                <>
                  <Divider className='w-full my-8' />

                  <ItinerarySection stops={itineraryStops || []} />
                </>
              )}
              {type != 'Stay' && (
                <>
                  <Divider className='w-full my-8' />

                  <FeaturesSection features={features} />
                </>
              )}
              {type === 'Stay' && (
                <>
                  <Divider className='w-full my-8' />
                  <StaysFeature
                    startDateTime={startDateTime}
                    endDateTime={endDateTime}
                    languages={languages}
                  />
                </>
              )}
              <Divider className='w-full my-8' />

              {host && coHost && (
                <HostInfoSection hosts={host} coHosts={coHost} />
              )}
              <Divider className='w-full my-8' />

              <AmenitiesSection amenities={amenities || []} />
            </div>
          </div>
          {type != 'Stay' && (
            <>
              <Divider className='w-full my-8' />

              <WhatToExpectSection
                description={whatToExpect?.description}
                images={whatToExpect?.images}
              />
              <Divider className='w-full my-8' />
              <SpecialInstructionsAndCancellationSection
                specialInstructions={specialInstructions}
                cancellationPolicy={cancellationPolicy}
              />
            </>
          )}
          {type === 'Stay' && (
            <>
              <Divider className='w-full my-8' />
              <StayDetailsSection details={stayDetails?.description} />
              <Divider className='w-full my-8' />
              <NearbySurroundingsSection details={stayNearby} />
              <Divider className='w-full my-8' />
              <HouseRulesSection rules={stayHouseRules} />
            </>
          )}
        </div>
      </main>

      {/* Lightbox for Image Gallery */}
      {images && images.length > 0 && (
        <Lightbox
          slides={images.map(image => ({ src: image }))}
          open={isLightboxOpen}
          index={currentImageIndex}
          close={handleCloseLightbox}
          plugins={[Counter, Fullscreen, Slideshow, Zoom]}
          counter={{
            separator: '/',
            container: {
              color: 'white',
            },
          }}
        />
      )}
    </InnerPagesLayout>
  );
};

export default withFavourites(MyBookingsPage);
