'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';
import AirbnbStyleDatePicker from '../AirbnbStyleDatePicker';
import { useTranslation } from '@/contexts/TranslationContext';

interface AirbnbDatePickerDropdownProps {
  title?: {
    en: string;
    ar: string;
  };
  onChange?: (dateString: string, dates: Date[]) => void;
  mode?: 'single' | 'range';
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  isCheckout?: boolean;
  checkInDate?: Date;
  value?: string;
  triggerComponent?: React.ReactNode;
  showModeSelector?: boolean;
  autoClose?: boolean;
}

const AirbnbDatePickerDropdown: React.FC<AirbnbDatePickerDropdownProps> = ({
  title,
  onChange,
  mode = 'single',
  initialDate,
  minDate,
  maxDate,
  isCheckout = false,
  checkInDate,
  value,
  triggerComponent,
  showModeSelector = false,
  autoClose = false,
}) => {
  const { t, locale } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    initialDate ? [initialDate] : [],
  );
  const [isOpen, setIsOpen] = useState(false);

  const getFormattedDateString = useCallback((dates: Date[]) => {
    if (dates.length === 0) return '';

    if (dates.length === 1 || mode === 'single') {
      return dates[0].toISOString().split('T')[0];
    }

    return `${dates[0].toISOString().split('T')[0]},${dates[1].toISOString().split('T')[0]}`;
  }, [mode]);

  useEffect(() => {
    const currentFormattedValue = getFormattedDateString(selectedDates);
    
    if (value && value !== currentFormattedValue) {
      console.log('Syncing external value:', value, 'current:', currentFormattedValue);
      try {
        if (value.includes(',')) {
          const [start, end] = value.split(',');
          setSelectedDates([new Date(start), new Date(end)]);
        } else {
          setSelectedDates([new Date(value)]);
        }
      } catch (e) {
        console.error('Failed to parse date value:', value);
      }
    } else if (!value && selectedDates.length > 0) {
      console.log('Clearing dates externally');
      setSelectedDates([]);
    }
  }, [value, getFormattedDateString, selectedDates]);

  const effectiveMinDate = useMemo(() => {
    if (isCheckout && checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay > (minDate || new Date())
        ? nextDay
        : minDate || new Date();
    }
    return minDate;
  }, [isCheckout, checkInDate, minDate]);

  const getDisplayValue = () => {
    if (selectedDates.length === 0) {
      return isCheckout ? 'Add check-out date' : 'Add check-in date';
    }

    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }

    return `${selectedDates[0].toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })} - ${selectedDates[1].toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  const handleDateChange = (dates: Date[]) => {
    console.log('Date changed:', dates);
    setSelectedDates(dates);

    if (onChange) {
      const formattedString = getFormattedDateString(dates);
      console.log('Calling onChange with:', formattedString, dates);
      onChange(formattedString, dates);
    }

    if (autoClose && ((mode === 'single' && dates.length === 1) || (mode === 'range' && dates.length === 2))) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const handleOpen = () => {
    console.log('Opening date picker');
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('Closing date picker');
    setIsOpen(false);
  };

  const dropdownContent = (
    <div className='rounded-2xl overflow-hidden airbnb-dropdown-enter'>
      <AirbnbStyleDatePicker
        selectedDates={selectedDates}
        onChange={handleDateChange}
        mode={mode}
        minDate={effectiveMinDate}
        maxDate={maxDate}
        showModeSelector={showModeSelector}
        className="shadow-none border-0"
        onClose={handleClose}
        showCloseButton={true}
      />
    </div>
  );

  return (
    <Dropdown
      trigger={
        triggerComponent || (
          <FilterBarItem
            title={title || { en: '', ar: '' }}
            value={getDisplayValue()}
            onClick={handleOpen}
          />
        )
      }
      content={dropdownContent}
      isOpen={isOpen}
      onClose={handleClose}
      position="bottom-center"
      contentClassName="w-auto max-w-none"
    />
  );
};

export default AirbnbDatePickerDropdown; 