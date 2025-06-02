'use client';

import React, { useState } from 'react';
import { CollectionStatus, Locale } from '@utils/constants';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { useFetchDetails } from '@/lib/apis/details/useFetchDetails';
import CircularLoader from '@/components/ui/CircularLoader';
import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import { useFetchCollections } from '@/lib/apis/collections/useFetchCollections';
import BookingPanel from '@/components/web/details/BookingPanel';
import FeaturesSection from '@/components/web/details/FeaturesSection';
import AmenitiesSection from '@/components/web/details/AmenitiesSection';
import HostInfoSection from '@/components/web/details/HostInfoSection';
import OverviewSection from '@/components/web/details/OverviewSection';
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

interface DetailsIdProps {
  params: { lang: Locale; id: string };
  openFavouritesModal: (detailsData: Site) => void;
}

const DetailsId: React.FC<DetailsIdProps> = ({
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

  const collectionStatus = 'all';
  const { data: collections, isLoading: isCollectionsLoading } =
    useFetchCollections(collectionStatus as CollectionStatus, {
      queryKey: ['collections', collectionStatus],
    });

  const {
    data: detailsData,
    isLoading,
    isError,
    error,
  } = useFetchDetails(params.id);

  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(params.id);
  }, [isFavorite, params.id]);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCollectionFavorite) {
      removeFavorite(params.id);
    } else {
      openFavouritesModal(detailsData?.data as Site);
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
          <div>Error fetching details: {error?.message}</div>
        </main>
      </InnerPagesLayout>
    );
  }

  if (!detailsData?.data) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
        <main className='container py-[6.25rem]'>
          <div>Details not found.</div>
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
    pricingInformation,
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
    schedule,
    whatToExpect,
    specialInstructions,
    cancellationPolicy,
    stayDetails,
    stayNearby,
    stayHouseRules,
  } = detailsData.data;

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container'>
        <div className='flex flex-col'>
          <div className='relative h-[calc(100vh-20rem)]'>
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
          <div className='flex justify-between items-start gap-40 mt-20'>
            <div className='flex flex-col gap-2 flex-[0.7]'>
              <div className='flex flex-col max-w-[37.5rem]'>
                <p className='text-text_1 text-custom-30 font-custom-500 font-sans max-w-[37.5rem] text-ellipsis min-w-[12.5rem] break-words line-clamp-2'>
                  {name}
                </p>
                <div className='flex justify-between items-center mt-2'>
                  <p className='font-custom-400 font-sans text-custom-25 text-gray_3'>
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
              </div>
              <Divider className='w-full my-8' />
              {/* Overview Section */}
              <OverviewSection
                overview={longDescription}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
              />
              {type != 'Offers & Packages' && (
                <>
                  <Divider className='w-full my-8' />
                  {/* Location Section */}
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
                  {/* Itinerary Section */}
                  <ItinerarySection stops={itineraryStops || []} />
                </>
              )}
              {type != 'Stay' && (
                <>
                  <Divider className='w-full my-8' />
                  {/* Features Section */}
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
              {/* Host Info Section */}
              {host && coHost && (
                <HostInfoSection hosts={host} coHosts={coHost} />
              )}
              <Divider className='w-full my-8' />
              {/* Amenities Section */}
              <AmenitiesSection amenities={amenities || []} />
            </div>
            {/* Booking Panel */}
            <BookingPanel
              pricingInformation={pricingInformation}
              price={pricingInformation[0]?.price}
              schedule={schedule}
              params={params}
              type={type}
              name={name}
            />
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
          {/* <Divider className='w-full my-8' /> */}
          {/* Similar Experiences Section */}
          {/* <SimilarExperiencesSection collections={collections?.data || []} /> */}
          {/* <Divider className='w-full my-8' /> */}
        </div>
      </main>
    </InnerPagesLayout>
  );
};

export default withFavourites(DetailsId);
