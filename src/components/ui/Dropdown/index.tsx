'use client';

import { cn } from '@/utils/cn';
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps {
  trigger: ReactNode | React.ReactElement;
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
  const [contentStyles, setContentStyles] = useState({
    top: 0,
    left: 0,
    width: 'auto',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Update position when dropdown is opened
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  // Update dropdown position based on trigger element position
  const updatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Get dropdown content width (default to trigger width)
    const contentWidth = dropdownRef.current
      ? dropdownRef.current.offsetWidth
      : triggerRect.width;

    // Calculate content height (if available)
    const contentHeight = dropdownRef.current
      ? dropdownRef.current.offsetHeight
      : 0;

    // Base position (relative to viewport)
    let top = triggerRect.bottom;
    let left = triggerRect.left;

    // Adjust position based on dropdown position prop
    switch (position) {
      case 'bottom-right':
        left = triggerRect.right - contentWidth;
        top = triggerRect.bottom;
        break;
      case 'bottom-left':
        left = triggerRect.left;
        top = triggerRect.bottom;
        break;
      case 'top-right':
        left = triggerRect.right - contentWidth;
        top = triggerRect.top - contentHeight;
        break;
      case 'top-left':
        left = triggerRect.left;
        top = triggerRect.top - contentHeight;
        break;
    }

    // Adjust if dropdown would go off screen
    if (left < 0) {
      left = 0;
    } else if (left + contentWidth > windowWidth) {
      left = windowWidth - contentWidth;
    }

    // Check if dropdown would go off screen bottom and switch to top position
    if (top + contentHeight > windowHeight && triggerRect.top > contentHeight) {
      switch (position) {
        case 'bottom-right':
        case 'bottom-left':
          top = triggerRect.top - contentHeight;
          break;
      }
    }

    // Check if dropdown would go off screen top and switch to bottom position
    if (top < 0) {
      switch (position) {
        case 'top-right':
        case 'top-left':
          top = triggerRect.bottom;
          break;
      }
    }

    // Set positioning styles
    setContentStyles({
      top,
      left,
      width: contentWidth ? `${contentWidth}px` : 'auto',
    });
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

  // Create portal element for dropdown content
  const renderDropdownContent = () => {
    if (!isOpen || !mounted) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        className={`fixed z-50 ${contentClassName}`}
        style={{
          top: `${contentStyles.top}px`,
          left: `${contentStyles.left}px`,
        }}
      >
        {content}
      </div>,
      document.body,
    );
  };

  return (
    <>
      <div className={cn('relative', className)}>
        <div
          ref={triggerRef}
          onClick={toggleDropdown}
          className='cursor-pointer'
        >
          {trigger}
        </div>
      </div>
      {renderDropdownContent()}
    </>
  );
};

export default Dropdown;
