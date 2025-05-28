import React, { ComponentType } from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import useFavorite from '@/utils/hooks/useFavorite';
import { useAddToCollectionMutate } from '@/lib/apis/favorites/useAddToCollectionMutate';
import { useFetchUserFavoriteCollections } from '@/lib/apis/favorites/useFetchUserCollections';
import FavoriteCollectionCard from '@/components/web/wishlist/FavoriteCollectionCard';
import styled from 'styled-components';
import FilledButton from '@/components/ui/buttons/FilledButton';
import FormInput from '@/components/form/FormInput';
import { toast } from 'react-toastify';
import { Site } from '@/lib/types';

// Styled components for the modal content
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CreateNewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CreateNewForm = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;
`;

const CollectionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CollectionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const CollectionItemWrapper = styled.div<{ isSelected?: boolean }>`
  position: relative;
  cursor: pointer;
  border: 3px solid
    ${({ isSelected }) => (isSelected ? '#47C409' : 'transparent')};
  border-radius: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: #47c409;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    &::after {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 8px;
      background-color: #47C409;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      z-index: 10;
    }
  `}
`;

const SectionTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #666;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #d0d0d0;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Props that will be injected into the wrapped component
export interface WithFavouritesProps {
  openFavouritesModal: (site: Site) => void;
}

// HOC function
function withFavourites<P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<Omit<P, keyof WithFavouritesProps>> {
  const WithFavouritesComponent = (
    props: Omit<P, keyof WithFavouritesProps>,
  ) => {
    const { t } = useTranslation();
    const { isOpen, openModal, closeModal } = useModal();
    const { isFavorite } = useFavorite();

    // Only the necessary state for modal functionality
    const [currentSiteId, setCurrentSiteId] = React.useState<string | null>(
      null,
    );
    const [selectedCollectionId, setSelectedCollectionId] = React.useState<
      string | null
    >(null);
    // default value is site
    const [newCollectionName, setNewCollectionName] = React.useState<
      string | null
    >(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // Fetch user's favorite collections
    const { data: favoriteCollections, refetch: refetchCollections } =
      useFetchUserFavoriteCollections();

    // Mutation for adding to collection
    const { mutate: addToCollection } = useAddToCollectionMutate({
      onSuccess: () => {
        toast.success(t('favorites.addedSuccessfully'));
        refetchCollections();
        handleCloseModal();
      },
      onError: (error) => {
        toast.error(t('favorites.addError'));
        console.error('Error adding to collection:', error);
        setIsLoading(false);
      },
    });

    const resetModalState = () => {
      setCurrentSiteId(null);
      setSelectedCollectionId(null);
      setNewCollectionName(null);
      setIsLoading(false);
    };

    // Function to open the favourites modal
    const openFavouritesModal = React.useCallback(
      (site: Site) => {
        // Check if already in favorites
        if (isFavorite(site._id)) {
          toast.info(t('favorites.alreadyInFavorites'));
          return;
        }

        console.log('Site: ', site);

        setCurrentSiteId(site._id);
        setNewCollectionName(site.name);
        openModal();
      },
      [isFavorite, openModal, t],
    );

    // Handle collection selection
    const handleCollectionSelect = (collectionId: string) => {
      setSelectedCollectionId(collectionId);
      setNewCollectionName(null); // Clear new collection name when selecting existing
    };

    // Handle creating new collection
    const handleCreateNewCollection = () => {
      if (!currentSiteId || !newCollectionName) return;

      setIsLoading(true);

      // Create new collection and add site
      addToCollection({
        siteId: currentSiteId,
        collectionName: newCollectionName.trim(),
      });
    };

    // Handle adding to selected existing collection
    const handleAddToExistingCollection = () => {
      if (!currentSiteId || !selectedCollectionId) return;

      setIsLoading(true);

      // Add to existing collection
      addToCollection({
        siteId: currentSiteId,
        collectionId: selectedCollectionId,
      });
    };

    // Handle modal close
    const handleCloseModal = () => {
      closeModal();
      resetModalState();
    };

    // Check if can create new collection
    const canCreateNew =
      newCollectionName !== null && newCollectionName?.trim().length > 0;

    // Check if can add to existing collection
    const canAddToExisting = selectedCollectionId !== null;

    return (
      <>
        <WrappedComponent
          {...(props as P)}
          openFavouritesModal={openFavouritesModal}
        />

        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title={t('favorites.addToCollection')}
          width='600px'
        >
          <ModalContent>
            {/* Create New Collection Section */}
            <CreateNewSection>
              <SectionTitle>{t('favorites.createNewCollection')}</SectionTitle>
              <CreateNewForm>
                <FormInput
                  label={t('favorites.collectionName')}
                  value={newCollectionName || ''}
                  onChange={(e) => {
                    setNewCollectionName(e.target.value);
                    setSelectedCollectionId(null); // Clear selection when typing
                  }}
                  placeholder={t('favorites.enterCollectionName')}
                  disabled={isLoading}
                />
                <FilledButton
                  text={isLoading ? t('common.creating') : t('common.create')}
                  isButton
                  onClick={handleCreateNewCollection}
                  buttonType='button'
                  width='w-32'
                  height='h-12'
                  className='rounded-custom-16 !text-custom-10'
                  isDisable={!canCreateNew || isLoading}
                />
              </CreateNewForm>
            </CreateNewSection>

            {/* Existing Collections Section */}
            {favoriteCollections && favoriteCollections.length > 0 && (
              <CollectionsSection>
                <SectionTitle>
                  {t('favorites.selectExistingCollection')}
                </SectionTitle>
                <CollectionsList>
                  {favoriteCollections.map((collection) => (
                    <CollectionItemWrapper
                      key={collection._id}
                      isSelected={selectedCollectionId === collection._id}
                      onClick={() => handleCollectionSelect(collection._id)}
                    >
                      <FavoriteCollectionCard
                        collection={collection}
                        labelClassName='text-xs'
                        descriptionClassName='text-[10px]'
                      />
                    </CollectionItemWrapper>
                  ))}
                </CollectionsList>

                {/* Add to Selected Collection Button */}
                {canAddToExisting && (
                  <FilledButton
                    text={
                      isLoading
                        ? t('common.adding')
                        : t('favorites.addToSelected')
                    }
                    isButton
                    onClick={handleAddToExistingCollection}
                    buttonType='button'
                    width='w-full'
                    height='h-12'
                    className='rounded-custom-16'
                    isDisable={isLoading}
                  />
                )}
              </CollectionsSection>
            )}

            {/* Cancel Button */}
            <ButtonContainer>
              <CancelButton onClick={handleCloseModal} disabled={isLoading}>
                {t('common.cancel')}
              </CancelButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      </>
    );
  };

  // Set display name for debugging
  WithFavouritesComponent.displayName = `withFavourites(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithFavouritesComponent;
}

export default withFavourites;
