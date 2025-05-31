'use client';

import React, { useState } from 'react';
import FAQModal from '../FAQs';
import { Ticket } from './types';
import TicketDetail from './TicketDetail';
import TicketList from './TicketList';
import CreateTicket from './CreateTicket';
import { useTranslation } from '@/contexts/TranslationContext';

const HelpCenterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [showDetail, setShowDetail] = useState(true);
  const [showFullDetail, setShowFullDetail] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('helpRequests');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleSubmit = (data: { subject: string; description: string }) => {
    if (!data.subject || !data.description) {
      alert(t('helpCenter.fillFields'));
      return;
    }

    const newRequest: Ticket = {
      subject: data.subject,
      description: data.description,
      fileName: null,
      fileUrl: null,
      date: new Date().toISOString(),
      status: t('helpCenter.inReview'),
      statusColor: '#47C409',
      ref: Math.floor(1000000 + Math.random() * 9000000).toString(),
    };

    const updated = [newRequest, ...tickets];
    setTickets(updated);
    localStorage.setItem('helpRequests', JSON.stringify(updated));
    setShowDetail(true);
  };

  const handleClose = () => {
    setShowDetail(true);
    setShowFullDetail(false);
    onClose();
  };

  const handleBack = () => {
    setShowFullDetail(false);
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFAQModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {showFullDetail && selectedTicket ? (
        <TicketDetail ticket={selectedTicket} onBack={handleBack} />
      ) : showDetail ? (
        <TicketList
          tickets={tickets}
          onTicketSelect={(ticket) => {
            setSelectedTicket(ticket);
            setShowFullDetail(true);
          }}
          onCreateNew={() => setShowDetail(false)}
          onClose={handleClose}
        />
      ) : (
        <CreateTicket
          onSubmit={handleSubmit}
          onClose={handleClose}
          onFAQClick={handleFAQClick}
        />
      )}

      {showFAQModal && (
        <FAQModal isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />
      )}
    </div>
  );
};

export default HelpCenterModal;