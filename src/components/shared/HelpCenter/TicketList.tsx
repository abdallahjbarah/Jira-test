'use client';

import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Ticket } from '@/lib/types';
import TicketItem from '../TicketItem';
import CircularLoader from '@/components/ui/CircularLoader';

interface TicketListProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
  onCreateNew: () => void;
  onClose: () => void;
  isLoading: boolean;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onTicketSelect,
  onCreateNew,
  onClose,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='flex flex-col gap-4 overflow-y-auto h-[500px]'>
        {tickets?.map((ticket, index) => (
          <TicketItem
            key={ticket._id}
            ticket={ticket}
            onTicketSelect={onTicketSelect}
          />
        ))}
      </div>

      {isLoading && (
        <div className='w-full flex justify-center items-center'>
          <CircularLoader />
        </div>
      )}
      <div className='absolute left-1/2 transform -translate-x-1/2 top-[655px] flex gap-4 bg-white py-5'>
        <button
          className='w-[127.42px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-lg leading-[22px] text-center cursor-pointer flex items-center justify-center'
          onClick={onCreateNew}
        >
          <span className='absolute w-[127.42px] h-[22px] font-bold text-lg leading-[22px] text-center text-white'>
            {t('helpCenter.needHelpButton')}
          </span>
        </button>
        <button className='w-[127.42px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-lg leading-[22px] text-center cursor-pointer flex items-center justify-center'>
          <span className='absolute w-[127.42px] h-[22px] font-bold text-lg leading-[22px] text-center text-white'>
            {t('helpCenter.contactUs')}
          </span>
        </button>
      </div>
    </>
  );
};

export default TicketList;
