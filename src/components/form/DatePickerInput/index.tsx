'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  InputHTMLAttributes,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import FormInput from '@/components/form/FormInput';
import DateRangePicker from '@/components/shared/DateRangePicker';
import Dropdown from '@/components/ui/Dropdown';

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
>;

interface DatePickerInputProps extends InputProps {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  fullWidth?: boolean;
  value?: string;
  onChange?: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
  isBirthdate?: boolean;
}

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (
    {
      label,
      error,
      registration,
      fullWidth = true,
      value = '',
      onChange,
      minDate,
      maxDate = new Date(),
      isBirthdate = false,
      ...props
    },
    ref,
  ) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    const handleDateChange = (dates: Date[]) => {
      const date = dates[0] ? dates[0].toISOString().split('T')[0] : '';
      onChange && onChange(date);
      setIsDatePickerOpen(false);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        <Dropdown
          trigger={
            <FormInput
              {...props}
              {...registration}
              id={props.id || 'date-picker'}
              ref={ref || inputRef}
              value={formatDate(value)}
              onFocus={() => setIsDatePickerOpen(true)}
              label={label}
              error={error}
              readOnly
            />
          }
          content={
            <div className='bg-white shadow-xl rounded-lg p-2'>
              <DateRangePicker
                mode='single'
                selectedDates={value ? [new Date(value)] : []}
                onChange={handleDateChange}
                maxDate={maxDate}
                minDate={minDate}
                skipFutureDateValidation={isBirthdate}
                className='w-full'
              />
            </div>
          }
          position='bottom-left'
          contentClassName='w-auto'
        />
      </div>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';

export default DatePickerInput;
