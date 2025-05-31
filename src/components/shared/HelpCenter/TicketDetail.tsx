'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { Ticket } from './types';

interface TicketDetailProps {
    ticket: Ticket;
    onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack }) => {
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
        <div className="relative w-[573px] h-[762px]">
            <div className="absolute w-[573px] h-[762px] left-0 top-0 bg-white rounded-[10px] shadow-[0px_3px_20px_rgba(0,0,0,0.08)]">
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[419px] flex flex-col items-center gap-5">
                    <div className="absolute left-[-50px] top-0 w-6 h-6 flex items-center justify-center cursor-pointer" onClick={onBack}>
                        <Image src="/SVGs/shared/back-arrow.svg" alt="Back" width={24} height={24} />
                    </div>
                    <div className="w-[140px] font-bold text-xl leading-6 text-center text-[#222222]">Ref {ticket.ref}</div>
                    <div className="w-[312px] h-[1px] border border-solid border-[#EEEEEE]"></div>
                </div>

                <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[515px] min-h-[285px] flex flex-col box-border">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                            <Image src="/SVGs/shared/website-reply.svg" alt="Website Reply" width={40} height={40} />
                        </div>
                        <div className="flex items-center gap-2 text-sm leading-[17px] text-[#999999]">
                            <span className="text-[#222222]">{t('helpCenter.reviewStatus')}</span> • <span className="text-[#999999]">{formatDate(ticket.date)}</span>
                        </div>
                    </div>

                    <div className="relative ml-[19px] pl-[37px] border-l border-[#EEEEEE] -mt-1">
                        <div className="font-semibold text-base leading-[19px] text-[#222222] mb-2 break-words">{ticket.subject}</div>
                        <div className="font-normal text-[17px] leading-5 text-[#999999] w-full max-w-[459px] h-[100px] mb-2 pr-4 overflow-y-auto break-words">
                            {ticket.description}
                        </div>
                        {ticket.fileName && ticket.fileUrl && (
                            <div
                                className="w-[105px] h-[151px] bg-gray-200 rounded-[16px] bg-cover bg-center bg-no-repeat flex-shrink-0"
                                style={{ backgroundImage: `url(${ticket.fileUrl})` }}
                            />
                        )}
                    </div>
                </div>

                <div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 w-[515px] h-[155px] py-6 px-6 box-border flex flex-col justify-start mt-[34px] ml-[19px] pl-[37px]">
                    <div className="absolute left-[-19px] top-6 w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                        <Image src="/SVGs/shared/website-reply.svg" alt="Website Reply" width={40} height={40} />
                    </div>
                    <div className="font-normal text-sm leading-[17px] text-[#999999] mb-2">
                        <span className="text-[#222222]">{t('helpCenter.reviewStatus')}</span> • <span className="text-[#999999]">{formatDate(ticket.date)}</span>
                    </div>
                    <div className="font-semibold text-base leading-[19px] text-[#222222] mb-2">{t('helpCenter.websiteReply')}</div>
                    <div className="font-normal text-[17px] leading-5 text-[#999999] w-full max-w-[462px] h-[100px] pr-4 overflow-y-auto break-words">
                        {t('helpCenter.thankYouMessage')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetail; 