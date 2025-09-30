'use client';
import FilledButton from '@/components/ui/buttons/FilledButton';
import CircularLoader from '@/components/ui/CircularLoader';
import CustomLink from '@/components/ui/CustomLink';
import EmptyWishlistIcon from '@/components/ui/svg/EmptyWishlistIcon';
import FavoriteCollectionCard from '@/components/web/wishlist/FavoriteCollectionCard';
import { useTranslation } from '@/contexts/TranslationContext';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { useFetchUserFavoriteCollections } from '@/lib/apis/favorites/useFetchUserCollections';
import React, { memo } from 'react';
import Styled from 'styled-components';

const WishlistItemsContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 2.75rem;
`;

function WishlistPage(): React.ReactElement {
  const { t } = useTranslation();
  const { data: favoriteCollections, isLoading } =
    useFetchUserFavoriteCollections({
      enabled: true,
      queryKey: ['userFavoriteCollections'],
    });

  const savedCount = React.useMemo(
    () =>
      favoriteCollections?.reduce(
        (acc, collection) => acc + collection.sites.length,
        0
      ),
    [favoriteCollections]
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularLoader size={50} />
      </div>
    );
  }

  if (!favoriteCollections?.length)
    return (
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
        <main className='container py-0 mobileM:py-[6.25rem]'>
          <div className='flex flex-col items-center gap-9'>
            <h2 className='text-custom-25 mobileM:text-custom-35 laptopM:text-custom-40 font-custom-700 font-gellix-Bold text-text_1'>
              {t('wishlist.title')}
            </h2>
            <p className='text-custom-18 mobileM:text-custom-25 laptopM:text-custom-30 font-custom-400 font-gellix-Regular text-text_2 w-1/3 text-center'>
              {t('wishlist.description')}
            </p>
            <div
              className='flex flex-col items-center gap-9 mobileM:mt-[6.375rem] min-h-[200px] min-w-[200px] max-h-[200px] max-w-[200px]
            mobileM:min-h-[400px] mobileM:min-w-[400px] mobileM:max-h-[400px] mobileM:max-w-[400px]
            '
            >
              <EmptyWishlistIcon />
            </div>
            <FilledButton
              path='/'
              text={t('wishlist.create')}
              width='w-[9rem] mobileM:w-[13.67rem]'
              height='h-[2.8125rem] mobileM:h-[4.8125rem]'
              className='mobileM:mt-[6.375rem] rounded-custom-16'
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
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main className='container py-0 mobileM:py-[6.25rem]'>
        <h2 className='text-center text-custom-25 mobileM:text-custom-35 laptopM:text-custom-40 font-custom-700 font-gellix-Bold text-text_1'>
          {t('wishlist.your')}{' '}
          <span className='text-primary_1'>{t('wishlist.wishlist')}</span>
        </h2>
        <p className='text-custom-23 mobileM:text-custom-25 laptopM:text-custom-30 font-custom-500 text-[#000000] mt-[2rem] mobileM:mt-[5.625rem] laptopM:mt-[7.625rem]'>
          You have{' '}
          <span className='text-primary_1'>{favoriteCollections?.length}</span>{' '}
          Collection{favoriteCollections?.length === 1 ? '' : 's'} -{' '}
          <span className='text-primary_1'>{savedCount}</span> Saved
        </p>
        <WishlistItemsContainer className='mt-[2rem] mobileM:mt-[2.563rem] laptopM:mt-[3.563rem]'>
          {favoriteCollections?.map(item => (
            <CustomLink
              key={item._id}
              path={`/wishlist/${item._id}`}
              className='w-full'
            >
              <FavoriteCollectionCard collection={item} />
            </CustomLink>
          ))}
        </WishlistItemsContainer>
      </main>
    </InnerPagesLayout>
  );
}

export default memo(WishlistPage);
