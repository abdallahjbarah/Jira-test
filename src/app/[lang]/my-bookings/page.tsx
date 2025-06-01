'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import React from 'react';
import BookingsFilter from '@/components/web/bookings/BookingsFilter';
import { useFetchCollections } from '@/lib/apis/collections/useFetchCollections';
import Styled from 'styled-components';
import CollectionCard from '@/components/web/collections/CollectionCard';
import CircularLoader from '@/components/ui/CircularLoader';
import Image from 'next/image';
import FilledButton from '@/components/ui/buttons/FilledButton';
import { useFetchInfiniteBookings } from '@/lib/apis/bookings/useFetchBookings';
import { IntersectionObserverTrigger } from '@/components/shared/IntersectionObserverTrigger';
import { BookingStatus } from '@/lib/enums';
import debounce from '@/utils/helpers/debounce';
import { Booking } from '@/lib/types';

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
  const [filter, setFilter] = React.useState<{
    skip: number;
    limit: number;
    status: BookingStatus;
    search: string;
  }>({
    skip: 0,
    limit: 10,
    status: BookingStatus.PENDING,
    search: '',
  });

  const {
    data: bookingsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteBookings(filter);

  const onFilterChange = (newStatus: number) => {
    setFilter({
      ...filter,
      status: newStatus,
      skip: 0,
    });
  };

  const onSearch = React.useCallback(
    debounce((query: string) => {
      setFilter({
        ...filter,
        search: query,
        skip: 0,
      });
    }, 500),
    [filter],
  );

  const bookings = React.useMemo(() => {
    return bookingsData?.pages.flatMap((page: any) => page.bookings) || [];
  }, [bookingsData]);

  const totalCount = React.useMemo(() => {
    return bookingsData?.pages[0].totalCount || 0;
  }, [bookingsData]);

  // Memoize the intersection callback to prevent unnecessary re-renders
  const handleIntersect = React.useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  // if (!totalCount && !isLoading) {
  //   return (
  //     <InnerPagesLayout headerProps={{ withNavItems: false }}>
  //       <main className='container pt-[1rem] pb-[3rem] laptopM:pb-[5rem]'>
  //         <div className='relative w-full h-[500px]'>
  //           <Image
  //             src='/SVGs/shared/bookings-empty.svg'
  //             alt='bookings'
  //             layout='fill'
  //             objectFit='contain'
  //           />
  //         </div>
  //         <div className='mt-[9.625rem] '>
  //           <h2 className='text-center text-custom-50 font-custom-700 font-gellix-Bold text-text_1 mb-[4rem]'>
  //             {t('myBookings.slogan')}
  //           </h2>
  //           <p className='text-center text-custom-40 font-custom-500 text-text_2 mt-[3.688rem] max-w-[55.438rem] mx-auto'>
  //             {t('myBookings.noBookings')}
  //           </p>
  //           <div className='flex items-center justify-center'>
  //             <FilledButton
  //               path='/all'
  //               text={t('exploreNow')}
  //               className='py-3 px-6 text-xl rounded-lg mt-[4.563rem] min-w-[16.875rem]'
  //               buttonType='button'
  //             />
  //           </div>
  //         </div>
  //       </main>
  //     </InnerPagesLayout>
  //   );
  // }

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container pt-[1rem] pb-[3rem] laptopM:pb-[5rem]'>
        <h2 className='text-center text-custom-40 font-custom-700 font-gellix-Bold text-text_1 mb-[4rem]'>
          {t('myBookings.my')}{' '}
          <span className='text-primary_1'>{t('myBookings.bookings')}</span>
        </h2>
        <p className='text-custom-30 font-custom-500 text-[#000000] mt-[1rem]'>
          {t('myBookings.description')} {totalCount}{' '}
          {t('myBookings.descriptionSecondLine')}
        </p>

        <div className='mt-[2rem]'>
          <BookingsFilter onFilterChange={onFilterChange} onSearch={onSearch} />
        </div>
        {totalCount === 0 && !isLoading && (
          <div className=' mt-[2rem]'>
            <span className='text-custom-24 text-text_1'>
              {t('myBookings.noBookings')}
            </span>
          </div>
        )}
        {isLoading ? (
          <LoaderContainer>
            <CircularLoader size={50} />
          </LoaderContainer>
        ) : (
          <>
            <CollectionsListingContainer className='mt-[3.438rem]'>
              {bookings.map((booking: Booking) => (
                <CollectionCard
                  path={`/my-bookings/${booking?._id}`}
                  key={booking._id}
                  collection={booking?.siteId}
                />
              ))}
            </CollectionsListingContainer>
            <IntersectionObserverTrigger
              onIntersect={handleIntersect}
              enabled={hasNextPage && !isFetchingNextPage}
              className='h-4'
            />
          </>
        )}
      </main>
    </InnerPagesLayout>
  );
};
export default MyBookingsPage;
