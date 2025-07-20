import { useState, useCallback } from 'react';

interface ConfirmationConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: 'primary' | 'danger';
}

interface UseConfirmationModalReturn {
  isOpen: boolean;
  config: ConfirmationConfig | null;
  isLoading: boolean;
  openConfirmation: (config: ConfirmationConfig) => Promise<boolean>;
  closeConfirmation: () => void;
  handleConfirm: () => void;
  setLoading: (loading: boolean) => void;
}

const useConfirmationModal = (): UseConfirmationModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const openConfirmation = useCallback(
    (confirmationConfig: ConfirmationConfig): Promise<boolean> => {
      return new Promise(resolve => {
        setConfig(confirmationConfig);
        setIsOpen(true);
        setResolvePromise(() => resolve);
      });
    },
    []
  );

  const closeConfirmation = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }

    setTimeout(() => {
      setConfig(null);
    }, 300);
  }, [resolvePromise]);

  const handleConfirm = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
    setIsOpen(false);
    setIsLoading(false);

    setTimeout(() => {
      setConfig(null);
    }, 300);
  }, [resolvePromise]);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return {
    isOpen,
    config,
    isLoading,
    openConfirmation,
    closeConfirmation,
    handleConfirm,
    setLoading,
  };
};

export default useConfirmationModal;
