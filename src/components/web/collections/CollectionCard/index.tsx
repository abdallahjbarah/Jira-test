'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Collection } from '@/lib/apis/collections/data';
import { useTranslation } from '@/contexts/TranslationContext';
import CustomSvg from '@/components/ui/CustomSvg';
import Link from 'next/link';

function CollectionCard({
  collection,
}: {
  collection: Collection;
}): React.ReactElement {
  const { locale, t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/details/${collection.id}`} className='group block'>
      <div className='transition-all duration-300'>
        <div className='relative rounded-custom-16 overflow-hidden'>
          <div className='w-full aspect-square relative overflow-hidden'>
            <Image
              src={
                collection.images.find((img) => img.isMain)?.src ||
                collection.images[0]?.src
              }
              alt={
                collection.images.find((img) => img.isMain)?.alt ||
                collection.title[locale]
              }
              fill
              className='object-cover transition-transform group-hover:scale-105 duration-300'
            />
          </div>

          <button
            className='absolute top-3 right-3 z-10 p-1 hover:!text-primary_2'
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

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-custom-14 font-custom-500 text-primary_5 line-clamp-1'>
              {collection.title[locale]}
            </h3>
            <div className='flex items-center gap-1 text-custom-12 font-custom-400'>
              <span className=''>{collection.rating.score}</span>
              <span className='text-secondary_1'>
                | {collection.rating.count}
              </span>
            </div>
          </div>

          <p className='text-custom-12 text-gray_3 mt-1'>
            {collection.location}
          </p>

          <div className='flex justify-between items-center mt-2'>
            <p className='text-custom-14 font-bold text-text_1'>
              {t('from')}{' '}
              {`${collection.price.currency} ${collection.price.amount}`}
              <span className='text-custom-14 font-custom-400 '>
                {' '}
                /{collection.price.per}
              </span>
            </p>
            <div className='text-custom-14 text-right'>
              <CustomSvg
                src='/SVGs/shared/bookagri-gold.svg'
                className='text-gold_1'
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CollectionCard;
