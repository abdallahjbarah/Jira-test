import { useTranslation } from '@/contexts/TranslationContext';
import React from 'react';
import Styled from 'styled-components';

const FilterBarItemContainer = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  cursor: pointer;
  padding: 20px 55px;
  border-radius: 9999px;

  &:hover {
    background: #70707042;
  }
`;

interface FilterBarItemProps {
  title: {
    en: string;
    ar: string;
  };
  value: string;
  onClick: () => void;
}

const FilterBarItem = ({ title, value, onClick }: FilterBarItemProps) => {
  const { locale } = useTranslation();
  return (
    <FilterBarItemContainer onClick={onClick}>
      <span className='text-[25px] font-custom-500 text-[#ffffff] '>
        {title[locale]}
      </span>
      <span className='text-[18px] font-custom-500 text-[#ffffff] '>
        {value}
      </span>
    </FilterBarItemContainer>
  );
};

export default FilterBarItem;
