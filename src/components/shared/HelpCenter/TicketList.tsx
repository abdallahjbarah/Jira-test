'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { Ticket } from './types';

interface TicketListProps {
    tickets: Ticket[];
    onTicketSelect: (ticket: Ticket) => void;
    onCreateNew: () => void;
    onClose: () => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onTicketSelect, onCreateNew, onClose }) => {
    const { t, locale } = useTranslation();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="relative w-[566px] h-[761px]">
            <div className="absolute w-[566px] h-[761px] left-0 top-0 bg-white rounded-[10px] shadow-[0px_3px_20px_rgba(0,0,0,0.08)] flex flex-col items-center overflow-hidden">
                <button
                    className="absolute left-[94.7%] right-[1.59%] top-[1.71%] bottom-[95.5%] bg-none border-none cursor-pointer w-[21px] h-[21px] flex items-center justify-center"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <Image src="/SVGs/shared/close-icon.svg" alt="Close" width={24} height={24} />
                </button>

                <div className="absolute w-[312px] top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <div className="w-[140px] font-bold text-xl leading-6 text-center text-[#222222] mb-5 whitespace-nowrap">{t('helpCenter.title')}</div>
                    <div className="w-[312px] h-[1px] border border-solid border-[#EEEEEE]"></div>
                </div>

                <div className="w-full flex-1 overflow-y-auto flex flex-col items-center gap-4 mt-[110px] mb-[140px] max-h-[550px] py-5">
                    {tickets.map((ticket, index) => (
                        <div
                            key={ticket.ref}
                            className={`w-[488px] min-h-[143px] bg-white ${index === 0 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' : 'shadow-[0px_3px_20px_rgba(0,0,0,0.08)]'} rounded-[16px] p-5 flex flex-col justify-start box-border cursor-pointer mb-0 relative border-[0.5px] border-solid border-[#EEEEEE]`}
                            onClick={() => onTicketSelect(ticket)}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-normal text-sm leading-[17px] text-[#47C409]">{t('helpCenter.inReview')}</span>
                                <span className="text-[#888]">•</span>
                                <span className="font-normal text-sm leading-[17px] text-[#888]">{formatDate(ticket.date)}</span>
                            </div>
                            <div className="font-semibold text-sm leading-[17px] text-[#222222] mb-2 break-words min-h-[17px] line-clamp-2">{ticket.subject}</div>
                            <div className="font-normal text-sm leading-[17px] text-[#999999] w-full min-h-[34px] mb-2 line-clamp-2 break-words">
                                {ticket.description}
                            </div>
                            <div className="font-normal text-xs leading-[14px] text-[#999999] mt-auto">Ref {ticket.ref}</div>
                        </div>
                    ))}
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 top-[655px] flex gap-4 bg-white py-5">
                    <button
                        className="w-[127.42px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-lg leading-[22px] text-center cursor-pointer flex items-center justify-center"
                        onClick={onCreateNew}
                    >
                        <span className="absolute w-[127.42px] h-[22px] font-bold text-lg leading-[22px] text-center text-white">{t('helpCenter.needHelpButton')}</span>
                    </button>
                    <button className="w-[127.42px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-lg leading-[22px] text-center cursor-pointer flex items-center justify-center">
                        <span className="absolute w-[127.42px] h-[22px] font-bold text-lg leading-[22px] text-center text-white">{t('helpCenter.contactUs')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketList; 