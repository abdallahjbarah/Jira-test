'use client';
import { useFetchCollectionDetails } from '@/lib/apis/favorites/useFetchCollectionDetails';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/contexts/TranslationContext';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import Styled from 'styled-components';
import CollectionCard from '@/components/web/collections/CollectionCard';
import { Site } from '@/lib/types';
import CircularLoader from '@/components/ui/CircularLoader';
import FilledButton from '@/components/ui/buttons/FilledButton';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import useConfirmationModal from '@/hooks/useConfirmationModal';
import { useDeleteCollectionMutate } from '@/lib/apis/favorites/useDeleteCollectionMutate';
import EditCollectionModal from '@/components/ui/EditCollectionModal';
import useModal from '@/hooks/useModal';
import { toast } from 'react-toastify';

const WishlistItemsContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 2.75rem;
`;

function WishlistCollectionPage() {
  const router = useRouter();
  const params = useParams();
  const { collectionId, lang } = params;
  const { t } = useTranslation();

  const {
    isOpen: isConfirmationOpen,
    config: confirmationConfig,
    isLoading: isConfirmationLoading,
    openConfirmation,
    closeConfirmation,
    handleConfirm,
  } = useConfirmationModal();

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const { mutate: deleteCollection, isPending: isDeleting } =
    useDeleteCollectionMutate({
      onSuccess: () => {
        toast.success(t('wishlist.deleteSuccess'), {
          position: 'top-center',
        });
        router.replace(`/${lang}/wishlist`);
      },
    });

  const {
    data: collectionDetails,
    isLoading,
    refetch,
  } = useFetchCollectionDetails(collectionId as string);

  const handleDeleteCollection = async () => {
    const confirmed = await openConfirmation({
      title: t('wishlist.deleteConfirmation.title'),
      message: t('wishlist.deleteConfirmation.message'),
      confirmText: t('wishlist.delete'),
      cancelText: t('common.cancel'),
      confirmButtonVariant: 'danger',
    });

    if (confirmed) {
      deleteCollection(collectionId as string);
    }
  };

  const handleEditCollection = () => {
    openEditModal();
  };

  const handleEditSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularLoader size={50} />
      </div>
    );
  }

  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main className='container py-[6.25rem]'>
        <h2 className='text-center text-custom-50 font-custom-700 font-gellix-Bold text-text_1'>
          {collectionDetails?.collectionName}
        </h2>
        <div className='flex items-center justify-center gap-4 mt-10'>
          <FilledButton
            text={t('wishlist.delete')}
            isButton
            onClick={handleDeleteCollection}
            buttonType='button'
            width='w-[10.67rem]'
            height='h-[3.8125rem]'
            className='rounded-custom-16 !text-custom-18'
          />
          <FilledButton
            text={t('wishlist.edit')}
            isButton
            onClick={handleEditCollection}
            buttonType='button'
            width='w-[10.67rem]'
            height='h-[3.8125rem]'
            className='rounded-custom-16 !text-custom-18'
          />
        </div>
        <p className='text-custom-30 font-custom-500 text-[#000000] mt-[7.625rem]'>
          {t('wishlist.countLabel')}{' '}
          <span className='text-primary_1'>
            {collectionDetails?.sites.length}
          </span>{' '}
          {t('wishlist.saved')}
        </p>
        <WishlistItemsContainer className='mt-[3.563rem]'>
          {collectionDetails?.sites.map((item: Site) => (
            <CollectionCard key={item._id} collection={item} />
          ))}
        </WishlistItemsContainer>
      </main>

      {confirmationConfig && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          onConfirm={handleConfirm}
          title={confirmationConfig.title}
          message={confirmationConfig.message}
          confirmText={confirmationConfig.confirmText}
          cancelText={confirmationConfig.cancelText}
          confirmButtonVariant={confirmationConfig.confirmButtonVariant}
          isLoading={isConfirmationLoading}
        />
      )}

      <EditCollectionModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        collectionId={collectionId as string}
        currentName={collectionDetails?.collectionName || ''}
        onSuccess={handleEditSuccess}
      />
    </InnerPagesLayout>
  );
}

export default WishlistCollectionPage;
