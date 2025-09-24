'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import { cn } from '@/utils/cn';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useState } from 'react';

type DateSelectionMode = 'single' | 'range' | 'both';

interface DateRangePickerProps {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  mode?: DateSelectionMode;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  enabledDays?: number[];
  enabledDates?: Date[];
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
  enabledDates = [],
  scheduleStartDate,
  scheduleEndDate,
  skipFutureDateValidation = false,
}) => {
  const { t, locale } = useTranslation();

  const createNormalizedDate = useCallback(
    (year: number, month: number, day: number) => {
      const date = new Date(year, month, day);

      date.setHours(12, 0, 0, 0);
      return date;
    },
    []
  );

  const [internalSelection, setInternalSelection] =
    useState<Date[]>(selectedDates);

  useEffect(() => {
    const normalizedDates = selectedDates.map(date =>
      createNormalizedDate(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setInternalSelection(normalizedDates);
  }, [selectedDates, createNormalizedDate]);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDates[0] || new Date()
  );

  const monthYearString = currentMonth.toLocaleDateString(
    locale === 'ar' ? 'ar-SA' : 'en-US',
    {
      month: 'long',
      year: 'numeric',
      calendar: 'gregory',
    }
  );

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();

    // Use the standard JavaScript Date.getDay() numbering (0=Sunday, 1=Monday, etc.)
    const offset = firstDayOfWeek;

    const days = [];

    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(createNormalizedDate(year, month, i));
    }

    return days;
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isDateSelected = (date: Date) => {
    if (!date) return false;
    return internalSelection.some(selectedDate =>
      isSameDate(date, selectedDate)
    );
  };

  const isStartDate = (date: Date) => {
    if (!date || internalSelection.length === 0) return false;
    return isSameDate(date, internalSelection[0]);
  };

  const isEndDate = (date: Date) => {
    if (!date || internalSelection.length !== 2) return false;
    return isSameDate(date, internalSelection[1]);
  };

  const isDateInRange = (date: Date) => {
    if (!date || internalSelection.length !== 2) return false;

    const [start, end] = internalSelection;
    const timestamp = date.getTime();
    return timestamp > start.getTime() && timestamp < end.getTime();
  };

  const isDateDisabled = (date: Date) => {
    if (!date) return false;

    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate());
    twoDaysFromNow.setHours(0, 0, 0, 0);

    if (!skipFutureDateValidation) {
      if (date <= twoDaysFromNow) return true;
    }

    if (minDate && date < minDate) return true;

    if (maxDate && date > maxDate) return true;

    if (scheduleStartDate && date < scheduleStartDate) return true;

    if (scheduleEndDate) {
      const endDate = new Date(scheduleEndDate);
      endDate.setHours(0, 0, 0, 0);
      if (date.getTime() >= endDate.getTime()) return true;
    }

    // If enabledDates is provided, use it instead of enabledDays
    if (enabledDates.length > 0) {
      const dateString = date.toISOString().split('T')[0];
      const isDateEnabled = enabledDates.some(
        enabledDate => enabledDate.toISOString().split('T')[0] === dateString
      );
      if (!isDateEnabled) return true;
    } else if (enabledDays.length > 0 && !enabledDays.includes(date.getDay())) {
      return true;
    }

    return false;
  };

  const getMidnight = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const handleDateClick = (date: Date) => {
    if (!date || isDateDisabled(date)) return;

    const normalizedDate = createNormalizedDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    let newSelectedDates = [...internalSelection];

    if (mode === 'single') {
      newSelectedDates = [normalizedDate];
    } else if (mode === 'both') {
      if (newSelectedDates.length === 0) {
        newSelectedDates = [normalizedDate];
      } else if (newSelectedDates.length === 1) {
        if (isSameDate(normalizedDate, newSelectedDates[0])) {
          newSelectedDates = [normalizedDate];
        } else {
          newSelectedDates =
            normalizedDate < newSelectedDates[0]
              ? [normalizedDate, newSelectedDates[0]]
              : [newSelectedDates[0], normalizedDate];
        }
      } else {
        newSelectedDates = [normalizedDate];
      }
    } else {
      if (newSelectedDates.length === 0 || newSelectedDates.length === 2) {
        newSelectedDates = [normalizedDate];
      } else if (newSelectedDates.length === 1) {
        const firstDate = newSelectedDates[0];
        if (normalizedDate < firstDate) {
          newSelectedDates = [normalizedDate, firstDate];
        } else {
          newSelectedDates = [firstDate, normalizedDate];
        }
      }
    }

    setInternalSelection(newSelectedDates);

    onChange(newSelectedDates);
  };

  const daysOfWeek = [
    t('datePicker.dayAbbreviations.su'), // Sunday (0)
    t('datePicker.dayAbbreviations.mo'), // Monday (1)
    t('datePicker.dayAbbreviations.tu'), // Tuesday (2)
    t('datePicker.dayAbbreviations.we'), // Wednesday (3)
    t('datePicker.dayAbbreviations.th'), // Thursday (4)
    t('datePicker.dayAbbreviations.fr'), // Friday (5)
    t('datePicker.dayAbbreviations.sa'), // Saturday (6)
  ];

  const days = getDaysInMonth();

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-lg p-4 w-full max-w-[320px]',
        className
      )}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium text-green-600'>
          {monthYearString}
        </h2>
        <div className='flex space-x-2'>
          <button
            type='button'
            onClick={prevMonth}
            className='p-1 rounded-full hover:bg-gray-100'
            aria-label='Previous month'
          >
            <ChevronUpIcon className='w-5 h-5' />
          </button>
          <button
            type='button'
            onClick={nextMonth}
            className='p-1 rounded-full hover:bg-gray-100'
            aria-label='Next month'
          >
            <ChevronDownIcon className='w-5 h-5' />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {daysOfWeek.map(day => (
          <div
            key={day}
            className='text-center text-sm font-medium text-gray-500 py-1'
          >
            {day}
          </div>
        ))}

        {days.map((date, index) => (
          <button
            key={index}
            type='button'
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
            {date &&
              (mode === 'range' || mode === 'both') &&
              isDateInRange(date) && (
                <div className='absolute inset-0 bg-gray-200'></div>
              )}

            {date &&
              (mode === 'range' || mode === 'both') &&
              isStartDate(date) &&
              internalSelection.length === 2 && (
                <div className='absolute inset-0 bg-gray-200 rounded-l-full right-0'></div>
              )}

            {date &&
              (mode === 'range' || mode === 'both') &&
              isEndDate(date) && (
                <div className='absolute inset-0 bg-gray-200 rounded-r-full left-0'></div>
              )}

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
