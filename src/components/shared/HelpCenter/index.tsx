'use client';

import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchTickets } from '@/lib/apis/helpCenter/useFetchTickets';
import { Ticket } from '@/lib/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FAQModal from '../FAQs';
import CreateTicket from './CreateTicket';
import TicketDetail from './TicketDetail';
import TicketList from './TicketList';

type ViewState = 'list' | 'create' | 'faq';

const HelpCenterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { data: tickets, isLoading } = useFetchTickets({
    enabled: isOpen,
  });

  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (
      !isLoading &&
      tickets &&
      tickets.length === 0 &&
      currentView === 'list' &&
      !selectedTicket
    ) {
      setCurrentView('create');
    }
  }, [tickets, isLoading, currentView, selectedTicket]);

  const handleSubmit = (data: { subject: string; description: string }) => {
    setCurrentView('list');
  };

  const handleClose = () => {
    setCurrentView('list');
    setSelectedTicket(null);
    onClose();
  };

  const handleBack = () => {
    setSelectedTicket(null);

    const hasTickets = tickets && tickets.length > 0;
    setCurrentView(hasTickets ? 'list' : 'create');
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('faq');
  };

  const getModalTitle = () => {
    if (selectedTicket) return `Ref ${selectedTicket.code}`;
    return t('helpCenter.title');
  };

  const canCloseModal = !selectedTicket;

  const renderContent = () => {
    if (selectedTicket) {
      return <TicketDetail ticket={selectedTicket} onBack={handleBack} />;
    }

    switch (currentView) {
      case 'list':
        return (
          <TicketList
            tickets={tickets || []}
            onTicketSelect={setSelectedTicket}
            onCreateNew={() => setCurrentView('create')}
            onClose={handleClose}
            isLoading={isLoading}
          />
        );
      case 'create':
        return (
          <CreateTicket
            onSubmit={handleSubmit}
            onClose={handleClose}
            onFAQClick={handleFAQClick}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getModalTitle()}
        width='566px'
        containerClassName='w-[566px] h-[761px] laptopM:w-[566px] laptopM:h-[761px]'
        canClose={canCloseModal}
        headerPrefix={
          selectedTicket ? (
            <div
              className='absolute left-0 top-0 w-6 h-6 flex items-center justify-center cursor-pointer'
              onClick={handleBack}
            >
              <Image
                src='/SVGs/shared/back-arrow.svg'
                alt='Back'
                width={24}
                height={24}
              />
            </div>
          ) : null
        }
      >
        {renderContent()}
      </Modal>

      {currentView === 'faq' && (
        <FAQModal isOpen={true} onClose={() => setCurrentView('list')} />
      )}
    </>
  );
};

export default HelpCenterModal;
