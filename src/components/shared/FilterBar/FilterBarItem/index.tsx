import { useTranslation } from '@/contexts/TranslationContext';
import Styled from 'styled-components';

const FilterBarItemContainer = Styled.div<{ $isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  padding: 20px 48px;
  border-radius: 9999px;
  background: ${props => (props.$isOpen ? 'white' : 'transparent')};
  transition: all 0.3s ease-in-out;

  ${props =>
    props.$isOpen &&
    `
    span {
      color: #16a34a !important;
      transition: color 0.3s ease-in-out;
    }
  `}
`;

interface FilterBarItemProps {
  title: {
    en: string;
    ar: string;
  };
  value: string;
  onClick: () => void;
  className?: string;
}

const FilterBarItem = ({
  title,
  value,
  onClick,
  className,
}: FilterBarItemProps) => {
  const { locale } = useTranslation();
  const isOpen = className?.includes('bg-white');

  return (
    <FilterBarItemContainer
      onClick={onClick}
      className={className}
      $isOpen={isOpen}
    >
      <span className='text-[22px] font-custom-500 text-[#ffffff] text-center'>
        {title[locale]}
      </span>
      <span className='text-[12px] font-custom-500 text-[#ffffff] text-center'>
        {value}
      </span>
    </FilterBarItemContainer>
  );
};

export default FilterBarItem;
