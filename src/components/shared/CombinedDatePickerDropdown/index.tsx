'use client';
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Suspense,
  lazy,
} from 'react';
import { useLayer } from 'react-laag';
import FilterBarItem from '../FilterBar/FilterBarItem';
import { useTranslation } from '@/contexts/TranslationContext';

const AirbnbStyleDatePicker = lazy(() => import('../AirbnbStyleDatePicker'));

interface CombinedDatePickerDropdownProps {
  checkInTitle?: {
    en: string;
    ar: string;
  };
  checkOutTitle?: {
    en: string;
    ar: string;
  };
  onCheckInChange?: (dateString: string, dates: Date[]) => void;
  onCheckOutChange?: (dateString: string, dates: Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  checkInValue?: string;
  checkOutValue?: string;
}

type SelectionStep = 'checkin' | 'checkout' | 'complete';

const CombinedDatePickerDropdown: React.FC<CombinedDatePickerDropdownProps> = ({
  checkInTitle,
  checkOutTitle,
  onCheckInChange,
  onCheckOutChange,
  minDate = new Date(),
  maxDate,
  checkInValue,
  checkOutValue,
}) => {
  const { t, locale } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectionStep, setSelectionStep] = useState<SelectionStep>('checkin');

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: () => setIsOpen(false),
    onDisappear: () => setIsOpen(false),
    placement: 'bottom-center',
    auto: true,
    snap: true,
    possiblePlacements: [
      'bottom-center',
      'top-center',
      'bottom-start', 
      'bottom-end',
      'top-start',
      'top-end',
    ],
    triggerOffset: 16,
    containerOffset: 32,
    overflowContainer: true,
  });

  const parseExistingDates = useCallback(() => {
    const dates: Date[] = [];

    if (checkInValue) {
      try {
        dates.push(new Date(checkInValue));
      } catch (e) {
        console.error('Failed to parse check-in date:', checkInValue);
      }
    }

    if (checkOutValue) {
      try {
        dates.push(new Date(checkOutValue));
      } catch (e) {
        console.error('Failed to parse check-out date:', checkOutValue);
      }
    }

    return dates;
  }, [checkInValue, checkOutValue]);

  useEffect(() => {
    const existingDates = parseExistingDates();
    if (existingDates.length > 0) {
      setSelectedDates(existingDates);
      if (existingDates.length === 2) {
        setSelectionStep('complete');
      } else if (existingDates.length === 1) {
        setSelectionStep('checkout');
      }
    }
  }, [checkInValue, checkOutValue, parseExistingDates]);

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCheckInDisplay = () => {
    if (selectedDates.length > 0) {
      return formatDateForDisplay(selectedDates[0]);
    }
    return 'Check-in date';
  };

  const getCheckOutDisplay = () => {
    if (selectedDates.length > 1) {
      return formatDateForDisplay(selectedDates[1]);
    }
    return 'Check-out date';
  };

  const handleDateChange = (dates: Date[]) => {
    console.log('Date changed:', dates, 'Current step:', selectionStep);

    if (dates.length === 1) {
      setSelectedDates([dates[0]]);
      setSelectionStep('checkout');

      if (onCheckInChange) {
        const dateString = dates[0].toISOString().split('T')[0];
        onCheckInChange(dateString, [dates[0]]);
      }

      if (checkOutValue) {
        const checkOutDate = new Date(checkOutValue);
        if (checkOutDate <= dates[0]) {
          if (onCheckOutChange) {
            onCheckOutChange('', []);
          }
        }
      }
    } else if (dates.length === 2) {
      setSelectedDates(dates);
      setSelectionStep('complete');

      if (onCheckInChange) {
        const checkInString = dates[0].toISOString().split('T')[0];
        onCheckInChange(checkInString, [dates[0]]);
      }

      if (onCheckOutChange) {
        const checkOutString = dates[1].toISOString().split('T')[0];
        onCheckOutChange(checkOutString, [dates[1]]);
      }
    }
  };

  const effectiveMinDate = useMemo(() => {
    if (selectionStep === 'checkout' && selectedDates.length > 0) {
      const nextDay = new Date(selectedDates[0]);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return minDate;
  }, [selectionStep, selectedDates, minDate]);

  const handleOpen = () => {
    console.log('Opening combined date picker');

    if (checkInValue && checkOutValue) {
      setSelectionStep('complete');
    } else if (checkInValue) {
      setSelectionStep('checkout');
    } else {
      setSelectionStep('checkin');
    }

    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('Closing combined date picker');
    setIsOpen(false);
  };

  return (
    <div className="airbnb-datepicker-container">
      <div {...triggerProps} data-date-picker-trigger>
        <FilterBarItem
          title={checkInTitle || { en: 'Check-in', ar: 'تسجيل الوصول' }}
          value={getCheckInDisplay()}
          onClick={handleOpen}
        />
      </div>

      <div data-date-picker-trigger>
        <FilterBarItem
          title={checkOutTitle || { en: 'Check-out', ar: 'تسجيل المغادرة' }}
          value={getCheckOutDisplay()}
          onClick={handleOpen}
        />
      </div>

      {isOpen &&
        renderLayer(
          <div
            {...layerProps}
            className="bg-white rounded-[32px] shadow-[0_16px_32px_rgba(0,0,0,0.15),0_3px_8px_rgba(0,0,0,0.1)] border border-gray-100/50 overflow-hidden airbnb-modal-center"
            style={{
              ...layerProps.style,
              width: '850px',
              maxWidth: 'calc(100vw - 48px)',
              minHeight: '600px',
              zIndex: 1000,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              position: 'fixed',
            }}
          >
            <Suspense
              fallback={
                <div className="px-10 py-12">
                  <div className="flex justify-center mb-12">
                    <div className="flex bg-gray-100 rounded-full p-1.5 animate-pulse">
                      <div className="w-20 h-10 bg-gray-200 rounded-full mr-1"></div>
                      <div className="w-20 h-10 bg-gray-200 rounded-full mr-1"></div>
                      <div className="w-20 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-20 px-16">
                    {[1, 2].map((month) => (
                      <div key={month} className="flex-1">
                        <div className="text-center mb-8">
                          <div className="h-7 bg-gray-200 rounded-lg w-48 mx-auto animate-pulse"></div>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-0 mb-4">
                          {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="h-12 flex items-center justify-center">
                              <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-0">
                          {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="h-12 flex items-center justify-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <AirbnbStyleDatePicker
                selectedDates={selectedDates}
                onChange={handleDateChange}
                mode="range"
                minDate={effectiveMinDate}
                maxDate={maxDate}
                showModeSelector={false}
                className="shadow-none border-0 rounded-none !p-0 !rounded-[32px] !max-w-none !mx-0"
                onClose={handleClose}
                showCloseButton={true}
              />
            </Suspense>
          </div>,
        )}
    </div>
  );
};

export default CombinedDatePickerDropdown;
 