'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import React from 'react';
import BookingsFilter from '@/components/web/bookings/BookingsFilter';
import { CollectionStatus } from '@/utils/constants';
import { useFetchCollections } from '@/lib/apis/collections/useFetchCollections';
import Styled from 'styled-components';
import CollectionCard from '@/components/web/collections/CollectionCard';
import CircularLoader from '@/components/ui/CircularLoader';
import Image from 'next/image';
import FilledButton from '@/components/ui/buttons/FilledButton';

const CollectionsListingContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 52px;
`;

const LoaderContainer = Styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
`;

const MyBookingsPage = () => {
  const { t } = useTranslation();

  const onFilterChange = (tabId: string) => {
    console.log(tabId);
  };

  const onSearch = (query: string) => {
    console.log(query);
  };

  const { data: collections, isLoading } = useFetchCollections('events', {
    queryKey: ['collections', 'events'],
    enabled: true,
  });

  if (!collections?.data?.length && !isLoading) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
        <main className='container pt-[1rem] pb-[3rem] laptopM:pb-[5rem]'>
          <div className='relative w-full h-[500px]'>
            <Image
              src='/SVGs/shared/bookings-empty.svg'
              alt='bookings'
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className='mt-[9.625rem] '>
            <h2 className='text-center text-custom-50 font-custom-700 font-gellix-Bold text-text_1 mb-[4rem]'>
              I Bookagri, Do You!
            </h2>
            <p className='text-center text-custom-40 font-custom-500 text-text_2 mt-[3.688rem] max-w-[55.438rem] mx-auto'>
              {t('myBookings.noBookings')}
            </p>
            <div className='flex items-center justify-center'>
              <FilledButton
                path='/all'
                text={t('exploreNow')}
                className='py-3 px-6 text-xl rounded-lg mt-[4.563rem] min-w-[16.875rem]'
                buttonType='button'
              />
            </div>
          </div>
        </main>
      </InnerPagesLayout>
    );
  }

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container pt-[1rem] pb-[3rem] laptopM:pb-[5rem]'>
        <h2 className='text-center text-custom-40 font-custom-700 font-gellix-Bold text-text_1 mb-[4rem]'>
          {t('myBookings.my')}{' '}
          <span className='text-primary_1'>{t('myBookings.bookings')}</span>
        </h2>
        <p className='text-custom-30 font-custom-500 text-[#000000] mt-[1rem]'>
          {t('myBookings.description')} 14{' '}
          {t('myBookings.descriptionSecondLine')}
        </p>

        <div className='mt-[2rem]'>
          <BookingsFilter onFilterChange={onFilterChange} onSearch={onSearch} />
        </div>
        {isLoading ? (
          <LoaderContainer>
            <CircularLoader size={50} />
          </LoaderContainer>
        ) : (
          <CollectionsListingContainer className='mt-[3.438rem]'>
            {collections?.data.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </CollectionsListingContainer>
        )}
      </main>
    </InnerPagesLayout>
  );
};
export default MyBookingsPage;
