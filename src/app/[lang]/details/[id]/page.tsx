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

  const amenities: {
    icon: string;
    title: string;
  }[] = [
    {
      icon: '/SVGs/home/Email.svg',
      title: 'Wifi',
    },
    {
      icon: '/SVGs/home/Email.svg',
      title: 'Parking',
    },
    {
      icon: '/SVGs/home/Email.svg',
      title: 'Cafeteria',
    },
    {
      icon: '/SVGs/home/Email.svg',
      title: 'Pets Allowed',
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

  const { title, location, price, images, rating, bookable } = detailsData.data;

  // Prepare host info data
  const hosts = [
    {
      image: images[2]?.src,
      name: 'Host Information',
      languages: 'Rana Ahmad • Hosted in English and Arabic',
      description:
        'Lorem ipsum dolor sit amet consectetur. Tellus commodo imperdiet risus venenatis. Diam ultricies venenatis lectus mauris risus id.',
    },
    {
      image: images[2]?.src,
      name: 'Co-host Information',
      languages: 'Rana Ahmad • Hosted in English and Arabic',
      description:
        'Lorem ipsum dolor sit amet consectetur. Tellus commodo imperdiet risus venenatis. Diam ultricies venenatis lectus mauris risus id.',
    },
  ];

  // Example overview and what to expect text (replace with real data as needed)
  const overviewText = 'jksalknlknaskldnsalksnfkldsnflkdsnfkndskfnkldsnfkddasdasdasdaskldjalksjdklasjdlkashlk';
  const whatToExpectText = 'After breakfast and the easy walk, you can have the best glass of harvested natural rainwater that truly has the properties of natural water (no smell, taste, or color) osurrounding.....';

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container'>
        <div className='flex flex-col'>
          <div className='rounded-custom-16 overflow-hidden w-full h-[71.6875rem] relative mb-20'>
            <Image
              src={images[0].src}
              className='w-full h-full object-cover'
              alt={images[0].alt}
              fill
            />
            <button
              className='absolute top-3 right-3 z-10 p-6 hover:!text-primary_2'
              onClick={handleFavoriteToggle}
            >
              <CustomSvg
                src='/SVGs/shared/heart-icon.svg'
                width={30}
                height={30}
                color={isFavorite ? '#FE360A' : '#fff'}
                className='transition-colors duration-200'
              />
            </button>
          </div>
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
              <OverviewSection overview={overviewText} isExpanded={isExpanded} onToggleExpand={() => setIsExpanded(!isExpanded)} />
              <Divider className='w-full my-8' />
              {/* Location Section */}
              <LocationSection location='Bookagri farmer garden in Balqa' mapImage={images[1]?.src} mapAlt='map' />
              <Divider className='w-full my-8' />
              {/* Features Section */}
              <FeaturesSection features={features} />
              <Divider className='w-full my-8' />
              {/* Host Info Section */}
              <HostInfoSection hosts={hosts} />
              <Divider className='w-full my-8' />
              {/* Amenities Section */}
              <AmenitiesSection amenities={amenities} />
            </div>
            {/* Booking Panel */}
            <BookingPanel price={price.amount} bookable={bookable} />
          </div>
          <Divider className='w-full my-8' />
          {/* What to Expect Section */}
          <WhatToExpectSection description={whatToExpectText} images={images} />
          <Divider className='w-full my-8' />
          {/* Special Instructions and Cancellation Policy remain inline for now */}
          <div className='flex justify-between items-start w-full'>
            <div className='flex-1'>
              <h2 className='font-custom-700 font-gellix-Bold text-custom-30 text-text_1 mb-4'>
                Special Instructions
              </h2>
              <div className='mb-2'>
                <span className='font-custom-700'>Food Allergies:</span>
                <span className='font-custom-400 ml-2'>
                  Declare any food allergies in advance.
                </span>
              </div>
              <div className='mb-2'>
                <span className='font-custom-700'>Medication:</span>
                <span className='font-custom-400 ml-2'>
                  Bring personal medication.
                </span>
              </div>
              <div>
                <span className='font-custom-700'>Attire:</span>
                <span className='font-custom-400 ml-2'>
                  Wear comfortable walking shoes and clothes.
                </span>
              </div>
            </div>
            <div className='flex-1'>
              <h2 className='font-custom-700 font-gellix-Bold text-custom-30 text-text_1 mb-4'>
                Cancellation Policy
              </h2>
              <p className='font-custom-400 font-sans text-custom-22 text-text_2'>
                Cancel up to 24 hours before the start time for a full refund
              </p>
            </div>
          </div>
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
