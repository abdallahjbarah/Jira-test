import React from 'react';
import ConfirmationModal from './index';
import useConfirmationModal from '@/hooks/useConfirmationModal';

interface ConfirmationModalProviderProps {
  children: React.ReactNode;
}

const ConfirmationModalProvider: React.FC<ConfirmationModalProviderProps> = ({
  children,
}) => {
  const { isOpen, config, isLoading, closeConfirmation, handleConfirm } =
    useConfirmationModal();

  return (
    <>
      {children}
      {config && (
        <ConfirmationModal
          isOpen={isOpen}
          onClose={closeConfirmation}
          onConfirm={handleConfirm}
          title={config.title}
          message={config.message}
          confirmText={config.confirmText}
          cancelText={config.cancelText}
          confirmButtonVariant={config.confirmButtonVariant}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ConfirmationModalProvider;
