'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

type DateSelectionMode = 'single' | 'range' | 'both';

interface DateRangePickerProps {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  mode?: DateSelectionMode;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  enabledDays?: number[];
  scheduleStartDate?: Date;
  scheduleEndDate?: Date;
  skipFutureDateValidation?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDates = [],
  onChange,
  mode = 'range',
  minDate,
  maxDate,
  className = '',
  enabledDays = [],
  scheduleStartDate,
  scheduleEndDate,
  skipFutureDateValidation = false,
}) => {
  console.log(selectedDates, 'selectedDatesselectedDates');

  // Create a normalized date (noon to avoid timezone issues)
  const createNormalizedDate = useCallback(
    (year: number, month: number, day: number) => {
      const date = new Date(year, month, day);
      // Set to noon to avoid timezone edge cases
      date.setHours(12, 0, 0, 0);
      return date;
    },
    [],
  );

  // Use internal state to track selection during the range picking process
  const [internalSelection, setInternalSelection] =
    useState<Date[]>(selectedDates);

  // Sync internal state with props when selectedDates changes from parent
  useEffect(() => {
    // Normalize incoming dates to avoid timezone issues
    const normalizedDates = selectedDates.map((date) =>
      createNormalizedDate(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    setInternalSelection(normalizedDates);
  }, [selectedDates, createNormalizedDate]);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDates[0] || new Date(),
  );

  // Get the month name and year for display
  const monthYearString = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  // Generate days for the current month view
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for the first day (0 = Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Calculate offset for starting the calendar (adjust for Saturday as first day)
    const offset = (firstDayOfWeek === 0 ? 7 : firstDayOfWeek) - 1;

    // Generate days array with padding for the start
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(createNormalizedDate(year, month, i));
    }

    return days;
  };

  // Check if a date is the same as another date (for date comparison)
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Check if a date is selected based on the internal selection state
  const isDateSelected = (date: Date) => {
    if (!date) return false;
    return internalSelection.some((selectedDate) =>
      isSameDate(date, selectedDate),
    );
  };

  // Check if a date is the start of the selected range
  const isStartDate = (date: Date) => {
    if (!date || internalSelection.length === 0) return false;
    return isSameDate(date, internalSelection[0]);
  };

  // Check if a date is the end of the selected range
  const isEndDate = (date: Date) => {
    if (!date || internalSelection.length !== 2) return false;
    return isSameDate(date, internalSelection[1]);
  };

  // Check if a date is within a selected range
  const isDateInRange = (date: Date) => {
    if (!date || internalSelection.length !== 2) return false;

    const [start, end] = internalSelection;
    const timestamp = date.getTime();
    return timestamp > start.getTime() && timestamp < end.getTime();
  };

  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    if (!date) return false;

    // Get current date plus 2 days
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    twoDaysFromNow.setHours(0, 0, 0, 0); // Set to start of day

    // Skip the future date validation if skipFutureDateValidation is true
    // This allows birthdate pickers to select past dates
    if (!skipFutureDateValidation) {
      // Check if date is within 2 days from now
      if (date <= twoDaysFromNow) return true;
    }

    // Check against min date
    if (minDate && date < minDate) return true;

    // Check against max date
    if (maxDate && date > maxDate) return true;

    // Check against schedule start date
    if (scheduleStartDate && date < scheduleStartDate) return true;

    // Disable the exact endDateTime and all dates after it
    if (scheduleEndDate) {
      const endDate = new Date(scheduleEndDate);
      endDate.setHours(0, 0, 0, 0);
      if (date.getTime() >= endDate.getTime()) return true;
    }

    // Check if the day is enabled
    if (enabledDays.length > 0 && !enabledDays.includes(date.getDay())) {
      return true;
    }

    return false;
  };

  // Get a timestamp for midnight on the given date (for comparison)
  const getMidnight = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  // Handle date selection with updated logic
  const handleDateClick = (date: Date) => {
    if (!date || isDateDisabled(date)) return;

    // Normalize the clicked date to avoid timezone issues
    const normalizedDate = createNormalizedDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    let newSelectedDates = [...internalSelection];

    if (mode === 'single') {
      // Single date selection mode
      newSelectedDates = [normalizedDate];
    } else if (mode === 'both') {
      // Both single and range selection mode
      if (newSelectedDates.length === 0) {
        // First click - select single date
        newSelectedDates = [normalizedDate];
      } else if (newSelectedDates.length === 1) {
        // Second click - if same date, keep as single; if different date, make range
        if (isSameDate(normalizedDate, newSelectedDates[0])) {
          newSelectedDates = [normalizedDate];
        } else {
          newSelectedDates =
            normalizedDate < newSelectedDates[0]
              ? [normalizedDate, newSelectedDates[0]]
              : [newSelectedDates[0], normalizedDate];
        }
      } else {
        // Already have two dates - start new selection
        newSelectedDates = [normalizedDate];
      }
    } else {
      // Range selection mode
      if (newSelectedDates.length === 0 || newSelectedDates.length === 2) {
        // First date in range or starting a new range
        newSelectedDates = [normalizedDate];
      } else if (newSelectedDates.length === 1) {
        // Second date in range - ensure they're ordered correctly
        const firstDate = newSelectedDates[0];
        if (normalizedDate < firstDate) {
          newSelectedDates = [normalizedDate, firstDate];
        } else {
          newSelectedDates = [firstDate, normalizedDate];
        }
      }
    }

    // Update internal state immediately to show visual feedback
    setInternalSelection(newSelectedDates);

    // Send selection to parent component
    onChange(newSelectedDates);
  };

  // Get days of week with Saturday as first day
  const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

  // Generate the calendar grid
  const days = getDaysInMonth();

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-lg p-4 w-full max-w-[320px]',
        className,
      )}
    >
      {/* Header with month/year and navigation */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium text-green-600'>
          {monthYearString}
        </h2>
        <div className='flex space-x-2'>
          <button
            onClick={prevMonth}
            className='p-1 rounded-full hover:bg-gray-100'
            aria-label='Previous month'
          >
            <ChevronUpIcon className='w-5 h-5' />
          </button>
          <button
            onClick={nextMonth}
            className='p-1 rounded-full hover:bg-gray-100'
            aria-label='Next month'
          >
            <ChevronDownIcon className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className='grid grid-cols-7 gap-1'>
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className='text-center text-sm font-medium text-gray-500 py-1'
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => date && handleDateClick(date)}
            disabled={!date || isDateDisabled(date)}
            className={`relative h-10 w-10 flex items-center justify-center ${
              !date
                ? 'invisible'
                : isDateDisabled(date)
                  ? 'text-gray-300 cursor-not-allowed'
                  : ''
            }`}
          >
            {/* Range background */}
            {date &&
              (mode === 'range' || mode === 'both') &&
              isDateInRange(date) && (
                <div className='absolute inset-0 bg-gray-200'></div>
              )}

            {/* Left edge of range */}
            {date &&
              (mode === 'range' || mode === 'both') &&
              isStartDate(date) &&
              internalSelection.length === 2 && (
                <div className='absolute inset-0 bg-gray-200 rounded-l-full right-0'></div>
              )}

            {/* Right edge of range */}
            {date &&
              (mode === 'range' || mode === 'both') &&
              isEndDate(date) && (
                <div className='absolute inset-0 bg-gray-200 rounded-r-full left-0'></div>
              )}

            {/* Date circle */}
            <span
              className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full ${
                date &&
                (isStartDate(date) ||
                  isEndDate(date) ||
                  (mode === 'single' && isDateSelected(date)))
                  ? 'bg-black text-white'
                  : date && !isDateDisabled(date)
                    ? 'hover:bg-gray-100 text-gray-800'
                    : ''
              }`}
            >
              {date?.getDate()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateRangePicker;
