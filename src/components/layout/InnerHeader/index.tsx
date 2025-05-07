import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import { COLLECTION_STATUS_LIST } from '@utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CollectionNavItem from '@components/ui/CollectionNavItem';

function InnerHeader(): React.ReactElement {
  return (
    <header className='relative py-12 container flex items-center justify-between'>
      <Link href={`/`}>
        <Image
          className='w-[11.8125rem] h-[3rem]'
          quality={100}
          src={BookagriLogoSvg}
          alt='Bookagri Logo'
        />
      </Link>
      <div className='flex items-center gap-2'>
        {COLLECTION_STATUS_LIST.map((item) => (
          <CollectionNavItem key={item.value} collectionStatus={item} />
        ))}
      </div>
      <div className='w-6 h-6 rounded-full bg-primary_5' />
    </header>
  );
}

export default InnerHeader;
