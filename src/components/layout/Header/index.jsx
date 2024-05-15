'use client';

import CustomLink from '@components/ui/CustomLink';
import { NAV_DATA1, NAV_DATA2 } from './data';
import HeaderLink from './HeaderLink';
import { usePathname } from 'next/navigation';
import BookagriLogo from '@components/svg/BookagriLogo';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='absolute left-1/2 top-[48px] mx-auto w-full -translate-x-1/2 transform sm:block z-10'>
      <div className='flex justify-between items-center'>
        {/* Navigation Left */}
        <nav className='flex justify-start items-center gap-6 flex-grow ms-[8.75rem]'>
          {NAV_DATA1?.map((item, index) => (
            <HeaderLink
              key={item?.name + index}
              path={item?.path}
              text={item?.name}
              isActive={item?.path === pathname}
            />
          ))}
        </nav>

        {/* Logo Center */}
        <div
          className='flex justify-center items-center flex-shrink-0 mx-auto'
        >
          <CustomLink path={'/'}>
            <BookagriLogo />
          </CustomLink>
        </div>

        {/* Navigation Right */}
        <nav className='flex justify-end items-center gap-6 flex-grow me-[8.75rem]'>
          {NAV_DATA2?.map((item, index) => (
            <HeaderLink
              key={item?.name + index}
              path={item?.path}
              text={item?.name}
              isActive={item?.path === pathname}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
