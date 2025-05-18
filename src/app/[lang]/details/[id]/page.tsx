'use client';

import React, { useState } from 'react';
import { CollectionStatus, Locale } from '@utils/constants';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { useFetchDetails } from '@/lib/apis/details/useFetchDetails';
import CircularLoader from '@/components/ui/CircularLoader';
import CustomSvg from '@/components/ui/CustomSvg';
import Image from 'next/image';
import Divider from '@/components/ui/Divider';
import { useFetchCollections } from '@/lib/apis/collections/useFetchCollections';
import BookingPanel from '@/components/web/details/BookingPanel';
import FeaturesSection from '@/components/web/details/FeaturesSection';
import AmenitiesSection from '@/components/web/details/AmenitiesSection';
import HostInfoSection from '@/components/web/details/HostInfoSection';
import SimilarExperiencesSection from '@/components/web/details/SimilarExperiencesSection';
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

interface DetailsIdProps {
  params: { lang: Locale; id: string };
}

const DetailsId: React.FC<DetailsIdProps> = ({ params }) => {
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

  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

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
    title,
    location,
    price,
    images,
    bookable,
    type,
    checkinTime,
    checkoutTime,
    languages,
    host,
    coHost,
    itineraryStops,
    amenities,
    schedule
  } = detailsData.data;

  // Example overview and what to expect text (replace with real data as needed)
  const overviewText =
    'jksalknlknaskldnsalksnfkldsnflkdsnfkndskfnkldsnfkddasdasdasdaskldjalksjdklasjdlkashlk';
  const whatToExpectText =
    'After breakfast and the easy walk, you can have the best glass of harvested natural rainwater that truly has the properties of natural water (no smell, taste, or color) osurrounding.....';

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container'>
        <div className='flex flex-col'>
          <ImageCarousel
            images={images}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
          />
          <div className='flex justify-between items-start gap-40'>
            <div className='flex flex-col gap-2 flex-[0.7]'>
              <div className='flex flex-col max-w-[37.5rem]'>
                <p className='text-text_1 text-custom-30 font-custom-500 font-sans max-w-[37.5rem] text-ellipsis min-w-[12.5rem] break-words line-clamp-2'>
                  {title[params.lang]}
                </p>
                <div className='flex justify-between items-center mt-2'>
                  <p className='font-custom-400 font-sans text-custom-25 text-gray_3'>
                    {location}
                  </p>
                  <div className='text-custom-14 text-right'>
                    <CustomSvg
                      src='/SVGs/shared/bookagri-gold.svg'
                      className='text-gold_1'
                      width={96}
                      height={24}
                    />
                  </div>
                </div>
              </div>
              <Divider className='w-full my-8' />
              {/* Overview Section */}
              <OverviewSection
                overview={overviewText}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
              />
              {type != 'offers' && (
                <>
                  <Divider className='w-full my-8' />
                  {/* Location Section */}
                  <LocationSection
                    location='Bookagri farmer garden in Balqa'
                    latitude={31.431555608636437}
                    longitude={35.802299612792986}
                  />
                </>
              )}
              {type === 'offers' && (
                <>
                  <Divider className='w-full my-8' />
                  {/* Itinerary Section */}
                  <ItinerarySection stops={itineraryStops || []} />
                </>
              )}
              {type != 'stays' && (
                <>
                  <Divider className='w-full my-8' />
                  {/* Features Section */}
                  <FeaturesSection features={features} />
                </>
              )}
              {type === 'stays' && (
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
              {(host && coHost) && <HostInfoSection hosts={host} coHosts={coHost} />}
              <Divider className='w-full my-8' />
              {/* Amenities Section */}
              <AmenitiesSection amenities={amenities || []} />
            </div>
            {/* Booking Panel */}
            <BookingPanel price={price.amount} bookable={bookable} schedule={schedule} params={params}/>
          </div>
          {type != 'stays' && (
            <>
              <Divider className='w-full my-8' />
              {/* What to Expect Section */}
              <WhatToExpectSection
                description={whatToExpectText}
                images={images}
              />
              <Divider className='w-full my-8' />
              <SpecialInstructionsAndCancellationSection />
            </>
          )}
          {type === 'stays' && (
            <>
              <Divider className='w-full my-8' />
              <StayDetailsSection details='Experience the comfort of our well-appointed accommodations with modern amenities and thoughtful touches to make your stay memorable.' />
              <Divider className='w-full my-8' />
              <NearbySurroundingsSection details='Discover the charm of our location with easy access to local attractions, restaurants, and cultural sites. Enjoy peaceful surroundings while staying connected to everything you need.' />
              <Divider className='w-full my-8' />
              <HouseRulesSection rules='Please respect quiet hours from 10 PM to 7 AM. No smoking inside. Pets allowed with prior approval. Keep common areas tidy. Check-in after 3 PM and check-out before 11 AM.' />
            </>
          )}
          <Divider className='w-full my-8' />
          {/* Similar Experiences Section */}
          <SimilarExperiencesSection collections={collections?.data || []} />
          <Divider className='w-full my-8' />
        </div>
      </main>
    </InnerPagesLayout>
  );
};

export default DetailsId;
