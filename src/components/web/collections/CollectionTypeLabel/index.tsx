'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { COLLECTION_STATUS_LIST, COLLECTION_STATUS } from '@utils/constants';
import CustomSvg from '@/components/ui/CustomSvg';
import { useTranslation } from '@/contexts/TranslationContext';

function CollectionTypeLabel(): React.ReactElement {
  const { collectionStatus } = useParams();
  const { locale } = useTranslation();

  const currentCollectionStatus = collectionStatus || COLLECTION_STATUS.ALL;

  const collectionObject = React.useMemo(() => {
    return COLLECTION_STATUS_LIST.find(
      (item) => item.value === currentCollectionStatus,
    );
  }, [currentCollectionStatus]);

  return (
    <div className='flex items-center gap-2'>
      {collectionObject?.icon && (
        <div className='w-[36px] h-[36px]'>
          <CustomSvg
            src={collectionObject?.icon}
            alt={collectionObject?.label[locale]}
            className='text-primary_2 w-full h-full'
            width='100%'
            height='100%'
          />
        </div>
      )}
      <span className='font-custom-600 text-custom-25'>
        {collectionObject?.label[locale]}
      </span>
    </div>
  );
}

export default CollectionTypeLabel;
