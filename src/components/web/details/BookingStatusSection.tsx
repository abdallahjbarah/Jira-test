import {
  CancelationPolicyModal,
  CancelationReasonsModal,
  CancellationSuccess,
} from '@/components/shared/CancelationFlow';
import { useTranslation } from '@/contexts/TranslationContext';
import useModal from '@/hooks/useModal';
import { BookingStatus } from '@/lib/enums';
import { BookingDetails } from '@/lib/types';
import React from 'react';

interface BookingStatusSectionProps {
  detailsData: BookingDetails;
}

const BookingStatusSection = ({ detailsData }: BookingStatusSectionProps) => {
  const { t } = useTranslation();
  const { openModal, closeModal, isOpen } = useModal();
  const {
    isOpen: isCancelationReasonsModalOpen,
    openModal: openCancelationReasonsModal,
    closeModal: closeCancelationReasonsModal,
  } = useModal();

  const {
    isOpen: isCancellationSuccessModalOpen,
    openModal: openCancellationSuccessModal,
    closeModal: closeCancellationSuccessModal,
  } = useModal();

  const getStatusLabel = (status: number) => {
    switch (status) {
      case BookingStatus.PENDING:
        return t('bookingStatus.pending');
      case BookingStatus.CANCELLED:
        return t('bookingStatus.cancelled');
      case BookingStatus.COMPLETED:
        return t('bookingStatus.completed');
      default:
        return t('bookingStatus.pending');
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'bg-[#FFCC0110] text-[#FFCC01]';
      case BookingStatus.CANCELLED:
        return 'bg-gray-50 text-gray-700 ';
      case BookingStatus.COMPLETED:
        return 'bg-green-50 text-green-700 ';
      default:
        return 'bg-yellow-50 text-yellow-700';
    }
  };

  const onCancelReasonModalClose = () => {
    closeCancelationReasonsModal();
    openCancellationSuccessModal();
  };

  const onNext = () => {
    closeModal();
    openCancelationReasonsModal();
  };

  return (
    <div className='flex items-center gap-2.5 mt-[27px]'>
      <span
        className={`rounded-full text-sm font-medium px-11 py-2.5 ${getStatusColor(detailsData.booking.status)}`}
      >
        {getStatusLabel(detailsData.booking.status)}
      </span>
      {/* {detailsData?.canCancel && ( */}
      <button
        className='px-11 py-2.5 bg-[#47C40910] text-text_1 border border-green-200 rounded-full hover:bg-green-100 transition-colors duration-200 text-sm font-medium'
        onClick={openModal}
      >
        {t('bookingStatus.cancel')}
      </button>
      {/* )} */}
      {isOpen && (
        <CancelationPolicyModal
          isOpen={isOpen}
          onClose={closeModal}
          policy={detailsData.booking?.siteId?.cancellationPolicy}
          onNext={onNext}
        />
      )}
      {isCancelationReasonsModalOpen && (
        <CancelationReasonsModal
          isOpen={isCancelationReasonsModalOpen}
          onClose={onCancelReasonModalClose}
          bookingId={detailsData.booking._id}
          onCancel={closeCancelationReasonsModal}
        />
      )}
      {isCancellationSuccessModalOpen && (
        <CancellationSuccess
          isOpen={isCancellationSuccessModalOpen}
          onClose={closeCancellationSuccessModal}
        />
      )}
    </div>
  );
};

export default BookingStatusSection;
