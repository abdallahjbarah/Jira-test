'use client';

import CustomLink from '@/components/ui/CustomLink';
import CollectionNavItem from '@components/ui/CollectionNavItem';
import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import {
  COLLECTION_STATUS_LIST,
  COLLECTIONS_LINKS,
  DEFAULT_LOCALE,
  Locale,
} from '@utils/constants';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import React, { memo, useState } from 'react';
import HeaderActions from './HeaderActions';

interface InnerHeaderProps {
  withNavItems?: boolean;
}

function InnerHeader({
  withNavItems = true,
}: InnerHeaderProps): React.ReactElement {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams<{ lang: Locale }>();
  const lang = params.lang || DEFAULT_LOCALE;

  // Close collections dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (collectionsOpen && !target.closest('.collections-dropdown')) {
        setCollectionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [collectionsOpen]);

  return (
    <header className='relative py-4 mobileM:py-12  pr-10 pl-10 gap-3 container flex items-center justify-between '>
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
          {COLLECTION_STATUS_LIST.map(item => (
            <CollectionNavItem key={item.value} collectionStatus={item} />
          ))}
        </div>
      )}

      <div className='flex items-center gap-2'>
        <HeaderActions />

        {/* Collections Hamburger Menu for Tablet/Mobile */}
        {withNavItems && (
          <div className='flex laptopM:hidden items-center collections-dropdown'>
            <button
              type='button'
              className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary_1 shadow-sm border border-gray-200'
              onClick={() => setCollectionsOpen(!collectionsOpen)}
            >
              <span className='sr-only'>Open collections menu</span>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Collections Dropdown Menu */}
      {collectionsOpen && withNavItems && (
        <div className='laptopM:hidden absolute top-full right-0 mt-2 z-50 collections-dropdown'>
          <div className='bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px]'>
            <div className='py-2'>
              {/* All Collections */}
              <CustomLink
                path={COLLECTION_STATUS_LIST[0].path}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
              >
                {COLLECTION_STATUS_LIST[0].label[lang]}
              </CustomLink>

              {/* Collection Items */}
              {COLLECTIONS_LINKS?.map((item, index) => (
                <CustomLink
                  key={item?.name[lang] + index + 'Collection'}
                  path={item?.path}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                >
                  {item?.name[lang]}
                </CustomLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(InnerHeader);
