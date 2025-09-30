'use client';

import ExpandableTextSection from '@/components/shared/ExpandableTextSection';
import CircularLoader from '@/components/ui/CircularLoader';
import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import AmenitiesSection from '@/components/web/details/AmenitiesSection';
import BookingPanel from '@/components/web/details/BookingPanel';
import FeaturesSection from '@/components/web/details/FeaturesSection';
import HostInfoSection from '@/components/web/details/HostInfoSection';
import HouseRulesSection from '@/components/web/details/HouseRulesSection';
import ItinerarySection from '@/components/web/details/ItinerarySection';
import LocationSection from '@/components/web/details/LocationSection';
import NearbySurroundingsSection from '@/components/web/details/NearbySurroundingsSection';
import SimilarExperiencesSection from '@/components/web/details/SimilarExperiencesSection';
import SpecialInstructionsAndCancellationSection from '@/components/web/details/SpecialInstructionsAndCancellationSection';
import StayDetailsSection from '@/components/web/details/StayDetailsSection';
import StaysFeature from '@/components/web/details/StaysFeature';
import WhatToExpectSection from '@/components/web/details/WhatToExpectSection';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { useFetchCollections } from '@/lib/apis/collections/useFetchCollections';
import { useFetchDetails } from '@/lib/apis/details/useFetchDetails';
import { useFetchSimilar } from '@/lib/apis/details/useFetchSimillarExperiencde';
import withFavourites from '@/lib/hocs/withFavourites';
import { Site } from '@/lib/types';
import useFavorite from '@/utils/hooks/useFavorite';
import { Locale } from '@utils/constants';
import React, { useState } from 'react';
import ImagesGallery from './ImagesGallery';

interface DetailsIdProps {
  params: { lang: Locale; id: string };
  openFavouritesModal: (detailsData: Site) => void;
}

const DetailsId: React.FC<DetailsIdProps> = ({
  params,
  openFavouritesModal,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    [key: string]: { width: number; height: number };
  }>({});

  const collectionStatus = 'all';
  const { data: collections, isLoading: isCollectionsLoading } =
    useFetchCollections(
      { type: 'Experience' },
      {
        queryKey: ['collections', collectionStatus],
      }
    );

  const {
    data: detailsData,
    isLoading,
    isError,
    error,
  } = useFetchDetails(params.id);

  const { data: similarData, isLoading: isSimilarLoading } = useFetchSimilar(
    params.id
  );
  console.log('similarData', similarData);

  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(params.id);
  }, [isFavorite, params.id]);

  const heartIconSrc = React.useMemo(() => {
    return isCollectionFavorite
      ? '/SVGs/shared/heart-filled.svg'
      : '/SVGs/shared/heart-icon.svg';
  }, [isCollectionFavorite]);

  const loadImageDimensions = React.useCallback(
    (imageUrl: string): Promise<{ width: number; height: number }> => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => {
          resolve({ width: 4, height: 3 });
        };
        img.src = imageUrl;
      });
    },
    []
  );

  React.useEffect(() => {
    const loadAllDimensions = async () => {
      if (
        !detailsData?.data?.site?.images ||
        detailsData.data.site.images.length === 0
      )
        return;

      const dimensions: { [key: string]: { width: number; height: number } } =
        {};

      for (const imageUrl of detailsData.data.site.images) {
        const dims = await loadImageDimensions(imageUrl);

        const aspectRatio = dims.width / dims.height;
        dimensions[imageUrl] = {
          width: Math.max(1, Math.min(6, Math.round(aspectRatio * 3))),
          height: 3,
        };
      }

      setImageDimensions(dimensions);
    };

    loadAllDimensions();
  }, [detailsData?.data?.site?.images, loadImageDimensions]);

  const handleFavoriteToggle = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isCollectionFavorite) {
        removeFavorite(params.id);
      } else {
        openFavouritesModal(detailsData?.data?.site as Site);
      }
    },
    [
      isCollectionFavorite,
      removeFavorite,
      params.id,
      openFavouritesModal,
      detailsData?.data?.site,
    ]
  );

  const handleImageClick = React.useCallback(
    (index: number) => {
      const images = detailsData?.data?.site?.images;
      if (!images || index < 0 || index >= images.length) {
        return;
      }
      setCurrentImageIndex(index);

      setTimeout(() => {
        setIsLightboxOpen(true);
      }, 10);
    },
    [detailsData?.data?.site?.images]
  );

  const handleCloseLightbox = React.useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handleMovePrev = React.useCallback(() => {
    const images = detailsData?.data?.site?.images;
    if (!images) return;
    setCurrentImageIndex(
      current => (current + images.length - 1) % images.length
    );
  }, [detailsData?.data?.site?.images]);

  const handleMoveNext = React.useCallback(() => {
    const images = detailsData?.data?.site?.images;
    if (!images) return;
    setCurrentImageIndex(current => (current + 1) % images.length);
  }, [detailsData?.data?.site?.images]);

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
          <div>Error fetching details: {error?.message}</div>
        </main>
      </InnerPagesLayout>
    );
  }

  if (!detailsData?.data) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: true }}>
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
    startDateTime,
    endDateTime,
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
    duration,
    levelOfDifficulty,
    ageSuitability,
    timeOfDay,
    wheelChair,
    transportationIsIncluded,
    transportationIsMandatory,
    guideIsIncluded,
    guideIsMandatory,
    checkinTime,
    checkoutTime,
  } = detailsData.data.site;

  const galleryImages =
    images?.map((image: string) => {
      const dims = imageDimensions[image] || { width: 4, height: 3 };
      return {
        src: image,
        width: dims.width,
        height: dims.height,
        thumbnail: image,
      };
    }) || [];

  console.log('guideIsIncluded', guideIsIncluded);

  const features: {
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      icon: '/SVGs/shared/details-icons/timeCircle.svg',
      title: 'Duration',
      description: duration + ' hrs',
    },
    {
      icon: '/SVGs/shared/details-icons/sun.svg',
      title: 'Time of Day',
      description:
        timeOfDay
          ?.map((time: string) => time.charAt(0).toUpperCase() + time.slice(1))
          .join(', ') + '',
    },
    ...(guideIsIncluded
      ? [
          {
            icon: '/SVGs/shared/details-icons/guideIcon.svg',
            title: guideIsMandatory ? 'Guide' : 'Guide (Upon Request)',
            description: 'Extra fees applied',
          },
        ]
      : []),
    {
      icon: '/SVGs/shared/details-icons/levelOfDiffIcon.svg',
      title: 'Level of Difficulty',
      description: levelOfDifficulty + '',
    },
    {
      icon: '/SVGs/shared/details-icons/ageSuitabilityIcon.svg',
      title: 'Age Suitability',
      description: ageSuitability + '+',
    },
    ...(transportationIsIncluded
      ? [
          {
            icon: '/SVGs/shared/details-icons/transportationIcon.svg',
            title: transportationIsMandatory
              ? 'Transportation'
              : 'Transportation (Upon Request)',
            description: 'Extra fees applied',
          },
        ]
      : []),
    {
      icon: '/SVGs/shared/details-icons/spokenLanguageIcon.svg',
      title: 'Spoken Language',
      description:
        languages
          ?.map(
            (language: { nameAr: string; nameEn: string }) =>
              language.nameEn.charAt(0).toUpperCase() + language.nameEn.slice(1)
          )
          .join(', ') +
        ' (Download a language translator app to communicate with host!)',
    },
    ...(wheelChair
      ? [
          {
            icon: '/SVGs/shared/details-icons/wheelchairAccessibleIcon.svg',
            title: 'Wheelchair Accessible',
            description: '',
          },
        ]
      : []),
  ];

  const staysFeatures: {
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      icon: '/SVGs/shared/details-icons/timeCircle.svg',
      title: 'Check-in',
      description: `${checkinTime} PM`,
    },
    {
      icon: '/SVGs/shared/details-icons/timeCircle.svg',
      title: 'Check-out',
      description: `${checkoutTime} PM`,
    },
    {
      icon: '/SVGs/shared/details-icons/spokenLanguageIcon.svg',
      title: 'Spoken Language',
      description: `${languages
        ?.map(language => language.nameEn)
        .join(
          ', '
        )} (Download a language translator app to communicate with host!)`,
    },
  ];

  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main className='container'>
        <div className='flex flex-col'>
          <div className='relative'>
            <div className='w-full flex justify-center '>
              <ImagesGallery images={images} />
            </div>
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
          <div className='flex justify-between laptopM:flex-row flex-col items-start gap-40 mt-8 mobileM:mt-10 laptopM:mt-20'>
            <div className='flex flex-col gap-2 flex-[0.7]'>
              <div className='flex flex-col laptopM:max-w-[37.5rem]'>
                <p className='text-text_1 text-custom-20 font-custom-500 font-sans max-w-[37.5rem] text-ellipsis min-w-[12.5rem] break-words line-clamp-2 mobileM:text-custom-25 laptopM:text-custom-30'>
                  {name}
                </p>
                <div className='flex justify-between items-center mt-2'>
                  <p className='font-custom-400 font-sans text-custom-15 text-gray_3 mobileM:text-custom-20 laptopM:text-custom-25'>
                    {`${country?.name}, ${city}`}
                  </p>
                  <div className='text-custom-14 text-right'>
                    {bookagriBadge && (
                      <img
                        src='/SVGs/shared/bookagri-gold.svg'
                        alt='Bookagri Badge'
                        className='w-[60px] h-[16px] mobileM:w-[96px] mobileM:h-[24px] text-gold_1'
                      />
                    )}
                  </div>
                </div>
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
                    staysFeatures={staysFeatures}
                  />
                </>
              )}

              {host && coHost && (
                <>
                  <Divider className='w-full my-8' />
                  <HostInfoSection hosts={host} coHosts={coHost} />
                </>
              )}
              <Divider className='w-full my-8' />
              <AmenitiesSection amenities={amenities || []} />
            </div>
            {/* BookingPanel for laptopM and larger screens */}
            <div className='hidden laptopM:block max-w-[30.563rem] w-full flex-[0.3]'>
              <BookingPanel
                pricingInformation={pricingInformation}
                schedule={{
                  ...schedule,
                  unavailbleDates: detailsData?.data?.unavailbleDates,
                }}
                params={params}
                type={type}
                name={name}
              />
            </div>
          </div>
          {type != 'Stay' && (
            <>
              <Divider className='w-full my-8' />

              <WhatToExpectSection
                description={whatToExpect?.description}
                images={whatToExpect?.images || []}
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
          {(specialInstructions || cancellationPolicy) && (
            <>
              <Divider className='w-full my-8' />
              <div className='mb-[5px]'>
                <SpecialInstructionsAndCancellationSection
                  specialInstructions={specialInstructions}
                  cancellationPolicy={cancellationPolicy}
                />
              </div>
            </>
          )}
          <Divider className='w-full my-8 content-center' />
          {isSimilarLoading ? (
            <CircularLoader size={50} />
          ) : (
            <SimilarExperiencesSection
              similarExperiences={similarData?.similarSites || []}
            />
          )}

          {/* BookingPanel for screens smaller than laptopM - positioned at bottom */}
          <div className='block laptopM:hidden mt-8'>
            <BookingPanel
              pricingInformation={pricingInformation}
              schedule={{
                ...schedule,
                unavailbleDates: detailsData?.data?.unavailbleDates,
              }}
              params={params}
              type={type}
              name={name}
            />
          </div>
        </div>
      </main>
    </InnerPagesLayout>
  );
};

export default withFavourites(DetailsId);
