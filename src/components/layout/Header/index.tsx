'use client';

import React, { useState } from 'react';
import CustomLink from '@components/ui/CustomLink';
import HeaderLink from './HeaderLink';
import { usePathname, useParams } from 'next/navigation';
import BookagriLogoSvg from '@SVGs/shared/BookagriLogoSvg.svg';
import {
  COLLECTIONS_LINKS,
  DEFAULT_LOCALE,
  LINKS_DATA,
  Locale,
} from '@utils/constants';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface LinkData {
  name: {
    en: string;
    ar: string;
  };
  path: string;
}

export default function Header(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams<{ lang: Locale }>();
  const lang = params.lang || DEFAULT_LOCALE;

  return (
    <header className='relative'>
      <nav className='hidden laptopS:flex absolute left-1/2 top-[3rem] mx-auto w-full -translate-x-1/2 transform z-10 container '>
        <div className='flex justify-between items-center'></div>
        <ul className='flex justify-start items-center gap-3 laptopM:gap-6 flex-grow'>
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

        <ul className='flex justify-center items-center flex-shrink-0 mx-auto'>
          <li>
            <CustomLink path={`/`}>
              <Image
                className='w-[20.6719rem] h-[5.25rem]'
                quality={100}
                src={BookagriLogoSvg}
                alt='Bookagri Logo'
              />
            </CustomLink>
          </li>
        </ul>

        <ul className='flex justify-end items-center gap-2 laptopM:gap-6 flex-grow'>
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
              ),
          )}
          <li>
            <LanguageSwitcher className='!text-primary_1 hover:!text-primary_2' />
          </li>
        </ul>
      </nav>

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
                  <ul className='grid gap-y-4'>
                    {LINKS_DATA?.map((item, index) => (
                      <HeaderLink
                        key={item?.name[lang] + index + 'Nav'}
                        path={item?.path}
                        text={item?.name[lang]}
                        isActive={
                          item?.path === pathname.replace(`/${lang}`, '') ||
                          (item.path === '/' && pathname === `/${lang}`)
                        }
                      />
                    ))}
                    <li className='mt-4'>
                      <LanguageSwitcher className='!text-primary_1 ' />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
