import { useTranslation } from '@/contexts/TranslationContext';
import { Ticket } from '@/lib/types';
import { locale } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

const TicketItemContainer = styled.div`
  padding: 16px 24px;
  box-shadow: 0px 3px 20px 0px #00000014;
`;

const TicketItem: React.FC<{
  ticket: Ticket;
  onTicketSelect: (ticket: Ticket) => void;
}> = ({ ticket, onTicketSelect }) => {
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
    <TicketItemContainer
      className={`min-h-[143px] bg-white  rounded-[16px] flex flex-col justify-start box-border cursor-pointer mb-0 relative`}
      onClick={() => onTicketSelect(ticket)}
    >
      <div className='flex items-center gap-2 mb-2'>
        <span className='font-normal text-sm leading-[17px] text-[#47C409]'>
          {t('helpCenter.inReview')}
        </span>
        <span className='text-[#888]'>•</span>
        <span className='font-normal text-sm leading-[17px] text-[#888]'>
          {formatDate(ticket.createdAt)}
        </span>
      </div>
      <div className='font-semibold text-sm leading-[17px] text-[#222222] mb-2 break-words min-h-[17px] line-clamp-2'>
        {ticket.subject}
      </div>
      <div className='font-normal text-sm leading-[17px] text-[#999999] w-full min-h-[34px] mb-2 line-clamp-2 break-words'>
        {ticket.message}
      </div>
      <div className='font-normal text-xs leading-[14px] text-[#999999] mt-auto'>
        Ref {ticket.code}
      </div>
    </TicketItemContainer>
  );
};

export default TicketItem;
