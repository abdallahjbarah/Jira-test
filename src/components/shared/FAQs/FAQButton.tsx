import React from 'react';
import styled from 'styled-components';
import FAQModal from './FAQModal';
import CustomSvg from '@/components/ui/CustomSvg';
import useModal from '@/hooks/useModal';

interface FAQButtonProps {
  className?: string;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #5ac42a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4ca224;
  }
`;

const FAQButton: React.FC<FAQButtonProps> = ({ className }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={openModal} className={className}>
        <CustomSvg
          src='/SVGs/shared/faq.svg'
          className='w-5 h-5'
          color='white'
        />
        FAQs
      </Button>
      <FAQModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default FAQButton;
