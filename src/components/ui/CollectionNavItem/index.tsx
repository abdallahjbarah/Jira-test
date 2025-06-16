'use client';

import React from 'react';
import Link from 'next/link';
import { CollectionStatusItem, COLLECTION_STATUS } from '@utils/constants';
import Image from 'next/image';
import { useTranslation } from '@contexts/TranslationContext';
import CustomSvg from '@components/ui/CustomSvg';
import { useParams } from 'next/navigation';
import { cn } from '@/utils/cn';
import CustomLink from '@components/ui/CustomLink';
interface CollectionNavItemProps {
  collectionStatus: CollectionStatusItem;
}

const CollectionNavItem = ({
  collectionStatus,
}: CollectionNavItemProps): React.ReactElement => {
  const { locale } = useTranslation();
  const { collectionStatus: collectionStatusParam } = useParams();

  const isActiveItem = React.useMemo(() => {
    // If on homepage (no collectionStatus param) and this is the "All" item, it should be active
    if (!collectionStatusParam && collectionStatus.value === COLLECTION_STATUS.ALL) {
      return true;
    }
    // Otherwise check normal match
    return collectionStatusParam === collectionStatus.value;
  }, [collectionStatusParam, collectionStatus.value]);

  return (
    <CustomLink
      path={collectionStatus.path}
      className={cn(
        'transition-all duration-300 flex items-center gap-2 text-[#999999] rounded-full px-3 py-1 hover:text-primary_4 hover:bg-primary_2',
        isActiveItem && 'text-primary_4 bg-primary_2',
      )}
    >
      {collectionStatus.icon && (
        <CustomSvg
          src={collectionStatus.icon}
          width={30}
          height={30}
          alt={collectionStatus.label[locale]}
          color='currentColor'
        />
      )}
      <span className='text-custom-25 leading-none laptopM:text-custom-23'>
        {collectionStatus.label[locale]}
      </span>
    </CustomLink>
  );
};

export default CollectionNavItem;
