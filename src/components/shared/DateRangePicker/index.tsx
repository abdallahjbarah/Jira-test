'use client';
import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

type DateSelectionMode = 'single' | 'range';

interface DateRangePickerProps {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  mode?: DateSelectionMode;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDates = [],
  onChange,
  mode = 'range',
  minDate,
  maxDate,
  className = '',
}) => {
  console.log(selectedDates, 'selectedDatesselectedDates');

  // Use internal state to track selection during the range picking process
  const [internalSelection, setInternalSelection] =
    useState<Date[]>(selectedDates);

  // Sync internal state with props when selectedDates changes from parent
  useEffect(() => {
    setInternalSelection(selectedDates);
  }, [selectedDates]);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDates[0] || new Date(),
  );

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

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

  // Generate years for the year picker
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    const startYear = currentYear - 100; // Show 100 years back
    const endYear = currentYear; // Up to current year

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearPicker(false);
  };

  // Handle month selection
  const handleMonthSelect = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
    setShowMonthPicker(false);
  };

  // Get month names
  const getMonthNames = () => {
    return Array.from({ length: 12 }, (_, i) => {
      return new Date(2000, i, 1).toLocaleString('default', { month: 'long' });
    });
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
      days.push(new Date(year, month, i));
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

    // Check against min date
    if (minDate && date <= minDate) return true;

    // Check against max date
    if (maxDate && date > maxDate) return true;

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

    let newSelectedDates = [...internalSelection];

    if (mode === 'single') {
      // Single date selection mode
      newSelectedDates = [date];
    } else {
      // Range selection mode
      if (newSelectedDates.length === 0 || newSelectedDates.length === 2) {
        // First date in range or starting a new range
        newSelectedDates = [date];
      } else if (newSelectedDates.length === 1) {
        // Second date in range - ensure they're ordered correctly
        const firstDate = newSelectedDates[0];
        if (date < firstDate) {
          newSelectedDates = [date, firstDate];
        } else {
          newSelectedDates = [firstDate, date];
        }
      }
    }

    // Update internal state immediately to show visual feedback
    setInternalSelection(newSelectedDates);

    // Only send complete ranges to parent component
    if (
      mode === 'single' ||
      newSelectedDates.length === 2 ||
      newSelectedDates.length === 0
    ) {
      onChange(newSelectedDates);
    }
  };

  // Get days of week with Saturday as first day
  const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

  // Generate the calendar grid
  const days = getDaysInMonth();

  return (
    <div className={cn('bg-white rounded-lg shadow-lg p-4 w-full max-w-[320px] relative', className)}>
      {/* Header with month/year and navigation */}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className='text-lg font-medium text-green-600 hover:bg-gray-100 px-2 py-1 rounded'
          >
            {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
          </button>
          <button
            onClick={() => setShowYearPicker(!showYearPicker)}
            className='text-lg font-medium text-green-600 hover:bg-gray-100 px-2 py-1 rounded'
          >
            {currentMonth.getFullYear()}
          </button>
        </div>
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

      {/* Month Picker */}
      {showMonthPicker && (
        <div className='absolute top-0 left-0 right-0 z-20 bg-white rounded-lg shadow-lg p-2 max-h-[200px] overflow-y-auto'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-sm font-medium text-gray-700'>Select Month</h3>
            <button
              onClick={() => setShowMonthPicker(false)}
              className='p-1 rounded-full hover:bg-gray-100'
            >
              <XMarkIcon className='w-4 h-4 text-gray-500' />
            </button>
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {getMonthNames().map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${index === currentMonth.getMonth() ? 'bg-green-100 text-green-600' : ''
                  }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Year Picker */}
      {showYearPicker && (
        <div className='absolute top-0 left-0 right-0 z-20 bg-white rounded-lg shadow-lg p-2 max-h-[200px] overflow-y-auto'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-sm font-medium text-gray-700'>Select Year</h3>
            <button
              onClick={() => setShowYearPicker(false)}
              className='p-1 rounded-full hover:bg-gray-100'
            >
              <XMarkIcon className='w-4 h-4 text-gray-500' />
            </button>
          </div>
          <div className='grid grid-cols-4 gap-1'>
            {generateYears().map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`px-2 py-1 text-sm rounded hover:bg-gray-100 ${year === currentMonth.getFullYear() ? 'bg-green-100 text-green-600' : ''
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

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
            className={`relative h-10 w-10 flex items-center justify-center ${!date
              ? 'invisible'
              : isDateDisabled(date)
                ? 'text-gray-300 cursor-not-allowed'
                : ''
              }`}
          >
            {/* Range background */}
            {date && mode === 'range' && isDateInRange(date) && (
              <div className='absolute inset-0 bg-gray-200'></div>
            )}

            {/* Left edge of range */}
            {date &&
              mode === 'range' &&
              isStartDate(date) &&
              internalSelection.length === 2 && (
                <div className='absolute inset-0 bg-gray-200 rounded-l-full right-0'></div>
              )}

            {/* Right edge of range */}
            {date && mode === 'range' && isEndDate(date) && (
              <div className='absolute inset-0 bg-gray-200 rounded-r-full left-0'></div>
            )}

            {/* Date circle */}
            <span
              className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full ${date &&
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
