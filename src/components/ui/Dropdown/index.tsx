'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  content: ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  contentClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  content,
  position = 'bottom-right',
  className = '',
  contentClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'top-full right-0';
      case 'bottom-left':
        return 'top-full left-0';
      case 'top-right':
        return 'bottom-full right-0';
      case 'top-left':
        return 'bottom-full left-0';
      default:
        return 'top-full right-0';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={triggerRef} onClick={toggleDropdown} className='cursor-pointer'>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${getPositionClasses()} mt-2 z-50 ${contentClassName}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
