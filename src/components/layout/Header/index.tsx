'use client';

import React from 'react';
import CustomLink from '@components/ui/CustomLink';
import HeaderLink from './HeaderLink';
import { usePathname } from 'next/navigation';
import BookagriLogoSvg from '@components/svg/shared/BookagriLogoSvg';
import { LINKS_DATA } from '@utils/constants';

interface LinkData {
  name: string;
  path: string;
}

export default function Header(): React.ReactElement {
  const pathname = usePathname();

  return (
    <header className=''>
      <nav className='hidden laptopS:flex absolute left-1/2 top-[3rem] mx-auto w-full -translate-x-1/2 transform z-10'>
        {/* Navigation Left */}
        <ul className='flex justify-start items-center gap-6 flex-grow ms-[8.75rem]'>
          {LINKS_DATA?.slice(0, 5)?.map((item: LinkData, index: number) => (
            <HeaderLink
              key={item?.name + index + 'Nav'}
              path={item?.path}
              text={item?.name}
              isActive={item?.path === pathname}
            />
          ))}
        </ul>

        <ul className='flex justify-center items-center flex-shrink-0 mx-auto'>
          <li>
            <CustomLink path='/'>
              <BookagriLogoSvg />
            </CustomLink>
          </li>
        </ul>

        <ul className='flex justify-end items-center gap-6 flex-grow me-[8.75rem]'>
          {LINKS_DATA?.slice(5)?.map((item: LinkData, index: number) => (
            <HeaderLink
              key={item?.name + index + 'Nav'}
              path={item?.path}
              text={item?.name}
              isActive={item?.path === pathname}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
