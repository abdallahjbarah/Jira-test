import React from 'react';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';
import Collapsible from '@/components/ui/Collapsible';

interface FAQ {
  id: number;
  title: string;
  content: string;
}

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

const faqData: FAQ[] = [
  {
    id: 1,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
  },
  {
    id: 2,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel urna malesuada hendrerit.',
  },
  {
    id: 3,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel urna malesuada hendrerit.',
  },
  {
    id: 4,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel urna malesuada hendrerit.',
  },
  {
    id: 5,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel urna malesuada hendrerit.',
  },
  {
    id: 6,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel urna malesuada hendrerit.',
  },
  {
    id: 7,
    title: 'Title For FAQ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel urna malesuada hendrerit.',
  },
];

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='FAQs' width='550px'>
      <div>
        <div className='space-y-4'>
          {faqData.map((faq) => (
            <Collapsible
              key={faq.id}
              title={faq.title}
              defaultOpen={faq.id === 1}
              className=' py-3 px-[1.625rem] border border-solid border-secondary_3 rounded-lg'
              titleClassName='text-text_1 text-sm font-bold'
            >
              <p className='text-text_3 text-xs'>{faq.content}</p>
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
