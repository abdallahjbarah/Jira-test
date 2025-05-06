import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

function InnerHeader(): React.ReactElement {
  return (
    <header className='relative px-11 py-12'>
      <Link href={`/`}>
        <Image
          className='w-[11.8125rem] h-[3rem]'
          quality={100}
          src={BookagriLogoSvg}
          alt='Bookagri Logo'
        />
      </Link>

      <nav className='hidden laptopS:flex absolute left-1/2 top-[3rem] mx-auto w-full -translate-x-1/2 transform z-10 container '>
        <div className='flex justify-between items-center'>
          <ul className='flex justify-start items-center gap-6 flex-grow'>
            <li>
              <Link href={`/`}>Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default InnerHeader;
