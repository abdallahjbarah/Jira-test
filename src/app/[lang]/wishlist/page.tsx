'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import React, { memo } from 'react';
import EmptyWishlistIcon from '@/components/ui/svg/EmptyWishlistIcon';
import FilledButton from '@/components/ui/buttons/FilledButton';
import CircularLoader from '@/components/ui/CircularLoader';
import Styled from 'styled-components';
import { useFetchUserFavoriteCollections } from '@/lib/apis/favorites/useFetchUserCollections';
import FavoriteCollectionCard from '@/components/web/wishlist/FavoriteCollectionCard';
import CustomLink from '@/components/ui/CustomLink';

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
        0,
      ),
    [favoriteCollections],
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
              onClick={() => { }}
              buttonType='button'
              isDisable={false}
            />
          </div>
        </main>
      </InnerPagesLayout>
    );

  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main className='container py-[6.25rem]'>
        <h2 className='text-center text-custom-50 font-custom-700 font-gellix-Bold text-text_1'>
          {t('wishlist.your')}{' '}
          <span className='text-primary_1'>{t('wishlist.wishlist')}</span>
        </h2>
        <p className='text-custom-30 font-custom-500 text-[#000000] mt-[7.625rem]'>
          You have <span className='text-primary_1'>{favoriteCollections?.length}</span> Collection{favoriteCollections?.length === 1 ? '' : 's'} - <span className='text-primary_1'>{savedCount}</span> Saved
        </p>
        <WishlistItemsContainer className='mt-[3.563rem]'>
          {favoriteCollections?.map((item) => (
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
