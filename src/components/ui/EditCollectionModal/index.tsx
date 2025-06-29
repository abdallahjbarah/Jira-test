import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import FormInput from '@/components/form/FormInput';
import FilledButton from '@/components/ui/buttons/FilledButton';
import { useUpdateCollectionDetails } from '@/lib/apis/favorites/useUpdateCollectionDetails';
import { useTranslation } from '@/contexts/TranslationContext';
import { useQueryClient } from '@tanstack/react-query';

interface EditCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string;
  currentName: string;
  onSuccess?: () => void;
}

const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #666;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
  padding: 0.9375rem 2.125rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 10.67rem;
  height: 3.8125rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
    border-color: #d0d0d0;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditCollectionModal: React.FC<EditCollectionModalProps> = ({
  isOpen,
  onClose,
  collectionId,
  currentName,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [collectionName, setCollectionName] = useState(currentName);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const { mutate: updateCollection, isPending } = useUpdateCollectionDetails({
    onSuccess: () => {
      onSuccess?.();
      onClose();
      setError('');
    },
    onError: (error: any) => {
      setError(error?.message || t('common.error.generic'));
    },
  });

  useEffect(() => {
    if (isOpen) {
      setCollectionName(currentName);
      setError('');
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!collectionName.trim()) {
      setError(t('wishlist.editModal.validation.nameRequired'));
      return;
    }

    if (collectionName.trim() === currentName.trim()) {
      setError(t('wishlist.editModal.validation.nameUnchanged'));
      return;
    }

    setError('');

    updateCollection({
      id: collectionId,
      collectionName: collectionName.trim(),
    });
  };

  const handleCancel = () => {
    setCollectionName(currentName);
    setError('');
    onClose();
  };

  const isFormValid =
    collectionName.trim() && collectionName.trim() !== currentName.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={t('wishlist.editModal.title')}
      width='500px'
    >
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormInput
            label={t('wishlist.editModal.collectionNameLabel')}
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            error={error}
            placeholder={t('wishlist.editModal.collectionNamePlaceholder')}
            disabled={isPending}
            maxLength={100}
            autoFocus
          />
        </FormContainer>

        <ButtonContainer>
          <CancelButton
            type='button'
            onClick={handleCancel}
            disabled={isPending}
          >
            {t('common.cancel')}
          </CancelButton>

          <FilledButton
            text={isPending ? t('common.saving') : t('common.save')}
            isButton
            buttonType='submit'
            width='w-[10.67rem]'
            height='h-[3.8125rem]'
            className='rounded-custom-16 !text-custom-18'
            isDisable={isPending || !isFormValid}
          />
        </ButtonContainer>
      </form>
    </Modal>
  );
};

export default EditCollectionModal;
