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
  schedule?: {
    startDateTime: number;
    endDateTime: number;
    days: {
      name: string;
      slots?: {
        startTime: string;
        id: string;
      }[];
    }[];
  };
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
  schedule,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    initialDate ? [initialDate] : [],
  );

  // Convert schedule days to numbers and store slots
  const { enabledDays } = useMemo(() => {
    if (!schedule?.days) return { enabledDays: [], daySlots: new Map() };
    
    const days = schedule.days.map(day => {
      let dayNumber = -1;
      switch (day.name) {
        case 'Sunday': dayNumber = 0; break;
        case 'Monday': dayNumber = 1; break;
        case 'Tuesday': dayNumber = 2; break;
        case 'Wednesday': dayNumber = 3; break;
        case 'Thursday': dayNumber = 4; break;
        case 'Friday': dayNumber = 5; break;
        case 'Saturday': dayNumber = 6; break;
      }
      return dayNumber;
    }).filter(day => day !== -1);

    return { enabledDays: days};
  }, [schedule]);

  // Convert schedule timestamps to dates
  const startDate = useMemo(() => 
    schedule?.startDateTime ? new Date(schedule.startDateTime) : undefined,
    [schedule]
  );

  const endDate = useMemo(() => 
    schedule?.endDateTime ? new Date(schedule.endDateTime) : undefined,
    [schedule]
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
      // Get slots for the selected date if available
      let selectedSlots;
      if (dates.length > 0) {
        const dayOfWeek = dates[0].getDay();
      }
      
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
        enabledDays={enabledDays}
        scheduleStartDate={startDate}
        scheduleEndDate={endDate}
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
