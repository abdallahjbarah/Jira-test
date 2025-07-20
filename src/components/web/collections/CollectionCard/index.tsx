'use client';
import ImageCarousel from '@/components/shared/ImageCarousel';
import CustomLink from '@/components/ui/CustomLink';
import CustomSvg from '@/components/ui/CustomSvg';
import { useTranslation } from '@/contexts/TranslationContext';
import withFavourites from '@/lib/hocs/withFavourites';
import { Site } from '@/lib/types';
import useCurrency from '@/utils/hooks/useCurrency';
import useFavorite from '@/utils/hooks/useFavorite';
import React from 'react';

function CollectionCard({
  collection,
  openFavouritesModal,
  path,
}: {
  collection: Site;
  openFavouritesModal: (site: Site) => void;
  path?: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(collection._id);
  }, [isFavorite, collection._id]);

  const handleFavoriteToggle = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isCollectionFavorite) {
        removeFavorite(collection._id);
      } else {
        openFavouritesModal(collection);
      }
    },
    [
      isCollectionFavorite,
      removeFavorite,
      collection._id,
      collection,
      openFavouritesModal,
    ]
  );

  const slickProps = React.useMemo(
    () => ({
      autoplay: false,
      dots: collection.images.length > 1,
      arrows: collection.images.length > 1,
      infinite: collection.images.length > 1,
      speed: 400,
      lazyLoad: 'progressive' as const,
      pauseOnHover: true,
      autoplaySpeed: 2000,
    }),
    [collection.images.length]
  );

  const imageProps = React.useMemo(
    () => ({
      width: 500,
      height: 500,
      className: 'object-cover w-full h-full',
    }),
    []
  );

  const locationString = React.useMemo(() => {
    return `${collection?.country?.name}, ${collection?.city}`;
  }, [collection?.country?.name, collection?.city]);

  const priceString = React.useMemo(() => {
    const price = collection.pricingInformation[0]?.price;
    return price ? `${price} ${currency}` : '';
  }, [collection.pricingInformation, currency]);

  const heartIconSrc = React.useMemo(() => {
    return isCollectionFavorite
      ? '/SVGs/shared/heart-filled.svg'
      : '/SVGs/shared/heart-icon.svg';
  }, [isCollectionFavorite]);

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <CustomLink
      path={path || `/details/${collection._id}`}
      className='group block'
    >
      <div
        className='transition-all duration-300 rounded-custom-24 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_15px_-1px_rgba(0,0,0,0.20)] hover:-translate-y-1 hover:scale-[1.02] pb-4'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative rounded-custom-2 overflow-hidden'>
          <div className='w-full aspect-[3/3] relative overflow-hidden'>
            <ImageCarousel
              images={collection.images}
              className='w-full h-full relative'
              imageHeight='aspect-[4/5]'
              slickProps={slickProps}
              imageProps={imageProps}
              isHovered={isHovered}
            />
            <button
              className='absolute top-2 right-2 z-20 p-1 hover:!text-primary_2'
              onClick={handleFavoriteToggle}
            >
              <CustomSvg
                src={heartIconSrc}
                width={24}
                height={24}
                className={`transition-colors duration-200 text-white`}
              />
            </button>
          </div>
        </div>

        <div className='mt-4 px-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-custom-12 font-custom-500 text-primary_5 line-clamp-1'>
              {collection.name}
            </h3>
          </div>

          <p className='text-custom-10 text-gray_3 mt-1'>{locationString}</p>

          <div className='flex justify-between items-center mt-2'>
            <p className='text-custom-12 font-bold text-text_1'>
              {t('from')} {priceString}
              <span className='text-custom-10 font-custom-400 '>
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

const MemoizedCollectionCard = React.memo(CollectionCard);

export default withFavourites(MemoizedCollectionCard);
