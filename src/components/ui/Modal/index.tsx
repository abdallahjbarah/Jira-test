import React, { useRef } from 'react';
import styled from 'styled-components';
import CustomSvg from '../CustomSvg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  containerClassName?: string;
  canClose?: boolean;
  headerPrefix?: React.ReactNode;
}

// Styled components defined outside the render method
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ModalContainer = styled.div<{ width?: string }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
  width: ${({ width }) => width || '500px'};
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: translateY(0);
  transition: transform 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  position: relative;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  padding-bottom: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: background-color 0.2s;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 1000;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

const ModalContent = styled.div``;

/**
 * Reusable Modal component
 *
 * Note: The keyboard event and body scroll handling are
 * now managed by the useModal hook
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width,
  containerClassName,
  canClose = true,
  headerPrefix,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (canClose) {
        onClose();
      }
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOutsideClick}>
      <ModalContainer
        ref={modalRef}
        width={width}
        onClick={(e) => e.stopPropagation()}
        className={containerClassName}
      >
        {canClose && (
          <CloseButton type='button' onClick={onClose}>
            <CustomSvg
              src='/SVGs/shared/close-icon.svg'
              className='w-6 h-6 text-primary_1'
            />
          </CloseButton>
        )}

        <ModalHeader>
          {headerPrefix && headerPrefix}
          {title && <ModalTitle>{title}</ModalTitle>}
          <div className='absolute bottom-0  h-[1px] bg-gray-200 w-[312px] mx-auto'></div>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
