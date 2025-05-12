import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  defaultOpen = true,
  children,
  className = '',
  titleClassName = '',
  contentClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('border-b border-secondary_3 py-3', className)}>
      <button
        type='button'
        className={cn(
          'flex justify-between items-center w-full text-left text-sm font-medium',
          titleClassName,
        )}
        onClick={toggleCollapsible}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className='h-4 w-4 text-text_1' />
        ) : (
          <ChevronDownIcon className='h-4 w-4 text-text_1' />
        )}
      </button>
      {isOpen && <div className={cn('mt-3', contentClassName)}>{children}</div>}
    </div>
  );
};

export default Collapsible;
