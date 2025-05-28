'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import CustomSvg from '@/components/ui/CustomSvg';
import Link from 'next/link';
import ImageCarousel from '@/components/shared/ImageCarousel';
import { Site } from '@/lib/types';
import useCurrency from '@/utils/hooks/useCurrency';
import CustomLink from '@/components/ui/CustomLink';
import useFavorite from '@/utils/hooks/useFavorite';
import withFavourites from '@/lib/hocs/withFavourites';

function CollectionCard({
  collection,
  openFavouritesModal,
}: {
  collection: Site;
  openFavouritesModal: (site: Site) => void;
}): React.ReactElement {
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(collection._id);
  }, [isFavorite, collection._id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCollectionFavorite) {
      removeFavorite(collection._id);
    } else {
      openFavouritesModal(collection);
    }
  };

  return (
    <CustomLink
      path={`/details/${collection._id}`}
      className='group block'
      onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchEnd={(e: React.TouchEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e: React.TouchEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className='transition-all duration-300'>
        <div className='relative rounded-custom-16 overflow-hidden'>
          <div className='w-full aspect-square relative overflow-hidden'>
            <ImageCarousel
              images={collection.images}
              className='w-full h-full relative'
              imageHeight='aspect-square'
              slickProps={{
                autoplay: false,
                dots: collection.images.length > 1,
                arrows: false,
              }}
            />
            <button
              className='absolute top-3 right-3 z-20 p-1 hover:!text-primary_2'
              onClick={handleFavoriteToggle}
            >
              <CustomSvg
                src={
                  isCollectionFavorite
                    ? '/SVGs/shared/heart-filled.svg'
                    : '/SVGs/shared/heart-icon.svg'
                }
                width={24}
                height={24}
                className={`transition-colors duration-200 text-white`}
              />
            </button>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-custom-14 font-custom-500 text-primary_5 line-clamp-1'>
              {collection.name}
            </h3>
            {/* <div className='flex items-center gap-1 text-custom-12 font-custom-400'>
              <span className=''>{collection.rating.score}</span>
              <span className='text-secondary_1'>
                | {collection.rating.count}
              </span>
            </div> */}
          </div>

          <p className='text-custom-12 text-gray_3 mt-1'>
            {collection?.country?.name}, {collection?.city}
          </p>

          <div className='flex justify-between items-center mt-2'>
            <p className='text-custom-14 font-bold text-text_1'>
              {t('from')}{' '}
              {`${collection.pricingInformation[0].price} ${currency}`}
              <span className='text-custom-14 font-custom-400 '>
                {' '}
                /{t('person')}
              </span>
            </p>
            <div className='text-custom-14 text-right'>
              <CustomSvg
                src='/SVGs/shared/bookagri-gold.svg'
                className='text-gold_1'
                width={60}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomLink>
  );
}

export default withFavourites(CollectionCard);
