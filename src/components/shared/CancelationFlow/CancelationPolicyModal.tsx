import React from 'react';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import Divider from '@/components/ui/Divider';

interface CancelationPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: string;
  onNext: () => void;
}

const NextButton = styled.button`
  background-color: #5ac42a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 65px;

  &:hover {
    background-color: #4ca224;
  }
`;

const CancelationPolicyModal: React.FC<CancelationPolicyModalProps> = ({
  isOpen,
  onClose,
  policy,
  onNext,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('bookingStatus.cancellationPolicyModal.title')}
      width='540px'
    >
      <div>
        <div>
          <p className='text-text_1 text-lg'>
            {t('bookingStatus.cancellationPolicyModal.sendEmail')}
          </p>
          <h1 className='text-text_1 font-bold text-lg mt-[21px]'>
            {t('bookingStatus.cancellationPolicyModal.cancellationCost')}
          </h1>
          <span className='text-primary_1 text-lg mt-[8px]'>{t('free')}</span>
        </div>
        <Divider className='my-6' />
        <div className='space-y-4'>
          <h2 className='text-text_1 text-lg font-bold'>
            {t('bookingStatus.cancellationPolicyModal.cancelPolicy')}
          </h2>
          <p
            className='text-text_2 text-base'
            dangerouslySetInnerHTML={{ __html: policy }}
          />
        </div>

        <NextButton onClick={onNext}>{t('next')}</NextButton>
      </div>
    </Modal>
  );
};

export default CancelationPolicyModal;
