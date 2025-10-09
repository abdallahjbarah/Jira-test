import CustomSvg from '@/components/ui/CustomSvg';
import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

interface BookingSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  lang: string;
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

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  isOpen,
  onClose,
  bookingId,
  lang,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleViewBooking = () => {
    router.push(`/${lang}/my-bookings/${bookingId}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('booking.success.title')}
      width='540px'
    >
      <div className='flex flex-col items-center justify-center'>
        <CustomSvg
          src='/SVGs/shared/pendingIcon.svg'
          width={81}
          height={81}
          className='text-green-500'
          color='currentColor'
        />
        <h1 className='text-text_1 text-3xl font-black mt-[45px]'>
          {t('booking.success.message')}
        </h1>
        <p className='text-text_2 text-base mt-[27px] text-center'>
          {t('booking.success.description')}
        </p>
        <p className='text-text_2 text-sm mt-[20px] text-center italic'>
          {t('booking.success.emailNote')}
        </p>
        <NextButton onClick={handleViewBooking}>
          {t('booking.success.viewBooking')}
        </NextButton>
      </div>
    </Modal>
  );
};

export default BookingSuccess;
