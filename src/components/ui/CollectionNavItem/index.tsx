'use client';

import React from 'react';
import Link from 'next/link';
import { CollectionStatusItem } from '@utils/constants';
import Image from 'next/image';
import { useTranslation } from '@contexts/TranslationContext';
import CustomSvg from '@components/ui/CustomSvg';

interface CollectionNavItemProps {
  collectionStatus: CollectionStatusItem;
}

const CollectionNavItem = ({
  collectionStatus,
}: CollectionNavItemProps): React.ReactElement => {
  const { locale } = useTranslation();

  return (
    <Link href={collectionStatus.path} className='flex items-center gap-2'>
      {/* <CustomSvg
        src={collectionStatus.icon}
        width={24}
        height={24}
        className='text-primary_2'
        alt={collectionStatus.label[locale]}
      /> */}
      <span className=''>{collectionStatus.label[locale]}</span>
    </Link>
  );
};

export default CollectionNavItem;
