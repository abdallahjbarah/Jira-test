'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import React, { memo } from 'react';
import EmptyWishlistIcon from '@/components/ui/svg/EmptyWishlistIcon';
import FilledButton from '@/components/ui/buttons/FilledButton';
import { useFetchWishlist } from '@/lib/apis/wishlist/useFetchWishlist';
import CircularLoader from '@/components/ui/CircularLoader';
import CollectionCard from '@/components/web/collections/CollectionCard';
import Styled from 'styled-components';

const WishlistItemsContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 2.75rem;
`;

function WishlistPage(): React.ReactElement {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchWishlist({
    enabled: true,
    queryKey: ['wishlist'],
  });

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularLoader size={50} />
      </div>
    );
  }

  if (!data?.data.length)
    return (
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
        <main className='container py-[6.25rem]'>
          <div className='flex flex-col items-center gap-9'>
            <h2 className='text-custom-40 font-custom-700 font-gellix-Bold text-text_1'>
              {t('wishlist.title')}
            </h2>
            <p className='text-custom-30 font-custom-400 font-gellix-Regular text-text_2 w-1/3 text-center'>
              {t('wishlist.description')}
            </p>
            <div className='flex flex-col items-center gap-9 mt-[6.375rem]'>
              <EmptyWishlistIcon />
            </div>
            <FilledButton
              path='/'
              text={t('wishlist.create')}
              width='w-[13.67rem]'
              height='h-[4.8125rem]'
              className='mt-[6.375rem] rounded-custom-16'
              icon={null}
              onClick={() => {}}
              buttonType='button'
              isDisable={false}
            />
          </div>
        </main>
      </InnerPagesLayout>
    );

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container py-[6.25rem]'>
        <h2 className='text-center text-custom-50 font-custom-700 font-gellix-Bold text-text_1'>
          {t('wishlist.your')}{' '}
          <span className='text-primary_1'>{t('wishlist.wishlist')}</span>
        </h2>
        <p className='text-custom-30 font-custom-500 text-[#000000] mt-[7.625rem]'>
          {t('wishlist.countLabel')}{' '}
          <span className='text-primary_1'>{data?.data.length}</span>{' '}
          {t('wishlist.collection')}
        </p>
        <WishlistItemsContainer className='mt-[3.563rem]'>
          {data?.data.map((item) => (
            <CollectionCard key={item.id} collection={item} />
          ))}
        </WishlistItemsContainer>
      </main>
    </InnerPagesLayout>
  );
}

export default memo(WishlistPage);
