'use client';
import {
  CancelationPolicyModal,
  CancelationReasonsModal,
  CancellationSuccess,
} from '@/components/shared/CancelationFlow';
import { useTranslation } from '@/contexts/TranslationContext';
import useModal from '@/hooks/useModal';
import { BookingStatus } from '@/lib/enums';
import { BookingDetails } from '@/lib/types';
import { useState } from 'react';
import { whatsappLink } from '../../../utils';

interface BookingStatusSectionProps {
  detailsData: BookingDetails;
  refetch: () => void;
}

const BookingStatusSection = ({
  detailsData,
  refetch,
}: BookingStatusSectionProps) => {
  const isShowWhatsApp =
    detailsData.booking.paymentMethod.name ===
    'Credit/Debit Card (Visa/Mastercard)';
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

  const [cancelationSuccessData, setCancelationSuccessData] =
    useState<any>(null);

  const getStatusLabel = (status: number) => {
    switch (status) {
      case BookingStatus.PENDING:
        return t('bookingStatus.pending');
      case BookingStatus.REFUND_REQUESTED:
        return t('bookingStatus.refundRequested');
      case BookingStatus.REFUNDED:
        return t('bookingStatus.refunded');
      case BookingStatus.APPROVED:
        return t('bookingStatus.approved');
      case BookingStatus.DECLINED:
        return t('bookingStatus.declined');
      case BookingStatus.REFUNDED:
        return t('bookingStatus.refunded');
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
      case BookingStatus.REFUND_REQUESTED:
        return 'bg-[#FFCC0110] text-[#FFCC01]';
      case BookingStatus.REFUNDED:
        return 'bg-white text-red-500 border border-red-500 border-solid';
      case BookingStatus.APPROVED:
        return 'bg-white text-green-500 border border-green-500 border-solid';
      case BookingStatus.DECLINED:
        return 'bg-white text-red-500 border border-red-500 border-solid';
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
    // openCancellationSuccessModal();
  };

  const onCancel = () => {
    closeCancelationReasonsModal();
    openCancellationSuccessModal();
  };

  const onNext = () => {
    closeModal();
    openCancelationReasonsModal();
  };

  const onWhatsapp = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className='flex items-center gap-2.5 mt-[27px]'>
      <span
        className={`rounded-full text-sm font-medium px-11 py-2.5 ${getStatusColor(detailsData.booking.status)}`}
      >
        {getStatusLabel(detailsData.booking.status)}
      </span>

      {detailsData.canCancel &&
        detailsData.booking.status! != BookingStatus.CANCELLED &&
        detailsData.booking.status! != BookingStatus.COMPLETED && (
          <button
            className='px-11 py-2.5 bg-[#47C40910] text-text_1 border border-green-200 rounded-full hover:bg-green-100 transition-colors duration-200 text-sm font-medium'
            onClick={openModal}
          >
            {t('bookingStatus.cancel')}
          </button>
        )}
      {!isShowWhatsApp && (
        <div
          className='flex items-center gap-2 px-6 py-1 bg-white border border-solid border-gray-200 rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all duration-200'
          onClick={onWhatsapp}
        >
          <span className='text-gray-700 text-sm font-medium'>
            {t('booking.contactUsToRefund')}
          </span>
          <div className='flex items-center gap-2 px-4 py-0 bg-[#25D366] text-white rounded-full text-sm font-medium underline'>
            <img src={'/SVGs/shared/whatsAppIcon.svg'} />
            WhatsApp
          </div>
        </div>
      )}

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
          onCancel={onCancel}
          refetch={refetch}
          onSuccess={setCancelationSuccessData}
        />
      )}
      {isCancellationSuccessModalOpen && (
        <CancellationSuccess
          isOpen={isCancellationSuccessModalOpen}
          onClose={closeCancellationSuccessModal}
          cancelationSuccessData={cancelationSuccessData}
        />
      )}
    </div>
  );
};

export default BookingStatusSection;
