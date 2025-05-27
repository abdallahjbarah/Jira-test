import ImageWithFallback from '@/components/shared/ImageWithFallback';
import { FavoriteCollection } from '@/lib/types';
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

function FavoriteCollectionCard({
  collection,
}: {
  collection: FavoriteCollection;
}) {
  const { t } = useTranslation();

  return (
    <div className='w-full aspect-square overflow-hidden rounded-3xl cursor-pointer relative'>
      <ImageWithFallback
        src={collection.image}
        alt={collection.collectionName}
        fill
        loading='lazy'
        className='w-full h-full object-cover'
      />
      <div className='absolute top-0 left-0 w-full h-full bg-black/30 hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-5 text-left'>
        <h3 className='text-white text-xl font-bold'>
          {collection.collectionName}
        </h3>
        <span className='text-white text-sm font-medium'>
          {collection.sites.length} {t('wishlist.saved')}
        </span>
      </div>
    </div>
  );
}

export default FavoriteCollectionCard;
