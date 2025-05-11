import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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
    <div className={`border-b border-gray-200 py-3 ${className}`}>
      <button
        type='button'
        className={`flex justify-between items-center w-full text-left text-sm font-medium ${titleClassName}`}
        onClick={toggleCollapsible}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className='h-4 w-4 text-gray-500' />
        ) : (
          <ChevronDownIcon className='h-4 w-4 text-gray-500' />
        )}
      </button>
      {isOpen && <div className={`mt-3 ${contentClassName}`}>{children}</div>}
    </div>
  );
};

export default Collapsible;
