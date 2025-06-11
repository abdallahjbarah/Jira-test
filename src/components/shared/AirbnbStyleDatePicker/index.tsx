'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';
import { useTranslation } from '@/contexts/TranslationContext';
import './animations.css';

type DateSelectionMode = 'single' | 'range';
type ViewMode = 'dates' | 'months' | 'flexible';

interface AirbnbStyleDatePickerProps {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  mode?: DateSelectionMode;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  showModeSelector?: boolean;
  defaultViewMode?: ViewMode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const AirbnbStyleDatePicker: React.FC<AirbnbStyleDatePickerProps> = ({
  selectedDates = [],
  onChange,
  mode = 'range',
  minDate = new Date(),
  maxDate,
  className = '',
  showModeSelector = true,
  defaultViewMode = 'dates',
  onClose,
  showCloseButton = false,
}) => {
  const { t, locale } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);
  const [internalSelection, setInternalSelection] =
    useState<Date[]>(selectedDates);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDates[0] || new Date(),
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const createNormalizedDate = useCallback(
    (year: number, month: number, day: number) => {
      const date = new Date(year, month, day);
      date.setHours(12, 0, 0, 0);
      return date;
    },
    [],
  );

  useEffect(() => {
    const normalizedDates = selectedDates.map((date) =>
      createNormalizedDate(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    setInternalSelection(normalizedDates);
  }, [selectedDates, createNormalizedDate]);

  const getNextMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (direction === 'next' ? 1 : -1),
      1,
    );
    setCurrentMonth(newMonth);
    setAnimationKey((prev) => prev + 1);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'long',
      year: 'numeric',
      calendar: 'gregory',
    });
  };

  const getDaysInMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const firstDayOfWeek = firstDay.getDay();

    const offset = firstDayOfWeek;
    const days = [];

    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(createNormalizedDate(year, monthIndex, i));
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
    return internalSelection.some((selectedDate) =>
      isSameDate(date, selectedDate),
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

  const isDateInHoverRange = (date: Date) => {
    if (!date || !hoveredDate || internalSelection.length !== 1) return false;
    const start = internalSelection[0];
    const end = hoveredDate;

    const startTime = Math.min(start.getTime(), end.getTime());
    const endTime = Math.max(start.getTime(), end.getTime());
    const timestamp = date.getTime();

    return timestamp > startTime && timestamp < endTime;
  };

  const isDateDisabled = (date: Date) => {
    if (!date) return false;

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return false;
  };

  const handleDateClick = (date: Date) => {
    if (!date || isDateDisabled(date)) return;

    const normalizedDate = createNormalizedDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    let newSelectedDates = [...internalSelection];

    if (mode === 'single') {
      newSelectedDates = [normalizedDate];
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

  const handleDateHover = (date: Date | null) => {
    if (mode === 'range' && internalSelection.length === 1) {
      setHoveredDate(date);
    }
  };

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const renderCalendar = (month: Date, index: number) => {
    const days = getDaysInMonth(month);

    return (
      <div
        key={`${index}-${animationKey}`}
        className='flex-1 min-w-0 airbnb-month-slide'
      >
        <div className='text-center mb-8'>
          <h3 className='text-2xl font-medium text-gray-900 tracking-tight'>
            {formatMonthYear(month)}
          </h3>
        </div>

        <div className='grid grid-cols-7 gap-0 mb-4'>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className='h-10 flex items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wide'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-0'>
          {days.map((date, dayIndex) => {
            if (!date) {
              return <div key={dayIndex} className='h-12' />;
            }

            const isSelected = isDateSelected(date);
            const isStart = isStartDate(date);
            const isEnd = isEndDate(date);
            const inRange = isDateInRange(date);
            const inHoverRange = isDateInHoverRange(date);
            const disabled = isDateDisabled(date);

            return (
              <button
                key={dayIndex}
                type='button'
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => handleDateHover(date)}
                onMouseLeave={() => handleDateHover(null)}
                disabled={disabled}
                className={cn(
                  'relative h-12 flex items-center justify-center text-sm airbnb-date-hover',
                  'focus:outline-none focus:z-10',
                  disabled && 'cursor-not-allowed opacity-25',
                  !disabled && 'cursor-pointer',
                )}
              >
                {(inRange ||
                  inHoverRange ||
                  (isStart && internalSelection.length === 2) ||
                  (isEnd && internalSelection.length === 2)) && (
                  <div className='absolute inset-0 flex items-center'>
                    <div
                      className={cn(
                        'h-10 w-full transition-all duration-300 ease-out',
                        inHoverRange
                          ? 'airbnb-range-hover'
                          : 'airbnb-range-background',
                        inRange && 'w-full',
                        isStart &&
                          internalSelection.length === 2 &&
                          'w-1/2 ml-auto',
                        isEnd &&
                          internalSelection.length === 2 &&
                          'w-1/2 mr-auto',
                      )}
                    />
                  </div>
                )}

                <span
                  className={cn(
                    'relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200',
                    'font-medium',
                    isSelected &&
                      'bg-[#FF5A5F] text-white shadow-lg airbnb-date-selected transform scale-105',
                    !isSelected &&
                      !disabled &&
                      'hover:bg-gray-50 text-gray-800 hover:scale-105',
                    disabled && 'text-gray-300',
                    !isSelected &&
                      new Date().toDateString() === date.toDateString() &&
                      'bg-gray-100 font-semibold text-gray-900 ring-1 ring-gray-200',
                    !isSelected && inHoverRange && 'bg-gray-50 text-gray-900',
                  )}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto airbnb-calendar-enter relative mt-2.5',
        className,
      )}
    >
      {showModeSelector && (
        <div className='flex justify-center mb-12'>
          <div className='flex bg-gray-100 rounded-full p-1.5 shadow-inner'>
            {[
              { key: 'dates', label: 'Dates' },
              { key: 'months', label: 'Months' },
              { key: 'flexible', label: 'Flexible' },
            ].map((option) => (
              <button
                key={option.key}
                type='button'
                onClick={() => setViewMode(option.key as ViewMode)}
                className={cn(
                  'px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300',
                  'airbnb-mode-tab',
                  viewMode === option.key
                    ? 'bg-white text-gray-900 shadow-lg airbnb-mode-tab-active'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'dates' && (
        <div className='relative w-full p-[24px]'>
          <div className='flex gap-20 px-4 relative'>
            <button
              type='button'
              onClick={() => navigateMonth('prev')}
              className='absolute left-2 top-0 z-40 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:ring-opacity-50'
              aria-label='Previous month'
            >
              <ChevronLeftIcon className='w-5 h-5 text-gray-600 stroke-2' />
            </button>

            <button
              type='button'
              onClick={() => navigateMonth('next')}
              className='absolute right-2 top-0 z-40 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:ring-opacity-50'
              aria-label='Next month'
            >
              <ChevronRightIcon className='w-5 h-5 text-gray-600 stroke-2' />
            </button>

            {renderCalendar(currentMonth, 0)}
            {renderCalendar(getNextMonth(), 1)}
          </div>
        </div>
      )}

      {viewMode === 'months' && (
        <div className='text-center py-20 text-gray-500'>
          <div className='airbnb-loading-skeleton h-4 w-48 mx-auto rounded mb-4'></div>
          <p className='text-lg'>Month view coming soon...</p>
        </div>
      )}

      {viewMode === 'flexible' && (
        <div className='text-center py-20 text-gray-500'>
          <div className='airbnb-loading-skeleton h-4 w-56 mx-auto rounded mb-4'></div>
          <p className='text-lg'>Flexible dates coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default AirbnbStyleDatePicker;
