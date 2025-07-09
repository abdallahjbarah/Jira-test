import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import { COLLECTION_STATUS_LIST } from '@utils/constants';
import Image from 'next/image';
import React, { memo } from 'react';
import CollectionNavItem from '@components/ui/CollectionNavItem';
import HeaderActions from './HeaderActions';
import CustomLink from '@/components/ui/CustomLink';

interface InnerHeaderProps {
  withNavItems?: boolean;
}

function InnerHeader({
  withNavItems = true,
}: InnerHeaderProps): React.ReactElement {
  return (
    <header className='relative py-12 gap-3 container flex items-center justify-between '>
      <CustomLink path={`/`}>
        <Image
          className='w-[20.6719rem] h-[5.25rem] laptopM:w-[14rem]'
          quality={100}
          src={BookagriLogoSvg}
          alt='Bookagri Logo'
        />
      </CustomLink>
      {withNavItems && (
        <div className='hidden laptopM:flex items-center gap-2.5'>
          {COLLECTION_STATUS_LIST.map((item) => (
            <CollectionNavItem key={item.value} collectionStatus={item} />
          ))}
        </div>
      )}
      <HeaderActions />
    </header>
  );
}

export default memo(InnerHeader);
