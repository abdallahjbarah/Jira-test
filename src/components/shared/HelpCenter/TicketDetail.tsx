'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { Ticket } from '@/lib/types';
import { useFetchTicketDetails } from '@/lib/apis/helpCenter/useFetchTicketDetails';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack }) => {
  const { data: ticketDetails } = useFetchTicketDetails(ticket._id);
  const { t, locale } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className='absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[515px] min-h-[285px] flex flex-col box-border'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center'>
            <Image
              src='/SVGs/shared/website-reply.svg'
              alt='Website Reply'
              width={40}
              height={40}
            />
          </div>
          <div className='flex items-center gap-2 text-sm leading-[17px] text-[#999999]'>
            <span className='text-[#222222]'>
              {t('helpCenter.reviewStatus')}
            </span>{' '}
            •{' '}
            <span className='text-[#999999]'>
              {formatDate(ticketDetails?.createdAt || '')}
            </span>
          </div>
        </div>

        <div className='relative ml-[19px] pl-[37px] border-l border-[#EEEEEE] -mt-1'>
          <div className='font-semibold text-base leading-[19px] text-[#222222] mb-2 break-words'>
            {ticketDetails?.subject}
          </div>
          <div className='font-normal text-[17px] leading-5 text-[#999999] w-full max-w-[459px] h-[100px] mb-2 pr-4 overflow-y-auto break-words'>
            {ticketDetails?.message}
          </div>
          {ticketDetails?.attachment && (
            <div
              className='w-[105px] h-[151px] bg-gray-200 rounded-[16px] bg-cover bg-center bg-no-repeat flex-shrink-0'
              style={{ backgroundImage: `url(${ticketDetails?.attachment})` }}
            />
          )}
        </div>
      </div>

      <div className='absolute top-[450px] left-1/2 transform -translate-x-1/2 w-[515px] h-[155px] py-6 px-6 box-border flex flex-col justify-start mt-[34px] ml-[19px] pl-[37px]'>
        <div className='absolute left-[-19px] top-6 w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center'>
          <Image
            src='/SVGs/shared/website-reply.svg'
            alt='Website Reply'
            width={40}
            height={40}
          />
        </div>
        <div className='font-normal text-sm leading-[17px] text-[#999999] mb-2'>
          <span className='text-[#222222]'>{t('helpCenter.reviewStatus')}</span>{' '}
          •{' '}
          <span className='text-[#999999]'>
            {formatDate(ticketDetails?.createdAt || '')}
          </span>
        </div>
        <div className='font-semibold text-base leading-[19px] text-[#222222] mb-2'>
          {t('helpCenter.websiteReply')}
        </div>
        <div className='font-normal text-[17px] leading-5 text-[#999999] w-full max-w-[462px] h-[100px] pr-4 overflow-y-auto break-words'>
          {t('helpCenter.thankYouMessage')}
        </div>
      </div>
    </>
  );
};

export default TicketDetail;
