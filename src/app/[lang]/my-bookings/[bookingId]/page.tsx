'use client';

import React, { useState } from 'react';
import { Locale } from '@utils/constants';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { useFetchBookingDetails } from '@/lib/apis/bookings/useFetchBookingDetails';
import CircularLoader from '@/components/ui/CircularLoader';
import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import FeaturesSection from '@/components/web/details/FeaturesSection';
import AmenitiesSection from '@/components/web/details/AmenitiesSection';
import HostInfoSection from '@/components/web/details/HostInfoSection';
import LocationSection from '@/components/web/details/LocationSection';
import WhatToExpectSection from '@/components/web/details/WhatToExpectSection';
import ItinerarySection from '@/components/web/details/ItinerarySection';
import StaysFeature from '@/components/web/details/StaysFeature';
import StayDetailsSection from '@/components/web/details/StayDetailsSection';
import NearbySurroundingsSection from '@/components/web/details/NearbySurroundingsSection';
import HouseRulesSection from '@/components/web/details/HouseRulesSection';
import SpecialInstructionsAndCancellationSection from '@/components/web/details/SpecialInstructionsAndCancellationSection';
import ImageCarousel from '@/components/shared/ImageCarousel';
import withFavourites from '@/lib/hocs/withFavourites';
import useFavorite from '@/utils/hooks/useFavorite';
import { Site } from '@/lib/types';
import BookingStatusSection from '@/components/web/details/BookingStatusSection';
import ExpandableTextSection from '@/components/shared/ExpandableTextSection';

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
  } = useFetchBookingDetails(params.bookingId);

  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(params.bookingId);
  }, [isFavorite, params.bookingId]);

  const [isExpanded, setIsExpanded] = useState(false);
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
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
        <main className='container py-[6.25rem]'>
          <div>Error fetching booking details: {error?.message}</div>
        </main>
      </InnerPagesLayout>
    );
  }

  if (!detailsData?.booking) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
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
    checkinTime,
    checkoutTime,
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
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container'>
        <div className='flex flex-col'>
          <div className='relative  laptopM:h-[calc(100vh-15rem)]'>
            <ImageCarousel
              images={images}
              className='w-full h-full relative'
              imageHeight='aspect-square'
              slickProps={{
                autoplay: false,
                dots: images.length > 1,
              }}
              imageProps={{
                src: images[0],
                fill: true,
              }}
            />
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
          </div>

          <div className='flex  items-start mt-20'>
            <div className='flex flex-col gap-2 max-w-[60rem] w-full'>
              <div className='flex flex-col'>
                <p className='text-text_1 text-custom-22 laptopM:text-custom-30 font-custom-500 font-sans text-ellipsis min-w-[12.5rem] break-words line-clamp-2'>
                  {name}
                </p>
                <div className='flex justify-between items-center mt-2'>
                  <p className='font-custom-400 font-sans text-custom-20 laptopM:text-custom-25 text-gray_3'>
                    {country?.name + ', ' + city}
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
                <BookingStatusSection detailsData={detailsData} />
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
                    location={name + ' in ' + country?.name + ', ' + city}
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
                    checkinTime={checkinTime}
                    checkoutTime={checkoutTime}
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
    </InnerPagesLayout>
  );
};

export default withFavourites(MyBookingsPage);
