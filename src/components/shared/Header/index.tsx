'use client';
import React from 'react';
import Link from 'next/link';
import SearchContainer from '../SearchContainer';

const Header: React.FC = () => {
  const handleSearch = (data: any) => {
    console.log('Search submitted from header:', data);
    // Here you can navigate to search results page with the data
  };

  return (
    <header className='bg-primary_1 py-4'>
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <Link href='/' className='text-white text-2xl font-bold mr-10'>
            AgriBooking
          </Link>
          <nav className='hidden md:flex space-x-6'>
            <Link
              href='/experiences'
              className='text-white hover:text-gray-200'
            >
              Experiences
            </Link>
            <Link href='/stays' className='text-white hover:text-gray-200'>
              Stays
            </Link>
            <Link href='/about' className='text-white hover:text-gray-200'>
              About
            </Link>
          </nav>
        </div>

        <div className='flex items-center space-x-4'>
          <SearchContainer onSubmit={handleSearch} />
          <Link
            href='/login'
            className='bg-white text-primary_1 px-4 py-2 rounded-full hover:bg-gray-100'
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
