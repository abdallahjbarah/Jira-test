import React from 'react';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';
import Collapsible from '@/components/ui/Collapsible';
import { useFetchFaqs } from '@/lib/apis/faqs/useFetchFaqs';
import { reshapeFaqs } from '@/utils/helpers/faqsHelpers';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelButton = styled.button`
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
  margin-top: 37px;

  &:hover {
    background-color: #4ca224;
  }
`;

const ContactText = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const ContactLink = styled.span`
  color: #5ac42a;
  cursor: pointer;
  font-weight: 500;
`;

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const { t, locale } = useTranslation();
  const { data: faqData } = useFetchFaqs();

  const reshapedFaqs = reshapeFaqs(faqData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='FAQs' width='550px'>
      <div>
        <div className='space-y-4'>
          {reshapedFaqs?.map((faq) => (
            <Collapsible
              key={faq._id}
              title={faq.question[locale]}
              className=' py-3 px-[1.625rem] border border-solid border-secondary_3 rounded-lg'
              titleClassName='text-text_1 text-sm font-bold'
              defaultOpen={false}
            >
              <p
                className='text-text_3 text-xs'
                dangerouslySetInnerHTML={{
                  __html: faq.answer[locale],
                }}
              />
            </Collapsible>
          ))}
        </div>

        <CancelButton onClick={onClose}>Cancel</CancelButton>

        <ContactText>
          Didn't find what you were looking for?{' '}
          <Link href='/contact' passHref>
            <ContactLink>Contact Us</ContactLink>
          </Link>
        </ContactText>
      </div>
    </Modal>
  );
};

export default FAQModal;
