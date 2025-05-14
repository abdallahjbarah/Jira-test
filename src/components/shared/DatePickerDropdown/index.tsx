'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import FilterBarItem from '../FilterBar/FilterBarItem';
import DateRangePicker from '../DateRangePicker';

interface DatePickerDropdownProps {
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
}

const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({
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
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    initialDate ? [initialDate] : [],
  );

  // Effect to sync with external value changes (from form)
  useEffect(() => {
    if (value && value !== getFormattedDateString(selectedDates)) {
      // External value changed, try to parse it
      try {
        if (value.includes(',')) {
          // Range format
          const [start, end] = value.split(',');
          setSelectedDates([new Date(start), new Date(end)]);
        } else {
          // Single date
          setSelectedDates([new Date(value)]);
        }
      } catch (e) {
        console.error('Failed to parse date value:', value);
      }
    } else if (!value && selectedDates.length > 0) {
      // Value was cleared externally
      setSelectedDates([]);
    }
  }, [value]);

  // Determine effective minimum date (for checkout, it's at least the check-in date)
  const effectiveMinDate = useMemo(() => {
    if (isCheckout && checkInDate) {
      return checkInDate > (minDate || new Date())
        ? checkInDate
        : minDate || new Date();
    }
    return minDate;
  }, [isCheckout, checkInDate, minDate]);

  // Format the date for display
  const getDisplayValue = () => {
    if (selectedDates.length === 0) {
      return 'Add date';
    }

    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }

    // Range format
    return `${selectedDates[0].toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })} - ${selectedDates[1].toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}`;
  };

  // Handle date change
  const handleDateChange = (dates: Date[]) => {
    setSelectedDates(dates);

    if (onChange) {
      onChange(getFormattedDateString(dates), dates);
    }
  };

  // Format date for form submission
  const getFormattedDateString = (dates: Date[]) => {
    if (dates.length === 0) return '';

    if (dates.length === 1 || mode === 'single') {
      return dates[0].toISOString().split('T')[0]; // YYYY-MM-DD
    }

    // Range format for API: YYYY-MM-DD,YYYY-MM-DD
    return `${dates[0].toISOString().split('T')[0]},${dates[1].toISOString().split('T')[0]}`;
  };

  const dropdownContent = (
    <div className='rounded-xl'>
      <DateRangePicker
        selectedDates={selectedDates}
        onChange={handleDateChange}
        mode={mode}
        minDate={effectiveMinDate}
        maxDate={maxDate}
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
            onClick={() => {}}
          />
        )
      }
      content={dropdownContent}
      position='bottom-left'
      contentClassName='mt-4'
    />
  );
};

export default DatePickerDropdown;
