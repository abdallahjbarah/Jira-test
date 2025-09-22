import CustomSvg from '@/components/ui/CustomSvg';
import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import React from 'react';
import styled from 'styled-components';
import useCurrency from '../../../utils/hooks/useCurrency';

interface CancellationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  cancelationSuccessData: any;
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

const CancellationSuccess: React.FC<CancellationSuccessProps> = ({
  isOpen,
  onClose,
  cancelationSuccessData,
}) => {
  const { t } = useTranslation();
  const { currency } = useCurrency();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('bookingStatus.cancellationPolicyModal.title')}
      width='540px'
    >
      <div className='flex flex-col items-center justify-center'>
        <CustomSvg
          src='/SVGs/shared/check-icon.svg'
          width={81}
          height={81}
          className='text-green-500'
          color='currentColor'
        />
        <h1 className='text-text_1 text-3xl font-black mt-[45px]'>
          {t('bookingStatus.cancellationSuccess.title')}
        </h1>
        <p className='text-text_2 text-base mt-[37px] text-center'>
          {t('bookingStatus.cancellationSuccess.description')}
        </p>
        <p className='text-text_2 text-base mt-[37px] text-center'>
          {t('bookingStatus.cancellationSuccess.yourRefund')}{' '}
          <span className='text-text_1 font-black'>
            {cancelationSuccessData?.refundInfo?.refundAmount?.toFixed(2)}{' '}
            {currency}
          </span>
        </p>
        <NextButton onClick={onClose}>
          {t('bookingStatus.cancellationSuccess.action')}
        </NextButton>
      </div>
    </Modal>
  );
};

export default CancellationSuccess;
