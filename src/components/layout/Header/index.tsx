'use client';

import CustomLink from '@components/ui/CustomLink';
import BookagriLogoSvg from '@SVGs/shared/BookagriLogoSvg.svg';
import {
  COLLECTIONS_LINKS,
  COLLECTION_STATUS_LIST,
  DEFAULT_LOCALE,
  LINKS_DATA,
  Locale,
} from '@utils/constants';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import HeaderLink from './HeaderLink';

interface LinkData {
  name: {
    en: string;
    ar: string;
  };
  path: string;
}

export default function Header(): React.ReactElement {
  const [open, setOpen] = useState(false);
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
    <header className='relative'>
      <nav className='hidden laptopS:flex absolute left-1/2 top-[3rem] mx-auto w-full -translate-x-1/2 transform z-10 container bg-transparent'>
        <div className='flex justify-between items-center w-full'>
          <ul className='flex items-center gap-2 laptopM:gap-4 laptopL:gap-6 '>
            {LINKS_DATA?.slice(0, 5)?.map((item: LinkData, index: number) => (
              <HeaderLink
                key={index}
                path={item?.path}
                text={item?.name[lang]}
                isActive={
                  item?.path === pathname.replace(`/${lang}`, '') ||
                  (item.path === '/' && pathname === `/${lang}`)
                }
              />
            ))}
          </ul>

          <ul className='flex justify-center items-center flex-shrink-0 mx-8 '>
            <li>
              <CustomLink path={`/`}>
                <Image
                  className='w-[11.8125rem] h-[3rem]'
                  quality={100}
                  src={BookagriLogoSvg}
                  alt='Bookagri Logo'
                />
              </CustomLink>
            </li>
          </ul>

          {/* Collections Hamburger Menu */}
          <div className='flex laptopS:hidden items-center gap-6 flex-shrink-0 pr-6 collections-dropdown'>
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

          {/* Desktop Collections Links */}
          <ul className='hidden laptopS:flex items-center gap-2 laptopM:gap-4 laptopL:gap-6 flex-shrink-0 pr-6'>
            {COLLECTIONS_LINKS?.map(
              (item, index) =>
                index != 5 && (
                  <HeaderLink
                    key={index}
                    path={item?.path}
                    text={item?.name[lang]}
                    isActive={
                      item?.path === pathname.replace(`/${lang}`, '') ||
                      (item.path === '/' && pathname === `/${lang}`)
                    }
                  />
                )
            )}
          </ul>
        </div>
      </nav>

      {/* Collections Dropdown Menu */}
      {collectionsOpen && (
        <div className='laptopS:hidden absolute top-full right-0 mt-2 z-50 collections-dropdown'>
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

      <nav className='z-50 absolute w-full'>
        <div className='laptopS:hidden flex items-end justify-end p-4'>
          <button
            type='button'
            className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-grayscale_3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset'
            onClick={() => setOpen(!open)}
          >
            <span className='sr-only'>Open menu</span>
            <svg
              className='h-8 w-8'
              xmlns='http:www.w3.org/2000/svg'
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
        {open && (
          <div
            className={
              open
                ? 'opacity-100 scale-100 ease-out duration-200 absolute top-0 inset-x-0 transition transform origin-top-right laptopS:hidden z-50'
                : 'opacity-0 scale-95 absolute top-0 inset-x-0 transition transform origin-top-right md:hidden'
            }
          >
            <div className='min-h-screen shadow-lg ring-1 ring-black ring-opacity-5 bg-primary_5 divide-y-2 divide-gray-50'>
              <div className='pt-5 pb-6 px-5'>
                <div className='flex items-center justify-between'>
                  <div className=''>
                    <CustomLink path={`/`}>
                      <Image
                        className='w-[20.6719rem] h-[5.25rem]'
                        quality={100}
                        src={BookagriLogoSvg}
                        alt='Bookagri Logo'
                      />
                    </CustomLink>
                  </div>
                  <div className='-mr-2'>
                    <button
                      type='button'
                      className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-grayscale_3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary_1'
                      onClick={() => setOpen(!open)}
                    >
                      <span className='sr-only'>Close menu</span>

                      <svg
                        className='h-8 w-8'
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
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='mt-6'>
                  {/* Menu Items */}
                  <div className='flex-1 overflow-y-auto py-4'>
                    <ul className='space-y-2 px-4'>
                      {LINKS_DATA?.map((item, index) => (
                        <li key={item?.name[lang] + index + 'Nav'}>
                          <HeaderLink
                            path={item?.path}
                            text={item?.name[lang]}
                            isActive={
                              item?.path === pathname.replace(`/${lang}`, '') ||
                              (item.path === '/' && pathname === `/${lang}`)
                            }
                          />
                        </li>
                      ))}

                      {/* Collection Links */}
                      {COLLECTIONS_LINKS?.map((item, index) => (
                        <li key={item?.name[lang] + index + 'CollectionNav'}>
                          <HeaderLink
                            path={item?.path}
                            text={item?.name[lang]}
                            isActive={
                              item?.path === pathname.replace(`/${lang}`, '') ||
                              (item.path === '/' && pathname === `/${lang}`)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
