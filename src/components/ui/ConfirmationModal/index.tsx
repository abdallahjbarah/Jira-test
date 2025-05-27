import React from 'react';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import FilledButton from '@/components/ui/buttons/FilledButton';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: 'primary' | 'danger';
  isLoading?: boolean;
}

const MessageContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const MessageText = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  margin: 0;
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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonVariant = 'primary',
  isLoading = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const confirmButtonClass =
    confirmButtonVariant === 'danger'
      ? 'bg-red-500 hover:bg-red-600 text-white'
      : '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width='450px'>
      <div>
        <MessageContainer>
          <MessageText>{message}</MessageText>
        </MessageContainer>

        <ButtonContainer>
          <CancelButton onClick={onClose} disabled={isLoading} type='button'>
            {cancelText}
          </CancelButton>

          <FilledButton
            text={confirmText}
            isButton
            onClick={handleConfirm}
            buttonType='button'
            width='w-[10.67rem]'
            height='h-[3.8125rem]'
            className={`rounded-custom-16 !text-custom-18 ${confirmButtonClass}`}
            isDisable={isLoading}
          />
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
