'use client';
import Dropdown from '@/components/ui/Dropdown';
import { useTranslation } from '@/contexts/TranslationContext';
import React, { useEffect, useMemo, useState } from 'react';
import DateRangePicker from '../DateRangePicker';
import FilterBarItem from '../FilterBar/FilterBarItem';

interface DatePickerDropdownProps {
  title?: {
    en: string;
    ar: string;
  };
  onChange?: (dateString: string, dates: Date[]) => void;
  mode?: 'single' | 'range' | 'both';
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  isCheckout?: boolean;
  checkInDate?: Date;
  value?: string;
  triggerComponent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
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
  className,
  onClick,
  schedule,
}) => {
  const { t, locale } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    initialDate ? [initialDate] : [],
  );
  const [isOpen, setIsOpen] = useState(false);

  const { enabledDays } = useMemo(() => {
    if (!schedule?.days) return { enabledDays: [], daySlots: new Map() };

    const days = schedule.days
      .map((day) => {
        let dayNumber = -1;
        switch (day.name) {
          case 'Sunday':
            dayNumber = 0;
            break;
          case 'Monday':
            dayNumber = 1;
            break;
          case 'Tuesday':
            dayNumber = 2;
            break;
          case 'Wednesday':
            dayNumber = 3;
            break;
          case 'Thursday':
            dayNumber = 4;
            break;
          case 'Friday':
            dayNumber = 5;
            break;
          case 'Saturday':
            dayNumber = 6;
            break;
        }
        return dayNumber;
      })
      .filter((day) => day !== -1);

    return { enabledDays: days };
  }, [schedule]);

  const startDate = useMemo(
    () =>
      schedule?.startDateTime ? new Date(schedule.startDateTime) : undefined,
    [schedule],
  );

  const endDate = useMemo(
    () => (schedule?.endDateTime ? new Date(schedule.endDateTime) : undefined),
    [schedule],
  );

  useEffect(() => {
    if (value && value !== getFormattedDateString(selectedDates)) {
      try {
        if (value.includes(',')) {
          const [start, end] = value.split(',');
          setSelectedDates([new Date(start), new Date(end)]);
        } else {
          setSelectedDates([new Date(value)]);
        }
      } catch (e) { }
    } else if (!value && selectedDates.length > 0) {
      setSelectedDates([]);
    }
  }, [value]);

  const effectiveMinDate = useMemo(() => {
    if (isCheckout && checkInDate) {
      return checkInDate > (minDate || new Date())
        ? checkInDate
        : minDate || new Date();
    }
    return minDate;
  }, [isCheckout, checkInDate, minDate]);

  const getDisplayValue = () => {
    if (selectedDates.length === 0) {
      return t('datePicker.add_date');
    }

    const currentYear = new Date().getFullYear();
    const formatDate = (date: Date) => {
      const isCurrentYear = date.getFullYear() === currentYear;
      return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        month: 'short',
        day: 'numeric',
        ...(isCurrentYear ? {} : { year: 'numeric' })
      });
    };

    if (selectedDates.length === 1) {
      return formatDate(selectedDates[0]);
    }

    return `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])}`;
  };

  const handleDateChange = (dates: Date[]) => {
    setSelectedDates(dates);

    if (onChange) {
      let selectedSlots;
      if (dates.length > 0) {
        const dayOfWeek = dates[0].getDay();
      }

      onChange(getFormattedDateString(dates), dates);
    }
  };

  const getFormattedDateString = (dates: Date[]) => {
    if (dates.length === 0) return '';

    if (dates.length === 1 || mode === 'single') {
      return dates[0].toISOString().split('T')[0];
    }

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
            onClick={onClick || (() => { })}
            className={`${className || ''} ${isOpen ? 'bg-white rounded-full [&_span]:!text-green-600' : ''}`}
          />
        )
      }
      content={dropdownContent}
      onOpenChange={setIsOpen}
    />
  );
};

export default DatePickerDropdown;
